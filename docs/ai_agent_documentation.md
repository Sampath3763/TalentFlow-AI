# AI Agent Architecture: TalentFlow AI

TalentFlow AI leverages a sophisticated multi-agent pipeline designed to parse, reason, and make recommendations. This document describes the schema, execution graph, memory structures, and agent configurations.

---

## 1. Multi-Agent Pipeline Structure
The platform utilizes two complementary layers of intelligence:
1. **Gemini Ingestion Engine** (Next.js server-side route `/api/analyze`)
   - Uses `gemini-2.5-flash` to extract structured JSON data from raw meeting transcript text.
   - Temperature configured at `0.1` for maximum determinism.
2. **LangGraph Stateful Orchestration Graph** (FastAPI backend)
   - Executes specialized agents sequentially and in parallel to evaluate requirements, query the database, and build next-best actions.

---

## 2. Shared Agent State
The LangGraph pipeline operates on a shared `AgentState` object. Every node modifies this state in place.

```python
from typing import TypedDict, Annotated, Sequence
from langchain_core.messages import BaseMessage
import operator

class AgentState(TypedDict):
    messages: Annotated[Sequence[BaseMessage], operator.add]
    job_id: int
    extracted_requirements: dict
    candidate_matches: list
    market_data: dict
    identified_risks: list
    recommendations: list
    next_step: str
```
- **`messages`**: Reducer function uses `operator.add` to build a complete, append-only history of agent interactions for transparent trace audits.
- **`extracted_requirements`**: Structured skills, location, and salary ranges.
- **`candidate_matches`**: Candidates retrieved from database matching parameters.

---

## 3. Specialized Agent Nodes

### Node 1: Requirements Agent (`extract_requirements`)
- **Responsibility**: Takes unstructured transcript text and parses it into structured parameters.
- **Implementation**: LangChain `ChatOpenAI` calling GPT-3.5-turbo.
- **Fallback**: Automatically falls back to high-fidelity mocks if no environment API key is present, preventing dev runtime crashes.

### Node 2: Candidate Discovery Agent (`discover_candidates`)
- **Responsibility**: Scans SQLite/PostgreSQL `candidates` and `resumes` collections.
- **Implementation**: SQL Query + ChromaDB vector search.
- **Cosine Similarity Search**: ChromaDB stores vector embeddings of candidate resumes, calculating semantic matching scores against extracted job requirements.

### Node 3: Recommendation Agent (`generate_recommendations`)
- **Responsibility**: Generates action items (e.g. `expand_search`, `adjust_salary`, `schedule_interview`) and writes confidence scores based on matching results.

---

## 4. Vector Store and Memory Layers
TalentFlow AI utilizes a four-tier memory structure to support agent persistence:

1. **Session Memory (`sessionStorage`)**: Transfers live transcript items from `/demo` to the dashboard without network friction.
2. **Agentic Memory (`localStorage`)**: Persists approved actions within the recruiter's active session.
3. **Database Memory (`agent_memories` table)**: Saves client constraints and decision histories permanently.
4. **Vector Store (ChromaDB)**: Houses embedded resumes and job specs for semantic retrieval.

---

## 5. Agent Pipeline Visualization (UI Graph Mapping)
The frontend `AgentGraph` and `AgentTimeline` components map steps `0` through `6` as a finite state machine:
- **Step 0**: START / Planner Initialisation
- **Step 1**: Requirements Extraction Agent
- **Step 2**: Memory Retrieval Execution
- **Step 3**: Parallel Agents Execution (Salary, Risk, and Candidate Agents)
- **Step 4**: Recommendation Compilation Agent
- **Step 5**: **Human Approval Checkpoint Gate (HTL Pause)**
- **Step 6**: END / Workflow Finalization

During **Step 5 (htl_pause)**, the application stops the timer and waits for the recruiter to explicitly click Approve or Reject.
- **On Approve**: Injects items into the live queue dashboard and ends the workflow.
- **On Reject**: Aborts the pipeline, transitioning into a discarded state.
