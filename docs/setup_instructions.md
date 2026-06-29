# TalentFlow AI — Local Setup and Deployment Guide

This guide provides step-by-step instructions for running the **TalentFlow AI** platform locally.

---

## Technical Stack Overview
- **Frontend**: Next.js 14, React 18, Tailwind CSS, Framer Motion
- **Backend**: FastAPI (Python 3.10+), SQLAlchemy (SQLite Database), LangGraph Agent State Machine
- **AI Integration**: Google Gemini 2.5 Flash (Stateless NLP Ingestion)

---

## 🛠️ Step 1: Clone and Project Structure
Confirm your folder hierarchy is structured as follows:
```
newproject-main/
├── backend/            # FastAPI app, database models, agent state machines
├── frontend/           # Next.js app, UI components, pages
├── docs/               # Architecture documents and guides
├── seed/               # Synthetic database seed scripts
└── docker-compose.yml  # Containerized deployment blueprint
```

---

## 📂 Step 2: Database Setup & Seeding
We use **SQLite** by default for a local, zero-dependency setup. Follow these steps to generate test data:

1. Open a terminal in the project root.
2. Navigate to the `seed` directory:
   ```bash
   cd seed
   ```
3. Install required seed dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Run the seed script to create `talentflow.db` in the backend folder:
   ```bash
   python generate_data.py
   ```
   *Note: This generates 50 clients, 100 job postings, 500 candidates, job applications, and recommendation records.*

---

## 🐍 Step 3: Start the Backend (FastAPI)
1. Open a new terminal in the project root.
2. Navigate to the backend directory:
   ```bash
   cd backend
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Start the Uvicorn development server:
   ```bash
   uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
   ```
5. **Verify Backend Status**:
   - Health check endpoint: [http://localhost:8000/health](http://localhost:8000/health) (should show `{"status": "healthy"}`)
   - Swagger API Documentation: [http://localhost:8000/docs](http://localhost:8000/docs)

---

## ⚛️ Step 4: Setup and Start the Frontend (Next.js)
1. Open a new terminal in the project root.
2. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
3. Install node dependencies:
   ```bash
   npm install
   ```
4. Create your local environment configuration file:
   - Create a file named `.env.local` inside the `frontend/` folder.
   - Add your Gemini API key (retrieve it from [AI Studio](https://aistudio.google.com/app/apikey)):
     ```env
     GEMINI_API_KEY=AIzaSyYourGeminiApiKeyHere
     ```
5. Start the Next.js development server:
   ```bash
   npm run dev
   ```
6. **Access Platform UI**:
   - Open your browser and navigate to: [http://localhost:3000](http://localhost:3000)

---

## 🧪 Step 5: Test the Operational Flow
1. Navigate to the **Live Demo** page: [http://localhost:3000/demo](http://localhost:3000/demo)
2. Click **Load Sample Transcript** to inject a sample war room transcript.
3. Click **Analyze Transcript**.
4. The screen will animate through the agent steps:
   `START → Requirements → Memory → Parallel Agents → Recommendation`
5. The pipeline will **pause at step 5** (Human Approval) showing a pulsing amber warning panel.
6. Click **Approve & Push to Dashboard**.
7. The page redirects to the **Recruiter Dashboard** (`/dashboard`).
8. Notice the **✨ LIVE** badge and the custom banner alerting you that live analysis has been injected into the recommendation queue.
9. Click any recommendation card to slide open the **Explainability Drawer** showing the AI's evidence, confidence, and alternatives.
10. Click **Approve** on the recommendation card to write it to the persistent client history visualised in the **Memory** page.
