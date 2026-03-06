import { NextResponse } from "next/server";
import { model } from "@/lib/gemini";

export async function POST(req: Request) {
    try {
        let body;
        try {
            body = await req.json();
        } catch (e) {
            return NextResponse.json(
                { error: "Invalid JSON in request body" },
                { status: 400 }
            );
        }

        const { topic, difficulty } = body;

        if (!topic || !difficulty) {
            return NextResponse.json(
                { error: "Topic and difficulty are required" },
                { status: 400 }
            );
        }

        const prompt = `
      Explain the following topic in simple terms for a ${difficulty} student.
      Use analogies where appropriate and avoid complex jargon.
      Topic: "${topic}"
      
      Structure the explanation with:
      1. A short, catchy overview.
      2. The core concept explained simply.
      3. A relatable analogy.
      4. A "Why it matters" section.
    `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        return NextResponse.json({ explanation: text });
    } catch (error: any) {
        console.error("AI Explanation Error:", error);

        // Handle specific Gemini API errors if possible
        const errorMessage = error.message || "Failed to generate explanation";
        const status = error.status || 500;

        return NextResponse.json(
            { error: errorMessage },
            { status }
        );
    }
}
