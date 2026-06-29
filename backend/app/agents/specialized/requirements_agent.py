from langchain_openai import ChatOpenAI
from langchain_core.messages import SystemMessage, HumanMessage
from ..state import AgentState
import json
import os

def extract_requirements(state: AgentState):
    """Analyzes transcripts/notes and extracts skills, budget, and constraints."""
    messages = state.get("messages", [])
    
    # In a real scenario, we would parse the latest HumanMessage which contains the transcript
    llm = ChatOpenAI(model="gpt-3.5-turbo", temperature=0, api_key=os.getenv("OPENAI_API_KEY", "mock-key"))
    
    prompt = """You are a Requirements Analysis Agent for a recruitment platform.
    Extract the following from the user's input:
    - required_skills (list of strings)
    - min_salary (integer)
    - max_salary (integer)
    - location (string)
    Return ONLY a valid JSON object."""
    
    # Fallback mock if key isn't set
    if os.getenv("OPENAI_API_KEY", "mock-key") == "mock-key":
        print("Mocking Requirements Agent...")
        extracted = {
            "required_skills": ["Python", "FastAPI"],
            "min_salary": 100000,
            "max_salary": 150000,
            "location": "Remote"
        }
        return {"extracted_requirements": extracted}

    try:
        response = llm.invoke([SystemMessage(content=prompt)] + messages)
        extracted = json.loads(response.content)
        return {"extracted_requirements": extracted}
    except Exception as e:
        print(f"Requirements extraction failed: {e}")
        return {"extracted_requirements": {}}
