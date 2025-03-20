# AI-Powered Resume Builder

## 🚀 Project Overview
The **AI-Powered Resume Builder** is a full-stack application that allows users to:
-- ✅ Upload resumes (PDF/DOCX)
-- ✅ Extract text using FastAPI & Python
-- ✅ Enhance resume content using OpenAI GPT API
-- ✅ Download AI-enhanced resumes as PDF -ToDo
-- ✅ Built with **React (Frontend), FastAPI (Backend), PostgreSQL (Database)**

---

## 📌 Tech Stack
- **Frontend**: React, Axios, jsPDF
- **Backend**: FastAPI, OpenAI API, SQLAlchemy
- **Database**: PostgreSQL
- **Deployment**: AWS / Docker (Coming Soon)

---

## 🛠️ Setup Instructions

### **1️⃣ Clone the Repository**
```bash
git clone https://github.com/yourusername/ai-resume-builder.git
cd ai-resume-builder
```

### **2️⃣ Backend Setup (FastAPI + PostgreSQL)**

#### Install Dependencies:
```bash
cd backend
python -m venv venv
source venv/bin/activate  # (For Mac/Linux)
venv\Scripts\activate  # (For Windows)
pip install -r requirements.txt
```

#### Configure Database:
- Install PostgreSQL
- Create a database named `resume_db`
- Update `.env` file with your database credentials:
  ```
  DATABASE_URL=postgresql://username:password@localhost/resume_db
  OPENAI_API_KEY=your_openai_api_key
  GROQ_API_KEY=your_groq_api_key
  ```

#### Run Migrations & Start Backend:
```bash
uvicorn main:app --reload
```

---

### **3️⃣ Frontend Setup (React + jsPDF)**

#### Install Dependencies:
```bash
cd resume-enhancer
npm install
```

#### Start React App:
```bash
npm run-dev
```

---

## 📌 Features & API Endpoints

### **Upload Resume**
```bash
POST /upload_resume
```
Uploads a resume file and extracts text.

### **Enhance Resume (AI)**
```bash
POST /enhance/{resume_id}
```
Uses OpenAI GPT to improve resume content.

### **Download Enhanced Resume**
```bash
GET /resume/{resume_id}
```
Fetches the enhanced resume text.

---

📌 Remaining Steps

-- Improve UI with Tailwind CSS
-- Add a "Resume History" section to track previous enhancements
-- Integrate OAuth (Google/GitHub) for authentication
-- Deploy backend and frontend to AWS (EC2 + RDS + S3)
-- Implement a user dashboard for managing resumes
-- Optimize AI model usage for better resume suggestions
-- Add more AI features like job-specific resume tailoring

---

## 🤝 Contributing
Pull requests are welcome! Feel free to fork and submit a PR.

---

## 📄 License
This project is open-source under the MIT License.

---

### ⭐ Show Your Support!
If you found this useful, give this project a ⭐ on GitHub!

