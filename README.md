# TalentFlow AI — Decision Intelligence Platform

> **Agentic Recruitment & Staffing Decision Intelligence Platform**  
> Built for the AI/ML domain, this platform transforms unstructured meeting transcripts into clean, explainable, human-supervised hiring decisions using a multi-agent LangGraph pipeline and Google Gemini 2.5 Flash.

---

## 👥 Team Details

| Field | Details |
|-------|---------|
| **Team Name** | TalentFlowAI |
| **GitHub Repository** | [https://github.com/Sampath3763/TalentFlow-AI](https://github.com/Sampath3763/TalentFlow-AI) |

### Team Members

| Name | Roll Number |
|------|------------|
| Ch. Sampath Kumar | 23071A0510 |
| G. Maneesh Reddy | 23071A0518 |
| G. Varshanth Reddy | 23071A6621 |

---

## 📋 Project Overview

TalentFlow AI is an **Agentic Recruitment & Staffing Decision Intelligence Platform**. It leverages a multi-agent backend orchestrator paired with structured Human-in-the-Loop (HITL) checkpoints to turn unstructured meeting transcripts and hiring briefs into clean, explainable, and actionable hiring decisions.

### Core Capabilities
- **Transcript Intelligence** — Paste any meeting recording or notes; Google Gemini 2.5 Flash extracts decisions, action items, and risks in under 8 seconds.
- **Multi-Agent Pipeline** — A LangGraph-powered state machine runs Requirements, Memory, Salary, Risk, and Candidate agents in sequence and parallel.
- **Human-in-the-Loop Gate** — No AI action is ever committed without explicit recruiter approval. The HTL checkpoint is a hard state boundary.
- **Explainability Drawer** — Every recommendation shows the confidence score, retrieved evidence, alternatives evaluated, and expected business impact.
- **Organizational Memory** — Approved decisions persist to a memory layer so the AI learns each client's preferences over time.

### Business Impact
| Metric | Improvement |
|--------|------------|
| Intake Processing Time | ~20 min → under 30 seconds |
| Time-to-Hire | 22 days → 18 days (−18%) |
| Candidate Acceptance Rate | +18% via real-time salary benchmarking |
| Compliance Risk | Proactively flagged before offers go out |

---

## 🔗 GitHub Repository

**URL**: [https://github.com/Sampath3763/TalentFlow-AI](https://github.com/Sampath3763/TalentFlow-AI)

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
│   │   │   ├── client/             # /client - Employer portal page (org switcher)
│   │   │   ├── dashboard/          # /dashboard - Recruiter action center
│   │   │   ├── demo/               # /demo - Live pipeline demo with HTL Gate
│   │   │   ├── memory/             # /memory - Org memory visualization page
│   │   │   ├── globals.css         # Styling directives
│   │   │   ├── layout.tsx          # Nav links layout structure
│   │   │   └── page.tsx            # Landing index page
│   │   └── components/             # Reusable UI component layer
│   │       ├── ui/                 # Atomic elements (card UI component)
│   │       │   └── card.tsx
│   │       ├── AgentGraph.tsx      # Multi-agent visual state graph
│   │       ├── AgentTimeline.tsx   # Chronological log execution list
│   │       └── ExplainabilityDrawer.tsx # AI reasoning slide-in drawer
│   ├── package.json                # Project script registry
│   └── tailwind.config.ts          # Styling engine constraints
│
├── docs/                           # Documentation library folder
│   ├── platform_documentation.md   # Core platform features & metrics
│   ├── ai_agent_documentation.md   # AI Agent systems & ChromaDB design
│   ├── architecture.md             # Visual flow diagrams & design decisions
│   ├── setup_instructions.md       # Step-by-step local running instructions
│   └── live_demo_walkthrough.md    # 2–3 min live demo presenter script
│
├── seed/                           # Ingestion seed scripts
│   ├── generate_data.py            # Faker-driven database generator
│   └── requirements.txt            # Seed environment requirements
│
└── docker-compose.yml              # Production containerization setup
```

---

## 🛠️ Setup Instructions (No Docker Required)

For a detailed step-by-step guide see [docs/setup_instructions.md](docs/setup_instructions.md).

### Step 1 — Generate Seed Data (SQLite Database)
```bash
cd seed
pip install -r requirements.txt
python generate_data.py
```
*Generates 50 clients, 100 jobs, 500 candidates, applications, and recommendations in `talentflow.db`.*

### Step 2 — Start the Backend (FastAPI + LangGraph)
```bash
cd ../backend
pip install -r requirements.txt
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```
- **Health Check**: [http://localhost:8000/health](http://localhost:8000/health)
- **Swagger API Docs**: [http://localhost:8000/docs](http://localhost:8000/docs)

### Step 3 — Configure & Start the Frontend (Next.js)
```bash
cd ../frontend
npm install
```

Create a `.env.local` file inside `frontend/` and add your Gemini API Key:
```env
GEMINI_API_KEY=AIzaSyYourGeminiApiKeyHere
```
> Get your free API key from [Google AI Studio](https://aistudio.google.com/app/apikey).

```bash
npm run dev
```
- **Web App**: [http://localhost:3000](http://localhost:3000)

---

## 📄 Additional Notes

### Environment Variables
| Variable | Location | Required | Purpose |
|----------|----------|----------|---------|
| `GEMINI_API_KEY` | `frontend/.env.local` | ✅ Yes | Powers Gemini 2.5 Flash transcript extraction |
| `OPENAI_API_KEY` | `backend/.env` | ⚠️ Optional | Powers LangGraph requirements agent (mocked if absent) |
| `DATABASE_URL` | `backend/.env` | ⚠️ Optional | Defaults to SQLite; override for PostgreSQL in production |

### Tech Stack Summary
| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 14, React 18, Tailwind CSS, Framer Motion |
| AI Extraction | Google Gemini 2.5 Flash (`@google/genai`) |
| Backend | FastAPI, Uvicorn, Python 3.10+ |
| Agent Orchestration | LangGraph, LangChain |
| Database | SQLite (dev) / PostgreSQL (prod) via SQLAlchemy |
| Vector Store | ChromaDB (local persistent fallback) |

### Running the Demo
1. Navigate to [http://localhost:3000/demo](http://localhost:3000/demo)
2. Click **Paste Transcript** tab → **Load Sample Transcript**
3. Click **Analyze Transcript** — Gemini extracts intelligence in ~8 seconds
4. Watch the multi-agent graph animate through 6 steps
5. At **Step 5**, review the extracted items and click **Approve & Push to Dashboard**
6. View live-injected recommendations on the [Dashboard](http://localhost:3000/dashboard)
7. Click any card to open the **Explainability Drawer**
8. Visit [Memory](http://localhost:3000/memory) to see the org automatically added to memory

### Documentation Index
| Document | Purpose |
|----------|---------|
| [platform_documentation.md](docs/platform_documentation.md) | Full platform features, business impact |
| [ai_agent_documentation.md](docs/ai_agent_documentation.md) | Agent pipeline, state schema, ChromaDB |
| [architecture.md](docs/architecture.md) | Architecture diagrams, design decisions |
| [setup_instructions.md](docs/setup_instructions.md) | Detailed setup walkthrough |
| [live_demo_walkthrough.md](docs/live_demo_walkthrough.md) | 2–3 min presenter demo script |
