"use client";

import * as React from "react";
import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Database, Building2, Briefcase, Globe, DollarSign, Users, Target, Plus, X } from "lucide-react";

interface ClientMemory {
  id: string;
  name: string;
  model: string;
  salary: string;
  placements: number;
  isPrimary?: boolean;
}

export default function MemoryDashboard() {
  const [isAddMemoryOpen, setIsAddMemoryOpen] = useState(false);
  const [newClientName, setNewClientName] = useState("");
  const [newClientConstraint, setNewClientConstraint] = useState("");

  const [memories, setMemories] = useState<ClientMemory[]>([
    { id: "M-102", name: "TechStart Inc", model: "Hybrid (NYC)", salary: "$115k", placements: 5 },
    { id: "M-103", name: "GlobalFin LLC", model: "On-site (London)", salary: "£95k", placements: 12 },
    { id: "M-104", name: "HealthPlus", model: "Remote", salary: "$160k", placements: 41 },
    { id: "M-105", name: "Quantum Data", model: "Hybrid (SF)", salary: "$180k", placements: 8 },
    { id: "M-106", name: "EduTech Solutions", model: "Remote", salary: "$105k", placements: 15 },
    { id: "M-107", name: "NextGen Robotics", model: "On-site (Boston)", salary: "$145k", placements: 3 },
  ]);

  React.useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem('agentic_memories') || '[]');
      if (stored.length > 0) {
        setMemories(prev => {
          // Merge avoiding duplicates by ID
          const existingIds = new Set(prev.map(m => m.id));
          const newMems = stored.filter((s: ClientMemory) => !existingIds.has(s.id));
          return [...newMems, ...prev];
        });
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const handleInjectMemory = (e: React.FormEvent) => {
    e.preventDefault();
    if (newClientName.trim() && newClientConstraint.trim()) {
      const newMemory: ClientMemory = {
        id: `M-${Math.floor(Math.random() * 900) + 100}`,
        name: newClientName,
        model: newClientConstraint, // Abusing model field to show constraint for brevity in UI
        salary: "Pending Data...",
        placements: 0
      };
      setMemories([newMemory, ...memories]);
      setNewClientName("");
      setNewClientConstraint("");
      setIsAddMemoryOpen(false);
    }
  };

  return (
    <div className="space-y-8 relative">
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Database className="w-8 h-8 text-blue-400" />
            <h2 className="text-3xl font-bold tracking-tight">Organization Memory</h2>
          </div>
          <button 
            onClick={() => setIsAddMemoryOpen(true)}
            className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-full text-sm font-medium transition-colors"
          >
            <Plus className="w-4 h-4" /> Inject Memory
          </button>
        </div>
        <p className="text-gray-400">
          Persistent context retrieved automatically by the Memory Retrieval Agent during candidate matching and requirement analysis.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Acme Corp Primary Memory Card */}
        <Card className="col-span-3 border-emerald-500/30 bg-emerald-950/10 shadow-[0_0_15px_rgba(16,185,129,0.1)]">
          <CardHeader className="border-b border-white/5 pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-emerald-500/20 rounded-lg">
                  <Building2 className="w-6 h-6 text-emerald-400" />
                </div>
                <div>
                  <CardTitle className="text-xl">Acme Corp</CardTitle>
                  <p className="text-sm text-gray-400">Enterprise Client • Memory ID: ACME-824</p>
                </div>
              </div>
              <span className="px-3 py-1 bg-blue-500/20 text-blue-400 text-xs rounded-full border border-blue-500/30">
                High Priority
              </span>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <div className="space-y-2 p-4 bg-black/20 rounded-lg border border-white/5">
                <div className="flex items-center gap-2 text-gray-300">
                  <Globe className="w-4 h-4 text-purple-400" />
                  <span className="font-medium">Culture Preference</span>
                </div>
                <p className="text-lg font-semibold text-white">Remote-first</p>
              </div>

              <div className="space-y-2 p-4 bg-black/20 rounded-lg border border-white/5">
                <div className="flex items-center gap-2 text-gray-300">
                  <Briefcase className="w-4 h-4 text-amber-400" />
                  <span className="font-medium">Hiring Strategy</span>
                </div>
                <p className="text-lg font-semibold text-white">Accepts contract hiring</p>
              </div>

              <div className="space-y-2 p-4 bg-black/20 rounded-lg border border-white/5">
                <div className="flex items-center gap-2 text-gray-300">
                  <DollarSign className="w-4 h-4 text-emerald-400" />
                  <span className="font-medium">Average Salary</span>
                </div>
                <p className="text-lg font-semibold text-white">$140k</p>
              </div>

              <div className="space-y-2 p-4 bg-black/20 rounded-lg border border-white/5">
                <div className="flex items-center gap-2 text-gray-300">
                  <Users className="w-4 h-4 text-blue-400" />
                  <span className="font-medium">Past Placements</span>
                </div>
                <p className="text-lg font-semibold text-white">27 candidates</p>
              </div>
            </div>

            <div className="mt-6 p-4 bg-blue-950/20 rounded-lg border border-blue-500/20">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-blue-400" />
                  <h4 className="font-medium text-blue-100">Recommendation Acceptance Rate</h4>
                </div>
                <span className="text-2xl font-bold text-blue-400">84%</span>
              </div>
              <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden mt-3">
                <div className="h-full bg-blue-500 w-[84%]"></div>
              </div>
              <p className="text-sm text-gray-400 mt-2">
                Acme Corp historically accepts AI recommendations 84% of the time, validating our aggressive candidate outreach strategy.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Dynamically mapped other generic memories for context */}
        {memories.map((mem) => (
          <Card key={mem.id} className="opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Building2 className="w-5 h-5" />
                <div>
                  <CardTitle className="text-lg">{mem.name}</CardTitle>
                  <p className="text-xs text-gray-500">Memory ID: {mem.id}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Constraint</span>
                  <span className="text-white max-w-[150px] truncate" title={mem.model}>{mem.model}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Avg Salary</span>
                  <span className="text-white">{mem.salary}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Placements</span>
                  <span className="text-white">{mem.placements}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add Memory Modal */}
      {isAddMemoryOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-gray-900 border border-white/10 p-6 rounded-2xl w-full max-w-md shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-white">Inject New Context Memory</h3>
              <button onClick={() => setIsAddMemoryOpen(false)} className="text-gray-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleInjectMemory} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Client Name</label>
                <input 
                  type="text" 
                  value={newClientName}
                  onChange={(e) => setNewClientName(e.target.value)}
                  placeholder="e.g. Globex Corp" 
                  className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-gray-600 focus:outline-none focus:border-purple-500 transition-colors"
                  autoFocus
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Key Constraint / Culture</label>
                <input 
                  type="text" 
                  value={newClientConstraint}
                  onChange={(e) => setNewClientConstraint(e.target.value)}
                  placeholder="e.g. Requires TS/SCI clearance" 
                  className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-gray-600 focus:outline-none focus:border-purple-500 transition-colors"
                />
              </div>
              <button 
                type="submit"
                disabled={!newClientName.trim() || !newClientConstraint.trim()}
                className="w-full bg-purple-600 hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white py-2 rounded-lg font-medium transition-colors mt-2"
              >
                Save to Organization Memory
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
