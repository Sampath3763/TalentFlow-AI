"use client";

import React, { useState, useEffect, useRef } from "react";
import { UploadCloud, FileAudio, FileText, CheckCircle2, AlertTriangle, Lightbulb, RotateCcw, ThumbsUp, ThumbsDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { AgentGraph } from "@/components/AgentGraph";
import { AgentTimeline } from "@/components/AgentTimeline";

export default function DemoPage() {
  const [uploadState, setUploadState] = useState<"idle" | "uploading" | "processing" | "htl_pause" | "htl_rejected" | "done">("idle");
  const [currentStep, setCurrentStep] = useState(0);
  const [activeTab, setActiveTab] = useState<"upload" | "paste">("upload");
  const [pastedText, setPastedText] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // State for dynamic AI extractions
  const [extractedItems, setExtractedItems] = useState<any[]>([]);
  const [apiError, setApiError] = useState("");
  const [orgName, setOrgName] = useState("");
  const [meetingTitle, setMeetingTitle] = useState("");

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = (ev) => {
        const text = ev.target?.result as string;
        setPastedText(text);
        startDemo(text);
      };
      reader.readAsText(file);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = (ev) => {
        const text = ev.target?.result as string;
        setPastedText(text);
        startDemo(text);
      };
      reader.readAsText(file);
    }
  };

  const startDemo = async (textToAnalyze = pastedText) => {
    setUploadState("uploading");
    setApiError("");
    setExtractedItems([]);
    setCurrentStep(0);

    setTimeout(() => {
      setUploadState("processing");
    }, 1500);

    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ transcript: textToAnalyze })
      });

      const data = await res.json();

      if (res.ok && data.items) {
        setExtractedItems(data.items);
        if (data.orgName)    setOrgName(data.orgName);
        if (data.meetingTitle) setMeetingTitle(data.meetingTitle);
      } else {
        setApiError(data.error || "Failed to parse transcript");
      }
    } catch (e) {
      setApiError("Network error occurred while calling AI backend.");
    }
  };

  const handlePasteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pastedText.trim().length > 10) {
      startDemo();
    }
  };

  const handleReset = () => {
    setUploadState("idle");
    setCurrentStep(0);
    setExtractedItems([]);
    setApiError("");
    setOrgName("");
    setMeetingTitle("");
    setPastedText("");
    setSelectedFile(null);
  };

  // ─── Save org to Memory page localStorage on completion ─────────────────
  const saveOrgToMemory = (name: string, title: string) => {
    if (!name || name === "Unknown Organisation") return;
    try {
      const existing = JSON.parse(localStorage.getItem("agentic_memories") || "[]");
      const alreadyExists = existing.some((m: any) => m.name === name);
      if (!alreadyExists) {
        const newEntry = {
          id: `M-${Date.now().toString().slice(-4)}`,
          name,
          model: title || "Meeting Analysis",
          salary: "Pending Data...",
          placements: 0,
          culture: "To be confirmed",
          strategy: "To be confirmed",
          acceptanceRate: 0,
        };
        localStorage.setItem("agentic_memories", JSON.stringify([newEntry, ...existing]));
      }
    } catch (e) {
      console.error("Failed to save org memory:", e);
    }
  };
  // ────────────────────────────────────────────────────────────────────────

  // ─── Human-in-the-Loop handlers ──────────────────────────────────────────
  const handleHtlApprove = () => {
    // Persist extracted intelligence to sessionStorage for dashboard
    if (extractedItems.length > 0) {
      sessionStorage.setItem("talentflow_extracted", JSON.stringify(extractedItems));
    }
    // Save org + meeting title to Memory page
    saveOrgToMemory(orgName, meetingTitle);
    setCurrentStep(6); // advance to END
    setUploadState("done");
  };

  const handleHtlReject = () => {
    setUploadState("htl_rejected");
    setCurrentStep(5); // stay at Human Approval node, show rejected state
  };
  // ─────────────────────────────────────────────────────────────────────────

  const loadSample = () => {
    setPastedText(
      `**NovaBank Digital – Cybersecurity Incident War Room**\n\n**Date:** June 22, 2026\n**Duration:** 74 minutes\n\n**Participants:**\n* Elena (CEO)\n* Marcus (CISO)\n* Priya (Head of Engineering)\n* David (Legal Counsel)\n* Sophia (Communications Director)\n* Liam (Infrastructure Manager)\n* Rachel (Customer Operations Lead)\n* Ethan (Board Representative)\n\nElena: Thank you for joining on short notice. Marcus, give us the situation.\n\nMarcus: At approximately 2:14 AM UTC, our monitoring systems detected abnormal outbound traffic from one of our customer analytics environments. Initial investigation suggests unauthorized access to an internal reporting database.\n\nElena: Customer data?\n\nMarcus: Potentially. We don't yet know the full scope.\n\nDavid: We need precision. The difference between exposure and confirmed exfiltration determines our legal obligations.\n\nPriya: The affected environment was segmented, but it contained replicated customer records used for analytics testing.\n\nRachel: Are those real customer records or anonymized datasets?\n\nPriya: Mixed. About seventy percent anonymized, thirty percent contained identifiable information for edge-case validation.\n\nElena: Thirty percent?\n\nPriya: Yes.\n\nEthan: Why are we using production data in testing environments?\n\nPriya: Historical reasons. We planned a migration but delayed it twice.\n\nMarcus: Right now, blame isn't productive. Containment is.\n\nLiam: We isolated the affected cluster thirty minutes after detection. External connections have been blocked, and credentials rotated...\n\n[Transcript continues]...\n\nElena: Let's summarize decisions.\n\nMarcus: External incident response firm approved immediately.\n\nPriya: Analytics features temporarily disabled.\n\nLiam: Full credential rotation across legacy systems.\n\nSophia: Internal employee memo within one hour.\n\nDavid: Preliminary public statements drafted tonight.\n\nElena: Production data removed from future testing environments.\n\nPriya: Mandatory MFA implementation accelerated.\n\nMarcus: Quarterly access reviews instituted.\n\nElena: Thank you, everyone. We reconvene in four hours. Stay focused and document everything.`
    );
  };

  // ─── Agent progress simulation ─────────────────────────────────────────
  // Advances 1 step every 2s while "processing", PAUSES at step 5 for HTL
  useEffect(() => {
    if (uploadState === "processing") {
      const interval = setInterval(() => {
        setCurrentStep((prev) => {
          if (prev >= 5) {
            // Reached Human Approval — pause and wait for real user action
            clearInterval(interval);
            setUploadState("htl_pause");
            return 5;
          }
          return prev + 1;
        });
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [uploadState]);
  // ─────────────────────────────────────────────────────────────────────────

  const fileName = selectedFile ? selectedFile.name : (activeTab === "upload" ? "NovaBank_Incident_Response_0622.wav" : "Custom_Transcript_Data");

  return (
    <div className="space-y-8 max-w-6xl mx-auto px-4">
      <div className="text-center space-y-4">
        <h2 className="text-4xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400">
          Agentic Analysis Demo
        </h2>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Upload a real meeting recording or paste a transcript below to trigger the multi-agent decision intelligence pipeline.
        </p>
      </div>

      <AnimatePresence mode="wait">

        {/* ── IDLE: Input area ─────────────────────────────────── */}
        {uploadState === "idle" && (
          <motion.div
            key="idle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mt-12 max-w-3xl mx-auto"
          >
            <div className="flex bg-gray-900 rounded-lg p-1 mb-6 w-fit mx-auto border border-white/10">
              <button
                onClick={() => setActiveTab("upload")}
                className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === "upload" ? "bg-white/10 text-white" : "text-gray-400 hover:text-white"}`}
              >
                File Upload
              </button>
              <button
                onClick={() => setActiveTab("paste")}
                className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === "paste" ? "bg-white/10 text-white" : "text-gray-400 hover:text-white"}`}
              >
                Paste Transcript
              </button>
            </div>

            {activeTab === "upload" ? (
              <div
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-white/20 hover:border-blue-500/50 rounded-3xl p-20 flex flex-col items-center justify-center text-center cursor-pointer transition-colors group bg-black/20"
              >
                <input
                  type="file"
                  className="hidden"
                  ref={fileInputRef}
                  onChange={handleFileSelect}
                  accept=".txt,.pdf,.mp3,.mp4,.wav"
                />
                <div className="p-6 bg-white/5 rounded-full mb-6 group-hover:scale-110 transition-transform">
                  <UploadCloud className="w-16 h-16 text-blue-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Drag & Drop Transcript</h3>
                <p className="text-gray-400">or click to browse files (MP3, MP4, TXT, PDF)</p>
              </div>
            ) : (
              <form onSubmit={handlePasteSubmit} className="bg-black/20 border border-white/10 rounded-3xl p-6">
                <div className="flex justify-between items-center mb-4">
                  <p className="text-sm text-gray-400">Paste your meeting notes or requirements:</p>
                  <button
                    type="button"
                    onClick={loadSample}
                    className="text-xs bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full hover:bg-blue-500/30 transition-colors"
                  >
                    Load Sample Transcript
                  </button>
                </div>
                <textarea
                  value={pastedText}
                  onChange={(e) => setPastedText(e.target.value)}
                  placeholder="Paste the meeting transcript or requirements here to simulate live data injection..."
                  className="w-full h-64 bg-black/50 border border-white/10 rounded-xl p-4 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500 transition-colors resize-none mb-4 custom-scrollbar"
                />
                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={pastedText.trim().length < 10}
                    className="bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-8 py-3 rounded-lg font-medium transition-colors flex items-center gap-2"
                  >
                    <FileText className="w-5 h-5" /> Analyze Transcript
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        )}

        {/* ── UPLOADING: Progress bar ───────────────────────────── */}
        {uploadState === "uploading" && (
          <motion.div
            key="uploading"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="flex flex-col items-center justify-center py-32"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              {activeTab === "upload" ? (
                <FileAudio className="w-24 h-24 text-emerald-400 mb-6" />
              ) : (
                <FileText className="w-24 h-24 text-blue-400 mb-6" />
              )}
            </motion.div>
            <h3 className="text-2xl font-bold text-white mb-2">
              {activeTab === "upload" ? `Uploading "${fileName}"...` : 'Parsing Transcript Data...'}
            </h3>
            <div className="w-64 h-2 bg-gray-800 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.5, ease: "linear" }}
                className="h-full bg-emerald-500"
              />
            </div>
          </motion.div>
        )}

        {/* ── PROCESSING / HTL_PAUSE / HTL_REJECTED / DONE: Agent graph ── */}
        {(uploadState === "processing" || uploadState === "htl_pause" || uploadState === "htl_rejected" || uploadState === "done") && (
          <motion.div
            key="processing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid lg:grid-cols-3 gap-8 mt-8"
          >
            <div className="lg:col-span-2 space-y-6">
              {/* File status bar */}
              <div className="flex justify-between items-center bg-gray-900/50 p-4 rounded-xl border border-white/5">
                <div className="flex items-center gap-3">
                  {activeTab === "upload" ? (
                    <FileAudio className="w-6 h-6 text-emerald-400" />
                  ) : (
                    <FileText className="w-6 h-6 text-blue-400" />
                  )}
                  <span className="font-medium truncate max-w-xs">{fileName}</span>
                </div>
                <span className={`text-sm px-3 py-1 rounded-full ${
                  uploadState === "done"
                    ? "text-emerald-400 bg-emerald-400/10"
                    : uploadState === "htl_rejected"
                    ? "text-rose-400 bg-rose-400/10"
                    : uploadState === "htl_pause"
                    ? "text-amber-400 bg-amber-400/10 animate-pulse"
                    : "text-blue-400 bg-blue-400/10"
                }`}>
                  {uploadState === "done"
                    ? "Analysis Complete"
                    : uploadState === "htl_rejected"
                    ? "Pipeline Rejected"
                    : uploadState === "htl_pause"
                    ? "⏸ Awaiting Human Approval"
                    : "Processing"}
                </span>
              </div>

              <AgentGraph currentStep={currentStep} uploadState={uploadState} />

              {/* ── HTL Approve / Reject panel ────────────────────── */}
              <AnimatePresence>
                {uploadState === "htl_pause" && (
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -16 }}
                    className="p-6 bg-amber-950/30 border border-amber-500/40 rounded-2xl"
                  >
                    <h4 className="text-lg font-bold text-amber-200 mb-1 flex items-center gap-2">
                      ⏸ Human-in-the-Loop Checkpoint
                    </h4>
                    <p className="text-sm text-amber-300/70 mb-5">
                      The AI pipeline has completed its analysis and generated recommendations. Review the extracted intelligence on the right, then <strong>Approve</strong> to push to the Dashboard or <strong>Reject</strong> to abort the pipeline.
                    </p>
                    <div className="flex gap-3">
                      <button
                        onClick={handleHtlApprove}
                        className="flex-1 flex items-center justify-center gap-2 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-semibold transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)]"
                      >
                        <ThumbsUp className="w-5 h-5" /> Approve & Push to Dashboard
                      </button>
                      <button
                        onClick={handleHtlReject}
                        className="flex-1 flex items-center justify-center gap-2 py-3 bg-rose-700 hover:bg-rose-600 text-white rounded-xl font-semibold transition-all"
                      >
                        <ThumbsDown className="w-5 h-5" /> Reject Pipeline
                      </button>
                    </div>
                  </motion.div>
                )}

                {uploadState === "htl_rejected" && (
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-6 bg-rose-950/30 border border-rose-500/40 rounded-2xl"
                  >
                    <h4 className="text-lg font-bold text-rose-300 mb-2">Pipeline Rejected</h4>
                    <p className="text-sm text-rose-400/70 mb-4">
                      The agent pipeline was stopped at the Human Approval checkpoint. No data was sent to the dashboard. You can run a new analysis below.
                    </p>
                    <button
                      onClick={handleReset}
                      className="flex items-center gap-2 px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-lg font-medium transition-colors"
                    >
                      <RotateCcw className="w-4 h-4" /> Run New Analysis
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
              {/* ────────────────────────────────────────────────── */}
            </div>

            <div className="lg:col-span-1">
              <AgentTimeline currentStep={currentStep} uploadState={uploadState} />

              <AnimatePresence>
                {(uploadState === "htl_pause" || uploadState === "done") && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="mt-6 p-6 bg-blue-950/20 border border-blue-500/30 rounded-2xl relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />
                    <h4 className="text-lg font-bold text-blue-100 mb-1 flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                      Extracted AI Intelligence
                    </h4>
                    {orgName && (
                      <div className="mb-2">
                        <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                          📌 {orgName}
                        </span>
                        {meetingTitle && (
                          <span className="ml-2 text-xs text-gray-400 italic">{meetingTitle}</span>
                        )}
                      </div>
                    )}

                    <div className="space-y-3 mb-6 relative z-10 max-h-80 overflow-y-auto pr-2 custom-scrollbar">

                      {apiError && (
                        <div className="bg-rose-950/30 border border-rose-500/20 p-3 rounded-lg text-rose-400 text-sm">
                          Error: {apiError}
                        </div>
                      )}

                      {!apiError && extractedItems.length === 0 && (
                        <div className="text-sm text-gray-400 italic">No operational data detected or extraction is still loading.</div>
                      )}

                      {extractedItems.map((item, idx) => {
                        let bgColor = "bg-gray-900/30 border-white/10";
                        let textColor = "text-gray-300";
                        let Icon = CheckCircle2;

                        if (item.type === "decision") {
                          bgColor = "bg-emerald-950/30 border-emerald-500/20";
                          textColor = "text-emerald-400";
                          Icon = CheckCircle2;
                        } else if (item.type === "action") {
                          bgColor = "bg-blue-950/30 border-blue-500/20";
                          textColor = "text-blue-400";
                          Icon = Lightbulb;
                        } else if (item.type === "risk") {
                          bgColor = "bg-rose-950/30 border-rose-500/20";
                          textColor = "text-rose-400";
                          Icon = AlertTriangle;
                        }

                        return (
                          <div key={idx} className={`${bgColor} border p-3 rounded-lg`}>
                            <p className={`text-sm font-medium ${textColor} flex items-center gap-1`}>
                              <Icon className="w-4 h-4" />
                              {item.title}
                            </p>
                            <p className="text-xs text-gray-300 mt-1">{item.description}</p>
                            <div className="flex gap-2 text-[10px] text-gray-500 mt-2">
                              {item.owner && <span>Owner: {item.owner}</span>}
                              {item.confidence && <span>Confidence: {item.confidence}%</span>}
                              {item.riskType && <span>Risk: {item.riskType}</span>}
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {uploadState === "done" ? (
                      <div className="flex flex-col gap-2 relative z-10">
                        <Link
                          href="/dashboard"
                          className="block w-full py-3 px-4 bg-blue-600 hover:bg-blue-500 text-white text-center rounded-lg font-medium transition-colors shadow-[0_0_15px_rgba(37,99,235,0.4)] hover:shadow-[0_0_25px_rgba(37,99,235,0.6)]"
                        >
                          View in Dashboard
                        </Link>
                        <button
                          onClick={handleReset}
                          className="flex items-center justify-center gap-2 w-full py-2.5 px-4 bg-white/5 hover:bg-white/10 text-gray-300 rounded-lg font-medium transition-colors"
                        >
                          <RotateCcw className="w-4 h-4" /> Run New Analysis
                        </button>
                      </div>
                    ) : (
                      <p className="text-xs text-amber-400/70 italic relative z-10">
                        ⏸ Review above, then Approve or Reject the pipeline.
                      </p>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}
