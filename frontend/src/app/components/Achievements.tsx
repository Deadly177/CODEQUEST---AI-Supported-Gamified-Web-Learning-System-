import {
  Award,
  Bell,
  BookOpen,
  Check,
  Flame,
  GraduationCap,
  History,
  Lock,
  MoreHorizontal,
  MonitorUp,
  Globe,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
  Trophy,
  Zap
} from 'lucide-react';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: string;
}

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

interface LeaderboardEntry {
  rank: number;
  name: string;
  xp: number;
  level: number;
  streak: number;
  avatar: string;
}

interface AchievementsProps {
  achievements: Achievement[];
  userStats: UserStats;
  courses: CourseSummary[];
  leaderboardEntries: LeaderboardEntry[];
}

const earnedBadgeStyles = [
  'from-[#ffbd5c] to-[#feaa00] text-[#5c3b00] shadow-[0_0_25px_rgba(255,189,92,0.28)]',
  'from-[#d480ff] to-[#9c33ff] text-white shadow-[0_0_25px_rgba(156,51,255,0.28)]',
  'from-[#00d8ff] to-[#008fb3] text-white shadow-[0_0_25px_rgba(0,216,255,0.28)]',
  'from-[#ff7b5c] to-[#ff4d00] text-white shadow-[0_0_25px_rgba(255,123,92,0.28)]',
  'from-[#5cfd80] to-[#006e2a] text-[#00240d] shadow-[0_0_25px_rgba(92,253,128,0.22)]',
  'from-[#94aaff] to-[#3367ff] text-white shadow-[0_0_25px_rgba(148,170,255,0.28)]'
];

const milestoneIconMap = [Trophy, BookOpen, ShieldCheck];
const activityIconMap = [Award, BookOpen, Flame];
const activityDotClasses = ['bg-[#5cfd80]', 'bg-[#94aaff]', 'bg-[#ffbd5c]'];

