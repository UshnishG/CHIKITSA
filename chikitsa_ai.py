import os
import sys
import fitz # PyMuPDF
import pytesseract
from PIL import Image
import docx2txt
import re
import time
import json
from langchain_community.llms import Ollama
import readline # For better terminal input handling

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
    """Extract text from image files using OCR"""
    try:
        img = Image.open(file_path)
        text = pytesseract.image_to_string(img)
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
    # Common test patterns to look for
    test_patterns = [
        r"X-RAY\s+CHEST\s+PA",
        r"ULTRASOUND\s+SCREENING\s+WHOLE\s+ABDOMEN",
        r"ECG",
        r"2D-ECHO\s+WITH\s+COLOUR\s+DOPPLER"
    ]
    
    for pattern in test_patterns:
        if re.search(pattern, text, re.IGNORECASE):
            # Clean up and format the test name
            match = re.search(pattern, text, re.IGNORECASE).group(0)
            test_types.append(match)
    
    return test_types

class MedicalReportChatbot:
    def __init__(self, model_name=None):
        """Initialize the medical report chatbot with the specified model"""
        print("\nInitializing Chikitsa AI Medical Report Assistant...")
        
        # List available models if none specified
        if model_name is None:
            try:
                import subprocess
                result = subprocess.run(['ollama', 'list'], capture_output=True, text=True)
                available_models = result.stdout.strip()
                print("Available Ollama models:")
                print(available_models)
                
                # Default to mistral if available, otherwise llama2
                if "mistral" in available_models.lower():
                    model_name = "mistral"
                else:
                    model_name = "llama2"
                
                print(f"\nAutomatically selected model: {model_name}")
                model_choice = input(f"Press Enter to use {model_name} or type another model name: ")
                if model_choice.strip():
                    model_name = model_choice
            except Exception as e:
                print(f"Could not list available models: {str(e)}")
                model_name = "llama2" # Default fallback
        
        self.model_name = model_name
        
        try:
            self.llm = Ollama(model=model_name)
            print(f"Successfully connected to Ollama with model: {model_name}")
        except Exception as e:
            print(f"Error initializing Ollama with model {model_name}: {str(e)}")
            print(f"Make sure Ollama is running and the model is available.")
            print(f"You can install it with: ollama pull {model_name}")
            sys.exit(1)
        
        # Initialize report content
        self.report_text = ""
        self.file_path = ""
        self.test_types = []
        
        # Initialize recommendations if available
        self.recommendations = None
        try:
            if os.path.exists("recommendations.json"):
                with open("recommendations.json", 'r', encoding='utf-8') as f:
                    self.recommendations = json.load(f)
                print("Loaded recommendations data successfully.")
        except Exception as e:
            print(f"Note: Could not load recommendations data: {str(e)}")

    def load_report(self, file_path):
        """Load and extract text from a medical report file"""
        print(f"Loading medical report from {file_path}...")
        self.file_path = file_path
        start_time = time.time()
        
        if file_path.endswith('.json'):
            with open(file_path, 'r', encoding='utf-8') as f:
                self.recommendations = json.load(f)
                print("Loaded JSON recommendations data.")
            # Create a dummy report text for JSON files
            self.report_text = "Recommendations data loaded from JSON file."
            return True
        else:
            self.report_text = extract_text_from_file(file_path)
            if not self.report_text or len(self.report_text.strip()) < 10:
                print("Warning: Extracted text is empty or very short. The file might be corrupted or unreadable.")
                return False
            
            # Extract test types from the report
            self.test_types = extract_test_types(self.report_text)
            print(f"Detected tests in report: {', '.join(self.test_types)}")
            print(f"Successfully extracted {len(self.report_text)} characters in {time.time() - start_time:.2f} seconds")
            
            # Save extracted text for reference
            with open("extracted_report.txt", "w", encoding="utf-8") as f:
                f.write(self.report_text)
            
            print("Report loaded successfully. You can now ask questions about it.")
            return True

    def process_query(self, query):
        """Process a user query about the medical report"""
        if not self.report_text:
            return "No medical report loaded. Please load a report first."
        
        # Process based on query type
        if re.search(r"why.*test|purpose.*test|significance|pathogen|what is|what does|meaning|understand|define", query.lower()):
            return self.explain_medical_term(query)
        elif "summary" in query.lower():
            return self.summarize_report()
        else:
            return self.answer_general_query(query)

    def explain_medical_term(self, query):
        """Explain a medical term, test purpose, or pathogen significance from the report"""
        # Include recommendations data if available
        recommendations_context = ""
        if self.recommendations:
            recommendations_context = json.dumps(self.recommendations, indent=2)
        
        # List of detected tests to avoid hallucination
        tests_context = "Tests present in this report:\n" + "\n".join(f"- {test}" for test in self.test_types)
        
        prompt = f"""
        A patient is asking a question about their medical report. The report contains ONLY the following tests:
        
        {tests_context}
        
        IMPORTANT: Do NOT mention or discuss any tests that are not in the above list. If the patient asks about a test not present in the report, politely inform them that test is not present in their current report.
        
        Medical Report Content:
        
        {self.report_text[:5000]}
        
        Additional Recommendations Data (if available):
        
        {recommendations_context[:2000]}
        
        Patient Question: {query}
        
        Please explain in simple, patient-friendly language. If the patient is asking about:
        
        1. Why a specific test was done - explain the clinical purpose of the test
        2. The significance of a finding - explain what it means for their health
        3. The meaning of a medical term - explain it in simple terms
        4. The implications of a test result - explain if it's normal/abnormal and what it might mean
        
        Focus on being accurate, educational, and reassuring where appropriate. ONLY discuss tests and findings actually present in the report.
        """
        
        try:
            response = self.llm(prompt)
            return response
        except Exception as e:
            return f"Sorry, I couldn't process your question. Error: {str(e)}"

    def summarize_report(self):
        """Provide a summary of the medical report"""
        # Include recommendations data if available
        recommendations_context = ""
        if self.recommendations:
            recommendations_context = json.dumps(self.recommendations, indent=2)
        
        # List of detected tests to avoid hallucination
        tests_context = "Tests present in this report:\n" + "\n".join(f"- {test}" for test in self.test_types)
        
        prompt = f"""
        Summarize the following medical report in patient-friendly language.
        
        IMPORTANT: The report contains ONLY the following tests:
        
        {tests_context}
        
        Do NOT mention or discuss any tests that are not in the above list.
        
        Medical Report Content:
        
        {self.report_text[:7000]}
        
        Additional Recommendations Data (if available):
        
        {recommendations_context[:2000]}
        
        Focus on:
        
        1. Key findings from each test present in the report
        2. Abnormal values and what they might indicate
        3. Overall health indicators based ONLY on the tests in the report
        
        Format the summary in an easy-to-read way with sections for each test type.
        """
        
        try:
            response = self.llm(prompt)
            return response
        except Exception as e:
            return f"Sorry, I couldn't summarize the report. Error: {str(e)}"

    def answer_general_query(self, query):
        """Answer a general question about the medical report"""
        # Include recommendations data if available
        recommendations_context = ""
        if self.recommendations:
            recommendations_context = json.dumps(self.recommendations, indent=2)
        
        # List of detected tests to avoid hallucination
        tests_context = "Tests present in this report:\n" + "\n".join(f"- {test}" for test in self.test_types)
        
        prompt = f"""
        A patient has a medical report and is asking a question about it.
        
        IMPORTANT: The report contains ONLY the following tests:
        
        {tests_context}
        
        Do NOT mention or discuss any tests that are not in the above list. If the patient asks about a test not present in the report, politely inform them that test is not present in their current report.
        
        Medical Report Content:
        
        {self.report_text[:5000]}
        
        Additional Recommendations Data (if available):
        
        {recommendations_context[:2000]}
        
        Patient Question: {query}
        
        Please provide a helpful, accurate, and patient-friendly response. Be specific to the patient's actual test results when possible. ONLY discuss tests and findings actually present in the report.
        """
        
        try:
            response = self.llm(prompt)
            return response
        except Exception as e:
            return f"Sorry, I couldn't answer your question. Error: {str(e)}"

