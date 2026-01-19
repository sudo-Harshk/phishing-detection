# Testing Guide

## Backend Tests

### Location
```
backend/tests/
```

### Available Tests

| File | Purpose |
|------|---------|
| `test_inference.py` | End-to-end inference test |
| `test_model_load.py` | Model loading validation |
| `test_preprocessing.py` | Text preprocessing tests |
| `test_threshold_inference.py` | Threshold classification tests |

### Running Tests

```bash
cd backend

# Activate virtual environment
venv\Scripts\activate  # Windows
source venv/bin/activate  # Unix

# Run all tests with pytest
pytest tests/

# Run specific test
pytest tests/test_inference.py

# Run with verbose output
pytest tests/ -v
```

### Manual API Testing

```bash
# Health check
curl http://localhost:8000/health

# Prediction test
curl -X POST http://localhost:8000/api/predict \
  -H "Content-Type: application/json" \
  -d '{"text": "Test email content"}'
```

---

## Frontend Testing

### Build Check

```bash
cd frontend

# Type check
npm run lint

# Production build
npm run build
```

### Manual UI Testing

1. Start both servers
2. Open `http://localhost:5173`
3. Test scenarios:
   - Empty input → Error handling
   - Clean email → Low risk result
   - Phishing email → High risk result
   - Clear button → Resets state

---

## Test Scenarios

### Input Validation

| Input | Expected Behavior |
|-------|-------------------|
| Empty string | 400 error: "Empty input" |
| Whitespace only | 400 error: "Empty input" |
| Valid text | 200 with prediction |
| Very long text | Truncated, processed |
| HTML content | Stripped, processed |

### Classification Accuracy

| Sample Type | Expected Label | Expected Risk |
|-------------|----------------|---------------|
| Normal business email | Clean | Low |
| Promotional content | Clean/Suspicious | Low/Moderate |
| Urgent verification request | Phishing | High |
| Password reset scam | Phishing | High |

---

## Performance Benchmarks

| Metric | Target | Typical |
|--------|--------|---------|
| First request | < 30s | 10-20s |
| Subsequent requests | < 500ms | 50-200ms |
| Frontend load | < 2s | < 1s |
