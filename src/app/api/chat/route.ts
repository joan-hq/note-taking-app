import { generateText } from 'ai';
import { google } from "@ai-sdk/google";
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { messages, noteContext, isSummarizeAction } = await req.json();

    // ==========================================
    // A: summarize
    // ==========================================
    if (isSummarizeAction) {
      const formattedHistory = Array.isArray(messages)
        ? messages.map((m: any) => `${m.role === 'user' ? 'User' : 'AI Assistant'}: ${m.content}`).join('\n')
        : '';

      const { text } = await generateText({
        model: google('gemini-2.5-flash'),
        system: `You are a professional note extraction, classification, and summarization assistant. Your job is to transform raw content and conversation history into clean, high-value, and elegantly formatted Markdown documents.`,
        messages: [
          {
            role: 'user',
            content: `Please help me summarize and refine my note based on the context provided below.

                ---
                [Raw Note Content]:
                ${noteContext || '(Current note is empty)'}

                [Chat Context History]:
                ${formattedHistory || '(Current chat history is empty)'}
                ---

                Strictly adhere to the following output format specifications:
                1. The first line of your response must be only the [Title] of this newly summarized note (Do not use Markdown headers like '#' here).
                2. Starting from the second line, output the beautifully refined Markdown [Summary Body Content].`
          }
        ],
      });

      if (!text || text.trim() === "") {
        throw new Error("Gemini returned an empty response. Please check your context content.");
      }

      const lines = text.split('\n');
      const rawTitle = lines[0].replace(/[#*]/g, '').trim();
      const title = rawTitle ? `✦ ${rawTitle}` : '✦ AI Conversation Summary';
      const content = lines.slice(1).join('\n').trim() || text;

      return NextResponse.json({ title, content });
    }

    // ==========================================
    // B: chat only
    // ==========================================
    if (!messages || messages.length === 0) {
      return NextResponse.json({ error: "Messages cannot be empty" }, { status: 400 });
    }

    const { text } = await generateText({
      model: google('gemini-2.5-flash'),
      system: 'You are a DashNote smart assistant. Respond concisely and professionally.',
      messages: messages.map((m: any) => ({
        role: m.role,
        content: m.content,
      })),
    });

    return NextResponse.json({ text: text || "" });

  } catch (error: any) {
    console.error("Backend runtime handling error:", error);
    return NextResponse.json(
      { error: error.message || "Unknown internal server error" },
      { status: 500 }
    );
  }
}
