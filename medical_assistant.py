import os
import re
import queue
import base64
import tempfile
import threading
import requests
from flask import Flask, request, jsonify
from flask_cors import CORS
from gtts import gTTS  # Optional if you want TTS audio stream later

# -------------------- CONFIG --------------------
MISTRAL_API_KEY = "qCrx2JAOa9tDelNuVPhSusV5Fogl1NEL"
MISTRAL_MEDICAL_MODEL = "mistral-large-latest"
MISTRAL_ENDPOINT = "https://api.mistral.ai/v1/chat/completions"

# -------------------- APP INIT --------------------
app = Flask(__name__)
CORS(app)  # Enable cross-origin for frontend access

# -------------------- MEDICAL LLM --------------------
def get_medical_response(user_input, language="en"):
    system_prompt = (
        """You are a helpful medical assistant speaking on a phone call. Your responses should be:
1. Direct, crisp, and straight to the point
2. Conversational and natural like a human on a phone call
3. Brief and concise (2-3 sentences when possible)
4. Based on established medical knowledge

Use simple language. Give specific medicine and dosage if possible. Suggest visiting a doctor only if it's urgent.
If it's not a health-related query, respond: "I'm here to help with health concerns. What medical issue can I assist with?"
"""
    )

    headers = {
        "Authorization": f"Bearer {MISTRAL_API_KEY}",
        "Content-Type": "application/json"
    }

    data = {
        "model": MISTRAL_MEDICAL_MODEL,
        "messages": [
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_input}
        ],
        "max_tokens": 500,
        "temperature": 0.7
    }

    try:
        response = requests.post(MISTRAL_ENDPOINT, json=data, headers=headers, timeout=30)
        response.raise_for_status()
        result = response.json()
        return result["choices"][0]["message"]["content"]
    except requests.exceptions.RequestException as e:
        return f"Error: Unable to fetch response. {str(e)}"

# -------------------- API ENDPOINT --------------------
@app.route("/api/message", methods=["POST"])
def message_api():
    user_input = request.json.get("message", "")
    if not user_input.strip():
        return jsonify({"error": "Empty message"}), 400
    try:
        reply = get_medical_response(user_input)
        return jsonify({"reply": reply})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# -------------------- ROOT CHECK --------------------
@app.route("/", methods=["GET"])
def root():
    return jsonify({"message": "Medical Assistant API is running."})

# -------------------- MAIN --------------------
if __name__ == "__main__":
    print("✅ Medical Assistant API running at http://localhost:5005")
    app.run(host="0.0.0.0", port=5005, debug=True)
