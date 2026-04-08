import { ArrowLeft, Flame, Lock, LogOut, PlayCircle, Zap } from 'lucide-react';
import { useEffect, useState } from 'react';

interface Lesson {
  id: string;
  number: number;
  title: string;
  type: 'learn' | 'practice';
  completed: boolean;
  locked: boolean;
}

interface Section {
  id: string;
  number: number;
  title: string;
  progress: string;
  lessons: Lesson[];
  icon?: string;
}

interface CourseViewProps {
  courseTitle: string;
  sections: Section[];
  onBack: () => void;
  onStartLesson: (lessonId: string) => void;
  userStats: {
    name: string;
    streak: number;
    totalPoints: number;
  };
  certificate: {
    progress: number;
    total: number;
    completedLessons?: number;
  };
}

export function CourseView({ courseTitle, sections, onBack, onStartLesson, userStats, certificate }: CourseViewProps) {
  const [selectedSection, setSelectedSection] = useState<string>(sections[0]?.id ?? '');

  useEffect(() => {
    setSelectedSection(sections[0]?.id ?? '');
  }, [sections]);

  const currentSection = sections.find(s => s.id === selectedSection);
  const currentSectionIndex = sections.findIndex((section) => section.id === selectedSection);
  const nextSection = currentSectionIndex >= 0 ? sections[currentSectionIndex + 1] : undefined;
  const completedLessons = currentSection?.lessons.filter(lesson => lesson.completed).length ?? 0;
  const totalLessons = currentSection?.lessons.length ?? 0;
  const sectionDescription =
    currentSection?.lessons[0]?.title.includes('variables')
      ? 'Create variables storing numbers, strings, and booleans'
      : 'Learn the fundamentals step by step';

  const getLessonMinutes = (lesson: Lesson) => 8 + lesson.number * 2 + (lesson.type === 'practice' ? 4 : 0);

  return (
    <div className="min-h-screen bg-[#0a0e14] text-[#f1f3fc]">
      <header className="sticky top-0 z-40 flex h-20 items-center justify-between border-b border-white/5 bg-[#0a0e14]/90 px-8 backdrop-blur-xl">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-[0.65rem] font-bold uppercase tracking-widest text-[#a8abb3] transition-colors hover:text-[#94aaff]"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to courses
        </button>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 rounded-lg border border-[#5cfd80]/20 bg-[#5cfd80]/10 px-3 py-1.5">
              <Zap className="h-4 w-4 text-[#5cfd80]" />
              <span className="font-['Space_Grotesk'] text-xs font-bold text-[#5cfd80]">
                {userStats.totalPoints.toLocaleString()} XP
              </span>
            </div>
            <div className="flex items-center gap-2 rounded-lg border border-[#ffbd5c]/20 bg-[#ffbd5c]/10 px-3 py-1.5">
              <Flame className="h-4 w-4 text-[#ffbd5c]" />
              <span className="font-['Space_Grotesk'] text-xs font-bold text-[#ffbd5c]">
                {userStats.streak} DAY STREAK
              </span>
            </div>
          </div>

          <div className="mx-2 h-6 w-px bg-white/5" />

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-[#f1f3fc]">{userStats.name}</span>
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-800 ring-2 ring-[#94aaff]/20">
                <span className="text-xs font-semibold text-cyan-300">{userStats.name.charAt(0).toUpperCase()}</span>
              </div>
            </div>
            <button className="text-[#a8abb3] transition-colors hover:text-[#f1f3fc]">
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </header>

      <main className="px-12 py-12">
        <div className="mx-auto max-w-5xl space-y-12">
          {currentSection ? (
            <>
              <section className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="h-0.5 w-6 bg-[#94aaff]" />
                  <span className="font-['Space_Grotesk'] text-[0.65rem] font-bold uppercase tracking-[0.2em] text-[#94aaff]">
                    {courseTitle} • Section {currentSection.number}
                  </span>
                </div>
                <div className="flex items-end justify-between gap-8">
                  <div className="space-y-2">
                    <h1 className="font-['Space_Grotesk'] text-5xl font-black leading-none tracking-tight text-[#f1f3fc]">
                      {currentSection.number}. {currentSection.title}
                    </h1>
                    <p className="max-w-lg text-sm font-medium text-[#a8abb3]">{sectionDescription}</p>
                  </div>
                  <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-[rgba(21,26,33,0.4)] px-6 py-4 backdrop-blur-[16px]">
                    <div className="text-right">
                      <p className="text-[0.6rem] font-bold uppercase tracking-widest text-[#a8abb3]">Lessons</p>
                      <p className="font-['Space_Grotesk'] text-xl font-black text-[#94aaff]">
                        {completedLessons} / {totalLessons}
                      </p>
                    </div>
                    <div className="relative flex h-12 w-12 items-center justify-center">
                      <svg className="absolute inset-0 h-full w-full -rotate-90" viewBox="0 0 48 48">
                        <circle cx="24" cy="24" r="20" fill="transparent" stroke="rgba(255,255,255,0.05)" strokeWidth="4" />
                        <circle
                          cx="24"
                          cy="24"
                          r="20"
                          fill="transparent"
                          stroke="#94aaff"
                          strokeWidth="4"
                          strokeLinecap="round"
                          strokeDasharray="125.6"
                          strokeDashoffset={125.6 - (125.6 * (totalLessons ? completedLessons / totalLessons : 0))}
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </section>

              <section className="space-y-4">
                <div className="mb-8 flex items-center gap-4">
                  <h3 className="font-['Space_Grotesk'] text-lg font-black tracking-tight text-[#f1f3fc]">Lesson Tracks</h3>
                  <div className="h-px flex-1 bg-white/5" />
                </div>

                <div className="grid grid-cols-1 gap-3">
                  {currentSection.lessons.map((lesson) => (
                    <div
                      key={lesson.id}
                      className={`flex items-center justify-between rounded-2xl p-6 transition-all duration-300 ${
                        lesson.locked
                          ? 'border border-dashed border-white/10 bg-[rgba(21,26,33,0.4)] opacity-60 grayscale backdrop-blur-[16px]'
                          : 'border border-white/5 bg-[rgba(21,26,33,0.4)] backdrop-blur-[16px] hover:translate-x-1 hover:border-[#94aaff]/20 hover:bg-[rgba(148,170,255,0.05)]'
                      }`}
                    >
                      <div className="flex items-center gap-8">
                        <span className="font-['Space_Grotesk'] text-sm font-black text-[#a8abb3]/40">
                          {String(lesson.number).padStart(2, '0')}
                        </span>
                        <div className="space-y-1">
                          <h4 className={`font-['Space_Grotesk'] text-base font-bold ${lesson.locked ? 'text-[#f1f3fc]' : 'text-[#f1f3fc]'}`}>
                            {lesson.title}
                          </h4>
                          {lesson.locked ? (
                            <p className="text-[0.65rem] text-[#a8abb3]">
                              Available after Lesson {String(Math.max(1, lesson.number - 1)).padStart(2, '0')}
                            </p>
                          ) : (
                            <div className="flex items-center gap-4">
                              <span className="flex items-center gap-1 text-[0.65rem] font-medium text-[#a8abb3]">
                                <span className="material-symbols-outlined text-xs">schedule</span>
                                {getLessonMinutes(lesson)} mins
                              </span>
                              <span className="flex items-center gap-1 text-[0.65rem] font-bold uppercase tracking-wider text-[#5cfd80]">
                                <Zap className="h-3 w-3" />
                                +{lesson.xpReward} XP
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                      {lesson.locked ? (
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5">
                          <Lock className="h-4 w-4 text-[#a8abb3]" />
                        </div>
                      ) : lesson.completed ? (
                        <button
                          onClick={() => onStartLesson(lesson.id)}
                          className="flex items-center gap-2 rounded-xl bg-[#5cfd80] px-8 py-3 font-['Space_Grotesk'] text-[0.7rem] font-black uppercase tracking-[0.15em] text-[#005d22] shadow-[0_0_20px_rgba(92,253,128,0.2)] transition-all hover:brightness-110 active:scale-95"
                        >
                          Continue
                        </button>
                      ) : (
                        <button
                          onClick={() => onStartLesson(lesson.id)}
                          className="flex items-center gap-2 rounded-xl bg-[#5cfd80] px-8 py-3 font-['Space_Grotesk'] text-[0.7rem] font-black uppercase tracking-[0.15em] text-[#005d22] shadow-[0_0_20px_rgba(92,253,128,0.2)] transition-all hover:brightness-110 active:scale-95"
                        >
                          <PlayCircle className="h-4 w-4 fill-current" />
                          {lesson.type === 'practice' ? 'Practice' : 'Learn'}
                        </button>
                      )}
                    </div>
                  ))}
                </div>

                {nextSection && (
                  <div className="mt-6 overflow-hidden rounded-2xl border border-[#94aaff]/20 bg-[linear-gradient(145deg,#071224_0%,#0a162d_70%)] p-5 shadow-[0_10px_30px_rgba(0,0,0,0.3)]">
                    <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#a8abb3]">Next Section</p>
                    <h4 className="mt-3 font-['Space_Grotesk'] text-3xl font-black text-[#f1f3fc]">{nextSection.title}</h4>
                    <p className="mt-2 text-sm text-[#c0c8e6]">Link multiple HTML files to create a website</p>
                    <button
                      onClick={() => setSelectedSection(nextSection.id)}
                      className="mt-5 rounded-xl border border-[#8f6dff]/50 bg-[#7e56f8] px-6 py-3 font-['Space_Grotesk'] text-sm font-black text-white shadow-[0_0_0_2px_rgba(143,109,255,0.15)] transition-all hover:brightness-110 active:scale-95"
                    >
                      Continue learning
                    </button>
                  </div>
                )}
              </section>
            </>
          ) : (
            <div className="flex min-h-[24rem] items-center justify-center rounded-[1.75rem] border border-outline-variant/10 bg-surface-container-low p-10">
              <div className="text-center">
                <h3 className="mb-2 text-xl text-white">Course content is coming soon</h3>
                <p className="text-slate-400">This course does not have lesson sections available yet.</p>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
