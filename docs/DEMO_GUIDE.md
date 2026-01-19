# Demo Guide

## Pre-Demo Checklist

1. Start backend: `uvicorn app.main:app --reload --port 8000`
2. Start frontend: `npm run dev`
3. Open browser: `http://localhost:5173`
4. Run one test prediction to warm up model

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

## Key Points to Highlight

- Character-level / transformer-based detection
- Real-time inference (50-500ms)
- No external API calls (local model)
- Threshold-based risk classification

## Troubleshooting During Demo

| Issue | Fix |
|-------|-----|
| Slow first request | Model loading - wait 10-30s |
| Backend not responding | Check terminal for errors |
| CORS error | Verify both servers running |
| Result not showing | Check browser console |
