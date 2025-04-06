import os
import sys
import fitz  # PyMuPDF
import docx2txt
import re
import time
import json
import easyocr
from langchain_community.llms import Ollama
import readline  # For better terminal input handling

# Initialize EasyOCR reader globally
reader = easyocr.Reader(['en'])

# Text extraction functions for different file types
def extract_text_from_pdf(file_path):
    """Extract text from PDF files"""
    text = ""
    try:
        doc = fitz.open(file_path)
        for page_num in range(len(doc)):
            page = doc.load_page(page_num)
            text += page.get_text()
        doc.close()
    except Exception as e:
        print(f"Error extracting text from PDF: {str(e)}")
    return text

def extract_text_from_image(file_path):
    """Extract text from image files using EasyOCR"""
    try:
        result = reader.readtext(file_path, detail=0)
        text = "\n".join(result)
        return text
    except Exception as e:
        print(f"Error extracting text from image: {str(e)}")
        return ""

def extract_text_from_docx(file_path):
    """Extract text from Word documents"""
    try:
        text = docx2txt.process(file_path)
        return text
    except Exception as e:
        print(f"Error extracting text from Word document: {str(e)}")
        return ""

def extract_text_from_file(file_path):
    """Extract text based on file extension"""
    if not os.path.exists(file_path):
        return f"Error: File {file_path} not found."
    
    file_extension = os.path.splitext(file_path)[1].lower()
    
    if file_extension == '.pdf':
        return extract_text_from_pdf(file_path)
    elif file_extension in ['.jpg', '.jpeg', '.png', '.bmp', '.tiff', '.tif']:
        return extract_text_from_image(file_path)
    elif file_extension in ['.docx', '.doc']:
        return extract_text_from_docx(file_path)
    elif file_extension in ['.txt', '.csv']:
        with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
            return f.read()
    elif file_extension == '.json':
        with open(file_path, 'r', encoding='utf-8') as f:
            return json.load(f)
    else:
        return f"Unsupported file format: {file_extension}"

def extract_test_types(text):
    """Extract the types of tests performed from the report text"""
    test_types = []
    test_patterns = [
        r"X-RAY\s+CHEST\s+PA",
        r"ULTRASOUND\s+SCREENING\s+WHOLE\s+ABDOMEN",
        r"ECG",
        r"2D-ECHO\s+WITH\s+COLOUR\s+DOPPLER"
    ]
    for pattern in test_patterns:
        if re.search(pattern, text, re.IGNORECASE):
            match = re.search(pattern, text, re.IGNORECASE).group(0)
            test_types.append(match)
    return test_types