export function Achievements({ achievements, userStats, courses, leaderboardEntries }: AchievementsProps) {
  const unlockedCount = achievements.filter((achievement) => achievement.unlocked).length;
  const lockedCount = Math.max(0, achievements.length - unlockedCount);
  const totalLessons = courses.reduce((sum, course) => sum + course.totalLessons, 0);
  const completedLessons = courses.reduce((sum, course) => sum + course.completedLessons, 0);
  const mastery = achievements.length > 0 ? Math.round((unlockedCount / achievements.length) * 100) : 0;
  const currentRank = leaderboardEntries.find((entry) => entry.name.toLowerCase() === userStats.name.toLowerCase())?.rank;
  const lessonMasteryPercent = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;
  const upcomingMilestones = [
    {
      id: 'level',
      title: `Reach Level ${userStats.level + 8}`,
      description: "Unlock the 'System Architect' path and an elite neon title card.",
      current: userStats.level,
      target: userStats.level + 8,
      reward: '1,500 XP Reward',
      tint: 'primary'
    },
    {
      id: 'lessons',
      title: 'Complete 100 Lessons',
      description: "Earn the 'Scholar' badge and extra lesson-skip rewards.",
      current: completedLessons,
      target: Math.max(100, completedLessons + 20),
      reward: '2,000 XP Reward',
      tint: 'secondary'
    },
    {
      id: 'badges',
      title: 'Unlock 18 Badges',
      description: "Open the next achievement tier and a rare profile frame.",
      current: unlockedCount,
      target: Math.max(18, unlockedCount + 6),
      reward: 'Legend Frame',
      tint: 'tertiary'
    }
  ];

  const recentActivity = achievements
    .filter((achievement) => achievement.unlocked)
    .slice(0, 3)
    .map((achievement, index) => ({
      id: achievement.id,
      title: index === 0 ? 'Achievement Unlocked' : index === 1 ? 'Module Completed' : 'Streak Milestone',
      subtitle:
        index === 0
          ? `Earned '${achievement.title}'`
          : index === 1
          ? `${achievement.title} progress milestone reached`
          : `${userStats.streak} Day Streak Maintained`,
      timestamp: achievement.unlockedAt ?? (index === 0 ? 'Recently' : `${index + 1} days ago`),
      Icon: activityIconMap[index % activityIconMap.length],
      dotClass: activityDotClasses[index % activityDotClasses.length]
    }));

  if (recentActivity.length < 3) {
    recentActivity.push(
      ...[
        {
          id: 'progress',
          title: 'Module Completed',
          subtitle: `Completed ${completedLessons} lessons`,
          timestamp: 'Live progress',
          Icon: Sparkles,
          dotClass: 'bg-[#94aaff]'
        },
        {
          id: 'streak',
          title: 'Streak Milestone',
          subtitle: `${userStats.streak} Day Streak Maintained`,
          timestamp: 'Current',
          Icon: Flame,
          dotClass: 'bg-[#ffbd5c]'
        }
      ].slice(0, 3 - recentActivity.length)
    );
  }

  return (
    <div className="flex gap-8 xl:items-start">
      <main className="min-w-0 flex-1 space-y-10">
        <header className="flex flex-col gap-8">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="h-[2px] w-8 bg-[#94aaff]" />
                <span className="font-['Space_Grotesk'] text-[0.65rem] font-bold uppercase tracking-[0.3em] text-[#94aaff]">
                  Security Clearance: Level {userStats.level}
                </span>
              </div>
              <h2 className="font-['Space_Grotesk'] text-5xl font-extrabold tracking-tight text-[#f1f3fc]">
                Achievements
              </h2>
            </div>

            <div className="glass-panel asymmetric-cut flex items-center gap-6 rounded-xl border-l-4 border-[#5cfd80] px-6 py-4">
              <div>
                <p className="mb-1 text-[0.6rem] font-bold uppercase tracking-[0.2em] text-[#a8abb3]">
                  Current Mastery
                </p>
                <div className="flex items-baseline gap-2">
                  <span className="font-['Space_Grotesk'] text-3xl font-black text-[#5cfd80]">{mastery}%</span>
                  <span className="text-[0.6rem] font-medium text-[#a8abb3]">RANK: ELITE</span>
                </div>
              </div>
              <div className="relative flex h-16 w-16 items-center justify-center">
                <svg className="absolute inset-0 h-full w-full -rotate-90" viewBox="0 0 64 64">
                  <circle cx="32" cy="32" r="28" fill="transparent" stroke="#20262f" strokeWidth="4" />
                  <circle
                    cx="32"
                    cy="32"
                    r="28"
                    fill="transparent"
                    stroke="#5cfd80"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeDasharray="175.9"
                    strokeDashoffset={175.9 - (175.9 * mastery) / 100}
                  />
                </svg>
                <Star className="h-6 w-6 fill-current text-[#5cfd80]" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard
              label="Total Experience"
              value={userStats.totalPoints.toLocaleString()}
              suffix="XP"
              hint={`LEVEL ${userStats.level}`}
              icon={<MonitorUp className="h-5 w-5 text-[#94aaff]" />}
              badgeClass="text-[#5cfd80]"
              accentClass="hover:border-b-[#94aaff]"
            />
            <StatCard
              label="Global Ranking"
              value={currentRank ? `#${currentRank.toLocaleString()}` : '-'}
              hint={currentRank ? `${leaderboardEntries.length} COMPETITORS` : 'NOT RANKED'}
              icon={<Globe className="h-5 w-5 text-[#94aaff]" />}
              badgeClass="text-[#a8abb3]"
              accentClass="hover:border-b-[#94aaff]"
            />
            <StatCard
              label="Lessons Mastery"
              value={String(completedLessons)}
              suffix={`/ ${totalLessons}`}
              hint={`${lessonMasteryPercent}% COMPLETE`}
              icon={<GraduationCap className="h-5 w-5 text-[#94aaff]" />}
              badgeClass="text-[#a8abb3]"
              accentClass="hover:border-b-[#94aaff]"
            />
            <StatCard
              label="Active Streak"
              value={String(userStats.streak)}
              suffix="Days"
              hint="FLAMING"
              icon={<Flame className="h-5 w-5 fill-current text-[#ffbd5c]" />}
              badgeClass="text-[#ffbd5c]"
              accentClass="hover:border-b-[#ffbd5c]"
            />
          </div>
        </header>

        <section>
          <div className="mb-8 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h3 className="font-['Space_Grotesk'] text-2xl font-bold text-[#f1f3fc]">Badges Gallery</h3>
              <div className="hidden h-4 w-px bg-[#44484f]/30 sm:block" />
              <div className="flex gap-2">
                <span className="rounded border border-[#5cfd80]/20 bg-[#5cfd80]/10 px-2.5 py-0.5 text-[0.6rem] font-bold uppercase tracking-widest text-[#5cfd80]">
                  {unlockedCount} Earned
                </span>
                <span className="rounded bg-[#20262f] px-2.5 py-0.5 text-[0.6rem] font-bold uppercase tracking-widest text-[#a8abb3]">
                  {lockedCount} Locked
                </span>
              </div>
            </div>
            <button className="text-xs font-bold uppercase tracking-widest text-[#94aaff] hover:underline">
              View All Collection
            </button>
          </div>

          <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-6">
            {achievements.map((achievement, index) => (
              <div
                key={achievement.id}
                className={`badge-card glass-panel relative overflow-hidden rounded-xl p-5 text-center ${
                  achievement.unlocked ? '' : 'border-dashed border-outline-variant/50 opacity-40 grayscale'
                }`}
              >
                <div
                  className={`relative z-10 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br text-3xl ${
                    achievement.unlocked
                      ? earnedBadgeStyles[index % earnedBadgeStyles.length]
                      : 'from-[#20262f] to-[#20262f] text-[#a8abb3]'
                  }`}
                >
                  <span>{achievement.icon}</span>
                </div>
                <div className="absolute right-2 top-2">
                  {achievement.unlocked ? (
                    <Check className="h-4 w-4 text-[#5cfd80]" strokeWidth={3} />
                  ) : (
                    <Lock className="h-4 w-4 text-white" />
                  )}
                </div>
                <h4 className="w-full truncate font-['Space_Grotesk'] text-xs font-bold text-[#f1f3fc]">
                  {achievement.title}
                </h4>
                <p className="mt-1 text-[0.55rem] font-semibold uppercase tracking-wider text-[#a8abb3]">
                  {achievement.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <div className="mb-8 flex items-center gap-4">
            <h3 className="font-['Space_Grotesk'] text-2xl font-bold text-[#f1f3fc]">Upcoming Milestones</h3>
            <div className="h-[1px] flex-1 bg-gradient-to-r from-[#44484f]/30 to-transparent" />
          </div>

          <div className="grid grid-cols-1 gap-4">
            {upcomingMilestones.slice(0, 2).map((milestone, index) => {
              const Icon = milestoneIconMap[index % milestoneIconMap.length];
              const progress = milestone.target > 0 ? Math.min(100, Math.round((milestone.current / milestone.target) * 100)) : 0;
              const tintClasses =
                milestone.tint === 'secondary'
                  ? {
                      text: 'text-[#5cfd80]',
                      bg: 'bg-[#5cfd80]/10',
                      pill: 'bg-[#5cfd80]/20 text-[#5cfd80]',
                      bar: 'bg-[#5cfd80]',
                      border: 'border-l-[#5cfd80]'
                    }
                  : {
                      text: 'text-[#94aaff]',
                      bg: 'bg-[#94aaff]/10',
                      pill: 'bg-[#94aaff]/20 text-[#94aaff]',
                      bar: 'bg-[#94aaff]',
                      border: 'border-l-[#94aaff]'
                    };

              return (
                <div key={milestone.id} className={`glass-panel relative overflow-hidden rounded-2xl border-l-4 p-6 ${tintClasses.border}`}>
                  <div className="relative z-10 flex flex-col gap-8 md:flex-row md:items-center">
                    <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl ${tintClasses.bg}`}>
                      <Icon className={`h-7 w-7 ${tintClasses.text}`} />
                    </div>
                    <div className="flex-1">
                      <h4 className="mb-1 font-['Space_Grotesk'] text-lg font-bold text-[#f1f3fc]">{milestone.title}</h4>
                      <p className="max-w-lg text-sm text-[#a8abb3]">{milestone.description}</p>
                    </div>
                    <div className="w-full md:w-64">
                      <div className="mb-2 flex justify-between text-[0.65rem] font-bold uppercase tracking-widest text-[#a8abb3]">
                        <span>{index === 0 ? 'XP Progress' : 'Lessons'}</span>
                        <span className={tintClasses.text}>
                          {milestone.current} / {milestone.target}
                        </span>
                      </div>
                      <div className="h-2 w-full overflow-hidden rounded-full bg-[#20262f]">
                        <div className={`h-full rounded-full ${tintClasses.bar}`} style={{ width: `${progress}%` }} />
                      </div>
                    </div>
                    <div className={`flex shrink-0 items-center gap-2 rounded-lg px-4 py-2 ${tintClasses.pill}`}>
                      <Sparkles className="h-4 w-4" />
                      <span className="text-[0.65rem] font-black uppercase">{milestone.reward}</span>
                    </div>
                  </div>
                  <div className={`absolute ${index === 0 ? '-right-16 -top-16' : '-left-16 -bottom-16'} h-48 w-48 rounded-full blur-[80px] ${tintClasses.bg}`} />
                </div>
              );
            })}
          </div>
        </section>
      </main>

      <aside className="hidden w-80 shrink-0 xl:flex xl:flex-col xl:border-l xl:border-[#44484f]/10 xl:bg-[#0f141a] xl:p-6">
        <div className="mb-8 flex items-center justify-between">
          <h3 className="flex items-center gap-2 font-['Space_Grotesk'] text-lg font-bold text-[#f1f3fc]">
            <History className="h-4 w-4 text-[#94aaff]" />
            Activity Log
          </h3>
          <button className="text-[#a8abb3] transition-colors hover:text-[#94aaff]">
            <MoreHorizontal className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 space-y-8">
          {recentActivity.map((item, index) => (
            <div key={item.id} className="group relative flex items-start gap-4">
              {index < recentActivity.length - 1 && (
                <div className="absolute bottom-[-24px] left-2.5 top-8 w-px bg-[#44484f]/20" />
              )}
              <div className={`mt-0.5 h-5 w-5 shrink-0 rounded-full border-4 border-[#0a0e14] ${item.dotClass}`} />
              <div>
                <p className="text-xs font-bold leading-tight text-[#f1f3fc]">{item.title}</p>
                <p className="mt-0.5 text-[0.7rem] text-[#a8abb3]">{item.subtitle}</p>
                <p className="mt-2 flex items-center gap-1 text-[0.6rem] font-bold uppercase tracking-wider text-[#a8abb3]">
                  <span className="material-symbols-outlined text-[10px]">schedule</span>
                  {item.timestamp}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8">
          <div className="relative overflow-hidden rounded-2xl border border-[#ffbd5c]/20 bg-gradient-to-br from-[#1b2028] to-[#151a21] p-6">
            <div className="relative z-10">
              <div className="mb-3 flex items-center gap-2">
                <div className="rounded bg-[#ffbd5c]/20 px-2 py-0.5 text-[0.6rem] font-bold uppercase tracking-tighter text-[#ffbd5c]">
                  Live Event
                </div>
              </div>
              <h4 className="font-['Space_Grotesk'] text-base font-bold text-[#f1f3fc]">Season Tournament</h4>
              <p className="mb-5 mt-2 text-[0.7rem] leading-relaxed text-[#a8abb3]">
                Top finishers this month earn a limited edition Neon Terminal reward. Push your badge count higher.
              </p>
              <button className="w-full rounded-lg bg-[#ffbd5c] py-2.5 text-xs font-bold uppercase tracking-widest text-[#5c3b00] transition-all hover:scale-[1.02]">
                Enter Tournament
              </button>
            </div>
            <Trophy className="absolute -bottom-6 -right-6 h-24 w-24 text-[#ffbd5c]/10" />
            <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-[#ffbd5c]/5 blur-3xl" />
          </div>
        </div>
      </aside>
    </div>
  );
}

function StatCard({
  label,
  value,
  suffix,
  hint,
  icon,
  badgeClass,
  accentClass
}: {
  label: string;
  value: string;
  suffix?: string;
  hint: string;
  icon: JSX.Element;
  badgeClass: string;
  accentClass: string;
}) {
  return (
    <div className={`glass-panel group rounded-2xl border-b-2 border-b-transparent p-6 transition-all ${accentClass}`}>
      <div className="mb-4 flex items-start justify-between">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#94aaff]/10">{icon}</div>
        <span className={`text-[0.6rem] font-bold uppercase tracking-widest ${badgeClass}`}>{hint}</span>
      </div>
      <p className="mb-1 text-xs font-medium uppercase tracking-[0.1em] text-[#a8abb3]">{label}</p>
      <h3 className="font-['Space_Grotesk'] text-3xl font-black text-[#f1f3fc]">
        {value} {suffix ? <span className="text-sm font-medium text-[#a8abb3]/60">{suffix}</span> : null}
      </h3>
    </div>
  );
}
