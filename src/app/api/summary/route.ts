import {NextResponse} from 'next/server';
import {db} from '@/db/index';
import { notes } from '@/db/schema';
import { GoogleGenAI } from '@google/genai';


const ai = new GoogleGenAI({apiKey : process.env.GEMINI_API_KEY});

export async function OPTIONS() {
    return new NextResponse(null, {
        status: 204,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        }
    })
}


export async function POST(req: Request){
    const corsHeaders = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    };

    try {
        const { rawText, date } = await req.json();

        if(!rawText){
            return NextResponse.json(
                { error: "No data received" },
                { status: 400, headers: corsHeaders }
            )
        }

        // Neon user Id:
        const currentUserId = "116326447384599892761"; 

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `
                You are a concise personal knowledge management assistant. Analyze the following chat logs between the user and the AI today. 
                Filter out casual small talk and lengthy, repetitive debugging code to extract high-value, core knowledge points.

                Strictly output the response in the following JSON format. Do not include any markdown code blocks (such as \`\`\`json):
                {
                "title": "A 5-10 word summary of the topic",
                "content": "Today's summary written in elegant Markdown format. Include: Today's Review, Key Conclusions, and Code/Technical Highlights (if applicable)"
                }

                The raw chat logs are as follows:
                ${rawText}
            `,
        });

        let rawAiText = (response.text?.trim()) ?? "";
        if (!rawAiText) {
            throw new Error("AI 没有返回任何有效文本");
        }
        if (rawAiText.startsWith("```")) {
            rawAiText = rawAiText.replace(/^```json\s*/i, "").replace(/```$/, "").trim();
        }

        const aiResult = JSON.parse(rawAiText);
        

        // 2.  Drizzle  Upsert 
        const result = await db.insert(notes)
            .values({
                userId: currentUserId, 
                title: aiResult.title,
                content: aiResult.content,
                date: date,          
                type: "ai_summary",
            })
            .onConflictDoUpdate({
                // contain userId and NoteId for complex search
                target: [notes.userId, notes.date], 
                set: {
                    title: aiResult.title,
                    content: aiResult.content,
                    lastEdit: new Date(), 
                }
            })
            .returning();

        return NextResponse.json(
            { success: true, data: result[0] }, 
            { status: 200, headers: corsHeaders }
        );

    } catch(error) {
        console.error('DashNote Sync Error:', error);
        return NextResponse.json(
            { error: '服务器内部错误，总结生成失败' }, 
            { status: 500, headers: corsHeaders }
        );
    }
}