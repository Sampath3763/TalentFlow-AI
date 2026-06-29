import * as React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { CheckCircle2, Clock, Users } from 'lucide-react';

export default function ClientDashboard() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">Client Portal</h2>
        <div className="bg-blue-500/10 text-blue-400 px-4 py-2 rounded-full text-sm font-medium border border-blue-500/20">
          Acme Corp (Demo Client)
        </div>
      </div>
      
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Open Roles</CardTitle>
            <Clock className="h-4 w-4 text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">Active searches</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Candidates in Pipeline</CardTitle>
            <Users className="h-4 w-4 text-emerald-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">Screened by AI</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Recent Placements</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-purple-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
            <p className="text-xs text-muted-foreground">This quarter</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Active Hiring Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {[
              { role: "Senior Data Scientist", progress: 80, status: "Final Interviews", candidates: 3 },
              { role: "Frontend Developer (React)", progress: 45, status: "Screening", candidates: 8 },
              { role: "VP of Engineering", progress: 15, status: "Sourcing", candidates: 1 }
            ].map((job, i) => (
              <div key={i} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium text-white">{job.role}</span>
                  <span className="text-gray-400">{job.status}</span>
                </div>
                <div className="w-full bg-white/5 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-emerald-400 h-2 rounded-full" 
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
  )
}
