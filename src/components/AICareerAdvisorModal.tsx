import React, { useState, useRef, useEffect } from 'react';
import {
  Sparkles,
  Send,
  X,
  Bot,
  User,
  HelpCircle,
  TrendingUp,
  DollarSign,
  Briefcase,
  Layers,
  ArrowRight
} from 'lucide-react';
import { UserProfile } from '../types';

interface Message {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
}

interface AICareerAdvisorModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: UserProfile;
  userApiKey: string | null;
  onOpenConnectModal: () => void;
}

export const AICareerAdvisorModal: React.FC<AICareerAdvisorModalProps> = ({
  isOpen,
  onClose,
  profile,
  userApiKey,
  onOpenConnectModal
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'ai',
      text: `Hello ${profile.fullName || 'there'}! I am your PM Career & Job Advisor for India. I can answer questions about compensation benchmarks in INR LPA, transition strategies, mock interview questions for top Indian tech companies (Swiggy, Razorpay, CRED, Zepto, etc.), or critique your portfolio projects. What would you like to explore?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const promptSuggestions = [
    `What is realistic fixed + ESOP salary for ${profile.yearsExperience} YOE in Bengaluru?`,
    `How to position my ${profile.currentRole} background for ${profile.targetDomain} PM roles?`,
    `Give me a mock product sense interview case asked at Swiggy / Zepto.`,
    `Review what telemetry metrics I should highlight on my resume.`
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSendMessage = async (textToSend?: string) => {
    const messageText = textToSend || input;
    if (!messageText.trim() || isLoading) return;

    if (!userApiKey) {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          sender: 'user',
          text: messageText.trim(),
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        },
        {
          id: (Date.now() + 1).toString(),
          sender: 'ai',
          text: 'Please connect your Gemini API key before starting the AI session.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
      onOpenConnectModal();
      return;
    }

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: messageText.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/pm/chat-advisor', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-gemini-api-key': userApiKey || ''
        },
        body: JSON.stringify({
          messages: [...messages, userMsg].map((m) => ({
            sender: m.sender,
            text: m.text
          })),
          userProfile: profile
        })
      });

      const data = await response.json();
      if (!data.success && data.error) {
        throw new Error(data.error);
      }

      const aiReplyText = data.reply || 'I am ready to help you with your PM career journey in India.';

      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: aiReplyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: 'ai',
          text: 'Something went wrong while connecting to your AI assistant. Please check your Gemini connection and try again.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };


  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-lg border border-slate-200 shadow-2xl w-full max-w-2xl h-[580px] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="bg-slate-900 text-white px-4 py-2.5 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 rounded bg-blue-600 flex items-center justify-center">
              <Sparkles className="w-3.5 h-3.5 text-emerald-300" />
            </div>
            <div>
              <h2 className="text-xs font-bold text-slate-100 flex items-center gap-1.5">
                India PM Career Coach
                <span className="px-1 py-0.2 rounded text-[9px] font-bold bg-emerald-500/20 text-emerald-300">
                  Gemini 3.7 Flash
                </span>
              </h2>
              <p className="text-[10px] text-slate-400">
                Personalized for {profile.fullName || 'Candidate'} ({profile.targetDomain} PM)
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Messages Container */}
        <div className="flex-1 overflow-y-auto p-3.5 space-y-3 text-xs bg-slate-50/50">
          {messages.map((msg) => {
            const isUser = msg.sender === 'user';
            return (
              <div
                key={msg.id}
                className={`flex gap-2 ${isUser ? 'justify-end' : 'justify-start'}`}
              >
                {!isUser && (
                  <div className="w-6 h-6 rounded-full bg-slate-900 text-white flex items-center justify-center shrink-0 mt-0.5">
                    <Bot className="w-3.5 h-3.5 text-emerald-400" />
                  </div>
                )}

                <div
                  className={`max-w-[85%] p-2.5 rounded-lg space-y-1 ${
                    isUser
                      ? 'bg-slate-900 text-white rounded-tr-none shadow-2xs'
                      : 'bg-white text-slate-800 rounded-tl-none border border-slate-200 shadow-2xs'
                  }`}
                >
                  <p className="whitespace-pre-wrap leading-relaxed text-xs">{msg.text}</p>
                  <div
                    className={`text-[9px] text-right ${
                      isUser ? 'text-slate-400' : 'text-slate-400'
                    }`}
                  >
                    {msg.timestamp}
                  </div>
                </div>

                {isUser && (
                  <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0 mt-0.5">
                    <User className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>
            );
          })}

          {isLoading && (
            <div className="flex gap-2 justify-start">
              <div className="w-6 h-6 rounded-full bg-slate-900 text-white flex items-center justify-center shrink-0">
                <Bot className="w-3.5 h-3.5 text-emerald-400" />
              </div>
              <div className="bg-white text-slate-600 p-2.5 rounded-lg rounded-tl-none text-xs flex items-center gap-1.5 border border-slate-200">
                <Sparkles className="w-3 h-3 text-blue-600 animate-spin" />
                Thinking & benchmarking Indian PM ecosystem...
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggestion Chips */}
        <div className="px-3 py-1.5 bg-slate-100/70 border-t border-slate-200 flex overflow-x-auto no-scrollbar gap-1 text-[11px]">
          {promptSuggestions.map((sug, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(sug)}
              className="px-2 py-0.5 rounded bg-white border border-slate-200 hover:border-slate-300 text-slate-700 whitespace-nowrap transition text-[11px] font-medium"
            >
              {sug}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-2.5 bg-white border-t border-slate-200">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-1.5"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about Indian PM salaries, interview cases, company cultures..."
              className="flex-1 px-2.5 py-1.5 text-xs rounded bg-slate-50 border border-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="p-1.5 rounded bg-slate-900 hover:bg-slate-800 text-white disabled:opacity-40 transition"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
