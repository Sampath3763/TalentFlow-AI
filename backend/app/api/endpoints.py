from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..db.database import get_db
from ..db import models
from pydantic import BaseModel
from typing import List, Optional

router = APIRouter()

# --- Pydantic Schemas ---
class JobBase(BaseModel):
    title: str
    description: str
    location: str
    
class JobResponse(JobBase):
    id: int
    status: str
    
    class Config:
        from_attributes = True

# --- Endpoints ---
@router.get("/jobs", response_model=List[JobResponse])
def get_jobs(db: Session = Depends(get_db)):
    jobs = db.query(models.Job).all()
    return jobs

@router.get("/recommendations/{job_id}")
def get_recommendations(job_id: int, db: Session = Depends(get_db)):
    recs = db.query(models.Recommendation).filter(models.Recommendation.job_id == job_id).all()
    return recs

class AnalyzeRequest(BaseModel):
    job_id: int
    transcript: str

@router.post("/analyze")
def analyze_transcript(req: AnalyzeRequest, db: Session = Depends(get_db)):
    # Import the planner inside the route to avoid circular imports during startup
    from ..agents.planner import planner_app
    from langchain_core.messages import HumanMessage
    
    initial_state = {
        "messages": [HumanMessage(content=req.transcript)],
        "job_id": req.job_id,
        "extracted_requirements": {},
        "candidate_matches": [],
        "market_data": {},
        "identified_risks": [],
        "recommendations": [],
        "next_step": ""
    }
    
    # Run the graph
    result = planner_app.invoke(initial_state)
    
    return {"status": "success", "recommendations": result.get("recommendations", [])}

@router.post("/recommendations/{rec_id}/approve")
def approve_recommendation(rec_id: int, db: Session = Depends(get_db)):
    rec = db.query(models.Recommendation).filter(models.Recommendation.id == rec_id).first()
    if not rec:
        raise HTTPException(status_code=404, detail="Recommendation not found")
    
    rec.status = "approved"
    db.commit()
    # Trigger LangGraph state machine continuation here
    
    return {"message": "Recommendation approved"}

@router.post("/recommendations/{rec_id}/reject")
def reject_recommendation(rec_id: int, db: Session = Depends(get_db)):
    rec = db.query(models.Recommendation).filter(models.Recommendation.id == rec_id).first()
    if not rec:
        raise HTTPException(status_code=404, detail="Recommendation not found")
    
    rec.status = "rejected"
    db.commit()
    # Log to agent memory
    
    return {"message": "Recommendation rejected"}
