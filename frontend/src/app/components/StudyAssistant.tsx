import { useEffect, useState } from 'react';
import { Bot, RotateCcw, Send, Sparkles, X } from 'lucide-react';

type ChatMessage = {
  role: 'user' | 'assistant';
  text: string;
};

function normalizeAssistantText(text: string) {
  return text
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/\*(.*?)\*/g, '$1')
    .replace(/`([^`]*)`/g, '$1')
    .replace(/^#{1,6}\s*/gm, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

interface StudyAssistantProps {
  authToken: string;
  apiBaseUrl: string;
  context?: string;
  threadKey: string;
  quickPrompts?: string[];
  openSignal?: number;
  placement?: 'right' | 'left';
  variant?: 'default' | 'lesson';
  promptSignal?: {
    id: number;
    prompt: string;
  } | null;
}

export function StudyAssistant({
  authToken,
  apiBaseUrl,
  context,
  threadKey,
  quickPrompts = [],
  openSignal = 0,
  placement = 'right',
  variant = 'default',
  promptSignal = null
}: StudyAssistantProps) {
  const isLessonVariant = variant === 'lesson';
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'chat' | 'history'>('chat');
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasLoadedHistory, setHasLoadedHistory] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      text: isLessonVariant
        ? 'What can I help you with?'
        : 'Ask me about your lesson, code, quiz answers, or concepts you are studying.'
    }
  ]);
  const [historyMessages, setHistoryMessages] = useState<ChatMessage[]>([]);

  function resetChatView() {
    setActiveTab('chat');
    setInput('');
    setIsLoading(false);
    setMessages([
      {
        role: 'assistant',
        text: isLessonVariant
          ? 'What can I help you with?'
          : 'Ask me about your lesson, code, quiz answers, or concepts you are studying.'
      }
    ]);
  }

  useEffect(() => {
    setHasLoadedHistory(false);
    setHistoryMessages([]);
    resetChatView();
  }, [threadKey]);

  useEffect(() => {
    resetChatView();
  }, [isLessonVariant]);

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
          setHistoryMessages(
            payload.messages.map((message: ChatMessage) => ({
              ...message,
              text: message.role === 'assistant' ? normalizeAssistantText(message.text) : message.text
            }))
          );
        }
      } catch {
        // Keep the default intro message if history fails.
      } finally {
        setHasLoadedHistory(true);
      }
    }

    void loadHistory();
  }, [apiBaseUrl, authToken, hasLoadedHistory, isOpen, threadKey]);

  useEffect(() => {
    if (openSignal > 0) {
      setIsOpen(true);
      setActiveTab('chat');
    }
  }, [openSignal]);

  useEffect(() => {
    if (!promptSignal) {
      return;
    }

    setIsOpen(true);
    setActiveTab('chat');
    void handleSend(promptSignal.prompt);
  }, [promptSignal]);

  async function clearHistory() {
    try {
      await fetch(`${apiBaseUrl}/api/chat/history?threadKey=${encodeURIComponent(threadKey)}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      });
    } finally {
      setHistoryMessages([]);
      resetChatView();
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

      const normalizedHistory = payload.messages?.length
        ? payload.messages.map((message: ChatMessage) => ({
            ...message,
            text: message.role === 'assistant' ? normalizeAssistantText(message.text) : message.text
          }))
        : [];

      if (normalizedHistory.length) {
        setHistoryMessages(normalizedHistory);
      }

      setMessages([
        ...nextMessages,
        {
          role: 'assistant',
          text: normalizeAssistantText(payload.reply)
        }
      ]);
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
    <div className={`fixed ${isLessonVariant ? 'bottom-3' : 'bottom-6'} z-30 ${placement === 'left' ? 'left-6' : 'right-6'}`}>
      {isOpen && (
        <div className={`mb-4 flex max-w-[calc(100vw-1.5rem)] flex-col overflow-hidden backdrop-blur-xl ${
          isLessonVariant
            ? 'h-[min(74vh,640px)] w-[420px] rounded-[22px] border border-[#94aaff]/18 bg-[#151a21]/97 shadow-[0_22px_70px_rgba(0,0,0,0.45)]'
            : 'h-[min(68vh,600px)] w-[390px] rounded-[28px] border border-cyan-400/25 bg-slate-950/95 shadow-[0_28px_90px_rgba(6,182,212,0.18)] sm:h-[min(72vh,620px)]'
        }`}>
          <div className={`${isLessonVariant
            ? 'border-b border-[#94aaff]/12 bg-[#20262f] px-4 py-3'
            : 'border-b border-cyan-400/15 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.16),transparent_38%),linear-gradient(180deg,rgba(15,23,42,0.98),rgba(15,23,42,0.92))] px-5 py-3.5'}`}>
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                {isLessonVariant ? (
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg border border-[#94aaff]/20 bg-[#94aaff]/10 text-[#d8e0ff]">
                    <Sparkles className="h-3.5 w-3.5" />
                  </div>
                ) : (
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-cyan-300/30 bg-cyan-400/10 text-cyan-300 shadow-[0_0_24px_rgba(34,211,238,0.18)]">
                    <Bot className="h-5 w-5" />
                  </div>
                )}
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-base font-semibold tracking-wide text-white">{isLessonVariant ? 'AI Chat ⌘J' : 'QUEST AI'}</p>
                    {!isLessonVariant && (
                      <span className="rounded-full border border-cyan-300/20 bg-cyan-400/10 px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.22em] text-cyan-200">
                        Study Mode
                      </span>
                    )}
                  </div>
                  <p className={`mt-1 text-xs ${isLessonVariant ? 'text-[#a8abb3]' : 'text-slate-400'}`}>
                    {isLessonVariant ? '' : 'Instant help for lessons, quizzes, and code questions'}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {!isLessonVariant && (
                  <button
                    type="button"
                    onClick={() => void clearHistory()}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-700/80 bg-slate-900/80 text-slate-400 transition-all hover:border-cyan-300/30 hover:text-white"
                    title="Clear chat"
                  >
                    <RotateCcw className="h-4 w-4" />
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => {
                    setIsOpen(false);
                    resetChatView();
                  }}
                  className={`flex h-9 w-9 items-center justify-center rounded-full transition-all ${
                    isLessonVariant
                      ? 'text-white hover:bg-white/8'
                      : 'border border-slate-700/80 bg-slate-900/80 text-slate-400 hover:border-cyan-300/30 hover:text-white'
                  }`}
                >
                  {isLessonVariant ? <span className="text-xl leading-none">−</span> : <X className="h-4 w-4" />}
                </button>
              </div>
            </div>
          </div>

          {!isLessonVariant && (
          <div className="border-b border-cyan-400/10 px-5 py-2.5">
            <div className="inline-flex rounded-full border border-slate-700/80 bg-slate-900/80 p-1">
              <button
                type="button"
                onClick={() => setActiveTab('chat')}
                className={`rounded-full px-4 py-2 text-xs font-medium transition-all ${
                  activeTab === 'chat'
                    ? 'bg-gradient-to-r from-cyan-400 to-sky-500 text-slate-950 shadow-lg shadow-cyan-500/25'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Chat
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('history')}
                className={`rounded-full px-4 py-2 text-xs font-medium transition-all ${
                  activeTab === 'history'
                    ? 'bg-gradient-to-r from-cyan-400 to-sky-500 text-slate-950 shadow-lg shadow-cyan-500/25'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                History
              </button>
            </div>
          </div>
          )}

          {activeTab === 'chat' && !isLessonVariant && (
            <div className="border-b border-cyan-400/10 px-5 py-2.5">
              <div className="flex flex-wrap gap-2">
                {quickPrompts.map((prompt) => (
                  <button
                    key={prompt}
                    type="button"
                    onClick={() => void handleSend(prompt)}
                    className="rounded-full border border-cyan-400/15 bg-slate-900/85 px-3.5 py-2 text-xs font-medium text-cyan-200 transition-all hover:border-cyan-300/30 hover:bg-slate-800"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className={`min-h-0 flex-1 space-y-3 overflow-y-auto px-4 py-4 ${
            isLessonVariant
              ? 'bg-[#151a21]'
              : 'bg-[linear-gradient(180deg,rgba(15,23,42,0.92),rgba(15,23,42,0.98))] px-5 py-3'
          }`}>
            {(activeTab === 'chat' ? messages : historyMessages).map((message, index) => (
              <div
                key={`${message.role}-${index}`}
                className={message.role === 'user' ? 'flex justify-end' : 'flex justify-start'}
              >
                <div className="max-w-[85%]">
                  {message.role === 'assistant' && isLessonVariant && (
                    <div className="mb-2 flex items-center gap-2 text-[#d8e0ff]">
                      <div className="flex h-6 w-6 items-center justify-center rounded-md border border-[#94aaff]/20 bg-[#94aaff]/10">
                        <Bot className="h-3.5 w-3.5 text-[#d8e0ff]" />
                      </div>
                      <span className="text-sm">Code Quest</span>
                    </div>
                  )}
                  <div
                    className={`rounded-[22px] px-4 py-3 text-sm leading-7 shadow-[0_12px_30px_rgba(15,23,42,0.18)] ${
                      isLessonVariant
                        ? message.role === 'user'
                          ? 'bg-[#94aaff] text-[#001b61]'
                          : 'text-white'
                        : message.role === 'user'
                        ? 'bg-gradient-to-r from-cyan-400 to-sky-500 text-slate-950'
                        : 'border border-slate-700/70 bg-slate-800/90 text-slate-100'
                    } ${isLessonVariant && message.role === 'assistant' ? 'bg-transparent px-0 py-0 shadow-none' : ''}`}
                  >
                    {message.role === 'assistant' && !isLessonVariant && (
                      <div className="mb-2 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-cyan-300/80">
                        <Sparkles className="h-3.5 w-3.5" />
                        QUEST AI
                      </div>
                    )}
                    {message.text}
                  </div>
                </div>
              </div>
            ))}

            {activeTab === 'history' && historyMessages.length === 0 && (
              <div className="flex h-full min-h-[14rem] items-center justify-center">
                <div className="max-w-[15rem] text-center">
                  <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-400/20 bg-cyan-400/10 text-cyan-300">
                    <Bot className="h-5 w-5" />
                  </div>
                  <p className="text-sm font-medium text-slate-200">No saved history yet</p>
                  <p className="mt-1 text-xs leading-6 text-slate-400">Past conversations for this lesson or course will appear here.</p>
                </div>
              </div>
            )}

            {activeTab === 'chat' && isLoading && (
              <div className="flex justify-start">
                <div className="rounded-[22px] border border-slate-700/70 bg-slate-800/90 px-4 py-3 text-sm text-slate-300">
                  <div className="mb-2 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-cyan-300/80">
                    <Sparkles className="h-3.5 w-3.5" />
                    QUEST AI
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="h-2 w-2 animate-pulse rounded-full bg-cyan-300" />
                    <span className="h-2 w-2 animate-pulse rounded-full bg-cyan-300 [animation-delay:120ms]" />
                    <span className="h-2 w-2 animate-pulse rounded-full bg-cyan-300 [animation-delay:240ms]" />
                    <span className="ml-2 text-slate-400">Thinking</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {(activeTab === 'chat' || isLessonVariant) && (
            <div className={`p-3 ${isLessonVariant ? 'border-t border-[#94aaff]/12 bg-[#20262f]' : 'border-t border-cyan-400/10 bg-slate-950/95'}`}>
              <div className={`flex items-end gap-3 p-2.5 shadow-inner shadow-black/20 ${
                isLessonVariant
                  ? 'rounded-[18px] border border-[#94aaff]/14 bg-[#151a21]'
                  : 'rounded-[24px] border border-cyan-400/15 bg-slate-900/85'
              }`}>
                <textarea
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' && !event.shiftKey) {
                      event.preventDefault();
                      void handleSend();
                    }
                  }}
                  placeholder={isLessonVariant ? 'Type your message here...' : 'Ask a study question...'}
                  rows={2}
                  className={`min-h-[48px] max-h-28 flex-1 resize-none bg-transparent px-2 py-1.5 outline-none ${
                    isLessonVariant ? 'text-white placeholder:text-[#72757d]' : 'text-white placeholder:text-slate-500'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => void handleSend()}
                  disabled={isLoading || !input.trim()}
                  className={`flex h-11 w-11 items-center justify-center transition-all disabled:cursor-not-allowed disabled:opacity-50 ${
                    isLessonVariant
                      ? 'rounded-full bg-[#94aaff] text-[#001b61]'
                      : 'rounded-2xl bg-gradient-to-r from-cyan-400 to-sky-500 text-slate-950 shadow-lg shadow-cyan-500/25'
                  }`}
                >
                  {isLessonVariant ? <Send className="h-4 w-4" /> : <Send className="h-4 w-4" />}
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      <button
        type="button"
        onClick={() => setIsOpen((value) => !value)}
        className={`group flex items-center justify-center text-white transition-all ${
          isLessonVariant
            ? 'relative h-14 w-14 rounded-[20px] border border-[#94aaff]/22 bg-[radial-gradient(circle_at_top_left,rgba(148,170,255,0.4),transparent_30%),linear-gradient(135deg,rgba(148,170,255,0.28),rgba(51,103,255,0.78))] shadow-[0_18px_46px_rgba(51,103,255,0.28)] hover:-translate-y-1 hover:shadow-[0_24px_56px_rgba(51,103,255,0.38)]'
            : 'h-16 w-16 rounded-[22px] border border-cyan-300/25 bg-[radial-gradient(circle_at_top_left,rgba(103,232,249,0.45),transparent_30%),linear-gradient(135deg,rgba(34,211,238,0.24),rgba(59,130,246,0.85))] shadow-[0_20px_50px_rgba(34,211,238,0.35)] hover:-translate-y-1 hover:shadow-[0_26px_60px_rgba(34,211,238,0.45)]'
        }`}
        title={isOpen ? (isLessonVariant ? 'Close AI Chat' : 'Close QUEST AI') : (isLessonVariant ? 'Open AI Chat' : 'Open QUEST AI')}
      >
        {isOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <div className="relative flex items-center justify-center">
            <Bot className={`${isLessonVariant ? 'h-6 w-6' : 'h-7 w-7'}`} />
            <span className={`absolute left-1/2 flex min-w-[1.75rem] -translate-x-1/2 items-center justify-center rounded-full border border-cyan-200/40 bg-slate-950/90 px-1 text-[9px] font-semibold uppercase leading-none tracking-[0.12em] text-cyan-100 shadow-[0_6px_18px_rgba(15,23,42,0.35)] ${
              isLessonVariant ? '-top-2 h-5' : '-top-4 h-5 -translate-y-1/2'
            }`}>
              AI
            </span>
          </div>
        )}
      </button>
    </div>
  );
}
