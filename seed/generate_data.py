import os
import sys
import random
from faker import Faker
from datetime import datetime, timedelta, timezone

# Add backend to path to import models
sys.path.append(os.path.join(os.path.dirname(__file__), '../backend'))

from app.db.database import SessionLocal, engine, Base
from app.db.models import Client, Job, Candidate, JobCandidate, Meeting, Recommendation, Interview

fake = Faker()

def create_db_and_tables():
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)

def seed_data(num_clients=50, num_jobs=100, num_candidates=500):
    db = SessionLocal()
    
    print("Creating clients...")
    industries = ['Technology', 'Healthcare', 'Finance', 'Manufacturing', 'Retail', 'Logistics']
    clients = []
    for _ in range(num_clients):
        client = Client(
            name=fake.company(),
            industry=random.choice(industries),
            contact_email=fake.company_email(),
            notes=fake.text(max_nb_chars=200)
        )
        db.add(client)
        clients.append(client)
    db.commit()
    
    print("Creating jobs...")
    skills_pool = ['Python', 'Java', 'React', 'Node.js', 'AWS', 'Docker', 'Kubernetes', 'SQL', 'NoSQL', 'TypeScript', 'Go', 'C++', 'Machine Learning', 'Data Science', 'DevOps']
    jobs = []
    for _ in range(num_jobs):
        client = random.choice(clients)
        required_skills = random.sample(skills_pool, k=random.randint(2, 5))
        min_salary = random.randint(60, 120) * 1000
        max_salary = min_salary + random.randint(10, 40) * 1000
        job = Job(
            client_id=client.id,
            title=fake.job(),
            description=fake.text(max_nb_chars=500),
            required_skills=required_skills,
            min_salary=float(min_salary),
            max_salary=float(max_salary),
            location=fake.city(),
            is_remote=random.choice([True, False]),
            status=random.choice(['open', 'open', 'open', 'closed', 'paused'])
        )
        db.add(job)
        jobs.append(job)
    db.commit()

    print("Creating candidates...")
    candidates = []
    for _ in range(num_candidates):
        candidate_skills = random.sample(skills_pool, k=random.randint(2, 6))
        candidate = Candidate(
            first_name=fake.first_name(),
            last_name=fake.last_name(),
            email=fake.unique.email(),
            phone=fake.phone_number(),
            skills=candidate_skills,
            experience_years=random.randint(1, 15),
            current_title=fake.job(),
            resume_text=fake.text(max_nb_chars=1000)
        )
        db.add(candidate)
        candidates.append(candidate)
    db.commit()

    print("Creating job applications (JobCandidates) and interviews...")
    for job in jobs:
        if job.status != 'open':
            continue
            
        num_applicants = random.randint(3, 10)
        applicants = random.sample(candidates, k=num_applicants)
        
        for applicant in applicants:
            match_score = random.uniform(0.4, 0.95)
            jc_status = random.choice(['sourced', 'screened', 'interviewed', 'offered', 'rejected'])
            jc = JobCandidate(
                job_id=job.id,
                candidate_id=applicant.id,
                status=jc_status,
                score=match_score
            )
            db.add(jc)
            db.commit() # commit to get ID
            
            if jc_status in ['interviewed', 'offered', 'rejected']:
                interview = Interview(
                    job_candidate_id=jc.id,
                    scheduled_at=datetime.now(timezone.utc) - timedelta(days=random.randint(1, 30)),
                    status='completed',
                    feedback=fake.text(max_nb_chars=200)
                )
                db.add(interview)
    db.commit()

    print("Creating sample meetings...")
    for client in clients:
        if random.random() > 0.5:
            meeting = Meeting(
                client_id=client.id,
                title=f"Intake Call - {fake.word()}",
                transcript=f"Client: We need a new {fake.job()} with experience in {random.choice(skills_pool)}.\nRecruiter: Got it. What is the salary range?\nClient: Around {random.randint(80, 120)}k.",
                summary=fake.text(max_nb_chars=150),
                date=datetime.now(timezone.utc) - timedelta(days=random.randint(1, 60))
            )
            db.add(meeting)
    db.commit()
    
    print("Creating sample recommendations...")
    for job in jobs[:20]: # Add recs for first 20 jobs
        rec = Recommendation(
            job_id=job.id,
            action_type=random.choice(['expand_search', 'adjust_salary', 'schedule_interview', 'contact_passive']),
            description=f"Consider adjusting requirements for {job.title}.",
            reasoning="Based on market data, the required skills and salary range are not aligned with current talent pool availability.",
            confidence_score=random.uniform(0.7, 0.99),
            status="pending"
        )
        db.add(rec)
    db.commit()
    
    print("Seed data generated successfully.")

if __name__ == "__main__":
    print("Setting up database schema...")
    create_db_and_tables()
    print("Starting seed data generation...")
    seed_data()
