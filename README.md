# TalentFlow AI

Agentic Recruitment & Staffing Decision Intelligence Platform.

## Phase 1: Foundation & Data Design

This repository contains the monorepo structure for TalentFlow AI.

### Structure
- `backend/`: FastAPI application containing LangGraph agents and database models.
- `frontend/`: Next.js application (to be implemented in Phase 3).
- `seed/`: Scripts to generate synthetic data for testing and demonstration.
- `docker-compose.yml`: Infrastructure orchestration.

### Setup Instructions (No Docker Required)

1. Generate Seed Data (SQLite Database):
   ```bash
   cd seed
   pip install -r requirements.txt
   python generate_data.py
   ```