class MedicalReportChatbot:
    def __init__(self, model_name=None):
        print("\nInitializing Chikitsa AI Medical Report Assistant...")
        if model_name is None:
            try:
                import subprocess
                result = subprocess.run(['ollama', 'list'], capture_output=True, text=True)
                available_models = result.stdout.strip()
                print("Available Ollama models:")
                print(available_models)
                if "mistral" in available_models.lower():
                    model_name = "mistral"
                else:
                    model_name = "llama2"
                model_choice = input(f"Press Enter to use {model_name} or type another model name: ")
                if model_choice.strip():
                    model_name = model_choice
            except Exception as e:
                print(f"Could not list available models: {str(e)}")
                model_name = "llama2"
        self.model_name = model_name
        try:
            self.llm = Ollama(model=model_name)
            print(f"Successfully connected to Ollama with model: {model_name}")
        except Exception as e:
            print(f"Error initializing Ollama with model {model_name}: {str(e)}")
            print("Make sure Ollama is running and the model is available.")
            print(f"You can install it with: ollama pull {model_name}")
            sys.exit(1)

        self.report_text = ""
        self.file_path = ""
        self.test_types = []
        self.recommendations = None
        try:
            if os.path.exists("recommendations.json"):
                with open("recommendations.json", 'r', encoding='utf-8') as f:
                    self.recommendations = json.load(f)
                print("Loaded recommendations data successfully.")
        except Exception as e:
            print(f"Note: Could not load recommendations data: {str(e)}")

    def load_report(self, file_path):
        print(f"Loading medical report from {file_path}...")
        self.file_path = file_path
        start_time = time.time()

        if file_path.endswith('.json'):
            with open(file_path, 'r', encoding='utf-8') as f:
                self.recommendations = json.load(f)
            self.report_text = "Recommendations data loaded from JSON file."
            return True
        else:
            self.report_text = extract_text_from_file(file_path)
            if not self.report_text or len(self.report_text.strip()) < 10:
                print("Warning: Extracted text is empty or very short.")
                return False

            self.test_types = extract_test_types(self.report_text)
            print(f"Detected tests in report: {', '.join(self.test_types)}")
            print(f"Successfully extracted {len(self.report_text)} characters in {time.time() - start_time:.2f} seconds")
            with open("extracted_report.txt", "w", encoding="utf-8") as f:
                f.write(self.report_text)
            print("Report loaded successfully.")
            return True

    def process_query(self, query):
        if not self.report_text:
            return "No medical report loaded. Please load a report first."

        if re.search(r"why.*test|purpose.*test|significance|pathogen|what is|what does|meaning|understand|define", query.lower()):
            return self.explain_medical_term(query)
        elif "summary" in query.lower():
            return self.summarize_report()
        else:
            return self.answer_general_query(query)

    def explain_medical_term(self, query):
        recommendations_context = json.dumps(self.recommendations, indent=2) if self.recommendations else ""
        tests_context = "Tests present in this report:\n" + "\n".join(f"- {test}" for test in self.test_types)
        prompt = f"""
A patient is asking a question about their medical report. The report contains ONLY the following tests:

{tests_context}

Medical Report Content:
{self.report_text[:5000]}

Additional Recommendations Data (if available):
{recommendations_context[:2000]}

Patient Question: {query}

Please explain in simple, patient-friendly language.
"""
        try:
            return self.llm(prompt)
        except Exception as e:
            return f"Error: {str(e)}"

    def summarize_report(self):
        recommendations_context = json.dumps(self.recommendations, indent=2) if self.recommendations else ""
        tests_context = "Tests present in this report:\n" + "\n".join(f"- {test}" for test in self.test_types)
        prompt = f"""
Summarize the following medical report:

{tests_context}

Medical Report Content:
{self.report_text[:7000]}

Recommendations:
{recommendations_context[:2000]}
"""
        try:
            return self.llm(prompt)
        except Exception as e:
            return f"Error: {str(e)}"

    def answer_general_query(self, query):
        recommendations_context = json.dumps(self.recommendations, indent=2) if self.recommendations else ""
        tests_context = "Tests present in this report:\n" + "\n".join(f"- {test}" for test in self.test_types)
        prompt = f"""
The patient has asked:

{query}

Tests:
{tests_context}

Medical Report Content:
{self.report_text[:5000]}

Recommendations:
{recommendations_context[:2000]}
"""
        try:
            return self.llm(prompt)
        except Exception as e:
            return f"Error: {str(e)}"

def main():
    print("""
╔════════════════════════════════════════════════╗
║ Welcome to Chikitsa AI                         ║
║ Your Medical Report Assistant                  ║
╚════════════════════════════════════════════════╝
Type 'exit' at any time to quit the application.
""")
    chatbot = MedicalReportChatbot()
    if os.path.exists("recommendations.json"):
        with open("recommendations.json", 'r', encoding='utf-8') as f:
            chatbot.recommendations = json.load(f)

    pdf_loaded = False
    for candidate in ["LabTest_12Jul2024.pdf", "document_2.pdf", "Sample_blood_testreport.pdf"]:
        if os.path.exists(candidate):
            if chatbot.load_report(candidate):
                pdf_loaded = True
                break

    if not pdf_loaded:
        report_path = input("Enter the path to your medical report: ")
        if report_path.lower() == 'exit':
            print("Exiting Chikitsa AI. Goodbye!")
            sys.exit(0)
        chatbot.load_report(report_path)

    print("\nYou can ask questions like:")
    print("- Why was an ultrasound test done?")
    print("- What is the significance of fatty liver?")
    print("- Explain what EF means in my echocardiogram")
    print("- What do my test results indicate?")

    while True:
        user_input = input("\nAsk about your medical report (or type 'exit' to quit): ")
        if user_input.lower() == 'exit':
            print("Exiting Chikitsa AI. Goodbye!")
            break
        print("\nProcessing your question...")
        response = chatbot.process_query(user_input)
        print("\n" + "=" * 80)
        print(response)
        print("=" * 80)

if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        print("\nExiting Chikitsa AI. Goodbye!")
        sys.exit(0)
