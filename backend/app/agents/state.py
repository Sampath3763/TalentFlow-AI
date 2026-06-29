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
