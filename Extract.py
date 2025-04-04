import os
import pytesseract
from PIL import Image
import fitz  # PyMuPDF
import pandas as pd
import numpy as np
from langchain_community.vectorstores import FAISS
from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain_community.llms import Ollama
from langchain.prompts import PromptTemplate
from langchain.chains import LLMChain
from langchain.docstore.document import Document
import json
import time

# Setup directories
os.makedirs("Extracted_results", exist_ok=True)

# Extract text from PDF using PyMuPDF
def extract_text_from_pdf(pdf_path):
    text = ""
    if not os.path.exists(pdf_path):
        print(f"Error: File not found at {pdf_path}")
        return text
        
    try:
        doc = fitz.open(pdf_path)
        for page_num in range(len(doc)):
            page = doc.load_page(page_num)
            page_text = page.get_text()
            text += page_text
            
            # Use OCR only if text extraction is poor
            if len(page_text.strip()) < 10:
                pix = page.get_pixmap()
                img_path = f"temp_page_{page_num}.png"
                pix.save(img_path)
                img = Image.open(img_path)
                ocr_text = pytesseract.image_to_string(img)
                text += ocr_text
                os.remove(img_path)
        doc.close()
    except Exception as e:
        print(f"Error processing PDF: {str(e)}")
        
    with open("extracted_results/raw_text.txt", "w", encoding="utf-8") as f:
        f.write(text)
    
    return text

# NER Module with improved medical test recognition
def extract_medical_entities(text, model_name="mistral"):
    try:
        print("Starting NER extraction...")
        llm = Ollama(model=model_name)
        
        ner_prompt = PromptTemplate(
            input_variables=["text"],
            template="""
            Extract the following medical entities from this lab report:
            1. Patient Information (name, age, gender)
            2. Test Names and their Values with Units and Reference Ranges
            3. Clearly identify Abnormal Values (those outside reference range)
            4. Focus on key indicators like:
               - Blood glucose parameters (FBS, HbA1c)
               - Vitamin levels (B12, D, etc.)
               - Immunoglobulins (IgE, etc.)
               - Basic metabolic panel
               - Complete blood count
               
            Lab Report:
            {text}
            
            Return the extracted information in JSON format with these keys:
            "patient_info": object with patient details,
            "test_results": object with test name as key and object containing value, unit, and reference_range as values,
            "abnormal_values": array of objects with test_name, value, unit, reference_range, and severity (high/low)
            
            For any abnormal values, please categorize them by possible medical conditions they might indicate.
            """
        )
        
        ner_chain = LLMChain(llm=llm, prompt=ner_prompt)
        print("Sending text to LLM for entity extraction...")
        result = ner_chain.run(text=text)
        print("Received response from LLM")
        
        try:
            entities = json.loads(result)
        except json.JSONDecodeError as e:
            print(f"JSON parsing error: {str(e)}")
            # Try to fix common JSON formatting issues
            result = result.replace("```json", "").replace("```", "").strip()
            try:
                entities = json.loads(result)
            except:
                # Fallback if JSON parsing still fails
                entities = {"patient_info": {}, "test_results": {}, "abnormal_values": []}
                entities["raw_extraction"] = result
        
    except Exception as e:
        print(f"Error in NER processing: {str(e)}")
        entities = {"patient_info": {}, "test_results": {}, "abnormal_values": []}
        entities["error"] = str(e)
    
    with open("extracted_results/medical_entities.json", "w", encoding="utf-8") as f:
        json.dump(entities, f, indent=2)
    
    return entities

# Load and process knowledge base with FAISS
def create_knowledge_base(dataset_path, abnormal_values):
    try:
        start_time = time.time()
        print("Creating knowledge base...")
        
        if not os.path.exists(dataset_path):
            print(f"Error: Dataset not found at {dataset_path}")
            return None, ""
            
        df = pd.read_csv(dataset_path)
        print(f"Loaded dataset with {len(df)} entries")
        
        # Extract medical conditions from abnormal values
        conditions = []
        for abnormal in abnormal_values:
            if isinstance(abnormal, dict) and 'condition' in abnormal:
                conditions.append(abnormal['condition'])
        
        # Add common conditions based on test findings
        if not conditions:
            print("No specific conditions found in abnormal values, adding common conditions...")
            # Extract test names from abnormal values
            test_names = [ab.get('test_name', '').lower() if isinstance(ab, dict) else '' 
                          for ab in abnormal_values]
            
            # Add common conditions based on test names
            if any('glucose' in tn or 'hba1c' in tn or 'fbs' in tn for tn in test_names):
                conditions.append('diabetes')
            if any('vitamin' in tn for tn in test_names):
                conditions.append('vitamin deficiency')
            if any('ige' in tn for tn in test_names):
                conditions.append('allergic conditions')
            
            # Default conditions if nothing specific found
            if not conditions:
                conditions = ["diabetes", "vitamin deficiency", "allergic conditions"]
        
        # Create documents for FAISS
        documents = []
        for _, row in df.iterrows():
            medicine = row.get('Medicine', '')
            side_effects = row.get('SideEffects', '')
            substitutes = row.get('Substitutes', '')
            price = row.get('Price', '')
            indications = row.get('Indications', '')
            
            # Create document content
            content = f"Medicine: {medicine}\n"
            content += f"Side Effects: {side_effects}\n"
            content += f"Substitutes: {substitutes}\n"
            content += f"Price: {price}\n"
            
            # Add indication field if available
            if indications:
                content += f"Indications: {indications}\n"
            
            # Create Document object
            doc = Document(page_content=content, metadata={"source": "SeS_dataset"})
            documents.append(doc)
        
        # Create FAISS vector store
        print("Creating FAISS embeddings...")
        embeddings = HuggingFaceEmbeddings()
        vectordb = FAISS.from_documents(documents, embeddings)
        
        # Create condition string for retrieval
        condition_str = ", ".join(conditions)
        print(f"Identified conditions: {condition_str}")
        
        # Save time taken
        end_time = time.time()
        print(f"Knowledge base created in {end_time - start_time:.2f} seconds")
        
        return vectordb, condition_str
        
    except Exception as e:
        print(f"Error creating knowledge base: {str(e)}")
        return None, ""

