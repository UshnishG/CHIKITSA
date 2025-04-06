# CHIKITSA

**Customized Healthcare Intelligence for Knowledge-driven Intervention and Therapy through Smart Algorithms**

![CHIKITSA Banner](https://i.ibb.co/0h9S4K3/chikitsa-banner.png)

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Overview

CHIKITSA is an AI-powered healthcare assistant designed to deliver real-time, intelligent medical support for personalized care. It simplifies early intervention by recommending accurate medication dosages, interpreting patient reports, and allowing users to compare medicine prices through an integrated e-commerce system. Whether you're a caretaker, patient, or clinician — CHIKITSA empowers healthcare decisions through smart automation and intuitive design.

## Features

- 💊 **Dosage Assistant** — Personalized dosage recommendations for early-stage treatment.
- 📑 **Report Reader AI** — Upload your PDF test reports and get interpreted summaries instantly.
- 🛍️ **Medicine Price Comparison** — Instantly compare prices from different e-commerce providers.
- 🔍 **Real-time Analysis** — Adaptive learning based on patient feedback and medical data.
- 🔐 **Data Privacy** — HIPAA-compliant data protection with encrypted communication.

## Project Structure

```plaintext
CHIKITSA/
│
├── client/              # Frontend interface built with Next.js
│   └── pages/           # React-based pages for user interaction
│
├── server/              # Backend logic and Flask API server
│   └── app.py           # Main API routes and model handling
│
├── reports/             # Sample patient medical reports for testing
│   └── example.pdf      # Example PDF files to demo AI interpretation
│
├── extractor/           # OCR and document analysis engine
│   └── reader.py        # Uses PyTesseract to parse report contents
│
├── ecommerce/           # Price scraping and comparison logic
│   └── compare.py       # Pulls price data from multiple sources
│
└── README.md            # Full project documentation (you're here!)

