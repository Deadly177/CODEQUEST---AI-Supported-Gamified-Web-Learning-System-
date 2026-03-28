import { useEffect, useState } from 'react';
import { Bot, MessageSquare, RotateCcw, Send, X } from 'lucide-react';

type ChatMessage = {
  role: 'user' | 'assistant';
  text: string;
};

interface StudyAssistantProps {
  authToken: string;
  apiBaseUrl: string;
  context?: string;
  threadKey: string;
  quickPrompts?: string[];
}

export function StudyAssistant({ authToken, apiBaseUrl, context, threadKey, quickPrompts = [] }: StudyAssistantProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasLoadedHistory, setHasLoadedHistory] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      text: 'Ask me about your lesson, code, quiz answers, or concepts you are studying.'
    }
  ]);

  useEffect(() => {
    setHasLoadedHistory(false);
    setMessages([
      {
        role: 'assistant',
        text: 'Ask me about your lesson, code, quiz answers, or concepts you are studying.'
      }
    ]);
  }, [threadKey]);

  useEffect(() => {
    if (!isOpen || hasLoadedHistory) {
      return;
    }

    async function loadHistory() {
      try {
        const response = await fetch(`${apiBaseUrl}/api/chat/history?threadKey=${encodeURIComponent(threadKey)}`, {
          headers: {
            Authorization: `Bearer ${authToken}`
          },
          method: 'GET'
        });
        const payload = await response.json();
        if (!response.ok) {
          throw new Error(payload.error || 'Failed to load chat history');
        }
        if (payload.messages?.length) {
          setMessages(payload.messages);
        }
      } catch {
        // Keep the default intro message if history fails.
      } finally {
        setHasLoadedHistory(true);
      }
    }

    void loadHistory();
  }, [apiBaseUrl, authToken, hasLoadedHistory, isOpen, threadKey]);

  async function clearHistory() {
    try {
      await fetch(`${apiBaseUrl}/api/chat/history?threadKey=${encodeURIComponent(threadKey)}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      });
    } finally {
      setMessages([
        {
          role: 'assistant',
          text: 'Ask me about your lesson, code, quiz answers, or concepts you are studying.'
        }
      ]);
    }
  }

  async function handleSend(prefilledMessage?: string) {
    const trimmed = (prefilledMessage ?? input).trim();
    if (!trimmed || isLoading) {
      return;
    }

    const nextMessages = [...messages, { role: 'user' as const, text: trimmed }];
    setMessages(nextMessages);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch(`${apiBaseUrl}/api/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`
        },
        body: JSON.stringify({
          message: trimmed,
          context,
          threadKey
        })
      });

      const payload = await response.json();
      if (!response.ok) {
        throw new Error(payload.error || 'Failed to get assistant reply');
      }

      setMessages(payload.messages?.length ? payload.messages : [...nextMessages, { role: 'assistant', text: payload.reply }]);
    } catch (error) {
      setMessages([
        ...nextMessages,
        {
          role: 'assistant',
          text: error instanceof Error ? error.message : 'Something went wrong'
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-30">
      {isOpen && (
        <div className="mb-4 w-[360px] max-w-[calc(100vw-2rem)] bg-slate-900 border border-cyan-500/30 rounded-2xl shadow-2xl shadow-cyan-500/20 overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-cyan-500/20">
            <div className="flex items-center gap-2">
              <Bot className="w-5 h-5 text-cyan-400" />
              <div>
                <p className="text-white text-sm font-medium">Study Assistant</p>
                <p className="text-slate-400 text-xs">Ask anything about your course</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => void clearHistory()}
                className="text-slate-400 hover:text-white transition-colors"
                title="Clear chat"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="px-4 pt-3 flex flex-wrap gap-2 border-b border-cyan-500/10 pb-3">
            {quickPrompts.map((prompt) => (
              <button
                key={prompt}
                type="button"
                onClick={() => void handleSend(prompt)}
                className="text-xs px-3 py-1.5 rounded-full bg-slate-800 text-cyan-300 hover:bg-slate-700 transition-all"
              >
                {prompt}
              </button>
            ))}
          </div>

          <div className="h-80 overflow-y-auto px-4 py-3 space-y-3">
            {messages.map((message, index) => (
              <div
                key={`${message.role}-${index}`}
                className={message.role === 'user' ? 'flex justify-end' : 'flex justify-start'}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                    message.role === 'user'
                      ? 'bg-cyan-500 text-slate-950'
                      : 'bg-slate-800 text-slate-100'
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-slate-800 text-slate-300 rounded-2xl px-4 py-3 text-sm">
                  Thinking...
                </div>
              </div>
            )}
          </div>

          <div className="border-t border-cyan-500/20 p-3">
            <div className="flex items-end gap-2">
              <textarea
                value={input}
                onChange={(event) => setInput(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' && !event.shiftKey) {
                    event.preventDefault();
                    void handleSend();
                  }
                }}
                placeholder="Ask a study question..."
                rows={2}
                className="flex-1 resize-none rounded-xl bg-slate-800 border border-slate-700 px-3 py-2 text-sm text-white outline-none focus:border-cyan-500"
              />
              <button
                type="button"
                onClick={() => void handleSend()}
                disabled={isLoading || !input.trim()}
                className="h-11 w-11 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 hover:bg-cyan-500/30 transition-all disabled:opacity-50"
              >
                <Send className="w-4 h-4 mx-auto" />
              </button>
            </div>
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={() => setIsOpen((value) => !value)}
        className="h-14 w-14 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 text-white shadow-2xl shadow-cyan-500/30 flex items-center justify-center"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
      </button>
    </div>
  );
}
