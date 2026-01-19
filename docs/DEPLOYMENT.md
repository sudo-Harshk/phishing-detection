# Deployment Guide

## Local Deployment

See [SETUP.md](./SETUP.md) for local development setup.

---

## Deploy to Another Machine

### 1. Prerequisites on Target Machine

- Python 3.10+
- Node.js 18+
- Git

### 2. Transfer Project

**Option A: Git Clone**
```bash
git clone <repository-url>
cd phishing-detection-final
```

**Option B: Copy Files**
- Copy entire project folder
- Exclude: `node_modules/`, `venv/`, `__pycache__/`

### 3. Backend Setup

```bash
cd backend

# Create virtual environment
python -m venv venv

# Activate
venv\Scripts\activate      # Windows
source venv/bin/activate   # Unix

# Install dependencies
pip install -r requirements.txt
```

### 4. Frontend Setup

```bash
cd frontend
npm install
```

### 5. Start Servers

**Terminal 1 (Backend):**
```bash
cd backend
venv\Scripts\activate
uvicorn app.main:app --host 0.0.0.0 --port 8000
```

**Terminal 2 (Frontend):**
```bash
cd frontend
npm run dev -- --host
```

### 6. Access Application

- Local: `http://localhost:5173`
- Network: `http://<machine-ip>:5173`

---

## Required Files

Ensure these model files are included:

| File | Location | Size |
|------|----------|------|
| `chargru_advtrain_model.keras` | `backend/models/` | ~10MB |
| `char_dictionary.json` | `backend/assets/` | ~2KB |

DistilBERT model auto-downloads from HuggingFace (~250MB).

---

## Production Considerations

### Backend

```bash
# Production server (not for development)
uvicorn app.main:app --host 0.0.0.0 --port 8000 --workers 1
```

### Frontend

```bash
# Build for production
npm run build

# Serve with static server
npm run preview
```

### Environment Variables (Optional)

Create `.env` in backend folder:
```env
MODEL_PATH=./models/chargru_advtrain_model.keras
DEBUG=false
```

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Model download fails | Check internet, retry |
| Port conflict | Use different ports |
| Memory error | Ensure 4GB+ RAM available |
| Module not found | Verify venv activated |
