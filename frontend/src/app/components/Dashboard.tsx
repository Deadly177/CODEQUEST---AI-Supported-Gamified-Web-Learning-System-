import { ArrowRight, Award, BookOpen, CheckCircle2, Code2, Flame, History, Sparkles, Star, Trophy } from 'lucide-react';

interface UserStats {
  name: string;
  level: number;
  xp: number;
  xpToNextLevel: number;
  streak: number;
  totalPoints: number;
  badges: string[];
}

interface CourseSummary {
  id: string;
  title: string;
  description: string;
  progress: number;
  totalLessons: number;
  completedLessons: number;
  icon: 'html' | 'css' | 'javascript' | 'backend';
  color: string;
}

interface DashboardProps {
  userStats: UserStats;
  courses: CourseSummary[];
  onSelectCourse: (courseId: string) => void;
  globalRank?: number;
  achievementsUnlocked: number;
  achievementsTotal: number;
}

const iconMap = {
  html: Code2,
  css: Sparkles,
  javascript: Trophy,
  backend: BookOpen
};

export function Dashboard({
  userStats,
  courses,
  onSelectCourse,
  globalRank,
  achievementsUnlocked,
  achievementsTotal
}: DashboardProps) {
  const xpProgress = Math.min(100, (userStats.xp / userStats.xpToNextLevel) * 100);
  const activeCourse = [...courses].sort((left, right) => right.progress - left.progress)[0] ?? courses[0];
  const suggestedCourses = [...courses].sort((left, right) => right.progress - left.progress).slice(0, 2);
  const totalCompletedLessons = courses.reduce((sum, course) => sum + course.completedLessons, 0);

  const recentActivity = [
    {
      id: 'course',
      title: activeCourse ? `Working on "${activeCourse.title}"` : 'Continue your coding path',
      description: activeCourse
        ? `${activeCourse.completedLessons}/${activeCourse.totalLessons} lessons completed in your active module.`
        : 'Start your next lesson to generate fresh progress data.',
      meta: 'LIVE PROGRESS',
      icon: CheckCircle2,
      tint: 'text-[#5cfd80]',
      bg: 'bg-[#5cfd80]/10'
    },
    {
      id: 'streak',
      title: `${userStats.streak} day learning streak`,
      description: 'Daily activity keeps your rhythm alive and helps unlock faster progress.',
      meta: 'STREAK',
      icon: Flame,
      tint: 'text-[#ffbd5c]',
      bg: 'bg-[#ffbd5c]/10'
    },
    {
      id: 'xp',
      title: `${userStats.totalPoints} total XP earned`,
      description: `${userStats.xp} XP already collected toward Level ${userStats.level + 1}.`,
      meta: 'XP UPDATE',
      icon: Star,
      tint: 'text-[#94aaff]',
      bg: 'bg-[#94aaff]/10'
    }
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-12 lg:col-span-8 overflow-hidden rounded-[2rem] bg-[#151a21] p-8 shadow-2xl shadow-black/30">
          <div className="relative">
            <div className="absolute -right-16 -top-20 h-64 w-64 rounded-full bg-[#94aaff]/10 blur-3xl" />
            <div className="relative z-10 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
              <div className="flex-1">
                <div className="mb-4 flex items-center gap-3">
                  <span className="rounded-full bg-[#feaa00]/15 px-3 py-1 text-[10px] font-black uppercase tracking-[0.28em] text-[#ffbd5c]">
                    In Progress
                  </span>
                  <span className="text-xs uppercase tracking-[0.2em] text-[#a8abb3]">Started recently</span>
                </div>

                <h2 className="font-['Space_Grotesk'] text-4xl font-bold tracking-tight text-[#f1f3fc]">
                  {activeCourse?.title ?? 'Coding Path'}
                </h2>
                <p className="mt-3 max-w-xl text-sm leading-7 text-[#a8abb3]">
                  {activeCourse?.description ??
                    'Keep moving through your learning path with live progress, achievements, and lesson tracking.'}
                </p>

                <div className="mt-8 max-w-md space-y-4">
                  <div className="flex items-end justify-between">
                    <span className="text-xs font-bold uppercase tracking-[0.24em] text-[#f1f3fc]">Overall Mastery</span>
                    <span className="font-['Space_Grotesk'] text-3xl font-black text-[#5cfd80]">
                      {activeCourse?.progress ?? 0}%
                    </span>
                  </div>
                  <div className="h-3 overflow-hidden rounded-full bg-[#20262f]">
                    <div
                      className="h-full rounded-full bg-[#5cfd80] shadow-[0_0_12px_rgba(92,253,128,0.5)] transition-all duration-500"
                      style={{ width: `${activeCourse?.progress ?? 0}%` }}
                    />
                  </div>
                </div>
              </div>

              {activeCourse && (
                <button
                  type="button"
                  onClick={() => onSelectCourse(activeCourse.id)}
                  className="inline-flex items-center justify-center gap-3 rounded-full bg-gradient-to-r from-[#94aaff] to-[#3367ff] px-8 py-5 text-xs font-black uppercase tracking-[0.24em] text-[#000000] transition-transform hover:scale-[1.02]"
                >
                  Continue Learning
                  <ArrowRight className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="col-span-12 lg:col-span-4 rounded-[2rem] bg-[#151a21] p-8">
          <div className="flex flex-col items-center justify-center text-center">
            <div className="relative">
              <svg className="h-32 w-32 -rotate-90 transform" viewBox="0 0 160 160">
                <circle cx="80" cy="80" r="68" stroke="rgba(32,38,47,1)" strokeWidth="10" fill="none" />
                <circle
                  cx="80"
                  cy="80"
                  r="68"
                  stroke="#94aaff"
                  strokeWidth="10"
                  fill="none"
                  strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 68}`}
                  strokeDashoffset={`${2 * Math.PI * 68 * (1 - xpProgress / 100)}`}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="font-['Space_Grotesk'] text-4xl font-black text-[#f1f3fc]">{userStats.level}</span>
                <span className="text-[10px] font-black uppercase tracking-[0.28em] text-[#94aaff]">Level</span>
              </div>
            </div>

            <div className="mt-5">
              <h3 className="font-['Space_Grotesk'] text-2xl font-bold text-[#f1f3fc]">{userStats.totalPoints} XP</h3>
              <p className="mt-2 text-[11px] uppercase tracking-[0.24em] text-[#a8abb3]">
                {userStats.xpToNextLevel - userStats.xp} XP to Level {userStats.level + 1}
              </p>
            </div>

            <div className="mt-6 grid w-full grid-cols-2 gap-3">
              <div className="rounded-2xl bg-[#20262f] p-4 text-left">
                <p className="text-[10px] uppercase tracking-[0.2em] text-[#a8abb3]">Global Rank</p>
                <p className="mt-2 font-['Space_Grotesk'] text-xl font-bold text-[#ffbd5c]">
                  {globalRank ? `#${globalRank.toLocaleString()}` : '-'}
                </p>
              </div>
              <div className="rounded-2xl bg-[#20262f] p-4 text-left">
                <p className="text-[10px] uppercase tracking-[0.2em] text-[#a8abb3]">Achievements</p>
                <p className="mt-2 font-['Space_Grotesk'] text-xl font-bold text-[#5cfd80]">
                  {achievementsUnlocked}/{achievementsTotal}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-12 lg:col-span-7 space-y-5">
          <div className="flex items-center gap-3">
            <History className="h-5 w-5 text-[#94aaff]" />
            <h3 className="font-['Space_Grotesk'] text-xl font-bold text-[#f1f3fc]">Recent Activity</h3>
          </div>

          <div className="space-y-4">
            {recentActivity.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.id}
                  className="rounded-[1.75rem] bg-[rgba(32,38,47,0.6)] p-6 backdrop-blur-[24px] transition-colors hover:bg-[#1b2028]"
                >
                  <div className="flex items-start gap-4">
                    <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${item.bg}`}>
                      <Icon className={`h-5 w-5 ${item.tint}`} />
                    </div>
                    <div className="flex-1">
                      <div className="mb-1 flex items-start justify-between gap-4">
                        <h4 className="font-bold text-[#f1f3fc]">{item.title}</h4>
                        <span className="text-[10px] uppercase tracking-[0.24em] text-[#a8abb3]">{item.meta}</span>
                      </div>
                      <p className="text-sm leading-7 text-[#a8abb3]">{item.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="col-span-12 lg:col-span-5 space-y-5">
          <div className="flex items-center gap-3">
            <Sparkles className="h-5 w-5 text-[#ffbd5c]" />
            <h3 className="font-['Space_Grotesk'] text-xl font-bold text-[#f1f3fc]">Suggested Quests</h3>
          </div>

          {suggestedCourses.map((course) => {
            const Icon = iconMap[course.icon];
            return (
              <button
                key={course.id}
                type="button"
                onClick={() => onSelectCourse(course.id)}
                className="w-full overflow-hidden rounded-[2rem] bg-[#151a21] text-left transition-transform hover:scale-[1.01]"
              >
                <div className="relative h-28 w-full overflow-hidden">
                  <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(148,170,255,0.22),rgba(16,24,39,0.94))]" />
                  <div className="absolute bottom-3 left-4">
                    <span className="rounded-full bg-[#feaa00] px-2 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-[#331f00]">
                      Suggested
                    </span>
                  </div>
                  <div className="absolute right-4 top-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#20262f]">
                    <Icon className="h-5 w-5 text-[#94aaff]" />
                  </div>
                </div>

                <div className="p-5">
                  <h4 className="font-['Space_Grotesk'] text-lg font-bold text-[#f1f3fc]">{course.title}</h4>
                  <p className="mt-2 text-xs leading-6 text-[#a8abb3]">{course.description}</p>

                  <div className="mt-4">
                    <div className="mb-2 flex items-center justify-between text-xs uppercase tracking-[0.2em] text-[#a8abb3]">
                      <span>Progress</span>
                      <span className="font-bold text-[#5cfd80]">{course.progress}%</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-[#20262f]">
                      <div
                        className="h-full rounded-full bg-[#94aaff] transition-all duration-500"
                        style={{ width: `${course.progress}%` }}
                      />
                    </div>
                  </div>

                  <div className="mt-4 rounded-xl bg-[#20262f] px-4 py-2.5 text-center text-[11px] font-bold uppercase tracking-[0.24em] text-[#f1f3fc] transition-colors hover:bg-[#809bff] hover:text-[#001b61]">
                    Preview Module
                  </div>
                </div>
              </button>
            );
          })}

          <div className="rounded-[1.75rem] bg-[#151a21] p-6">
            <div className="mb-4 flex items-center justify-between">
              <h4 className="text-sm font-bold uppercase tracking-[0.24em] text-[#a8abb3]">Daily Challenge</h4>
              <span className="text-xs font-bold text-[#5cfd80]">READY</span>
            </div>
            <div className="flex items-center gap-4 rounded-2xl bg-[#0a0e14] p-4 ring-1 ring-[#5cfd80]/20">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#5cfd80]/10">
                <Code2 className="h-5 w-5 text-[#5cfd80]" />
              </div>
              <div>
                <p className="text-sm font-bold text-[#f1f3fc]">Live Practice Session</p>
                <p className="text-[10px] uppercase tracking-[0.22em] text-[#a8abb3]">Potential: +150 XP</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
