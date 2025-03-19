import openai
import os
from dotenv import load_dotenv
from groq import Groq
load_dotenv()

openai.api_key =  os.environ.get("OPENAI_API_KEY")

def enhance_resume(resume_text):
    prompt = f"Improve this resume for better job matching: \n\n{resume_text}"
    response = openai.chat.completions.create(
        model="gpt-4",
        message = [{"role": "system", "content": prompt}]
    )
    return response["choices"][0]["message"]["content"]

def enhance_resume_groq(resume_text):
    prompt = f"Improve this resume for better job matching: \n\n{resume_text}"
    client = Groq(
        api_key=os.environ.get("GROQ_API_KEY"),
    )
    model="llama-3.2-90b-vision-preview"
    messages = [
        {   "role":"system",
            "content": "You are an expert resume writer."
        },
        {   "role":"user",
            "content": prompt
        }
            ]
    response = client.chat.completions.create(
        model=model,
        messages=messages,
    )
    return response.choices[0].message.content