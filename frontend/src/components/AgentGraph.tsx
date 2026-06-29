"use client";

import React from "react";
import { motion } from "framer-motion";
import { Play, BrainCircuit, Database, DollarSign, Activity, Users, Target, UserCheck, Square, XCircle } from "lucide-react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

interface AgentGraphProps {
  currentStep: number;
  uploadState?: string;
}

const steps = [
  { id: "start",          label: "START",               icon: Play,         stepIndex: 0 },
  { id: "requirement",    label: "Requirement Agent",   icon: BrainCircuit, stepIndex: 1 },
  { id: "memory",         label: "Memory Retrieval",    icon: Database,     stepIndex: 2 },
  { id: "parallel", label: "Parallel Analysis", isParallel: true, stepIndex: 3, nodes: [
    { id: "salary",    label: "Salary Agent",    icon: DollarSign },
    { id: "risk",      label: "Risk Agent",      icon: Activity   },
    { id: "candidate", label: "Candidate Agent", icon: Users      },
  ]},
  { id: "recommendation", label: "Recommendation Agent", icon: Target,    stepIndex: 4 },
  { id: "approval",       label: "Human Approval",       icon: UserCheck, stepIndex: 5 },
  { id: "end",            label: "END",                  icon: Square,    stepIndex: 6 },
];

export function AgentGraph({ currentStep, uploadState }: AgentGraphProps) {
  const isHtlPause    = uploadState === "htl_pause";
  const isRejected    = uploadState === "htl_rejected";

  const isNodeActive  = (stepIndex: number) => currentStep >= stepIndex;
  const isNodeCurrent = (stepIndex: number) => currentStep === stepIndex;

  const renderNode = (node: any, isActive: boolean, isCurrent: boolean, isSmall = false) => {
    const Icon = node.icon;

    // Special styling for the Human Approval node
    const isApprovalNode = node.id === "approval";
    const isApprovalPaused   = isApprovalNode && isHtlPause;
    const isApprovalRejected = isApprovalNode && isRejected;

    let borderClass = isActive
      ? "border-emerald-500/50 shadow-[0_0_15px_rgba(16,185,129,0.2)]"
      : "border-white/10 grayscale";

    let iconBg = isActive ? "bg-emerald-500/20 text-emerald-400" : "bg-white/5 text-gray-500";
    let labelColor = isActive ? "text-white" : "text-gray-500";

    if (isCurrent && !isApprovalPaused && !isApprovalRejected) {
      borderClass = "border-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.5)] grayscale-0";
      iconBg = "bg-blue-500/20 text-blue-400";
      labelColor = "text-blue-100";
    }

    if (isApprovalPaused) {
      borderClass = "border-amber-400 shadow-[0_0_25px_rgba(251,191,36,0.5)] grayscale-0";
      iconBg = "bg-amber-500/20 text-amber-400";
      labelColor = "text-amber-200";
    }

    if (isApprovalRejected) {
      borderClass = "border-rose-500 shadow-[0_0_20px_rgba(239,68,68,0.4)] grayscale-0";
      iconBg = "bg-rose-500/20 text-rose-400";
      labelColor = "text-rose-300";
    }

    return (
      <motion.div
        layout
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{
          opacity: isActive ? 1 : 0.4,
          scale: isApprovalPaused ? [1, 1.04, 1] : isCurrent ? 1.05 : 1,
        }}
        transition={
          isApprovalPaused
            ? { scale: { repeat: Infinity, duration: 1.4, ease: "easeInOut" }, opacity: { duration: 0.3 } }
            : { duration: 0.3 }
        }
        className={cn(
          "flex items-center gap-3 rounded-xl border p-4 transition-all duration-300 relative z-10 bg-gray-950",
          borderClass,
          isSmall ? "py-2 px-3 text-sm min-w-[160px]" : "min-w-[220px]"
        )}
      >
        <div className={cn("p-2 rounded-lg", iconBg)}>
          {isApprovalRejected
            ? <XCircle className={isSmall ? "w-4 h-4" : "w-6 h-6"} />
            : <Icon className={isSmall ? "w-4 h-4" : "w-6 h-6"} />
          }
        </div>
        <span className={cn("font-medium", labelColor)}>{node.label}</span>
        {isApprovalPaused && (
          <span className="ml-auto text-xs text-amber-400 font-semibold animate-pulse">⏸</span>
        )}
      </motion.div>
    );
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 bg-black/40 rounded-2xl border border-white/5 overflow-hidden">
      <div className="flex flex-col items-center gap-6 relative w-full max-w-2xl">
        {/* Static vertical guide line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-white/5 -translate-x-1/2 z-0" />

        {/* Animated active progress line */}
        <motion.div
          className={cn(
            "absolute left-1/2 top-0 w-0.5 -translate-x-1/2 z-0",
            isRejected
              ? "bg-gradient-to-b from-emerald-500 via-amber-400 to-rose-500"
              : "bg-gradient-to-b from-emerald-500 to-blue-500"
          )}
          initial={{ height: "0%" }}
          animate={{ height: `${(currentStep / (steps.length - 1)) * 100}%` }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        />

        {steps.map((step) => {
          if (step.isParallel) {
            const isActive  = isNodeActive(step.stepIndex);
            const isCurrent = isNodeCurrent(step.stepIndex);
            return (
              <div key={step.id} className="flex gap-4 relative z-10 my-4">
                {step.nodes?.map((subNode) => (
                  <div key={subNode.id}>
                    {renderNode(subNode, isActive, isCurrent, true)}
                  </div>
                ))}
              </div>
            );
          }

          return (
            <div key={step.id} className="relative z-10">
              {renderNode(step, isNodeActive(step.stepIndex!), isNodeCurrent(step.stepIndex!))}
            </div>
          );
        })}
      </div>
    </div>
  );
}
