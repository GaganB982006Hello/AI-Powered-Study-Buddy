import { NextResponse } from "next/server";
import { model } from "@/lib/gemini";

export async function POST(req: Request) {
    try {
        const { topic, difficulty } = await req.json();

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
    } catch (error) {
        console.error("AI Explanation Error:", error);
        return NextResponse.json(
            { error: "Failed to generate explanation" },
            { status: 500 }
        );
    }
}
