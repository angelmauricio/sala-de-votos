import { useEffect, useRef } from 'react';
import type { ChatMessage } from './types';

interface ChatAreaProps {
  chatMessages: ChatMessage[];
  chatInput: string;
  onInputChange: (value: string) => void;
  onSubmitMessage: (e: React.FormEvent) => void;
}

export function ChatArea({
  chatMessages,
  chatInput,
  onInputChange,
  onSubmitMessage
}: ChatAreaProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  return (
    <div className="flex flex-col gap-1.5 h-[350px] lg:h-[400px] w-full max-w-full bg-[#0c0e14] border border-slate-900 rounded p-1.5 overflow-hidden">
      
      {/* Scrollable messages container */}
      <div className="flex-1 overflow-y-auto space-y-2 pr-1 select-text">
        {chatMessages.map((msg) => {
          if (msg.isSystem) {
            return (
              <div 
                key={msg.id} 
                className={`py-1.5 px-2 rounded-sm text-[10px] font-mono leading-tight border transition-colors ${
                  msg.isRedAlert 
                    ? 'bg-red-950/20 border-red-900 text-red-500 font-extrabold'
                    : 'bg-indigo-950/10 border-indigo-900/30 text-indigo-400'
                }`}
              >
                <div className="flex gap-1.5 items-center">
                  <span>{msg.emoji}</span>
                  <p className="flex-1 uppercase tracking-wide">
                    {msg.text}
                  </p>
                  <span className="text-gray-600 font-normal">{msg.timestamp}</span>
                </div>
              </div>
            );
          }

          return (
            <div 
              key={msg.id} 
              className="bg-black/40 border border-[#161a24] p-2 rounded-sm text-xs hover:bg-[#0f121a]/80 transition-colors"
            >
              <div className="flex justify-between items-center mb-1">
                <div className="flex items-center gap-1.5 font-bold">
                  <span className="text-sm">{msg.emoji}</span>
                  <span className="text-slate-300 font-sans tracking-wide">{msg.sender}</span>
                </div>
                <span className="text-[10px] text-gray-500 font-mono font-normal">
                  {msg.timestamp}
                </span>
              </div>
              <p className="text-slate-200 mt-1 select-text font-mono break-words leading-relaxed leading-normal">
                {msg.text}
              </p>
            </div>
          );
        })}
        <div ref={scrollRef} />
      </div>

      {/* Message input panel */}
      <form onSubmit={onSubmitMessage} className="flex gap-1.5 border-t border-slate-900 pt-1.5">
        <input 
          type="text"
          value={chatInput}
          onChange={(e) => onInputChange(e.target.value)}
          maxLength={120}
          placeholder="Diga sua opinião no chat..."
          className="mmo-input p-1.5 text-xs flex-1 tracking-wider h-9"
        />
        <button
          type="submit"
          className="mmo-btn text-xs font-bold px-4 py-1.5 border-indigo-850 text-indigo-400 hover:text-white hover:border-indigo-400"
        >
          Enviar
        </button>
      </form>
    </div>
  );
}
