import { NextResponse } from "next/server";

import { SITE, whatsappUrl } from "@/lib/site";
import { SERVICES } from "@/lib/services";

export const runtime = "nodejs";

const MAX_MESSAGES = 20;
const MAX_MESSAGE_LENGTH = 2000;
const GROQ_MODEL = "openai/gpt-oss-120b";
const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

const SYSTEM_PROMPT = `You are the sales assistant on ${SITE.name}'s website. ${SITE.description}

Services on offer:
${SERVICES.map((s) => `- ${s.title}: ${s.short}`).join("\n")}

Your job: understand what the visitor needs, explain how ${SITE.name} solves it, and move the conversation toward a next step — booking a call or starting a project. Be concise (2-4 sentences per reply), consultative, and never pushy. Ask one qualifying question at a time (budget, timeline, or scope) when it's unclear what they need.

When the visitor shows real interest or asks how to proceed, close by directing them to WhatsApp (${whatsappUrl()}) or email (${SITE.email}) to speak with the team directly. Don't invent pricing, timelines, or capabilities not listed above — if asked for specifics you don't have, offer to connect them with the team instead of guessing. Reply in plain text only — no markdown formatting (no **, #, or [links](url)).`;

export async function POST(request: Request) {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "Chat is not configured. GROQ_API_KEY is missing." },
      { status: 503 }
    );
  }

  let body: { messages?: ChatMessage[] };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const messages = Array.isArray(body.messages) ? body.messages : [];
  if (messages.length === 0 || messages.length > MAX_MESSAGES) {
    return NextResponse.json({ error: "Invalid message history." }, { status: 400 });
  }
  for (const message of messages) {
    if (
      (message.role !== "user" && message.role !== "assistant") ||
      typeof message.content !== "string" ||
      message.content.length === 0 ||
      message.content.length > MAX_MESSAGE_LENGTH
    ) {
      return NextResponse.json({ error: "Invalid message in history." }, { status: 400 });
    }
  }

  try {
    const groqResponse = await fetch(GROQ_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: GROQ_MODEL,
        messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages],
        max_tokens: 512,
        temperature: 0.6,
      }),
    });

    if (!groqResponse.ok) {
      const errorText = await groqResponse.text();
      console.error("Groq API error:", groqResponse.status, errorText);
      return NextResponse.json({ error: "Failed to reach the assistant." }, { status: 502 });
    }

    const data = await groqResponse.json();
    const reply: string | undefined = data.choices?.[0]?.message?.content?.trim();
    if (!reply) {
      return NextResponse.json({ error: "Empty response from assistant." }, { status: 502 });
    }

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("Chat completion failed:", error);
    return NextResponse.json({ error: "Failed to reach the assistant." }, { status: 502 });
  }
}
