import os
import fitz  # PyMuPDF
import easyocr
import docx2txt
import re
import json
from langchain_community.llms import Ollama
from langchain_community.vectorstores import FAISS
from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.chains import RetrievalQA

# -----------------------------
# Text Extraction Functions
# -----------------------------
def extract_text_from_pdf(file_path):
    text = ""
    try:
        doc = fitz.open(file_path)
        for page in doc:
            text += page.get_text()
        doc.close()
    except Exception as e:
        print(f"[PDF Error] {e}")
    return text

def extract_text_from_image(file_path):
    try:
        reader = easyocr.Reader(['en'])
        result = reader.readtext(file_path, detail=0)
        return "\n".join(result)
    except Exception as e:
        print(f"[Image OCR Error] {e}")
        return ""

def extract_text_from_docx(file_path):
    try:
        return docx2txt.process(file_path)
    except Exception as e:
        print(f"[DOCX Error] {e}")
        return ""

def extract_text_from_file(file_path):
    if not os.path.exists(file_path):
        return f"Error: File {file_path} not found."
    ext = os.path.splitext(file_path)[1].lower()
    if ext == '.pdf':
        return extract_text_from_pdf(file_path)
    elif ext in ['.jpg', '.jpeg', '.png', '.bmp', '.tiff']:
        return extract_text_from_image(file_path)
    elif ext in ['.docx', '.doc']:
        return extract_text_from_docx(file_path)
    elif ext in ['.txt', '.csv']:
        with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
            return f.read()
    elif ext == '.json':
        with open(file_path, 'r', encoding='utf-8') as f:
            return json.load(f)
    else:
        return f"Unsupported file format: {ext}"

def extract_test_types(text):
    test_types = []
    patterns = [
        r"X-RAY\s+CHEST\s+PA",
        r"ULTRASOUND\s+SCREENING\s+WHOLE\s+ABDOMEN",
        r"ECG",
        r"2D-ECHO\s+WITH\s+COLOUR\s+DOPPLER"
    ]
    for p in patterns:
        match = re.search(p, text, re.IGNORECASE)
        if match:
            test_types.append(match.group(0))
    return test_types

# -----------------------------
# Agentic RAG Chatbot Class
# -----------------------------
class MedicalReportChatbot:
    def __init__(self, model_name="mistral", index_path="vector_index"):
        self.model_name = model_name
        self.llm = Ollama(model=model_name)
        self.report_text = ""
        self.test_types = []
        self.file_path = ""
        self.recommendations = {}
        self.index_path = index_path
        self.retriever = None
        self.qa_chain = None

        # Load recommendation data if exists
        if os.path.exists("recommendations.json"):
            with open("recommendations.json", 'r', encoding='utf-8') as f:
                self.recommendations = json.load(f)

    def build_vectorstore(self, text):
        # Chunking
        splitter = RecursiveCharacterTextSplitter(chunk_size=500, chunk_overlap=50)
        docs = splitter.create_documents([text])

        # Embedding
        embeddings = HuggingFaceEmbeddings(model_name="all-MiniLM-L6-v2")
        vectorstore = FAISS.from_documents(docs, embeddings)
        vectorstore.save_local(self.index_path)
        return vectorstore

    def load_vectorstore(self):
        embeddings = HuggingFaceEmbeddings(model_name="all-MiniLM-L6-v2")
        return FAISS.load_local(
            self.index_path,
            embeddings,
            allow_dangerous_deserialization=True  # ✅ FIXED
        )

    def load_report(self, file_path):
        self.file_path = file_path

        if file_path.endswith('.json'):
            with open(file_path, 'r', encoding='utf-8') as f:
                self.recommendations = json.load(f)
            self.report_text = "Recommendations loaded."
            return True

        self.report_text = extract_text_from_file(file_path)
        if not self.report_text or len(self.report_text.strip()) < 10:
            return False

        self.test_types = extract_test_types(self.report_text)

        with open("extracted_report.txt", "w", encoding="utf-8") as f:
            f.write(self.report_text)

        # RAG: build or load vectorstore
        if os.path.exists(self.index_path + "/index.faiss"):
            vectorstore = self.load_vectorstore()
        else:
            vectorstore = self.build_vectorstore(self.report_text)

        self.retriever = vectorstore.as_retriever(search_kwargs={"k": 4})
        self.qa_chain = RetrievalQA.from_chain_type(
            llm=self.llm,
            retriever=self.retriever,
            return_source_documents=False
        )
        return True

    def process_query(self, query):
        if not self.qa_chain:
            return "❌ No report loaded."

        recommendations_context = json.dumps(self.recommendations, indent=2) if self.recommendations else ""
        tests_context = "\n".join(f"- {t}" for t in self.test_types) or "None detected"

        formatted_prompt = f"""
You are a helpful and knowledgeable AI medical assistant.

The uploaded report includes ONLY the following tests:
{tests_context}

Do not mention or infer any test that is not listed above.

If the user asks about a test not found, respond accordingly.

Additional notes (if any):
{recommendations_context[:1000]}

Patient's question: {query}

Please answer in plain English using paragraph style. Avoid *, markdown, or bullet points.
"""

        try:
            return self.qa_chain.run(formatted_prompt).strip()
        except Exception as e:
            return f"LLM Error: {str(e)}"
