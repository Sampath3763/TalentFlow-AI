"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, FileText, TrendingUp, AlertCircle, RefreshCcw, CheckCircle2 } from "lucide-react";

export interface ExplanationData {
  action: string;
  confidence: number;
  evidence: string;
  retrievedDocs: string;
  alternatives: string;
  expectedImpact: string;
}

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  data: ExplanationData | null;
}

export function ExplainabilityDrawer({ isOpen, onClose, data }: DrawerProps) {
  return (
    <AnimatePresence>
      {isOpen && data && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-gray-900 border-l border-white/10 z-50 p-6 shadow-2xl overflow-y-auto"
          >
            <div className="flex justify-between items-start mb-8">
              <div>
                <h3 className="text-xl font-bold text-white mb-1">AI Reasoning</h3>
                <p className="text-sm text-gray-400">{data.action}</p>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/10 rounded-full transition-colors text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-8">
              {/* Confidence */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  <h4 className="font-medium text-gray-200">Confidence</h4>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex-1 h-3 bg-gray-800 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${data.confidence}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className="h-full bg-emerald-500"
                    />
                  </div>
                  <span className="text-2xl font-bold text-emerald-400">
                    {data.confidence}%
                  </span>
                </div>
              </div>

              {/* Evidence */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <AlertCircle className="w-5 h-5 text-amber-400" />
                  <h4 className="font-medium text-gray-200">Evidence</h4>
                </div>
                <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                  <p className="text-gray-300 text-sm">{data.evidence}</p>
                </div>
              </div>

              {/* Retrieved Docs */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <FileText className="w-5 h-5 text-blue-400" />
                  <h4 className="font-medium text-gray-200">Retrieved Docs</h4>
                </div>
                <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                  <p className="text-gray-300 text-sm">{data.retrievedDocs}</p>
                </div>
              </div>

              {/* Alternatives */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <RefreshCcw className="w-5 h-5 text-purple-400" />
                  <h4 className="font-medium text-gray-200">Alternatives Evaluated</h4>
                </div>
                <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                  <p className="text-gray-300 text-sm">{data.alternatives}</p>
                </div>
              </div>

              {/* Expected Impact */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="w-5 h-5 text-rose-400" />
                  <h4 className="font-medium text-gray-200">Expected Impact</h4>
                </div>
                <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                  <p className="text-xl font-semibold text-rose-400">
                    {data.expectedImpact}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
