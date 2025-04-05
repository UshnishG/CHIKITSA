import os
import json
import fitz  # PyMuPDF
import tempfile
import pandas as pd
from PIL import Image
from typing import List, Dict
from sentence_transformers import SentenceTransformer
import lancedb
import requests
import easyocr
from langchain_community.llms import Ollama
from langchain.prompts import PromptTemplate
from langchain.chains import LLMChain

# Ensure output directory exists
os.makedirs("extracted_results", exist_ok=True)

# Initialize EasyOCR Reader
reader = easyocr.Reader(['en'])

# 1. Extract text from PDF with EasyOCR fallback
def extract_text_from_pdf(pdf_path: str) -> str:
    text = ""
    if not os.path.exists(pdf_path):
        print(f"File not found: {pdf_path}")
        return text
    doc = fitz.open(pdf_path)
    for page_num in range(len(doc)):
        page = doc.load_page(page_num)
        page_text = page.get_text()
        text += page_text
        if len(page_text.strip()) < 10:
            pix = page.get_pixmap()
            img_path = f"temp_page_{page_num}.png"
            pix.save(img_path)
            ocr_result = reader.readtext(img_path, detail=0)
            text += "\n".join(ocr_result)
            os.remove(img_path)
    doc.close()
    with open("extracted_results/raw_text.txt", "w", encoding="utf-8") as f:
        f.write(text)
    return text

# 2. Entity Extraction from Lab Report using LLM
def extract_medical_entities(text: str, model_name="mistral:latest") -> dict:
    prompt = PromptTemplate(
        input_variables=["text"],
        template="""
            Extract the following medical entities from this lab report:
            1. Patient Information (name, age, gender)
            2. Test Names and their Values with Units and Reference Ranges
            3. Clearly identify Abnormal Values (those outside reference range) and their severity
            4. Diagnose any potential diseases based on abnormalities and include severity (e.g. confirmed, borderline)
            5. Focus on key indicators like:
               - Blood glucose parameters (FBS, HbA1c)
               - Vitamin levels (B12, D, etc.)
               - Immunoglobulins (IgE, etc.)
               - Basic metabolic panel
               - Complete blood count

            Lab Report:
            {text}

            Return strictly a JSON object with these keys:
            - patient_info
            - test_results
            - abnormal_values
            - probable_diseases
            - conditions
            - severity_notes (e.g. "borderline diabetes", "confirmed hypothyroidism")
        """
    )
    chain = LLMChain(llm=Ollama(model=model_name), prompt=prompt)
    try:
        result = chain.run(text=text)
        result = result.replace("```json", "").replace("```", "").strip()
        entities = json.loads(result)
    except Exception as e:
        print(f"LLM extraction failed: {e}")
        entities = {
            "patient_info": {},
            "test_results": {},
            "abnormal_values": [],
            "probable_diseases": [],
            "conditions": [],
            "severity_notes": []
        }
    with open("extracted_results/medical_entities.json", "w", encoding="utf-8") as f:
        json.dump(entities, f, indent=2)
    return entities

# 3. Extract conditions from abnormalities or diseases
def extract_conditions(abnormal_values: List[Dict], probable_diseases: List[str], extracted_conditions: List[str]) -> List[str]:
    conditions = [d for d in probable_diseases if isinstance(d, str)] + [c for c in extracted_conditions if isinstance(c, str)]
    for ab in abnormal_values:
        if isinstance(ab, dict) and 'condition' in ab:
            conditions.append(ab['condition'])
    if not conditions:
        print("No conditions found. Using defaults.")
        conditions = ["diabetes", "vitamin B12 deficiency", "vitamin D deficiency", "allergic conditions"]
    return list(set(conditions))

