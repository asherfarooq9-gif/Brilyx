"use client";

import { useEffect, useRef, useState } from "react";
import { MessageCircle, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { PromptInputBox } from "@/components/ui/ai-prompt-box";
import { SITE, whatsappUrl } from "@/lib/site";
import { cn } from "@/lib/cn";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

const GREETING: ChatMessage = {
  role: "assistant",
  content: `Hi, I'm the ${SITE.name} assistant. What are you looking to build — an app, a website, an AI system, or something else?`,
};

const FALLBACK_REPLY = `Sorry, I couldn't reach the assistant right now. Message us directly on WhatsApp (${whatsappUrl()}) or at ${SITE.email} and the team will pick it up.`;

const SUGGESTED_QUESTIONS = [
  "What services does Brilyx offer?",
  "Tell me about your AI website chatbot",
  "What are WhatsApp AI agents?",
  "How much does a chatbot cost?",
  "I'd like to get a demo",
];

const CHATBOT_API_BASE = "https://brilyx-chatbot.onrender.com";

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([GREETING]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const conversationIdRef = useRef<string | null>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, open]);

  useEffect(() => {
    if (!open || !window.matchMedia("(max-width: 639px)").matches) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  const handleSend = async (text: string) => {
    setMessages((prev) => [...prev, { role: "user", content: text }]);
    setIsLoading(true);

    try {
      if (!conversationIdRef.current) {
        const convRes = await fetch(`${CHATBOT_API_BASE}/api/conversations`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({}),
        });
        const conv = await convRes.json();
        conversationIdRef.current = conv.conversation_id;
      }

      const res = await fetch(`${CHATBOT_API_BASE}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ conversation_id: conversationIdRef.current, message: text }),
      });
      const data = await res.json();
      const reply: string = res.ok && data.response ? data.response : FALLBACK_REPLY;
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch {
      setMessages((prev) => [...prev, { role: "assistant", content: FALLBACK_REPLY }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div
        className="fixed z-40"
        style={{
          left: "max(1.25rem, env(safe-area-inset-left))",
          bottom: "max(1.25rem, env(safe-area-inset-bottom))",
        }}
      >
        <button
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close chat" : "Chat with us"}
          className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg shadow-black/25 transition-transform hover:scale-[1.05] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="fixed inset-0 z-50 flex h-[100dvh] w-full flex-col overflow-hidden bg-linear-to-b from-zinc-900 via-black to-zinc-950 sm:inset-auto sm:bottom-24 sm:left-6 sm:h-[min(32rem,70dvh)] sm:w-[min(22rem,calc(100vw-2.5rem))] sm:rounded-2xl sm:border sm:border-white/10 sm:shadow-2xl"
          >
            <div
              className="flex items-center justify-between border-b border-white/10 px-4 py-3 sm:pt-3"
              style={{ paddingTop: "max(0.75rem, env(safe-area-inset-top))" }}
            >
              <div>
                <p className="text-sm font-semibold text-white">{SITE.name} Assistant</p>
                <p className="text-xs text-white/50">Usually replies in a minute</p>
              </div>
              <button
                aria-label="Close chat"
                onClick={() => setOpen(false)}
                className="rounded-full p-2 text-white/50 transition-colors hover:bg-white/10 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-3">
              {messages.map((message, i) => (
                <div
                  key={i}
                  className={cn(
                    "max-w-[85%] whitespace-pre-wrap rounded-2xl px-3 py-2 text-sm text-white",
                    message.role === "user"
                      ? "ml-auto bg-linear-to-br from-zinc-600 to-zinc-800"
                      : "bg-white/10"
                  )}
                >
                  {message.content}
                </div>
              ))}
              {isLoading && (
                <div className="flex items-center gap-1 rounded-2xl bg-white/10 px-3 py-2 text-sm text-white/50">
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-current [animation-delay:-0.3s]" />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-current [animation-delay:-0.15s]" />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-current" />
                </div>
              )}

              {messages.length === 1 && !isLoading && (
                <div className="pt-1">
                  <p className="mb-2 text-xs font-medium uppercase tracking-wide text-white/40">
                    Common questions
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {SUGGESTED_QUESTIONS.map((question) => (
                      <button
                        key={question}
                        type="button"
                        onClick={() => handleSend(question)}
                        className="rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-left text-xs text-white/80 transition-colors hover:bg-white/10 hover:text-white"
                      >
                        {question}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div
              className="border-t border-white/10 p-2"
              style={{ paddingBottom: "max(0.5rem, env(safe-area-inset-bottom))" }}
            >
              <PromptInputBox
                onSend={handleSend}
                isLoading={isLoading}
                placeholder="Ask about a project…"
                className="border-none bg-transparent p-0 shadow-none [&_button]:bg-white [&_button]:text-black [&_button:hover]:bg-white/80 [&_textarea]:text-white [&_textarea]:placeholder:text-white/40"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
