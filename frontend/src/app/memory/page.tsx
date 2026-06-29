"use client";

import * as React from "react";
import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Database, Building2, Briefcase, Globe, DollarSign, Users, Target, Plus, X, ChevronRight } from "lucide-react";

interface ClientMemory {
  id: string;
  name: string;
  model: string;
  salary: string;
  placements: number;
  culture?: string;
  strategy?: string;
  acceptanceRate?: number;
  isPrimary?: boolean;
}

const allMemories: ClientMemory[] = [
  {
    id: "ACME-824",
    name: "Acme Corp",
    model: "Remote-first",
    salary: "$140k",
    placements: 27,
    culture: "Remote-first",
    strategy: "Accepts contract hiring",
    acceptanceRate: 84,
    isPrimary: true,
  },
  { id: "M-102", name: "TechStart Inc",      model: "Hybrid (NYC)",      salary: "$115k", placements: 5,  culture: "Hybrid",      strategy: "Permanent only",          acceptanceRate: 62 },
  { id: "M-103", name: "GlobalFin LLC",      model: "On-site (London)",  salary: "£95k",  placements: 12, culture: "On-site",     strategy: "Accepts contract hiring", acceptanceRate: 71 },
  { id: "M-104", name: "HealthPlus",         model: "Remote",            salary: "$160k", placements: 41, culture: "Remote-first", strategy: "Permanent only",         acceptanceRate: 88 },
  { id: "M-105", name: "Quantum Data",       model: "Hybrid (SF)",       salary: "$180k", placements: 8,  culture: "Hybrid",      strategy: "Accepts contract hiring", acceptanceRate: 67 },
  { id: "M-106", name: "EduTech Solutions",  model: "Remote",            salary: "$105k", placements: 15, culture: "Remote-first", strategy: "Permanent only",         acceptanceRate: 75 },
  { id: "M-107", name: "NextGen Robotics",   model: "On-site (Boston)",  salary: "$145k", placements: 3,  culture: "On-site",     strategy: "Permanent only",          acceptanceRate: 58 },
];

const colorPalette = [
  { border: "border-emerald-500/30 bg-emerald-950/10", icon: "text-emerald-400", iconBg: "bg-emerald-500/20", badge: "bg-blue-500/20 text-blue-400 border-blue-500/30",    bar: "from-emerald-500 to-teal-400"    },
  { border: "border-blue-500/30 bg-blue-950/10",       icon: "text-blue-400",    iconBg: "bg-blue-500/20",    badge: "bg-blue-500/20 text-blue-400 border-blue-500/30",    bar: "from-blue-500 to-cyan-400"       },
  { border: "border-purple-500/30 bg-purple-950/10",   icon: "text-purple-400",  iconBg: "bg-purple-500/20",  badge: "bg-purple-500/20 text-purple-400 border-purple-500/30", bar: "from-purple-500 to-pink-400"  },
  { border: "border-amber-500/30 bg-amber-950/10",     icon: "text-amber-400",   iconBg: "bg-amber-500/20",   badge: "bg-amber-500/20 text-amber-400 border-amber-500/30",  bar: "from-amber-500 to-orange-400"   },
  { border: "border-rose-500/30 bg-rose-950/10",       icon: "text-rose-400",    iconBg: "bg-rose-500/20",    badge: "bg-rose-500/20 text-rose-400 border-rose-500/30",    bar: "from-rose-500 to-pink-400"       },
  { border: "border-cyan-500/30 bg-cyan-950/10",       icon: "text-cyan-400",    iconBg: "bg-cyan-500/20",    badge: "bg-cyan-500/20 text-cyan-400 border-cyan-500/30",    bar: "from-cyan-500 to-teal-400"       },
  { border: "border-indigo-500/30 bg-indigo-950/10",   icon: "text-indigo-400",  iconBg: "bg-indigo-500/20",  badge: "bg-indigo-500/20 text-indigo-400 border-indigo-500/30", bar: "from-indigo-500 to-blue-400" },
];

