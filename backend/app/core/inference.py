import time
import numpy as np
from app.core.model_loader import load_chargru_model
from app.core.preprocessing import preprocess_email


PHISHING_THRESHOLD_HIGH = 0.85
PHISHING_THRESHOLD_MED = 0.60


def predict_email(text: str) -> dict:
    model = load_chargru_model()

    # Preprocess
    x = preprocess_email(text)

    # Inference
    start = time.time()
    probs = model.predict(x, verbose=0)[0]
    latency_ms = (time.time() - start) * 1000

    phishing_prob = float(probs[1])

    # Threshold-based decision
    if phishing_prob >= PHISHING_THRESHOLD_HIGH:
        label = "Phishing"
        risk = "High"
    elif phishing_prob >= PHISHING_THRESHOLD_MED:
        label = "Suspicious"
        risk = "Moderate"
    else:
        label = "Clean"
        risk = "Low"

    return {
        "label": label,
        "risk_level": risk,
        "phishing_probability": round(phishing_prob, 4),
        "latency_ms": round(latency_ms, 2)
    }
