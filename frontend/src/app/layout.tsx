import * as React from "react";
import type { Metadata } from 'next'
import Link from 'next/link'
import './globals.css'

export const metadata: Metadata = {
  title: 'TalentFlow AI - Decision Intelligence Platform',
  description: 'Agentic Recruitment & Staffing Decision Intelligence Platform',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-background antialiased selection:bg-primary/30">
        <nav className="border-b border-white/10 glass-panel sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16 items-center">
              <div className="flex-shrink-0 flex items-center">
                <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400">
                  TalentFlow AI
                </span>
              </div>
              <div className="flex space-x-8">
                <Link href="/" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">Home</Link>
                <Link href="/demo" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">Live Demo</Link>
                <Link href="/dashboard" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">Recruiter Dashboard</Link>
                <Link href="/memory" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">Memory</Link>
                <Link href="/client" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">Client View</Link>
              </div>
            </div>
          </div>
        </nav>
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {children}
        </main>
      </body>
    </html>
  )
}
