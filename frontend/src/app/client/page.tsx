"use client";

import * as React from "react";
import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { CheckCircle2, Clock, Users, Building2, ChevronDown } from "lucide-react";

interface OrgData {
  id: string;
  name: string;
  industry: string;
  openRoles: number;
  candidates: number;
  placements: number;
  jobs: { role: string; progress: number; status: string; candidates: number }[];
}

const orgs: OrgData[] = [
  {
    id: "acme",
    name: "Acme Corp",
    industry: "Technology",
    openRoles: 3,
    candidates: 12,
    placements: 4,
    jobs: [
      { role: "Senior Data Scientist",       progress: 80, status: "Final Interviews", candidates: 3 },
      { role: "Frontend Developer (React)",  progress: 45, status: "Screening",        candidates: 8 },
      { role: "VP of Engineering",           progress: 15, status: "Sourcing",         candidates: 1 },
    ],
  },
  {
    id: "techstart",
    name: "TechStart Inc",
    industry: "SaaS",
    openRoles: 2,
    candidates: 7,
    placements: 2,
    jobs: [
      { role: "Full Stack Engineer",         progress: 65, status: "Screening",        candidates: 5 },
      { role: "Product Manager",             progress: 30, status: "Sourcing",         candidates: 2 },
    ],
  },
  {
    id: "globalfin",
    name: "GlobalFin LLC",
    industry: "Finance",
    openRoles: 4,
    candidates: 18,
    placements: 6,
    jobs: [
      { role: "Quantitative Analyst",        progress: 90, status: "Final Interviews", candidates: 2 },
      { role: "Risk Manager",                progress: 55, status: "Screening",        candidates: 7 },
      { role: "Compliance Officer",          progress: 35, status: "Sourcing",         candidates: 6 },
      { role: "Financial Data Engineer",     progress: 20, status: "Sourcing",         candidates: 3 },
    ],
  },
  {
    id: "healthplus",
    name: "HealthPlus",
    industry: "Healthcare",
    openRoles: 2,
    candidates: 9,
    placements: 5,
    jobs: [
      { role: "Clinical Data Scientist",     progress: 70, status: "Screening",        candidates: 6 },
      { role: "HIPAA Compliance Lead",       progress: 40, status: "Sourcing",         candidates: 3 },
    ],
  },
  {
    id: "quantum",
    name: "Quantum Data",
    industry: "AI/ML",
    openRoles: 3,
    candidates: 14,
    placements: 3,
    jobs: [
      { role: "ML Infrastructure Engineer", progress: 60, status: "Screening",        candidates: 8 },
      { role: "LLM Research Scientist",     progress: 25, status: "Sourcing",         candidates: 4 },
      { role: "AI Product Manager",         progress: 10, status: "Sourcing",         candidates: 2 },
    ],
  },
  {
    id: "nextgen",
    name: "NextGen Robotics",
    industry: "Robotics",
    openRoles: 1,
    candidates: 4,
    placements: 1,
    jobs: [
      { role: "Robotics Software Engineer", progress: 50, status: "Screening",        candidates: 4 },
    ],
  },
];

export default function ClientDashboard() {
  const [activeOrgId, setActiveOrgId] = useState("acme");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const org = orgs.find((o) => o.id === activeOrgId) || orgs[0];

  return (
    <div className="space-y-8">
      {/* Header + Org Switcher */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-3xl font-bold tracking-tight">Client Portal</h2>

        {/* Org switcher dropdown */}
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-3 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 px-4 py-2 rounded-full text-sm font-medium border border-blue-500/20 transition-colors min-w-[200px] justify-between"
          >
            <div className="flex items-center gap-2">
              <Building2 className="w-4 h-4" />
              <span>{org.name}</span>
            </div>
            <ChevronDown className={`w-4 h-4 transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-64 bg-gray-900 border border-white/10 rounded-xl shadow-2xl z-50 overflow-hidden">
              {orgs.map((o) => (
                <button
                  key={o.id}
                  onClick={() => { setActiveOrgId(o.id); setDropdownOpen(false); }}
                  className={`w-full text-left px-4 py-3 flex items-center justify-between transition-colors hover:bg-white/5 ${
                    o.id === activeOrgId ? "bg-blue-500/10 text-blue-400" : "text-gray-300"
                  }`}
                >
                  <div>
                    <p className="font-medium">{o.name}</p>
                    <p className="text-xs text-gray-500">{o.industry}</p>
                  </div>
                  {o.id === activeOrgId && <CheckCircle2 className="w-4 h-4 text-blue-400" />}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Industry badge */}
      <p className="text-gray-400 -mt-4 text-sm">
        Viewing active pipeline for <span className="text-white font-medium">{org.name}</span>
        <span className="ml-2 px-2 py-0.5 bg-white/5 border border-white/10 text-gray-400 text-xs rounded-full">{org.industry}</span>
      </p>

      {/* Stat cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Open Roles</CardTitle>
            <Clock className="h-4 w-4 text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{org.openRoles}</div>
            <p className="text-xs text-muted-foreground">Active searches</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Candidates in Pipeline</CardTitle>
            <Users className="h-4 w-4 text-emerald-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{org.candidates}</div>
            <p className="text-xs text-muted-foreground">Screened by AI</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Recent Placements</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-purple-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{org.placements}</div>
            <p className="text-xs text-muted-foreground">This quarter</p>
          </CardContent>
        </Card>
      </div>

      {/* Hiring progress */}
      <Card>
        <CardHeader>
          <CardTitle>Active Hiring Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {org.jobs.map((job, i) => (
              <div key={i} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium text-white">{job.role}</span>
                  <span className="text-gray-400">{job.status}</span>
                </div>
                <div className="w-full bg-white/5 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-emerald-400 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${job.progress}%` }}
                  />
                </div>
                <p className="text-xs text-gray-500">{job.candidates} qualified candidates presented</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
