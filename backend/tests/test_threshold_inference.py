from app.core.inference import predict_email

tests = {
    "Phishing email": """
Dear user,

Your account has been suspended due to suspicious activity.
Please verify immediately by clicking the link below:

http://secure-login.example.com
""",

    "Normal conversational email": """
Hi John,

Let’s meet tomorrow at 10am to discuss the project.
Please bring the documents.

Thanks,
Alex
"""
}

for name, text in tests.items():
    print("=" * 50)
    print(name)
    result = predict_email(text)
    print(result)
