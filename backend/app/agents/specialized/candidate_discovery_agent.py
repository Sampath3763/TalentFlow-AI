from ..state import AgentState
from ...db.database import SessionLocal
from ...db.models import Candidate

def discover_candidates(state: AgentState):
    """Matches requirements against candidate pool."""
    requirements = state.get("extracted_requirements", {})
    if not requirements:
        return {"candidate_matches": []}
    
    db = SessionLocal()
    # Simplified matching logic: Just fetch all and score randomly for demo purposes
    # A real implementation would use ChromaDB vector similarity on resumes
    candidates = db.query(Candidate).limit(5).all()
    
    matches = []
    for c in candidates:
        matches.append({
            "candidate_id": c.id,
            "name": f"{c.first_name} {c.last_name}",
            "score": 0.85 # Mock score
        })
    db.close()
    
    return {"candidate_matches": matches}
