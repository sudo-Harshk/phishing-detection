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
{ "status": "ok" }
```

---

### Predict — Email or URL

```
POST /api/predict
Content-Type: application/json
```

The endpoint auto-detects the input type:
- Text starting with `http://` or `https://` → URL analysis via VirusTotal
- All other text → Email analysis via DistilBERT

**Request Body:**
```json
{ "text": "string" }
```

---

## Email Analysis

**Request:**
```json
{ "text": "Dear user, your account has been compromised. Click here to verify..." }
```

**Response (200):**
```json
{
  "label": "Phishing",
  "risk_level": "High",
  "phishing_probability": 0.9341,
  "latency_ms": 182.4,
  "model": "DistilBERT (phishing-email)"
}
```

---

## URL Analysis

**Request:**
```json
{ "text": "https://dpd.deliveryhubdesk.cfd/com" }
```

**Response (200):**
```json
{
  "label": "Phishing",
  "risk_level": "High",
  "phishing_probability": 0.7421,
  "latency_ms": 1950.2,
  "model": "VirusTotal v3",
  "domain_info": {
    "registrar": "Aceville Pte. Ltd.",
    "country": null,
    "created": "2026-04-04",
    "categories": ["phishing", "Phishing and Other Frauds"],
    "reputation": 0,
    "engines_malicious": 17,
    "engines_suspicious": 1,
    "engines_harmless": 68,
    "engines_total": 94
  }
}
```

`domain_info` is `null` if the domain has no record in the threat database.

---

## Response Schema

### Common fields

| Field | Type | Description |
|-------|------|-------------|
| `label` | string | `Clean`, `Suspicious`, or `Phishing` |
| `risk_level` | string | `Low`, `Moderate`, or `High` |
| `phishing_probability` | float | Confidence score, 0.0–1.0 (4 decimal places) |
| `latency_ms` | float | End-to-end processing time in milliseconds |
| `model` | string | `DistilBERT (phishing-email)` or `VirusTotal v3` |

### `domain_info` (URL responses only)

| Field | Type | Description |
|-------|------|-------------|
| `registrar` | string \| null | Domain registrar name |
| `country` | string \| null | Registrant country code |
| `created` | string \| null | Registration date (`YYYY-MM-DD`) |
| `categories` | string[] | Community classification labels |
| `reputation` | int \| null | Community reputation score (negative = flagged) |
| `engines_malicious` | int | Engines that flagged as malicious |
| `engines_suspicious` | int | Engines that flagged as suspicious |
| `engines_harmless` | int | Engines that cleared the domain |
| `engines_total` | int | Total engines that scanned the domain |

### Risk thresholds

| `phishing_probability` | `label` | `risk_level` |
|------------------------|---------|--------------|
| ≥ 0.85 | Phishing | High |
| ≥ 0.60 | Suspicious | Moderate |
| < 0.60 | Clean | Low |

For URL analysis the probability is derived from malicious engine proportion:
- 0 malicious detections → scaled by suspicious ratio (max 0.59)
- ≥ 1 malicious detection → 0.60 + malicious_ratio × 0.40

---

## Error Responses

| Status | Detail | Cause |
|--------|--------|-------|
| 400 | `Empty input` | Blank or whitespace-only text |
| 500 | `Internal error during inference` | Model or API failure |

---

## Example Requests

### cURL — email

```bash
curl -X POST http://localhost:8000/api/predict \
  -H "Content-Type: application/json" \
  -d '{"text": "Urgent: verify your PayPal account immediately"}'
```

### cURL — URL

```bash
curl -X POST http://localhost:8000/api/predict \
  -H "Content-Type: application/json" \
  -d '{"text": "https://suspicious-site.xyz/login"}'
```

### JavaScript (fetch)

```javascript
const res = await fetch("http://localhost:8000/api/predict", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ text: "https://example.com" }),
});
const data = await res.json();
console.log(data.label, data.domain_info);
```

### Python (requests)

```python
import requests

res = requests.post(
    "http://localhost:8000/api/predict",
    json={"text": "https://example.com"},
)
print(res.json())
```

---

## Notes

- CORS is open (`*`) — suitable for development and demo use
- VirusTotal URL scans fetch cached results first; new URLs are submitted and polled (up to 3× with 2s delay)
- Domain info and URL report are fetched concurrently to minimise latency
