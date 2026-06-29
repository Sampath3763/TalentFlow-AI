from sqlalchemy import Column, Integer, String, Text, ForeignKey, DateTime, Float, Boolean, JSON
from sqlalchemy.orm import relationship
from datetime import datetime, timezone
from .database import Base

class Client(Base):
    __tablename__ = "clients"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    industry = Column(String)
    contact_email = Column(String)
    notes = Column(Text)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))
    
    jobs = relationship("Job", back_populates="client")
    meetings = relationship("Meeting", back_populates="client")

class Job(Base):
    __tablename__ = "jobs"
    
    id = Column(Integer, primary_key=True, index=True)
    client_id = Column(Integer, ForeignKey("clients.id"))
    title = Column(String, index=True)
    description = Column(Text)
    required_skills = Column(JSON) # List of skills
    min_salary = Column(Float)
    max_salary = Column(Float)
    location = Column(String)
    is_remote = Column(Boolean, default=False)
    status = Column(String, default="open") # open, closed, paused
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))
    
    client = relationship("Client", back_populates="jobs")
    candidates = relationship("JobCandidate", back_populates="job")
    recommendations = relationship("Recommendation", back_populates="job")

class Candidate(Base):
    __tablename__ = "candidates"
    
    id = Column(Integer, primary_key=True, index=True)
    first_name = Column(String)
    last_name = Column(String)
    email = Column(String, unique=True, index=True)
    phone = Column(String)
    skills = Column(JSON)
    experience_years = Column(Integer)
    current_title = Column(String)
    resume_text = Column(Text)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))
    
    jobs = relationship("JobCandidate", back_populates="candidate")

class JobCandidate(Base):
    __tablename__ = "job_candidates"
    
    id = Column(Integer, primary_key=True, index=True)
    job_id = Column(Integer, ForeignKey("jobs.id"))
    candidate_id = Column(Integer, ForeignKey("candidates.id"))
    status = Column(String, default="sourced") # sourced, screened, interviewed, offered, placed, rejected
    score = Column(Float) # Match score from AI
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))
    
    job = relationship("Job", back_populates="candidates")
    candidate = relationship("Candidate", back_populates="jobs")
    interviews = relationship("Interview", back_populates="job_candidate")

class Meeting(Base):
    __tablename__ = "meetings"
    
    id = Column(Integer, primary_key=True, index=True)
    client_id = Column(Integer, ForeignKey("clients.id"))
    title = Column(String)
    transcript = Column(Text)
    summary = Column(Text)
    date = Column(DateTime)
    
    client = relationship("Client", back_populates="meetings")

class Recommendation(Base):
    __tablename__ = "recommendations"
    
    id = Column(Integer, primary_key=True, index=True)
    job_id = Column(Integer, ForeignKey("jobs.id"))
    action_type = Column(String) # e.g., "expand_search", "adjust_salary", "schedule_interview"
    description = Column(Text)
    reasoning = Column(Text)
    confidence_score = Column(Float)
    status = Column(String, default="pending") # pending, approved, rejected, modified
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))
    
    job = relationship("Job", back_populates="recommendations")

class Interview(Base):
    __tablename__ = "interviews"
    
    id = Column(Integer, primary_key=True, index=True)
    job_candidate_id = Column(Integer, ForeignKey("job_candidates.id"))
    scheduled_at = Column(DateTime)
    status = Column(String, default="scheduled") # scheduled, completed, cancelled
    feedback = Column(Text)
    
    job_candidate = relationship("JobCandidate", back_populates="interviews")

class AgentMemory(Base):
    __tablename__ = "agent_memories"
    
    id = Column(Integer, primary_key=True, index=True)
    context_key = Column(String, index=True) # e.g., client_id, job_id
    memory_type = Column(String) # short_term, long_term, business_rule
    content = Column(JSON)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))
