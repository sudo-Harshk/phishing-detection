from app.core.preprocessing import preprocess_email

sample = """
From: admin@bank.com
Subject: Urgent Action Required

Click here to verify your account immediately.
"""

x = preprocess_email(sample)

print("Shape:", x.shape)
print("Dtype:", x.dtype)
print("First 20 indices:", x[0][:20])
