# Testing Guide

## Backend Tests

### Location

```
backend/tests/
```

### Available Tests

| File | Purpose |
|------|---------|
| `test_inference.py` | End-to-end DistilBERT inference |
| `test_model_load.py` | CharGRU model loading validation |
| `test_preprocessing.py` | Email text preprocessing pipeline |
| `test_threshold_inference.py` | Risk level threshold classification |

### Running Tests

```bash
cd backend
venv\Scripts\activate   # Windows
# source venv/bin/activate  # macOS / Linux

pytest tests/
pytest tests/test_inference.py        # single file
pytest tests/ -v                      # verbose
```

### Manual API Testing

```bash
# Health check
curl http://localhost:8000/health

# Email analysis
curl -X POST http://localhost:8000/api/predict \
  -H "Content-Type: application/json" \
  -d '{"text": "Congratulations! Click here to claim your prize."}'

# URL analysis
curl -X POST http://localhost:8000/api/predict \
  -H "Content-Type: application/json" \
  -d '{"text": "https://example.com"}'
```

---

## Frontend

### Type check and build

```bash
cd frontend
npm run lint
npm run build
```

### Manual UI testing checklist

**Email tab:**
1. Submit empty input → error state shown
2. Submit clean email → Low risk result, ~100–500 ms latency
3. Submit phishing-like email → High risk, probability bar in red zone
4. Clear button → resets all state

**URL tab:**
1. Submit invalid text → "Enter a valid URL" error
2. Submit clean URL (e.g. `https://google.com`) → URL intel card + Clean result
3. Submit known phishing URL → High risk, domain details populated (registrar, categories, engine bar)
4. URL without query params → Query chip hidden (not shown as "—")
5. HTTP URL → scheme badge shown in red
6. Switch tabs → all state resets

---

## Test Scenarios

### Email — input validation

| Input | Expected |
|-------|----------|
| Empty string | 400 — `Empty input` |
| Whitespace only | 400 — `Empty input` |
| Normal business email | Clean, Low |
| Urgent account verification | Phishing, High |
| Password reset scam | Phishing, High |

### URL — analysis

| Input | Expected |
|-------|----------|
| `https://google.com` | Clean, Low, domain info present |
| Known phishing URL | Phishing/Suspicious, engine bar red |
| URL with query params | Query chip visible in URL card |
| `http://` URL | Scheme badge red in URL card |
| Unknown/new domain | May return `domain_info: null` |

---

## Performance Benchmarks

| Metric | Typical |
|--------|---------|
| Email — first request (model load) | 10–20 s |
| Email — subsequent requests | 100–500 ms |
| URL — cached domain | 1–2 s |
| URL — new domain (with polling) | 4–8 s |
| Frontend initial load | < 1 s |
