import * as React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { BrainCircuit, Users, Target, Activity } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col gap-12 pt-10">
      <section className="text-center space-y-6">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight">
          Intelligent Recruitment <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500">
            Operating System
          </span>
        </h1>
        <p className="text-xl text-gray-400 max-w-3xl mx-auto">
          TalentFlow AI acts as a principal staffing architect, autonomously analyzing requirements, matching talent, predicting risks, and generating human-in-the-loop recommendations.
        </p>
        <div className="flex justify-center gap-4 pt-4">
          <Link href="/dashboard" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 rounded-full font-medium transition-all shadow-[0_0_20px_rgba(59,130,246,0.5)] hover:shadow-[0_0_30px_rgba(59,130,246,0.8)]">
            Go to Dashboard
          </Link>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
        <Card>
          <CardHeader>
            <BrainCircuit className="w-10 h-10 text-blue-400 mb-4" />
            <CardTitle>AI Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            Automatically extract requirements and constraints from meeting transcripts.
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <Users className="w-10 h-10 text-emerald-400 mb-4" />
            <CardTitle>Talent Matching</CardTitle>
          </CardHeader>
          <CardContent>
            Vector-based semantic search to discover the perfect candidates.
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <Target className="w-10 h-10 text-purple-400 mb-4" />
            <CardTitle>Next Best Actions</CardTitle>
          </CardHeader>
          <CardContent>
            Agentic recommendations to reduce time-to-hire and improve placement rates.
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <Activity className="w-10 h-10 text-rose-400 mb-4" />
            <CardTitle>Risk Assessment</CardTitle>
          </CardHeader>
          <CardContent>
            Predictive modeling to identify dropout risks and compensation misalignments.
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