def main():
    # Print welcome message
    print("""
    ╔════════════════════════════════════════════════╗
    ║ Welcome to Chikitsa AI                         ║
    ║ Your Medical Report Assistant                  ║
    ╚════════════════════════════════════════════════╝
    
    Type 'exit' at any time to quit the application.
    """)
    
    # Initialize the chatbot with available model
    chatbot = MedicalReportChatbot()
    
    # Try to load recommendations.json if it exists
    if os.path.exists("recommendations.json"):
        with open("recommendations.json", 'r', encoding='utf-8') as f:
            chatbot.recommendations = json.load(f)
            print("Loaded recommendations data from recommendations.json")
    
    # Default report path
    pdf_loaded = False
    
    # First, try the LabTest_12Jul2024.pdf file
    if os.path.exists("LabTest_12Jul2024.pdf"):
        success = chatbot.load_report("LabTest_12Jul2024.pdf")
        if success:
            pdf_loaded = True
    
    # Next, try other possible paths
    if not pdf_loaded and os.path.exists("document_2.pdf"):
        success = chatbot.load_report("document_2.pdf")
        if success:
            pdf_loaded = True
    
    if not pdf_loaded and os.path.exists("Sample_blood_testreport.pdf"):
        success = chatbot.load_report("Sample_blood_testreport.pdf")
        if success:
            pdf_loaded = True
    
    # If still not loaded, ask for a path
    if not pdf_loaded:
        report_path = input("Enter the path to your medical report: ")
        if report_path.lower() == 'exit':
            print("Exiting Chikitsa AI. Goodbye!")
            sys.exit(0)
        chatbot.load_report(report_path)
    
    # Main conversation loop
    print("\nYou can ask questions like:")
    print("- Why was an ultrasound test done?")
    print("- What is the significance of fatty liver in my report?")
    print("- Explain what EF means in my echocardiogram")
    print("- What do my test results indicate overall?")
    
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
