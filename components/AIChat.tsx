import React, { useState, useRef, useEffect } from "react";
import { ChatMessage } from "../types";

const AIChat: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content:
        "Hello. I am your Knee-Ease guide. Let's focus on your comfort and progress today. How can I assist you?"
    }
  ]);

  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  
  const handleSend = async () => {
  if (!input.trim() || isLoading) return;

  const userMsg: ChatMessage = { role: "user", content: input };

  const updatedMessages = [...messages, userMsg];

  setMessages(updatedMessages);
  setInput("");
  setIsLoading(true);

  console.log(import.meta.env.VITE_GROQ_API_KEY);

  try {
   const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${import.meta.env.VITE_GROQ_API_KEY}`
  },
  body: JSON.stringify({
    model: "llama-3.1-8b-instant",
    messages: [
      {
  role: "system",
content: `You are Knee-Ease AI, a calm and supportive knee-health assistant.

You guide users about knee pain relief, exercises, recovery habits, and the use of the Knee-Ease knee-lace support device.

Explain when a knee-lace can help:
• providing gentle compression
• improving stability
• keeping the joint warm
• supporting recovery from mild strain or fatigue

Encourage safe habits like light exercise, stretching, hydration, and rest.

Keep answers simple, supportive, and medically cautious. Avoid diagnosing diseases and recommend seeing a doctor for severe pain or injuries.`
        
      },
      ...updatedMessages
    ]
  })
});

const data = await response.json();

if (!response.ok) {
  console.error("GROQ ERROR:", data);
  throw new Error("Groq request failed");
}

console.log("FULL ERROR:", data.error?.message);
       

    const reply =
      data?.choices?.[0]?.message?.content ||
      "I'm here to help. Could you please repeat that?";

    setMessages(prev => [...prev, { role: "assistant", content: reply }]);

  } catch (error) {
    console.error("AI ERROR:", error);

    setMessages(prev => [
      ...prev,
      {
        role: "assistant",
        content:
          "Our wellness connection is temporarily unavailable. Please try again shortly."
      }
    ]);
  } finally {
    setIsLoading(false);
  }
};
              

  

     
  return (
    <div className="flex flex-col h-[calc(100vh-160px)]">
      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[85%] p-5 rounded-[2rem] text-[13px] leading-relaxed shadow-sm ${
                m.role === "user"
                  ? "bg-emerald-600 text-white rounded-tr-none"
                  : "bg-white text-slate-700 border border-emerald-50 rounded-tl-none"
              }`}
            >
              {m.content}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white p-4 rounded-xl border text-gray-400 text-sm">
              AI is thinking...
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-4 border-t border-emerald-100">
        <div className="flex items-center space-x-2 bg-white rounded-3xl px-4 py-2 border border-emerald-100 shadow-sm">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && handleSend()}
            placeholder="Tell me how you feel..."
            className="flex-1 bg-transparent py-2 text-sm focus:outline-none"
          />

          <button
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className="px-4 py-2 bg-emerald-500 text-white rounded-xl disabled:bg-gray-300"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIChat;