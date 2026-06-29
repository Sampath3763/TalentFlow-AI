"use client";

import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Circle, UserCheck, XCircle } from "lucide-react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

interface AgentTimelineProps {
  currentStep: number;
  uploadState?: string;
}

const agents = [
  { id: "planner",       label: "Planner Agent",           activeAt: 0, doneAt: 1 },
  { id: "requirement",   label: "Requirement Agent",        activeAt: 1, doneAt: 2 },
  { id: "memory",        label: "Memory Retrieval",         activeAt: 2, doneAt: 3 },
  { id: "salary",        label: "Salary Agent",             activeAt: 3, doneAt: 4 },
  { id: "risk",          label: "Risk Agent",               activeAt: 3, doneAt: 4 },
  { id: "candidate",     label: "Candidate Agent",          activeAt: 3, doneAt: 4 },
  { id: "recommendation",label: "Recommendation Agent",     activeAt: 4, doneAt: 5 },
  { id: "human_approval",label: "Human Approval",           activeAt: 5, doneAt: 6, isHtl: true },
];

export function AgentTimeline({ currentStep, uploadState }: AgentTimelineProps) {
  const isRejected = uploadState === "htl_rejected";
  const isHtlPause = uploadState === "htl_pause";

  return (
    <div className="bg-gray-900/50 border border-white/5 rounded-2xl p-6">
      <h3 className="text-xl font-bold text-white mb-6">Execution Timeline</h3>
      <div className="space-y-4">
        {agents.map((agent, index) => {
          const isDone = currentStep >= agent.doneAt;
          const isActive = currentStep >= agent.activeAt && currentStep < agent.doneAt;
          // Human Approval node special cases
          const isHtlWaiting = agent.isHtl && isHtlPause;
          const isHtlRejected = agent.isHtl && isRejected;
          const isHtlApproved = agent.isHtl && uploadState === "done";

          return (
            <motion.div
              key={agent.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.07 }}
              className="flex items-center gap-4"
            >
              {/* Status icon */}
              <div className="relative flex-shrink-0">
                {isHtlRejected ? (
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-rose-400">
                    <XCircle className="w-6 h-6" />
                  </motion.div>
                ) : isHtlApproved ? (
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-emerald-400">
                    <CheckCircle2 className="w-6 h-6" />
                  </motion.div>
                ) : isHtlWaiting ? (
                  <motion.div
                    animate={{ scale: [1, 1.15, 1] }}
                    transition={{ repeat: Infinity, duration: 1.2 }}
                    className="text-amber-400"
                  >
                    <UserCheck className="w-6 h-6" />
                  </motion.div>
                ) : isDone ? (
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-emerald-400">
                    <CheckCircle2 className="w-6 h-6" />
                  </motion.div>
                ) : isActive ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                    className="text-blue-400"
                  >
                    <div className="w-6 h-6 rounded-full border-2 border-blue-400 border-t-transparent" />
                  </motion.div>
                ) : (
                  <Circle className="w-6 h-6 text-gray-600" />
                )}
              </div>

              {/* Label */}
              <div className="flex-1">
                <span className={cn(
                  "font-medium transition-colors duration-300",
                  isHtlRejected      ? "text-rose-400 line-through decoration-rose-600" :
                  isHtlApproved      ? "text-gray-300 line-through decoration-gray-500" :
                  isHtlWaiting       ? "text-amber-300 font-semibold" :
                  isDone             ? "text-gray-300 line-through decoration-gray-500" :
                  isActive           ? "text-white" :
                                       "text-gray-600"
                )}>
                  {agent.label}
                </span>

                {isHtlWaiting && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="text-xs text-amber-400 mt-1"
                  >
                    ⏸ Waiting for human decision...
                  </motion.div>
                )}
                {isActive && !agent.isHtl && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="text-xs text-blue-400 mt-1"
                  >
                    Processing...
                  </motion.div>
                )}
                {isHtlRejected && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="text-xs text-rose-400 mt-1"
                  >
                    Pipeline aborted by human reviewer
                  </motion.div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
