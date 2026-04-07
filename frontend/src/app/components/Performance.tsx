import {
  BarChart3,
  BookOpen,
  BrainCircuit,
  Flame,
  MapPin,
  Sparkles,
  Target,
  Trophy
} from 'lucide-react';

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

interface PerformanceProps {
  userStats: UserStats;
  courses: CourseSummary[];
}

const chartHeights = [30, 45, 65, 20, 85, 40, 55, 90, 25, 35, 50, 75, 40, 100, 60, 30, 45, 20, 70, 40];
const radarLabels = ['HTML', 'CSS', 'JS', 'TS', 'REACT'];

export function Performance({ userStats, courses }: PerformanceProps) {
  const topCourses = [...courses].sort((a, b) => b.progress - a.progress).slice(0, 3);
  const totalXpEarned = userStats.totalPoints + userStats.xp;
  const courseCompletionAverage =
    courses.length > 0 ? Math.round(courses.reduce((sum, course) => sum + course.progress, 0) / courses.length) : 0;
  const masteryPoints = [
    { x: 50, y: 15 },
    { x: 82, y: 34 },
    { x: 74, y: 74 },
    { x: 30, y: 80 },
    { x: 16, y: 42 }
  ];

  const recentEvents = [
    {
      title: 'Completed Quiz',
      time: '2H AGO',
      description: topCourses[1]
        ? `Scored high progress in ${topCourses[1].title} and pushed your mastery further.`
        : 'Scored strong marks on your latest module quiz.',
      reward: `+${Math.max(150, Math.round(userStats.xp / 2))} XP`,
      Icon: Sparkles,
      tint: 'text-[#5cfd80]',
      bg: 'bg-[#5cfd80]/10'
    },
    {
      title: 'Unlocked Badge',
      time: '5H AGO',
      description:
        userStats.badges.length > 0
          ? `Earned '${userStats.badges[0]}' and expanded your achievement inventory.`
          : 'Your next badge is close. Keep pushing through active missions.',
      reward: null,
      Icon: Trophy,
      tint: 'text-[#ffbd5c]',
      bg: 'bg-[#ffbd5c]/10'
    },
    {
      title: 'AI Hint Used',
      time: '1D AGO',
      description: 'Consulted QUEST AI to refine a tricky concept inside the lesson flow.',
      reward: '-50 Credits',
      Icon: BrainCircuit,
      tint: 'text-[#94aaff]',
      bg: 'bg-[#94aaff]/10'
    }
  ];

  return (
    <div className="space-y-10">
      <section className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div className="flex items-center gap-6">
          <div className="relative">
            <div className="h-24 w-24 rounded-full bg-gradient-to-tr from-[#94aaff] to-[#5cfd80] p-1">
              <div className="flex h-full w-full items-center justify-center rounded-full bg-[#0a0e14] text-3xl font-bold text-[#f1f3fc]">
                {userStats.name.charAt(0).toUpperCase()}
              </div>
            </div>
            <div className="absolute -bottom-1 -right-1 rounded-full bg-[#5cfd80] px-2 py-0.5 font-['Space_Grotesk'] text-[10px] font-bold text-[#005d22]">
              LVL {userStats.level}
            </div>
          </div>

          <div>
            <h1 className="mb-1 font-['Space_Grotesk'] text-4xl font-bold uppercase tracking-tight text-[#f1f3fc]">
              {userStats.name.toUpperCase()}
            </h1>
            <div className="flex flex-wrap items-center gap-4">
              <span className="flex items-center gap-1.5 text-[#ffbd5c]">
                <Flame className="h-5 w-5 fill-current" />
                <span className="font-['Space_Grotesk'] font-bold">{userStats.streak} DAY STREAK</span>
              </span>
              <span className="flex items-center gap-1.5 text-sm uppercase tracking-[0.18em] text-[#a8abb3]">
                <MapPin className="h-4 w-4" />
                NEON_CITY NODE
              </span>
            </div>
          </div>
        </div>

        <div className="flex gap-4">
          <button className="rounded-full bg-[#20262f] px-6 py-3 font-['Space_Grotesk'] text-xs font-bold uppercase tracking-[0.18em] text-[#94aaff] transition-colors hover:bg-[#262c36]">
            View Public Profile
          </button>
          <button className="rounded-full bg-gradient-to-r from-[#94aaff] to-[#3367ff] px-6 py-3 font-['Space_Grotesk'] text-xs font-bold uppercase tracking-[0.18em] text-[#00257b] shadow-lg shadow-[#94aaff]/20 transition-opacity hover:opacity-90">
            Edit Loadout
          </button>
        </div>
      </section>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <div className="overflow-hidden rounded-lg bg-[#151a21] p-8 lg:col-span-8">
          <div className="mb-10 flex items-center justify-between">
            <div>
              <h2 className="font-['Space_Grotesk'] text-xl font-bold uppercase tracking-tight text-[#f1f3fc]">
                XP Telemetry
              </h2>
              <p className="mt-1 font-['Inter'] text-xs uppercase tracking-[0.18em] text-[#a8abb3]">
                Last 30 Days Activity
              </p>
            </div>
            <div className="text-right">
              <span className="font-['Space_Grotesk'] text-3xl font-bold text-[#5cfd80] [text-shadow:0_0_8px_rgba(92,253,128,0.4)]">
                {totalXpEarned.toLocaleString()}
              </span>
              <p className="mt-1 font-['Inter'] text-[10px] uppercase tracking-[0.18em] text-[#5cfd80]">
                TOTAL XP EARNED
              </p>
            </div>
          </div>

          <div className="flex h-48 items-end justify-between gap-1.5 px-2">
            {chartHeights.map((height, index) => {
              const isPrimary = index === 4 || index === 13;
              const isBlue = index === 2 || index === 7 || index === 11 || index === 16;
              return (
                <div
                  key={index}
                  className={`flex-1 rounded-t-sm ${
                    isPrimary
                      ? 'bg-[#5cfd80]/60 shadow-[0_0_12px_rgba(92,253,128,0.3)]'
                      : isBlue
                      ? 'bg-[#94aaff]/40'
                      : 'bg-[#20262f]'
                  }`}
                  style={{ height: `${height}%` }}
                />
              );
            })}
          </div>

          <div className="mt-4 flex justify-between px-2">
            <span className="font-['Inter'] text-[10px] uppercase tracking-[0.18em] text-[#a8abb3]">30 Days Ago</span>
            <span className="font-['Inter'] text-[10px] uppercase tracking-[0.18em] text-[#a8abb3]">Today</span>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center rounded-lg bg-[#151a21] p-8 lg:col-span-4">
          <div className="mb-6 w-full text-left">
            <h2 className="font-['Space_Grotesk'] text-xl font-bold uppercase tracking-tight text-[#f1f3fc]">
              Skill Mastery
            </h2>
            <p className="mt-1 font-['Inter'] text-xs uppercase tracking-[0.18em] text-[#a8abb3]">
              Language Proficiency
            </p>
          </div>

          <div className="relative aspect-square w-full max-w-[240px]">
            <svg className="h-full w-full -rotate-[18deg]" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="45" fill="none" stroke="#44484f" strokeDasharray="2 2" strokeWidth="0.5" />
              <circle cx="50" cy="50" r="30" fill="none" stroke="#44484f" strokeDasharray="2 2" strokeWidth="0.5" />
              <circle cx="50" cy="50" r="15" fill="none" stroke="#44484f" strokeDasharray="2 2" strokeWidth="0.5" />
              <line x1="50" y1="5" x2="50" y2="95" stroke="#44484f" strokeWidth="0.5" />
              <line x1="5" y1="50" x2="95" y2="50" stroke="#44484f" strokeWidth="0.5" />
              <line x1="18" y1="18" x2="82" y2="82" stroke="#44484f" strokeWidth="0.5" />
              <polygon
                points={masteryPoints.map((point) => `${point.x},${point.y}`).join(' ')}
                fill="rgba(148, 170, 255, 0.2)"
                stroke="#94aaff"
                strokeWidth="1.5"
              />
            </svg>
            <span className="absolute left-1/2 top-0 -translate-x-1/2 font-['Space_Grotesk'] text-[10px] font-bold text-[#94aaff]">
              {radarLabels[0]}
            </span>
            <span className="absolute right-[-0.5rem] top-1/4 font-['Space_Grotesk'] text-[10px] font-bold text-[#94aaff]">
              {radarLabels[1]}
            </span>
            <span className="absolute bottom-1/4 right-[-0.5rem] font-['Space_Grotesk'] text-[10px] font-bold text-[#94aaff]">
              {radarLabels[2]}
            </span>
            <span className="absolute bottom-[-0.5rem] left-1/2 -translate-x-1/2 font-['Space_Grotesk'] text-[10px] font-bold text-[#94aaff]">
              {radarLabels[3]}
            </span>
            <span className="absolute bottom-1/4 left-[-0.5rem] font-['Space_Grotesk'] text-[10px] font-bold text-[#94aaff]">
              {radarLabels[4]}
            </span>
          </div>
        </div>

        <div className="rounded-lg bg-[#151a21] p-8 lg:col-span-6">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h2 className="font-['Space_Grotesk'] text-xl font-bold uppercase tracking-tight text-[#f1f3fc]">
                Active Missions
              </h2>
              <p className="mt-1 font-['Inter'] text-xs uppercase tracking-[0.18em] text-[#a8abb3]">
                Ongoing Objectives
              </p>
            </div>
            <Target className="h-5 w-5 text-[#94aaff]" />
          </div>

          <div className="space-y-8">
            {topCourses.map((course, index) => {
              const tint = index === 0 ? '#5cfd80' : index === 1 ? '#94aaff' : '#ffbd5c';
              return (
                <div key={course.id}>
                  <div className="mb-2 flex justify-between text-sm font-['Space_Grotesk'] font-bold">
                    <span className="uppercase tracking-tight text-[#f1f3fc]">{course.title}</span>
                    <span style={{ color: tint }}>{course.progress}%</span>
                  </div>
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#20262f]">
                    <div className="h-full rounded-full" style={{ width: `${course.progress}%`, backgroundColor: tint }} />
                  </div>
                </div>
              );
            })}
          </div>

          <button className="mt-10 w-full rounded-xl border border-[#44484f]/20 py-4 font-['Space_Grotesk'] text-xs font-bold uppercase tracking-[0.2em] text-[#a8abb3] transition-all hover:border-[#94aaff]/40 hover:text-[#94aaff]">
            View Mission Log
          </button>
        </div>

        <div className="rounded-lg bg-[#151a21] p-8 lg:col-span-6">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h2 className="font-['Space_Grotesk'] text-xl font-bold uppercase tracking-tight text-[#f1f3fc]">
                System Events
              </h2>
              <p className="mt-1 font-['Inter'] text-xs uppercase tracking-[0.18em] text-[#a8abb3]">
                Recent Milestones
              </p>
            </div>
            <BarChart3 className="h-5 w-5 text-[#6c8cff]" />
          </div>

          <div className="space-y-6">
            {recentEvents.map(({ title, time, description, reward, Icon, tint, bg }) => (
              <div key={title} className="flex items-start gap-4">
                <div className={`mt-1 rounded-lg p-2 ${bg}`}>
                  <Icon className={`h-5 w-5 ${tint}`} />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <h4 className="font-['Space_Grotesk'] text-sm font-bold uppercase tracking-tight text-[#f1f3fc]">
                      {title}
                    </h4>
                    <span className="font-['Inter'] text-[10px] text-[#a8abb3]">{time}</span>
                  </div>
                  <p className="mt-0.5 text-xs text-[#a8abb3]">{description}</p>
                  {reward && (
                    <span className={`mt-1 block font-['Space_Grotesk'] text-[10px] font-bold ${tint}`}>
                      {reward}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
