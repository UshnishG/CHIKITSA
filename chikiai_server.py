from flask import Flask, request, jsonify
from chiki import MedicalReportChatbot
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)
chatbot = MedicalReportChatbot(model_name="llama3")  # or "mistral"

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files['file']
    filepath = os.path.join("uploads", file.filename)
    os.makedirs("uploads", exist_ok=True)
    file.save(filepath)

    if chatbot.load_report(filepath):
        return jsonify({"message": "File uploaded and report loaded successfully"}), 200
    else:
        return jsonify({"error": "Failed to process report"}), 500

@app.route('/ask', methods=['POST'])
def ask_question():
    data = request.get_json()
    if 'question' not in data:
        return jsonify({"error": "Missing 'question' field"}), 400

    question = data['question']
    response = chatbot.process_query(question)
    return jsonify({"response": response})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5050, debug=True)