export default function MemoryDashboard() {
  const [isAddMemoryOpen, setIsAddMemoryOpen] = useState(false);
  const [selectedMem, setSelectedMem] = useState<ClientMemory | null>(null);
  const [newClientName, setNewClientName] = useState("");
  const [newClientConstraint, setNewClientConstraint] = useState("");
  const [memories, setMemories] = useState<ClientMemory[]>(allMemories);

  React.useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem("agentic_memories") || "[]");
      if (stored.length > 0) {
        setMemories((prev) => {
          const existingIds = new Set(prev.map((m) => m.id));
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
        model: newClientConstraint,
        salary: "Pending Data...",
        placements: 0,
        culture: newClientConstraint,
        strategy: "To be confirmed",
        acceptanceRate: 0,
      };
      setMemories([newMemory, ...memories]);
      setNewClientName("");
      setNewClientConstraint("");
      setIsAddMemoryOpen(false);
    }
  };

  return (
    <div className="space-y-8 relative">
      {/* Header */}
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
          <span className="text-blue-400 ml-1">Click any card to view full details.</span>
        </p>
      </div>

      {/* Cards Grid */}
      <div className="grid gap-6 md:grid-cols-3">
        {memories.map((mem, i) => {
          const c = colorPalette[i % colorPalette.length];
          const rate = mem.acceptanceRate ?? Math.floor(55 + (mem.placements * 1.3) % 40);
          return (
            <Card
              key={mem.id}
              onClick={() => setSelectedMem(mem)}
              className={`${c.border} border cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-xl ${
                mem.isPrimary ? "md:col-span-3" : ""
              }`}
            >
              <CardHeader className="border-b border-white/5 pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 ${c.iconBg} rounded-lg`}>
                      <Building2 className={`w-5 h-5 ${c.icon}`} />
                    </div>
                    <div>
                      <CardTitle className={mem.isPrimary ? "text-xl" : "text-base"}>{mem.name}</CardTitle>
                      <p className="text-xs text-gray-500">Memory ID: {mem.id}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {mem.isPrimary && (
                      <span className={`px-3 py-1 text-xs rounded-full border ${c.badge}`}>High Priority</span>
                    )}
                    <ChevronRight className="w-4 h-4 text-gray-500" />
                  </div>
                </div>
              </CardHeader>

              <CardContent className="pt-4">
                {mem.isPrimary ? (
                  <div className="grid gap-4 md:grid-cols-4">
                    {[
                      { icon: <Globe className="w-4 h-4 text-purple-400" />, label: "Culture Preference", value: mem.culture || mem.model },
                      { icon: <Briefcase className="w-4 h-4 text-amber-400" />, label: "Hiring Strategy", value: mem.strategy || "—" },
                      { icon: <DollarSign className="w-4 h-4 text-emerald-400" />, label: "Average Salary", value: mem.salary },
                      { icon: <Users className="w-4 h-4 text-blue-400" />, label: "Past Placements", value: `${mem.placements} candidates` },
                    ].map((item, j) => (
                      <div key={j} className="space-y-2 p-4 bg-black/20 rounded-lg border border-white/5">
                        <div className="flex items-center gap-2 text-gray-300">
                          {item.icon}
                          <span className="font-medium text-sm">{item.label}</span>
                        </div>
                        <p className="text-lg font-semibold text-white">{item.value}</p>
                      </div>
                    ))}
                    <div className="md:col-span-4 mt-2 p-4 bg-blue-950/20 rounded-lg border border-blue-500/20">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Target className="w-5 h-5 text-blue-400" />
                          <h4 className="font-medium text-blue-100">Recommendation Acceptance Rate</h4>
                        </div>
                        <span className="text-2xl font-bold text-blue-400">{rate}%</span>
                      </div>
                      <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden mt-3">
                        <div className={`h-full bg-gradient-to-r ${c.bar} rounded-full`} style={{ width: `${rate}%` }} />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm items-center">
                      <span className="text-gray-400 flex items-center gap-1"><Globe className="w-3 h-3" /> Constraint</span>
                      <span className="text-white font-medium truncate max-w-[150px] text-right">{mem.model}</span>
                    </div>
                    <div className="flex justify-between text-sm items-center">
                      <span className="text-gray-400 flex items-center gap-1"><DollarSign className="w-3 h-3" /> Avg Salary</span>
                      <span className="text-emerald-400 font-semibold">{mem.salary}</span>
                    </div>
                    <div className="flex justify-between text-sm items-center">
                      <span className="text-gray-400 flex items-center gap-1"><Users className="w-3 h-3" /> Placements</span>
                      <span className="text-white font-medium">{mem.placements}</span>
                    </div>
                    <div className="pt-1">
                      <div className="flex justify-between text-xs text-gray-400 mb-1">
                        <span>Rec. Acceptance Rate</span>
                        <span className={`font-semibold ${c.icon}`}>{rate}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-gray-800 rounded-full overflow-hidden">
                        <div className={`h-full bg-gradient-to-r ${c.bar} rounded-full`} style={{ width: `${rate}%` }} />
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* ── Detail Modal ─────────────────────────────────────────────── */}
      {selectedMem && (() => {
        const i = memories.findIndex(m => m.id === selectedMem.id);
        const c = colorPalette[i % colorPalette.length];
        const rate = selectedMem.acceptanceRate ?? Math.floor(55 + (selectedMem.placements * 1.3) % 40);
        return (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className={`bg-gray-900 border ${c.border} rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden`}>
              {/* Modal Header */}
              <div className={`flex items-center justify-between p-6 border-b border-white/10`}>
                <div className="flex items-center gap-4">
                  <div className={`p-3 ${c.iconBg} rounded-xl`}>
                    <Building2 className={`w-7 h-7 ${c.icon}`} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">{selectedMem.name}</h3>
                    <p className="text-sm text-gray-400">Enterprise Client • Memory ID: {selectedMem.id}</p>
                  </div>
                </div>
                <button onClick={() => setSelectedMem(null)} className="p-2 hover:bg-white/10 rounded-full text-gray-400 hover:text-white transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { icon: <Globe className="w-4 h-4 text-purple-400" />,   label: "Culture / Work Model", value: selectedMem.culture || selectedMem.model },
                    { icon: <Briefcase className="w-4 h-4 text-amber-400" />, label: "Hiring Strategy",      value: selectedMem.strategy || "To be confirmed"  },
                    { icon: <DollarSign className="w-4 h-4 text-emerald-400" />, label: "Average Salary",   value: selectedMem.salary },
                    { icon: <Users className="w-4 h-4 text-blue-400" />,     label: "Total Placements",     value: `${selectedMem.placements} candidates`       },
                  ].map((item, j) => (
                    <div key={j} className="p-4 bg-black/30 rounded-xl border border-white/5 space-y-2">
                      <div className="flex items-center gap-2 text-gray-400 text-sm">
                        {item.icon}
                        <span>{item.label}</span>
                      </div>
                      <p className="text-xl font-bold text-white">{item.value}</p>
                    </div>
                  ))}
                </div>

                {/* Acceptance Rate */}
                <div className="p-5 bg-blue-950/20 rounded-xl border border-blue-500/20">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Target className="w-5 h-5 text-blue-400" />
                      <h4 className="font-semibold text-blue-100">Recommendation Acceptance Rate</h4>
                    </div>
                    <span className={`text-3xl font-bold ${c.icon}`}>{rate}%</span>
                  </div>
                  <div className="w-full h-3 bg-gray-800 rounded-full overflow-hidden">
                    <div className={`h-full bg-gradient-to-r ${c.bar} rounded-full transition-all duration-700`} style={{ width: `${rate}%` }} />
                  </div>
                  <p className="text-sm text-gray-400 mt-3">
                    {selectedMem.name} historically accepts AI recommendations {rate}% of the time.
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      })()}

      {/* ── Inject Memory Modal ──────────────────────────────────────── */}
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
  );
}
