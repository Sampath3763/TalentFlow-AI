from langgraph.graph import StateGraph, END
from .state import AgentState
from .specialized.requirements_agent import extract_requirements
from .specialized.candidate_discovery_agent import discover_candidates
from .specialized.recommendation_agent import generate_recommendations

def create_planner_graph():
    workflow = StateGraph(AgentState)
    
    # Add nodes
    workflow.add_node("requirements", extract_requirements)
    workflow.add_node("discovery", discover_candidates)
    workflow.add_node("recommend", generate_recommendations)
    
    # Define edges
    workflow.add_edge("requirements", "discovery")
    workflow.add_edge("discovery", "recommend")
    workflow.add_edge("recommend", END)
    
    # Set entry point
    workflow.set_entry_point("requirements")
    
    # Compile
    app = workflow.compile()
    return app

planner_app = create_planner_graph()
