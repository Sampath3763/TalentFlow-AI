# ⏱️ 2-to-3 Minute Live Demo Walkthrough Guide

This document is a step-by-step recruiter walkthrough for giving a high-impact, fast-paced live demo of **TalentFlow AI**.

---

## 📋 Pre-Demo Checklist
1. **API Keys**: Ensure `frontend/.env.local` contains a valid `GEMINI_API_KEY`.
2. **Servers Running**: 
   - Frontend running on Port 3000 ([http://localhost:3000](http://localhost:3000))
   - Backend running on Port 8000 ([http://localhost:8000](http://localhost:8000))
3. **Database Seeded**: Confirm you ran the seed script (`python generate_data.py` inside `seed/`) to populate the dashboard metrics.
4. **Prepare Copy Text**: Have the sample FinTech or NovaBank transcript open in a side window, ready to copy.
5. **Clean State**: Clear browser local storage if you want to start the Memory tab fresh (`localStorage.clear()` in DevTools console).

---

## ⏱️ Step-by-Step Walkthrough Timeline

### Phase 1: Ingestion (0:00 - 0:45)
- **On-Screen Action**: Start on the Home Page (`/`). Scroll down briefly showing the features. Click **Live Demo** in the navbar, paste the transcript, and click **Analyze Transcript**.
- **What to Say**: 
  > *"Welcome to TalentFlow AI — the Decision Operating System for recruiting. Traditional ATS platforms passively record data, they don't help you act. Let's paste this meeting transcript and hit Analyze. Gemini 2.5 Flash extracts decisions, action items, and security risks in under 8 seconds."*

---

### Phase 2: Agentic Execution (0:45 - 1:30)
- **On-Screen Action**: As the `AgentGraph` animates, point out each node step-by-step. Let the pipeline complete, then highlight the extracted item cards on the right.
- **What to Say**:
  > *"Our FastAPI and LangGraph backend orchestrates the multi-agent workflow — parsing requirements, checking candidate matches, and flagging risks. Once complete, we see the extracted decisions and critical issues directly on screen. Let's approve this to push it to the dashboard."*

---

### Phase 3: Recruiter Dashboard & Explainability (1:30 - 2:15)
- **On-Screen Action**: Click **Push to Dashboard**. Point out the green **✨ LIVE** banner and cards at the top of the queue. Click on the first card to slide out the **Explainability Drawer**.
- **What to Say**:
  > *"Our approved AI intelligence is immediately injected into the Recruiter Dashboard with a 'LIVE' badge. To defeat black-box AI, the Explainability Drawer shows the exact reasoning: confidence score, direct transcript evidence, alternatives evaluated, and projected business impact. The recruiter can Approve or Reject each recommendation here."*

---

### Phase 4: Evolving Memory & Wrap-Up (2:15 - 2:30)
- **On-Screen Action**: Approve a recommendation card. Navigate to the **Memory** page. Point to the Acme Corp memory profile card.
- **What to Say**:
  > *"Every approved or rejected decision writes back to our persistent memory layer. The platform dynamically learns each client's constraints over time. TalentFlow AI cuts time-to-hire by 18%, eliminates manual processing, and keeps recruiters in complete control. Thank you!"*

---

## 💡 Top 3 Demo Tips for Success
1. **Keep talking during animations**: The upload spinner and agent step animations take 1.5–2 seconds each — use that time to narrate the next point.
2. **Pause on the Dashboard injection**: Give the audience a second to visually register the ✨ LIVE badge — it is the most visually impactful moment.
3. **Slide the Explainability Drawer slowly**: Hover to show the smooth Framer Motion animation — it reinforces that this is a polished, production-quality product.
