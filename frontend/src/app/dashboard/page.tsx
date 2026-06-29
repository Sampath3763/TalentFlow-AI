"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { CheckCircle2, AlertCircle, Clock, ArrowRight, Plus, X, Sparkles } from 'lucide-react';
import { ExplainabilityDrawer, ExplanationData } from "@/components/ExplainabilityDrawer";

export default function Dashboard() {
  const [selectedExplanation, setSelectedExplanation] = useState<ExplanationData | null>(null);
  const [isAddJobOpen, setIsAddJobOpen] = useState(false);
  const [newJobTitle, setNewJobTitle] = useState("");
  const [liveExtractionBanner, setLiveExtractionBanner] = useState(false);
  
  const [activeJobsPipeline, setActiveJobsPipeline] = useState([
    "Full Stack Developer", 
    "Data Scientist", 
    "UI/UX Designer", 
    "Cloud Engineer"
  ]);

  const [activeJobsCount, setActiveJobsCount] = useState(24);
  const [pendingActionsCount, setPendingActionsCount] = useState(7);

  const mockExplanations: Record<string, ExplanationData> = {
    "Increase max salary to $160k": {
      action: "Increase salary to 160k",
      confidence: 91,
      evidence: "2025 Salary Report",
      retrievedDocs: "AWS DevOps Compensation Study",
      alternatives: "Remote Hiring",
      expectedImpact: "+18% candidate acceptance"
    },
    "Expand search radius to 50 miles": {
      action: "Expand search radius",
      confidence: 94,
      evidence: "Local talent pool exhaustion analysis",
      retrievedDocs: "Q2 Regional Talent Density Map",
      alternatives: "Increase relocation bonus",
      expectedImpact: "+42% more sourced candidates"
    },
    "Schedule interview with Sarah J.": {
      action: "Fast-track interview",
      confidence: 98,
      evidence: "High flight risk behavior detected",
      retrievedDocs: "Candidate Engagement ML Model",
      alternatives: "Standard 3-day wait",
      expectedImpact: "-60% drop-off probability"
    },
    "Target competitor layoff talent": {
      action: "Target competitor layoff talent",
      confidence: 96,
      evidence: "Recent 15% RIF at TechCorp",
      retrievedDocs: "Tech News Scraping & Competitor Intel",
      alternatives: "General outbound campaign",
      expectedImpact: "+25% response rate"
    },
    "Adjust required years of experience to 3+": {
      action: "Adjust required years of experience to 3+",
      confidence: 88,
      evidence: "Skills gap analysis vs role requirements",
      retrievedDocs: "Modern Framework Adoption Trends",
      alternatives: "Keep at 5+ years",
      expectedImpact: "Doubles available talent pool"
    },
    "Flag diversity hiring deficit": {
      action: "Flag diversity hiring deficit",
      confidence: 99,
      evidence: "Pipeline demographic variance",
      retrievedDocs: "EEO Compliance & Org Goals 2026",
      alternatives: "Status quo",
      expectedImpact: "+12% underrepresented minority pipeline"
    },
    "Counter-offer mitigation plan": {
      action: "Counter-offer mitigation plan",
      confidence: 92,
      evidence: "Candidate historically retained by counter-offers",
      retrievedDocs: "Predictive Retention ML Model",
      alternatives: "Standard offer package",
      expectedImpact: "-40% risk of candidate drop out"
    },
    "Align Timezone overlap": {
      action: "Align Timezone overlap",
      confidence: 95,
      evidence: "Team mostly based in EST",
      retrievedDocs: "Engineering Team Topology Data",
      alternatives: "Asynchronous workflow adjustment",
      expectedImpact: "+30% team velocity"
    },
    "Pivot to contract-to-hire": {
      action: "Pivot to contract-to-hire",
      confidence: 85,
      evidence: "Budget constraint flagged in Q3",
      retrievedDocs: "Finance Department Memo",
      alternatives: "Delay hiring until Q4",
      expectedImpact: "Immediate resource availability"
    },
    "Match candidate with Visa Sponsorship": {
      action: "Match candidate with Visa Sponsorship",
      confidence: 97,
      evidence: "Candidate requires H1B transfer",
      retrievedDocs: "Legal Counsel Sponsorship Guidelines",
      alternatives: "Reject candidate",
      expectedImpact: "Secure top 1% technical talent"
    }
  };

  const initialRecommendations = [
    { job: "Senior Python Engineer", action: "Expand search radius to 50 miles", reason: "Local talent pool exhausted. Confidence: 94%", type: "warning" },
    { job: "Product Manager", action: "Schedule interview with Sarah J.", reason: "High flight risk candidate. 98% match.", type: "urgent" },
    { job: "DevOps Architect", action: "Increase max salary to $160k", reason: "Market benchmark indicates current offer is 15% below median.", type: "info" },
    { job: "Frontend Lead", action: "Target competitor layoff talent", reason: "TechCorp recently announced RIFs in UI division. Confidence: 96%", type: "info" },
    { job: "Backend Developer", action: "Adjust required years of experience to 3+", reason: "Role requires specific modern stack over tenure. Confidence: 88%", type: "warning" },
    { job: "VP of Engineering", action: "Flag diversity hiring deficit", reason: "Pipeline lacks gender diversity. Confidence: 99%", type: "urgent" },
    { job: "Machine Learning Engineer", action: "Counter-offer mitigation plan", reason: "Candidate is interviewing at 3 other AI labs. Confidence: 92%", type: "urgent" },
    { job: "Customer Success Manager", action: "Align Timezone overlap", reason: "Client base predominantly EST. Confidence: 95%", type: "info" },
    { job: "Data Analyst", action: "Pivot to contract-to-hire", reason: "Department budget constraints detected. Confidence: 85%", type: "warning" },
    { job: "System Architect", action: "Match candidate with Visa Sponsorship", reason: "Candidate is willing to relocate with H1B. Confidence: 97%", type: "info" }
  ];

  const [recommendations, setRecommendations] = useState(initialRecommendations);

  // ── On mount: pull any AI-extracted items approved from the Demo page ──
  useEffect(() => {
    try {
      const raw = sessionStorage.getItem("talentflow_extracted");
      if (raw) {
        const items: any[] = JSON.parse(raw);
        if (items.length > 0) {
          const mapped = items.map((item: any) => ({
            job: item.owner || "AI Extracted Intelligence",
            action: item.title,
            reason: `${item.description}${item.confidence ? ` Confidence: ${item.confidence}%` : ""}${item.riskType ? ` | Risk: ${item.riskType}` : ""}`,
            type: item.type === "risk" ? "urgent" : item.type === "action" ? "warning" : "info",
            isLive: true,
          }));
          setRecommendations((prev) => [...mapped, ...prev]);
          setLiveExtractionBanner(true);
          // Clear so refreshing doesn't re-inject
          sessionStorage.removeItem("talentflow_extracted");
        }
      }
    } catch (e) {
      // sessionStorage unavailable — skip silently
    }
  }, []);

  const handleAddJob = (e: React.FormEvent) => {
    e.preventDefault();
    if (newJobTitle.trim()) {
      setActiveJobsPipeline([newJobTitle, ...activeJobsPipeline]);
      setActiveJobsCount(prev => prev + 1);
      setNewJobTitle("");
      setIsAddJobOpen(false);
    }
  };

  const handleAction = (e: React.MouseEvent, index: number, actionType: "approve" | "reject", rec: any) => {
    e.stopPropagation();
    
    if (actionType === "approve") {
      const existingMemories = JSON.parse(localStorage.getItem('agentic_memories') || '[]');
      existingMemories.unshift({
        id: `M-${Math.floor(Math.random() * 900) + 100}`,
        name: rec.job,
        model: `Learned: ${rec.action}`, 
        salary: "Dynamic",
        placements: existingMemories.length + 1
      });
      localStorage.setItem('agentic_memories', JSON.stringify(existingMemories));
    }

    const newRecs = [...recommendations];
    newRecs.splice(index, 1);
    setRecommendations(newRecs);
  };

  return (
    <div className="space-y-8 relative">
      {liveExtractionBanner && (
        <div className="flex items-center gap-3 p-4 bg-emerald-950/40 border border-emerald-500/30 rounded-xl">
          <Sparkles className="w-5 h-5 text-emerald-400 flex-shrink-0" />
          <p className="text-sm text-emerald-300">
            <strong>Live AI Intelligence Injected</strong> — Decisions, actions and risks extracted from your approved transcript analysis have been added to the top of your action queue.
          </p>
          <button onClick={() => setLiveExtractionBanner(false)} className="ml-auto text-gray-500 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">Recruiter Dashboard</h2>
        <div className="flex gap-4">
          <button 
            onClick={() => setIsAddJobOpen(true)}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full text-sm font-medium transition-colors"
          >
            <Plus className="w-4 h-4" /> Add Requisition
          </button>
          <div className="bg-emerald-500/10 text-emerald-400 px-4 py-2 rounded-full text-sm font-medium border border-emerald-500/20">
            Agent Status: Online & Monitoring
          </div>
        </div>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Jobs</CardTitle>
            <TargetIcon className="h-4 w-4 text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold transition-all">{activeJobsCount}</div>
            <p className="text-xs text-muted-foreground">+2 since last week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Actions</CardTitle>
            <AlertCircle className="h-4 w-4 text-amber-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-400 transition-all">{recommendations.length}</div>
            <p className="text-xs text-muted-foreground">Require human approval</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Time-to-Hire</CardTitle>
            <Clock className="h-4 w-4 text-purple-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18 days</div>
            <p className="text-xs text-muted-foreground">-4 days vs industry avg</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Placement Rate</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-emerald-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">92%</div>
            <p className="text-xs text-muted-foreground">+5% from last month</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Recommended Actions (Human-in-the-Loop)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
              {recommendations.length === 0 ? (
                <div className="text-center py-8 text-gray-500">No pending actions. You're all caught up!</div>
              ) : (
                recommendations.map((rec: any, i) => (
                  <div
                    key={i}
                    role="button"
                    tabIndex={0}
                    className={`flex items-center justify-between p-4 rounded-lg border transition-colors cursor-pointer group ${
                      rec.isLive
                        ? "border-emerald-500/30 bg-emerald-950/20 hover:bg-emerald-950/30"
                        : "border-white/5 bg-white/5 hover:bg-white/10"
                    }`}
                    onClick={() => {
                      if (mockExplanations[rec.action]) {
                        setSelectedExplanation(mockExplanations[rec.action]);
                      }
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        if (mockExplanations[rec.action]) {
                          setSelectedExplanation(mockExplanations[rec.action]);
                        }
                      }
                    }}
                  >
                    <div className="space-y-1 pointer-events-none flex-1 min-w-0 mr-4">
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-white group-hover:text-blue-300 transition-colors truncate">{rec.job}</p>
                        {rec.isLive && (
                          <span className="flex-shrink-0 text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full font-semibold flex items-center gap-1">
                            <Sparkles className="w-3 h-3" /> LIVE
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-300 truncate">{rec.action}</p>
                      <p className="text-xs text-gray-500 line-clamp-2">{rec.reason}</p>
                    </div>
                    <div className="flex gap-2 flex-shrink-0">
                      <button
                        onClick={(e) => handleAction(e, i, "approve", rec)}
                        className="px-3 py-1 bg-emerald-500/20 text-emerald-400 rounded hover:bg-emerald-500/30 text-sm transition-colors"
                      >
                        Approve
                      </button>
                      <button
                        onClick={(e) => handleAction(e, i, "reject", rec)}
                        className="px-3 py-1 bg-rose-500/20 text-rose-400 rounded hover:bg-rose-500/30 text-sm transition-colors"
                      >
                        Reject
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
        
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Active Jobs AI Pipeline</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activeJobsPipeline.map((job, i) => (
                <div key={i} className="flex items-center justify-between p-2 rounded hover:bg-white/5 transition-colors">
                  <span className="text-sm font-medium">{job}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-emerald-400">Sourced</span>
                    <ArrowRight className="w-3 h-3 text-gray-600" />
                    <span className="text-xs text-blue-400">Screening</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <ExplainabilityDrawer 
        isOpen={!!selectedExplanation} 
        onClose={() => setSelectedExplanation(null)}
        data={selectedExplanation}
      />

      {/* Add Job Modal */}
      {isAddJobOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-gray-900 border border-white/10 p-6 rounded-2xl w-full max-w-md shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-white">Add New Requisition</h3>
              <button onClick={() => setIsAddJobOpen(false)} className="text-gray-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleAddJob} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Job Title</label>
                <input 
                  type="text" 
                  value={newJobTitle}
                  onChange={(e) => setNewJobTitle(e.target.value)}
                  placeholder="e.g. Senior Rust Engineer" 
                  className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500 transition-colors"
                  autoFocus
                />
              </div>
              <button 
                type="submit"
                disabled={!newJobTitle.trim()}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white py-2 rounded-lg font-medium transition-colors"
              >
                Inject into AI Pipeline
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

function TargetIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  )
}
