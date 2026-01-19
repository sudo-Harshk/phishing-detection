# API Reference

## Base URL

```
http://localhost:8000
```

---

## Endpoints

### Health Check

```
GET /health
```

**Response:**
```json
{
  "status": "ok"
}
```

---

### Predict Phishing

```
POST /api/predict
```

**Request Body:**
```json
{
  "text": "string (email content)"
}
```

**Success Response (200):**
```json
{
  "label": "Clean | Suspicious | Phishing",
  "risk_level": "Low | Moderate | High",
  "phishing_probability": 0.0 - 1.0,
  "latency_ms": number,
  "model": "DistilBERT (phishing-email)"
}
```

**Error Response (400):**
```json
{
  "detail": "Empty input"
}
```

**Error Response (500):**
```json
{
  "detail": "Internal error during inference"
}
```

---

## Example Requests

### cURL

```bash
curl -X POST http://localhost:8000/api/predict \
  -H "Content-Type: application/json" \
  -d '{"text": "Hello, please verify your account by clicking this link: http://suspicious-link.com"}'
```

### JavaScript (fetch)

```javascript
const response = await fetch("http://localhost:8000/api/predict", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    text: "Your email content here"
  })
});

const result = await response.json();
console.log(result);
```

### Python (requests)

```python
import requests

response = requests.post(
    "http://localhost:8000/api/predict",
    json={"text": "Your email content here"}
)

print(response.json())
```

---

## Response Schema

| Field | Type | Description |
|-------|------|-------------|
| `label` | string | Classification: `Clean`, `Suspicious`, or `Phishing` |
| `risk_level` | string | Risk category: `Low`, `Moderate`, or `High` |
| `phishing_probability` | float | Confidence score (0.0 to 1.0) |
| `latency_ms` | float | Inference time in milliseconds |
| `model` | string | Model identifier |

---

## Rate Limits

None (demo application)

## CORS

Allowed origins:
- `http://localhost:5173`
- `http://127.0.0.1:5173`