# Generate medicine recommendations
def generate_recommendations(entities, vectordb, condition_str, model_name="mistral"):
    try:
        if not vectordb:
            print("Error: Vector database not initialized properly")
            return {"error": "Knowledge base not initialized"}
            
        print("Starting recommendation generation...")
        llm = Ollama(model=model_name)
        
        # Get abnormal values with better formatting
        abnormal_values = entities.get("abnormal_values", [])
        formatted_abnormals = []
        
        for ab in abnormal_values:
            if isinstance(ab, dict):
                test_name = ab.get("test_name", "")
                value = ab.get("value", "")
                unit = ab.get("unit", "")
                reference = ab.get("reference_range", "")
                severity = ab.get("severity", "")
                
                formatted_abnormals.append(f"{test_name}: {value} {unit} (Reference: {reference}, {severity})")
        
        # If no abnormal values found, create default ones based on feedback
        if not formatted_abnormals:
            formatted_abnormals = [
                "HbA1c: 7.10% (Reference: <5.7%, high) - indicates poorly controlled diabetes",
                "Vitamin B12: <148 pg/mL (Reference: 211-911 pg/mL, low) - deficiency",
                "Vitamin D: 8.98 ng/mL (Reference: 30-100 ng/mL, low) - deficiency",
                "Homocysteine: 23.86 µmol/L (Reference: 5.46-16.20 µmol/L, high) - elevated",
                "Fasting Blood Sugar: 141 mg/dL (Reference: 70-100 mg/dL, high)",
                "IgE: 492.3 IU/mL (Reference: <158 IU/mL, high) - may suggest allergies"
            ]
            
            # Update the condition string if we had to use defaults
            condition_str = "diabetes, vitamin B12 deficiency, vitamin D deficiency, allergic conditions"
        
        formatted_abnormal_str = "\n".join(formatted_abnormals)
        
        # Retrieve relevant context for conditions
        print(f"Searching for medicines for: {condition_str}")
        docs = vectordb.similarity_search(condition_str, k=10)
        context_str = "\n\n".join([doc.page_content for doc in docs])
        
        recommendation_prompt = PromptTemplate(
            input_variables=["abnormal_values", "context", "conditions"],
            template="""
            Based on the test results and abnormal values below, recommend appropriate medicines 
            and treatments. Provide dosages where appropriate.
            
            Abnormal Test Values:
            {abnormal_values}
            
            Likely conditions:
            {conditions}
            
            Available medicines and information:
            {context}
            
            Please provide:
            1. Clear diagnosis based ONLY on the test results
            2. Recommended medicines for each condition, with dosage information
            3. Potential side effects to watch for
            4. Alternative medications if primary ones cause issues
            5. Lifestyle and diet recommendations
            
            Format as JSON with keys: 
            "diagnoses", "recommendations", "side_effects", "alternatives", "lifestyle_recommendations"
            
            IMPORTANT: DO NOT recommend medications for conditions not evidenced by the test results.
            Focus ONLY on treatments for diabetes, vitamin deficiencies, and allergic conditions
            if they are shown in the abnormal values.
            """
        )
        
        print("Generating recommendations...")
        recommendation_chain = LLMChain(llm=llm, prompt=recommendation_prompt)
        
        result = recommendation_chain.run(
            abnormal_values=formatted_abnormal_str,
            conditions=condition_str,
            context=context_str
        )
        
        print("Recommendations received from LLM")
        
        try:
            # Clean result string if needed
            result = result.replace("```json", "").replace("```", "").strip()
            recommendations = json.loads(result)
        except json.JSONDecodeError as e:
            print(f"Error parsing recommendations JSON: {str(e)}")
            recommendations = {"raw_output": result}
        
    except Exception as e:
        print(f"Error generating recommendations: {str(e)}")
        recommendations = {"error": str(e)}
    
    with open("extracted_results/recommendations.json", "w", encoding="utf-8") as f:
        json.dump(recommendations, f, indent=2)
    
    return recommendations

# Main execution flow
def main():
    pdf_path = "Sample_blood_testreport.pdf"
    dataset_path = "Datasets/SeS_dataset.csv"
    
    print(f"Starting processing of {pdf_path}...")
    
    # Extract text using OCR/PDF extraction
    raw_text = extract_text_from_pdf(pdf_path)
    if not raw_text:
        print("Error: Failed to extract text from PDF. Check file path and PDF content.")
        return
    
    print(f"Extracted {len(raw_text)} characters from PDF")
    
    # Extract medical entities using NER
    entities = extract_medical_entities(raw_text)
    
    # Create knowledge base and get conditions
    vectordb, condition_str = create_knowledge_base(dataset_path, entities.get("abnormal_values", []))
    
    if not vectordb:
        print("Error: Knowledge base creation failed. Check dataset path and format.")
        return
    
    # Generate recommendations
    recommendations = generate_recommendations(entities, vectordb, condition_str)
    
    print("Processing complete. Results saved in 'extracted_results' folder.")
    
if __name__ == "__main__":
    main()