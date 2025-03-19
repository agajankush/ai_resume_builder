from fastapi import FastAPI, File, UploadFile, Depends
import shutil
import models
from ai_enhancer import enhance_resume, enhance_resume_groq
from resume_parser import extract_text_from_pdf
from database import engine, SessionLocal
from models import Resume
from sqlalchemy.orm import Session


app = FastAPI()
models.Base.metadata.drop_all(bind=engine)
models.Base.metadata.create_all(bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.post("/upload_resume/")
async def upload_resume(file: UploadFile = File(...), db: Session = Depends(get_db)):
    file_path = f"uploads/{file.filename}"
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    
    resume_text = extract_text_from_pdf(file_path)
    enhanced_resume = enhance_resume_groq(resume_text)

    new_resume = Resume(filename=file.filename, original_text=resume_text, enhanced_text=enhanced_resume)
    db.add(new_resume)

    return {"original": resume_text, "enhanced": enhanced_resume}