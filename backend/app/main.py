from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .api import endpoints
from .db.database import engine, Base

# Ensure tables are created (in production, use alembic)
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="TalentFlow AI API",
    description="Backend for the Agentic Recruitment & Staffing Decision Intelligence Platform",
    version="1.0.0"
)

# Configure CORS for frontend access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # For hackathon, allow all. In prod, restrict.
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(endpoints.router, prefix="/api")

@app.get("/health")
def health_check():
    return {"status": "healthy"}
