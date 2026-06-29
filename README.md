# TalentFlow AI — Decision Intelligence Platform

TalentFlow AI is an **Agentic Recruitment & Staffing Decision Intelligence Platform**. It leverages a multi-agent backend orchestrator paired with structured Human-in-the-Loop checkpoints to turn unstructured meeting transcripts and hiring briefs into clean, explainable, and actionable hiring decisions.

---

## 📂 Project Repository Structure
```
newproject-main/
├── backend/            # FastAPI app, SQLAlchemy models, LangGraph state machine
├── frontend/           # Next.js 14 Web Application (React, Tailwind, Framer Motion)
├── docs/               # Detailed platform and architecture guides
│   ├── platform_documentation.md   # Core platform features & visual impact
│   ├── ai_agent_documentation.md   # Schema, state nodes, ChromaDB specs
│   └── setup_instructions.md       # Step-by-step setup walkthrough
├── seed/               # Synthetic database seed scripts
└── docker-compose.yml  # Docker infrastructure blueprint
```

---

## 🛠️ Quick Local Setup (No Docker Required)

For a detailed step-by-step guide, please review the [Setup Instructions](file:///d:/Projects/newproject-main/docs/setup_instructions.md).

### 1. Ingest Synthetic Seed Data (SQLite)
```bash
cd seed
pip install -r requirements.txt
python generate_data.py
```
*This creates the local `talentflow.db` database inside the backend folder.*

### 2. Start the Backend API (FastAPI)
```bash
cd ../backend
pip install -r requirements.txt
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```
- Health Check: [http://localhost:8000/health](http://localhost:8000/health)
- Swagger API Docs: [http://localhost:8000/docs](http://localhost:8000/docs)

### 3. Setup Environment & Start Frontend (Next.js)
1. Navigate to the frontend directory:
   ```bash
   cd ../frontend
   npm install
   ```
2. Create `.env.local` inside the `frontend/` directory and add your Gemini API Key:
   ```env
   GEMINI_API_KEY=AIzaSyYourGeminiApiKeyHere
   ```
3. Launch the development server:
   ```bash
   npm run dev
   ```
- Next.js Web App: [http://localhost:3000](http://localhost:3000)

---

## 📖 Presentation and Script Resources
If you are preparing for a pitch or demo video:
- Review the slide outline, presenter scripts, and video walkthrough timeline in the [Presentation & Script Deck](file:///C:/Users/91801/.gemini/antigravity-ide/brain/d8868083-cdc3-4327-ac0f-39f880bd239b/presentation_deck_and_script.md).
