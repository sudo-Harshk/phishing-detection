# Demo Guide

## Quick Start

```bash
docker-compose up --build
```

Open `http://localhost:3000`

---

## Pre-Demo Checklist

- [ ] Docker Desktop running
- [ ] Run `docker-compose up --build`
- [ ] Wait for containers to start (~1-2 min)
- [ ] Open `http://localhost:3000`
- [ ] Run one test prediction to warm up model

---

## Sample Emails

### Clean Email (Expected: Low Risk)

```
Hi John,

Let's meet tomorrow at 10am to discuss the project.
Please bring the documents.

Thanks,
Alex
```

### Phishing Email (Expected: High Risk)

```
URGENT: Your account has been compromised!

Dear valued customer,

We detected suspicious activity on your account. Your account will be suspended within 24 hours unless you verify your identity immediately.

Click here to verify: http://secure-bank-verify.com/login

Please provide your:
- Username
- Password
- Social Security Number
- Credit Card Details

Failure to comply will result in permanent account termination.

Sincerely,
Security Team
```

### Suspicious Email (Expected: Moderate Risk)

```
Congratulations!

You have been selected for an exclusive offer. Click below to claim your prize worth $10,000.

Limited time offer - act now!

Best regards,
Promotions Team
```

---

## Demo Flow

1. **Start with Clean Email**
   - Paste clean sample
   - Click Analyze
   - Show Low risk result

2. **Test Phishing Email**
   - Clear input
   - Paste phishing sample
   - Click Analyze
   - Show High risk result

3. **Explain Results**
   - Point to probability score
   - Explain threshold levels
   - Note latency time

---

## Key Points to Highlight

- DistilBERT transformer-based detection
- Real-time inference (50-500ms after warmup)
- Containerized with Docker Compose
- One-command deployment
- No external API calls (local model)
- Threshold-based risk classification

---

## Troubleshooting During Demo

| Issue | Fix |
|-------|-----|
| Slow first request | Model loading - wait 3-6s |
| Container not starting | Run `docker-compose logs` |
| Backend not responding | Check `docker-compose ps` |
| Result not showing | Check browser console |

---

## Stop Demo

```bash
docker-compose down
```
