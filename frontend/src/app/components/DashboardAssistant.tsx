import { useEffect, useMemo, useState } from 'react';
import { Bot, BrainCircuit, ChevronRight, Compass, RotateCcw, Send, Sparkles, Target, TrendingUp } from 'lucide-react';

type ChatMessage = {
  role: 'user' | 'assistant';
  text: string;
};

interface CourseSummary {
  id: string;
  title: string;
  description: string;
  progress: number;
  totalLessons: number;
  completedLessons: number;
}

interface DashboardAssistantProps {
  authToken: string;
  apiBaseUrl: string;
  context: string;
  threadKey: string;
  userName: string;
  courses: CourseSummary[];
  quickPrompts: string[];
}

function normalizeAssistantText(text: string) {
  return text
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/\*(.*?)\*/g, '$1')
    .replace(/`([^`]*)`/g, '$1')
    .replace(/^#{1,6}\s*/gm, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

export function DashboardAssistant({
  authToken,
  apiBaseUrl,
  context,
  threadKey,
  userName,
  courses,
  quickPrompts
}: DashboardAssistantProps) {
  const [activeTab, setActiveTab] = useState<'chat' | 'history'>('chat');
  const [activeRoadmapIndex, setActiveRoadmapIndex] = useState(0);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasLoadedHistory, setHasLoadedHistory] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      text:
        'I can help you plan your coding career path, choose what language to start with, explain lessons, generate practice questions, summarize topics, and review quiz mistakes.'
    }
  ]);
  const [historyMessages, setHistoryMessages] = useState<ChatMessage[]>([]);

  const roadmapItems = useMemo(() => {
    const ordered = ['html', 'css', 'javascript', 'react', 'typescript', 'nodejs', 'python', 'sql', 'apis'];
    return ordered
      .map((id) => courses.find((course) => course.id === id))
      .filter((course): course is CourseSummary => Boolean(course))
      .slice(0, 6);
  }, [courses]);
  const activeRoadmapItem = roadmapItems[activeRoadmapIndex] ?? null;

  function resetChatView() {
    setActiveTab('chat');
    setInput('');
    setIsLoading(false);
    setMessages([
      {
        role: 'assistant',
        text:
          'I can help you plan your coding career path, choose what language to start with, explain lessons, generate practice questions, summarize topics, and review quiz mistakes.'
      }
    ]);
  }

  useEffect(() => {
    setHasLoadedHistory(false);
    setHistoryMessages([]);
    resetChatView();
  }, [threadKey]);

  useEffect(() => {
    if (activeRoadmapIndex > Math.max(roadmapItems.length - 1, 0)) {
      setActiveRoadmapIndex(0);
    }
  }, [activeRoadmapIndex, roadmapItems.length]);

  useEffect(() => {
    if (roadmapItems.length <= 1) {
      return;
    }

    const interval = window.setInterval(() => {
      setActiveRoadmapIndex((value) => (value + 1) % roadmapItems.length);
    }, 2000);

    return () => window.clearInterval(interval);
  }, [roadmapItems.length]);

  useEffect(() => {
    if (hasLoadedHistory) {
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
        // Keep assistant ready even if history fetch fails.
      } finally {
        setHasLoadedHistory(true);
      }
    }

    void loadHistory();
  }, [apiBaseUrl, authToken, hasLoadedHistory, threadKey]);

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
    <div className="space-y-6">
      <div className="grid gap-8 xl:grid-cols-[0.95fr_1.05fr]">
        <section className="overflow-hidden rounded-[2rem] border border-[#94aaff]/12 bg-[#151a21] p-6 shadow-2xl shadow-black/30 xl:h-[calc(100vh-8rem)]">
          <div className="relative">
            <div className="absolute -right-10 -top-14 h-48 w-48 rounded-full bg-[#94aaff]/12 blur-3xl" />
            <div className="absolute bottom-0 left-0 h-40 w-40 rounded-full bg-[#5cfd80]/6 blur-3xl" />
            <div className="relative z-10">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#94aaff]/20 bg-[#94aaff]/10 px-4 py-2 text-[11px] font-black uppercase tracking-[0.24em] text-[#c9d5ff]">
                <Sparkles className="h-3.5 w-3.5" />
                AI Career Guide
              </div>
              <h2 className="max-w-xl font-['Space_Grotesk'] text-4xl font-bold tracking-tight text-[#f1f3fc]">
                Build your learning path with QUEST AI
              </h2>
              <p className="mt-4 max-w-xl text-sm leading-7 text-[#a8abb3]">
                {userName}, this assistant gives you full dashboard access for career planning, topic explanations, practice help, and quiz review without changing the lesson player assistant.
              </p>

              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <div className="rounded-[1.5rem] border border-[#94aaff]/12 bg-[#1a2028] p-5">
                  <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#94aaff]/12 text-[#c9d5ff]">
                      <Compass className="h-5 w-5" />
                    </div>
                    <h3 className="font-['Space_Grotesk'] text-lg font-bold text-[#f1f3fc]">Where to start</h3>
                  </div>
                  <p className="mt-2 text-sm leading-7 text-[#a8abb3]">
                    Start with HTML, then CSS, then JavaScript. After that move into React and TypeScript for front-end development.
                  </p>
                </div>

                <div className="rounded-[1.5rem] border border-[#94aaff]/12 bg-[#1a2028] p-5">
                  <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#ffbd5c]/12 text-[#ffbd5c]">
                      <Target className="h-5 w-5" />
                    </div>
                    <h3 className="font-['Space_Grotesk'] text-lg font-bold text-[#f1f3fc]">What to ask</h3>
                  </div>
                  <p className="mt-2 text-sm leading-7 text-[#a8abb3]">
                    Ask for lesson explanations, beginner roadmaps, practice questions, simple summaries, or help understanding mistakes.
                  </p>
                </div>
              </div>

              <div className="mt-5">
                <div className="mb-4 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <TrendingUp className="h-5 w-5 text-[#ffbd5c]" />
                    <h3 className="font-['Space_Grotesk'] text-xl font-bold text-[#f1f3fc]">Recommended Career Path</h3>
                  </div>
                </div>

                {activeRoadmapItem && (
                  <div className="rounded-[1.75rem] border border-[#44484f]/20 bg-[#1a2028] p-5">
                    <div className="flex items-center gap-4">
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-3">
                          <h4 className="font-['Space_Grotesk'] text-[2rem] font-bold text-[#f1f3fc]">{activeRoadmapItem.title}</h4>
                          <span className="rounded-full bg-[#20262f] px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.24em] text-[#a8abb3]">
                            {activeRoadmapItem.completedLessons}/{activeRoadmapItem.totalLessons} lessons
                          </span>
                          <span className="rounded-full bg-[#5cfd80]/10 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.24em] text-[#5cfd80]">
                            {activeRoadmapItem.progress}% progress
                          </span>
                        </div>
                      </div>
                      {roadmapItems.length > 1 && (
                        <button
                          type="button"
                          onClick={() => setActiveRoadmapIndex((value) => (value + 1) % roadmapItems.length)}
                          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#94aaff]/14 bg-[#20262f] text-[#d8e0ff] transition-all hover:border-[#94aaff]/28 hover:bg-[#263044]"
                          title="Next path"
                        >
                          <ChevronRight className="h-5 w-5" />
                        </button>
                      )}
                    </div>

                    {roadmapItems.length > 1 && (
                      <div className="mt-4 flex items-center justify-between gap-4">
                        <div className="flex items-center gap-2">
                          {roadmapItems.map((course, index) => (
                            <button
                              key={course.id}
                              type="button"
                              onClick={() => setActiveRoadmapIndex(index)}
                              className={`h-2.5 rounded-full transition-all ${
                                index === activeRoadmapIndex ? 'w-10 bg-[#94aaff]' : 'w-2.5 bg-[#3b4350] hover:bg-[#5f6d85]'
                              }`}
                              title={course.title}
                              aria-label={`Show ${course.title}`}
                            />
                          ))}
                        </div>
                        <p className="text-[11px] font-black uppercase tracking-[0.24em] text-[#7f8896]">
                          {activeRoadmapIndex + 1}/{roadmapItems.length}
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>

            </div>
          </div>
        </section>

        <section className="flex min-h-[680px] flex-col overflow-hidden rounded-[2rem] border border-[#94aaff]/16 bg-[#111722] shadow-[0_28px_90px_rgba(51,103,255,0.14)] xl:sticky xl:top-8 xl:h-[calc(100vh-8rem)] xl:max-h-[860px]">
          <div className="border-b border-[#94aaff]/12 bg-[radial-gradient(circle_at_top_left,rgba(148,170,255,0.18),transparent_38%),linear-gradient(180deg,rgba(21,26,33,0.98),rgba(17,23,34,0.95))] px-5 py-4">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-[#94aaff]/20 bg-[#94aaff]/10 text-[#d8e0ff] shadow-[0_0_24px_rgba(148,170,255,0.14)]">
                  <Bot className="h-5 w-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-base font-semibold tracking-wide text-white">QUEST AI</p>
                    <span className="rounded-full border border-[#94aaff]/20 bg-[#94aaff]/10 px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.22em] text-[#d8e0ff]">
                      Dashboard Mode
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-slate-400">Career guidance, lesson support, and learning help from one place</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => void clearHistory()}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-[#94aaff]/14 bg-[#151a21] text-[#8f96a3] transition-all hover:border-[#94aaff]/28 hover:text-white"
                title="Clear chat"
              >
                <RotateCcw className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="border-b border-[#94aaff]/10 px-5 py-2.5">
            <div className="inline-flex rounded-full border border-[#94aaff]/12 bg-[#151a21] p-1">
              <button
                type="button"
                onClick={() => setActiveTab('chat')}
                className={`rounded-full px-4 py-2 text-xs font-medium transition-all ${
                  activeTab === 'chat'
                    ? 'bg-gradient-to-r from-[#94aaff] to-[#3367ff] text-[#001b61] shadow-lg shadow-[#3367ff]/25'
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
                    ? 'bg-gradient-to-r from-[#94aaff] to-[#3367ff] text-[#001b61] shadow-lg shadow-[#3367ff]/25'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                History
              </button>
            </div>
          </div>

          {activeTab === 'chat' && (
            <div className="border-b border-[#94aaff]/10 px-5 py-3">
              <div className="flex flex-wrap gap-2">
                {quickPrompts.map((prompt) => (
                  <button
                    key={prompt}
                    type="button"
                    onClick={() => void handleSend(prompt)}
                    className="rounded-full border border-[#94aaff]/14 bg-[#151a21] px-3.5 py-2 text-xs font-medium text-[#d8e0ff] transition-all hover:border-[#94aaff]/28 hover:bg-[#1b2230]"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="min-h-0 flex-1 space-y-3 overflow-y-auto bg-[linear-gradient(180deg,rgba(17,23,34,0.94),rgba(13,18,26,0.98))] px-5 py-4">
            {(activeTab === 'chat' ? messages : historyMessages).map((message, index) => (
              <div
                key={`${message.role}-${index}`}
                className={message.role === 'user' ? 'flex justify-end' : 'flex justify-start'}
              >
                <div className="max-w-[88%] text-sm leading-7">
                  <div
                    className={
                      message.role === 'user'
                        ? 'rounded-[22px] bg-gradient-to-r from-[#94aaff] to-[#3367ff] px-4 py-3 text-[#001b61] shadow-[0_12px_30px_rgba(51,103,255,0.22)]'
                        : 'rounded-[22px] border border-[#94aaff]/10 bg-[#1a2230] px-4 py-3 text-slate-100 shadow-[0_12px_30px_rgba(15,23,42,0.18)]'
                    }
                  >
                    {message.role === 'assistant' && (
                      <div className="mb-2 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-[#94c2ff]">
                        <BrainCircuit className="h-3.5 w-3.5" />
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
                  <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl border border-[#94aaff]/20 bg-[#94aaff]/10 text-[#d8e0ff]">
                    <Bot className="h-5 w-5" />
                  </div>
                  <p className="text-sm font-medium text-slate-200">No saved history yet</p>
                  <p className="mt-1 text-xs leading-6 text-slate-400">Your dashboard assistant conversations will appear here.</p>
                </div>
              </div>
            )}

            {activeTab === 'chat' && isLoading && (
              <div className="flex justify-start">
                <div className="rounded-[22px] border border-[#94aaff]/10 bg-[#1a2230] px-4 py-3 text-sm text-slate-300">
                  <div className="mb-2 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-[#94c2ff]">
                    <Sparkles className="h-3.5 w-3.5" />
                    QUEST AI
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="h-2 w-2 animate-pulse rounded-full bg-[#94aaff]" />
                    <span className="h-2 w-2 animate-pulse rounded-full bg-[#94aaff] [animation-delay:120ms]" />
                    <span className="h-2 w-2 animate-pulse rounded-full bg-[#94aaff] [animation-delay:240ms]" />
                    <span className="ml-2 text-slate-400">Thinking</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {activeTab === 'chat' && (
            <div className="border-t border-[#94aaff]/10 bg-[#111722] p-3">
              <div className="flex items-end gap-3 rounded-[24px] border border-[#94aaff]/12 bg-[#151a21] p-2.5 shadow-inner shadow-black/20">
                <textarea
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' && !event.shiftKey) {
                      event.preventDefault();
                      void handleSend();
                    }
                  }}
                  placeholder="Ask about career path, lessons, quizzes, or what to study next..."
                  rows={2}
                  className="min-h-[48px] max-h-28 flex-1 resize-none bg-transparent px-2 py-1.5 text-white outline-none placeholder:text-slate-500"
                />
                <button
                  type="button"
                  onClick={() => void handleSend()}
                  disabled={isLoading || !input.trim()}
                  className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-r from-[#94aaff] to-[#3367ff] text-[#001b61] shadow-lg shadow-[#3367ff]/25 transition-all disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
