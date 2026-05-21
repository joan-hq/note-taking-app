import { generateText, convertToCoreMessages } from 'ai'; 
import { google } from "@ai-sdk/google";
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const { text } = await generateText({
      model: google('gemini-2.5-flash'),
      messages: convertToCoreMessages(messages), 
      system: 'You are a DashNote smart assistant',
    });

    return NextResponse.json({ text: text });

  } catch (error: any) {
    console.error("backend error", error);
    return NextResponse.json(
      { error: error.message || "unkown error" }, 
      { status: 500 }
    );
  }
}