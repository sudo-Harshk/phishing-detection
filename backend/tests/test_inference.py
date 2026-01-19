from app.core.inference import predict_email

sample = """
Hi John,

Let’s meet tomorrow at 10am to discuss the project.
Please bring the documents.

Thanks,
Alex

"""

result = predict_email(sample)

print(result)