# 4. Filter dataset and create LanceDB vector DB
def create_knowledge_base(dataset_path: str, conditions: List[str]):
    if not os.path.exists(dataset_path):
        print("Dataset missing.")
        return None, "", ""
    df = pd.read_csv(dataset_path, low_memory=False)
    condition_keywords = [c.lower() for c in conditions]
    drug_keywords = ["metformin", "cyanocobalamin", "cholecalciferol", "cetirizine"]
    filtered = [
        row for _, row in df.iterrows()
        if any(k in str(row).lower() for k in condition_keywords + drug_keywords)
    ]
    if not filtered:
        filtered = [
            {"Medicine": "Metformin", "Indications": "Diabetes", "SideEffects": "GI upset", "Substitutes": "Sitagliptin", "Price": "Low", "Dosage": "500mg twice daily"},
            {"Medicine": "Cyanocobalamin", "Indications": "B12 deficiency", "SideEffects": "Injection site pain", "Substitutes": "Hydroxocobalamin", "Price": "Moderate", "Dosage": "1000 mcg weekly IM"},
            {"Medicine": "Cholecalciferol", "Indications": "Vitamin D deficiency", "SideEffects": "None", "Substitutes": "Ergocalciferol", "Price": "Low", "Dosage": "60,000 IU weekly"},
            {"Medicine": "Cetirizine", "Indications": "Allergy", "SideEffects": "Drowsiness", "Substitutes": "Loratadine", "Price": "Low", "Dosage": "10mg once daily"},
        ]
    tmp_dir = tempfile.mkdtemp()
    db = lancedb.connect(tmp_dir)
    model = SentenceTransformer('all-MiniLM-L6-v2')
    records = []
    for i, row in enumerate(filtered):
        content = f"Medicine: {row.get('Medicine')}\nIndications: {row.get('Indications')}\nSide Effects: {row.get('SideEffects')}\nSubstitutes: {row.get('Substitutes')}\nPrice: {row.get('Price')}\nDosage: {row.get('Dosage', 'Not specified')}"
        records.append({
            "id": f"med_{i}",
            "content": content,
            "vector": model.encode(content).tolist()
        })
    table = db.create_table("medical_knowledge", data=records)
    return table, ", ".join(conditions), tmp_dir

# 5. Query LanceDB for similar medicines
def query_lancedb(table, condition_str: str, k=5):
    model = SentenceTransformer('all-MiniLM-L6-v2')
    query_vector = model.encode(condition_str)
    results = table.search(query_vector).limit(k).to_pandas()
    return "\n\n".join(results['content'].tolist())

# 6. Generate recommendations from abnormalities + meds
def generate_recommendations(entities, lancedb_table, condition_str, model_name="mistral:latest") -> Dict:
    if lancedb_table is None:
        return {"error": "No knowledge base."}
    abnormals = entities.get("abnormal_values", [])
    abnormal_str = "\n".join([
        f"{ab.get('test_name')}: {ab.get('value')} {ab.get('unit')} (Reference: {ab.get('reference_range')}, {ab.get('severity')})"
        for ab in abnormals if isinstance(ab, dict)
    ])
    context = query_lancedb(lancedb_table, condition_str)
    prompt = f"""
    Return only a JSON object with the following keys:
    - diagnoses
    - recommendations
    - side_effects
    - alternatives
    - lifestyle_recommendations

    Ensure all recommended medications include correct dosages. If diabetes is diagnosed, specify if it's confirmed or borderline.

    Abnormal Values:
    {abnormal_str}

    Likely Conditions:
    {condition_str}

    Available Medicines:
    {context}
    """
    response = requests.post("http://localhost:11434/api/generate", json={
        "model": model_name,
        "prompt": prompt.strip(),
        "format": "json",
        "stream": False
    })
    try:
        result = response.json().get("response", "")
        recommendations = json.loads(result)
    except Exception as e:
        recommendations = {"error": str(e), "raw_output": response.text}
    with open("extracted_results/recommendations.json", "w", encoding="utf-8") as f:
        json.dump(recommendations, f, indent=2)
    return recommendations

# 7. Cleanup LanceDB temp folder
def cleanup(temp_dir):
    import shutil
    if temp_dir and os.path.exists(temp_dir):
        shutil.rmtree(temp_dir)

# 8. Pipeline trigger
def run_pipeline(pdf_path: str, dataset_path: str = "Datasets/SeS_dataset.csv") -> Dict:
    temp_dir = ""
    try:
        print(f"Processing PDF: {pdf_path}")
        text = extract_text_from_pdf(pdf_path)
        if not text:
            return {"error": "No text extracted."}
        entities = extract_medical_entities(text)
        conditions = extract_conditions(
            entities.get("abnormal_values", []),
            entities.get("probable_diseases", []),
            entities.get("conditions", [])
        )
        table, condition_str, temp_dir = create_knowledge_base(dataset_path, conditions)
        recommendations = generate_recommendations(entities, table, condition_str)
        return recommendations
    finally:
        cleanup(temp_dir)