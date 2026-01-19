import time
import torch
from transformers import AutoTokenizer, AutoModelForSequenceClassification

MODEL_NAME = "cybersectony/phishing-email-detection-distilbert_v2.1"

tokenizer = AutoTokenizer.from_pretrained(MODEL_NAME)
model = AutoModelForSequenceClassification.from_pretrained(MODEL_NAME)
model.eval()


def predict_email_distilbert(text: str) -> dict:
    if not text or not text.strip():
        raise ValueError("Empty input")

    inputs = tokenizer(
        text,
        truncation=True,
        padding=True,
        max_length=512,
        return_tensors="pt"
    )

    start = time.time()
    with torch.no_grad():
        outputs = model(**inputs)
        probs = torch.softmax(outputs.logits, dim=1)[0]
    latency_ms = (time.time() - start) * 1000

    phishing_prob = float(probs[1])

    # Decision thresholds (demo-safe)
    if phishing_prob >= 0.85:
        label = "Phishing"
        risk = "High"
    elif phishing_prob >= 0.60:
        label = "Suspicious"
        risk = "Moderate"
    else:
        label = "Clean"
        risk = "Low"

    return {
        "label": label,
        "risk_level": risk,
        "phishing_probability": round(phishing_prob, 4),
        "latency_ms": round(latency_ms, 2),
        "model": "DistilBERT (phishing-email)"
    }
