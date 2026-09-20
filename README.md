# 🌊 Oil Spill Detection System — Spot. Alert. Act.
![Home Page 1](<Screenshot 2025-06-05 014811.png>)

![Home Page 2](<Screenshot 2025-06-05 014817.png>)

> Real-time oil spill detection from satellite images using image processing + ML for a cleaner planet 🌍  
> 🚨 One pixel at a time, we're fighting the mess before it spreads.

---

## 🔍 Overview

Oil spills are one of the most destructive marine disasters — harming ecosystems, threatening wildlife, and costing millions.  
Traditional detection methods are often **delayed, expensive, or inefficient**.

**Our Solution?**  
A real-time web platform that detects oil spills from satellite imagery using RGB-based analysis and Machine Learning. The system immediately **alerts authorities**, visualizes affected areas, and integrates environmental forecasting for next-level decision-making.

![Dashboard](<Screenshot 2025-06-05 014827.png>)
![Vessels Page](<Screenshot 2025-06-05 014835.png>)

---

## 🌐 Live Demo

🎯 Check it out here → [Oil Spill Detection Platform](https://kzmo9ire5sbeaberct9w.lite.vusercontent.net/)  
*(P.S. Works best on desktop)*

---

## 💡 Features

- 🛰️ **Satellite Image Analysis**  
  Analyze 16×16 satellite images for oil-like anomalies using RGB difference thresholds.

- 🤖 **ML-Based Anomaly Detection**  
  Improve accuracy using machine learning models trained on image data.

- 📡 **Real-Time Alerts**  
  Instant alerts sent out if a spill is detected — no delays.

- 📊 **Interactive Dashboard**  
  See affected zones, logs, and stats in a sleek interface.

- 🌦️ **Weather & Impact Prediction**  
  Combines weather APIs to assess spread potential.

- 📚 **Historical Data Comparison**  
  Track recurring regions and compare historical spill patterns.
  
![Spill Incidents](<Screenshot 2025-06-05 014842.png>)
![Alerts Page](<Screenshot 2025-06-05 014855.png>)

---

## ⚙️ Tech Stack

| Layer     | Tools                                |
|-----------|----------------------------------|
| Frontend  | React.js, Tailwind CSS           |
| Backend   | Node.js, Express.js              |
| ML/Detection | Python, OpenCV, scikit-learn  |
| Hosting   | Firebase (demo), AWS/GCP ready   |
| APIs      | OpenWeatherMap, Custom REST APIs |

---

## 🧠 How It Works!
![Final Section](<Screenshot 2025-06-05 015420.png>)

**Detection Logic**
Compares image’s pixel data using RGB difference threshold.

Threshold: ΔRGB > 1 ➝ potential anomaly.

ML model trained on small annotated image samples fine-tunes the accuracy.

## 🚀 Installation & Setup

### Backend
```bash
cd backend
npm install
npm start
