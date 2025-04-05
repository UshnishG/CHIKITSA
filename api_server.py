from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import json
from Extract import run_pipeline  # <- updated function, not main()

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)


@app.route('/api/process', methods=['POST'])
def process_pdf():
    file = request.files.get('pdf')
    if not file:
        return jsonify({"error": "No PDF uploaded"}), 400

    # Save uploaded file with its original name (or use a secure version)
    filepath = os.path.join(UPLOAD_FOLDER, file.filename)
    file.save(filepath)
    print(f"📁 PDF uploaded and saved to: {filepath}")

    # Run the pipeline using the uploaded PDF
    try:
        run_pipeline(filepath)  # This creates the extracted_results files
        return jsonify({"status": "Processing complete."})
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/api/recommendations', methods=['GET'])
def get_recommendations():
    try:
        with open("extracted_results/recommendations.json", "r", encoding="utf-8") as f:
            content = f.read()

        try:
            json_data = json.loads(content)
            return jsonify(json_data)
        except json.JSONDecodeError:
            return jsonify({"raw_output": content})

    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == '__main__':
    app.run(port=5000)
