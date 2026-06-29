import { NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || '',
});

export async function POST(req: Request) {
  if (!process.env.GEMINI_API_KEY) {
    return NextResponse.json(
      { error: 'GEMINI_API_KEY is not configured in .env.local' },
      { status: 500 }
    );
  }

  try {
    const { transcript } = await req.json();

    if (!transcript) {
      return NextResponse.json(
        { error: 'No transcript provided' },
        { status: 400 }
      );
    }

    const systemPrompt = `You are an Enterprise Decision Intelligence Engine.
Your goal is to read the provided meeting transcript and extract critical operational intelligence following STRICT rules.
Identify the following types of information:
- Confirmed Decision (must have an owner, 100% confidence)
- Action Item (must have a deadline and owner)
- Risk (Financial, Cybersecurity, Legal, Ethical, Operational)

Format your response exactly as a JSON object containing a single key "items" which is an array of objects.
Do NOT wrap the JSON in markdown code blocks.
Each object in the "items" array must match this interface:
{
  "type": "decision" | "action" | "risk",
  "title": "Short summary title",
  "description": "More detailed description or exact constraint",
  "owner": "Name or Department (if applicable, else null)",
  "confidence": number (0 to 100),
  "riskType": "Cybersecurity" | "Financial" | "Legal" | "Ethical" | "Operational" | null
}

Extract a maximum of 6 most critical items to keep the dashboard concise. Prioritize cybersecurity risks, firm decisions, and urgent action items.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `System Prompt:\n${systemPrompt}\n\nTranscript:\n${transcript}`,
      config: {
        responseMimeType: "application/json",
        temperature: 0.1,
      }
    });

    const content = response.text || '{"items":[]}';
    
    return NextResponse.json(JSON.parse(content));

  } catch (error: any) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: error.message || 'An error occurred during analysis' },
      { status: 500 }
    );
  }
}
