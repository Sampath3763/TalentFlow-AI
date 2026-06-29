from ..state import AgentState

def generate_recommendations(state: AgentState):
    """Generates the next best actions based on matches and risks."""
    matches = state.get("candidate_matches", [])
    
    # Mocking recommendations
    recs = []
    if not matches:
        recs.append({
            "action": "expand_search",
            "reasoning": "No candidates found matching the strict criteria.",
            "confidence": 0.95
        })
    else:
        recs.append({
            "action": "schedule_interview",
            "reasoning": f"Found {len(matches)} strong candidates. Prompt scheduling prevents dropout.",
            "confidence": 0.88
        })
        
    return {"recommendations": recs}
