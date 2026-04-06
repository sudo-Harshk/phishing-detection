# System Architecture

## Overview

```
┌──────────────────────────────────────────────────────────────────────┐
│                          Frontend (React 19)                         │
│                       http://localhost:5173                          │
│                                                                      │
│  SecurityAnalysisConsole                                             │
│  ├── [Email tab]  EmailContentPanel  ──────────────────────────────┐ │
│  ├── [URL tab]    UrlLinkPanel  ────────────────────────────────── │ │
│  └── AnalysisResultPanel                                           │ │
│       ├── UrlIntelCard (URL structure + domain details)            │ │
│       ├── ResultStatusIndicator                                    │ │
│       ├── PhishingProbabilityBar                                   │ │
│       └── MetadataRow                                              │ │
└───────────────────────────────┬──────────────────────────────────────┘
                                │ POST /api/predict
                                │ { "text": "email body | https://url" }
                                ▼
┌──────────────────────────────────────────────────────────────────────┐
│                        Backend (FastAPI)                             │
│                       http://localhost:8000                          │
│                                                                      │
│  app/api/predict.py                                                  │
│  └── _is_url(text)?                                                  │
│       ├── YES → app/core/virustotal.py                               │
│       │         ├── POST /api/v3/urls  (submit)                      │
│       │         ├── GET  /api/v3/urls/{id}  (URL report)  ─┐ parallel│
│       │         ├── GET  /api/v3/domains/{host}            ─┘        │
│       │         └── returns { label, risk_level, prob,               │
│       │                       latency_ms, domain_info }              │
│       └── NO  → app/core/hf_distilbert_inference.py                 │
│                 └── returns { label, risk_level, prob, latency_ms }  │
└──────────────────────────────────────────────────────────────────────┘
                                │
                   (URL analysis only)
                                │
                                ▼
                  ┌─────────────────────────┐
                  │   VirusTotal API v3      │
                  │   virustotal.com         │
                  └─────────────────────────┘
```

---

## Frontend Components

### Pages

| Component | Route | Purpose |
|-----------|-------|---------|
| `LandingPage` | `/` | Marketing overview with neural network animation |
| `DemoPage` | `/analyze` | Mounts `SecurityAnalysisConsole` |

### Layout

| Component | Purpose |
|-----------|---------|
| `SecurityAnalysisConsole` | Root of the analysis UI — tab state, API calls, result state |
| `MainLayout` | Two-column grid (input panel / result panel) |

### Input Panels

| Component | Purpose |
|-----------|---------|
| `EmailContentPanel` | Textarea + Analyze / Clear buttons for email mode |
| `UrlLinkPanel` | URL input + Check URL / Clear buttons for URL mode |

### Result Panel

| Component | Purpose |
|-----------|---------|
| `AnalysisResultPanel` | Orchestrates loading / error / result / empty states |
| `UrlIntelCard` | Unified URL card: parsed structure chips + domain details grid + engine verdict bar |
| `ResultStatusIndicator` | Colour-coded risk badge with mode-aware description |
| `PhishingProbabilityBar` | Three-zone probability bar (Safe / Suspicious / Dangerous) |
| `AnalysisSkeleton` | Animated loading placeholder |
| `MetadataRow` | Footer row: classification label + latency |

### Utilities

| File | Purpose |
|------|---------|
| `lib/urlMetadata.ts` | Parses URLs, normalises input, computes heuristic signals |
| `lib/utils.ts` | `cn()` Tailwind class helper |
| `config/api.ts` | Backend base URL (env-configurable) |

---

## Backend Modules

| Module | Purpose |
|--------|---------|
| `app/main.py` | FastAPI app, CORS middleware (`*`), router mount |
| `app/config.py` | Paths, constants, loads `backend/.env` |
| `app/api/predict.py` | Single `POST /api/predict` endpoint; routes to correct engine |
| `app/core/hf_distilbert_inference.py` | DistilBERT email inference (active) |
| `app/core/virustotal.py` | VirusTotal API v3 URL scanning + domain intelligence |
| `app/core/inference.py` | CharGRU character-level inference (alternative) |
| `app/core/model_loader.py` | Lazy Keras model loader |
| `app/core/preprocessing.py` | Email HTML stripping, normalisation |

---

## Data Flows

### Email Analysis

```
User types email → EmailContentPanel
→ POST /api/predict { text }
→ hf_distilbert_inference.py
    tokenise (max 512 tokens)
    DistilBERT forward pass
    softmax → phishing probability
→ { label, risk_level, phishing_probability, latency_ms, model }
→ AnalysisResultPanel displays verdict
```

### URL Analysis

```
User pastes URL → UrlLinkPanel
→ parseLinkMetadata() — local parse, heuristics
→ POST /api/predict { text: normalizedUrl }
→ virustotal.py
    POST /api/v3/urls          (submit / refresh)
    GET  /api/v3/urls/{id}     ─┐ concurrent
    GET  /api/v3/domains/{host} ┘ (ThreadPoolExecutor)
    map engine stats → probability
→ { label, risk_level, phishing_probability, latency_ms,
    model, domain_info }
→ AnalysisResultPanel
    UrlIntelCard (local meta + domain_info)
    ResultStatusIndicator / PhishingProbabilityBar
```

---

## Models

### DistilBERT (email)
- **Source:** `cybersectony/phishing-email-detection-distilbert_v2.1` (HuggingFace, downloaded on first run ~250 MB)
- **Input:** Tokenised text, max 512 tokens
- **Output:** Binary classification probability

### CharGRU (alternative, not wired to API)
- **File:** `models/chargru_advtrain_model.keras`
- **Input:** Character sequences, 1500 chars, 95-symbol vocab
- **Training:** Adversarial variant

### VirusTotal (URL)
- **API:** v3 public REST API
- **Auth:** `x-apikey` header from `backend/.env`
- **Data:** 90+ antivirus engines + community domain reputation

---

## Risk Thresholds

| `phishing_probability` | `label` | `risk_level` |
|------------------------|---------|--------------|
| ≥ 0.85 | Phishing | High |
| ≥ 0.60 | Suspicious | Moderate |
| < 0.60 | Clean | Low |
