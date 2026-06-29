# TalentFlow AI — Decision Intelligence Platform

TalentFlow AI is an **Agentic Recruitment & Staffing Decision Intelligence Platform**. It leverages a multi-agent backend orchestrator paired with structured Human-in-the-Loop checkpoints to turn unstructured meeting transcripts and hiring briefs into clean, explainable, and actionable hiring decisions.

---

## 📂 Project Repository Structure
```
newproject-main/
├── backend/                        # Python / FastAPI Backend App
│   ├── app/
│   │   ├── agents/                 # LangGraph state machine orchestrator
│   │   │   ├── specialized/        # Node agents (Requirements, Discovery, Recs)
│   │   │   │   ├── candidate_discovery_agent.py
│   │   │   │   ├── recommendation_agent.py
│   │   │   │   └── requirements_agent.py
│   │   │   ├── planner.py          # StateGraph definitions and compile
│   │   │   └── state.py            # Unified AgentState TypedDict schema
│   │   ├── api/                    # FastAPI routes / API routers
│   │   │   └── endpoints.py        # /jobs, /recommendations, /analyze routes
│   │   ├── db/                     # DB connection & ORM entity schemas
│   │   │   ├── database.py         # SQLite connection setup
│   │   │   └── models.py           # Job, Client, Candidate, Rec entities
│   │   ├── memory/                 # Vector memory layer integration
│   │   │   └── chroma_store.py     # ChromaDB client & collection operations
│   │   └── main.py                 # FastAPI app entrypoint & CORS config
│   └── requirements.txt            # Python backend dependencies
│
├── frontend/                       # React / Next.js Web App
│   ├── src/
│   │   ├── app/                    # Next.js App Router folders
│   │   │   ├── api/analyze/        # Gemini 2.5 Flash server extraction route
│   │   │   │   └── route.ts
│   │   │   ├── client/             # /client - Employer portal page
│   │   │   ├── dashboard/          # /dashboard - Recruiter HIFL command center
│   │   │   ├── demo/               # /demo - Live pipeline demo page (HTL Gate)
│   │   │   ├── memory/             # /memory - Org memory visualization page
│   │   │   ├── globals.css         # Styling directives
│   │   │   ├── layout.tsx          # Nav links layout structure
│   │   │   └── page.tsx            # Landing index page
│   │   └── components/             # Reusable UI component layer
│   │       ├── ui/                 # Atomic elements (card UI component)
│   │       │   └── card.tsx
│   │       ├── AgentGraph.tsx      # Multi-agent visual state graph
│   │       ├── AgentTimeline.tsx   # Chronological log execution list
│   │       └── ExplainabilityDrawer.tsx # Drawer displaying reasoning elements
│   ├── package.json                # Project script registry
│   └── tailwind.config.ts          # Styling engine constraints
│
├── docs/                           # Documentation library folder
│   ├── platform_documentation.md   # Core platform features & metrics
│   ├── ai_agent_documentation.md   # AI Agent systems & ChromaDB design
│   ├── architecture.md             # Existing visual flow diagrams
│   └── setup_instructions.md       # Step-by-step local running instructions
│
├── seed/                           # Ingestion seed scripts
│   ├── generate_data.py            # Faker-driven database generator
│   └── requirements.txt            # Seed environment requirements
│
└── docker-compose.yml              # Production containerization setup
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


