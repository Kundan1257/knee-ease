
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { ChatMessage } from '../types';

const AIChat: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', content: "Hello. I am your Knee-Ease guide. Let's focus on your comfort and progress today. How can I assist you?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: ChatMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: [...messages, userMsg].map(m => ({
          role: m.role,
          parts: [{ text: m.content }]
        })),
        config: {
          systemInstruction: "You are Knee-Ease AI, a compassionate, expert guide for knee health. Your tone is calm, patient, and highly supportive. Use soft language. Focus on helping the user stay motivated with their wearable lace device. Keep answers concise.",
        }
      });

      const modelContent = response.text || "I am reflecting on how best to support you. Could you share that once more?";
      setMessages(prev => [...prev, { role: 'model', content: modelContent }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', content: "Our wellness link is temporarily quiet. Please try again in a few moments." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-160px)]">
      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] p-5 rounded-[2rem] text-[13px] leading-relaxed shadow-sm transition-all animate-in zoom-in-95 ${
              m.role === 'user' 
                ? 'bg-emerald-600 text-white rounded-tr-none' 
                : 'bg-white text-slate-700 border border-emerald-50 rounded-tl-none font-medium'
            }`}>
              {m.content}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white p-5 rounded-[2rem] rounded-tl-none border border-emerald-50 shadow-sm flex items-center space-x-1.5">
              <div className="w-1.5 h-1.5 bg-emerald-300 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
              <div className="w-1.5 h-1.5 bg-emerald-300 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-1.5 h-1.5 bg-emerald-300 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-4 bg-transparent border-t border-emerald-100/30">
        <div className="flex items-center space-x-2 bg-white rounded-3xl px-5 py-2 border border-emerald-100 focus-within:ring-4 focus-within:ring-emerald-100/50 transition-all shadow-sm">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Tell me how you feel..."
            className="flex-1 bg-transparent py-3 text-sm focus:outline-none placeholder-slate-300 font-medium"
          />
          <button 
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className="p-2.5 text-emerald-500 disabled:text-slate-200 transition-all hover:scale-110 active:scale-95"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"></path></svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIChat;
