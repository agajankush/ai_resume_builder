from fastapi import FastAPI, File, UploadFile, Depends, BackgroundTasks
import shutil
import models
from ai_enhancer import enhance_resume, enhance_resume_groq
from resume_parser import extract_text_from_pdf
from database import engine, SessionLocal
from models import Resume
from sqlalchemy.orm import Session
import os
from dotenv import load_dotenv
load_dotenv()


app = FastAPI()
models.Base.metadata.drop_all(bind=engine)
models.Base.metadata.create_all(bind=engine)
upload_dir = os.environ.get("UPLOAD_DIR")
os.makedirs(upload_dir, exist_ok=True)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()



@app.post("/upload_resume/")
async def upload_resume(file: UploadFile = File(...), db: Session = Depends(get_db)):
    file_path = f"{upload_dir}/{file.filename}"
    with open(file.filename, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    
    resume_text = extract_text_from_pdf(file_path)
    

    new_resume = Resume(filename=file.filename, original_text=resume_text)
    db.add(new_resume)
    db.commit()
    db.refresh(new_resume)

    return {"resume_id": new_resume.id ,"original_text": resume_text}

@app.post("/enhance/{resume_id}")
async def enhance_resume_api(resume_id: int, background_tasks: BackgroundTasks, db: Session=Depends(get_db)):
    resume = db.query(Resume).filter(Resume.id==resume_id).first()
    if not resume:
        return {"error": "Resume not found"}

    background_tasks.add_task(process_enhancement, "resume_id": resume_id)

def process_enhancement(resume, db):
    enhanced_text = enhance_resume_groq(resume.original_text)
    resume.enhanced_text = enhanced_text
    db.commit()