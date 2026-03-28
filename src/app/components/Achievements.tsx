import { Award, Lock } from 'lucide-react';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: string;
}

interface AchievementsProps {
  achievements: Achievement[];
}

export function Achievements({ achievements }: AchievementsProps) {
  const unlockedCount = achievements.filter(a => a.unlocked).length;

  return (
    <div className="bg-slate-900 border border-cyan-500/30 rounded-xl shadow-2xl shadow-cyan-500/20 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl text-white">Achievements</h2>
        <span className="text-sm text-slate-400">
          <span className="text-cyan-400">{unlockedCount}</span> / {achievements.length} unlocked
        </span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {achievements.map((achievement) => (
          <div
            key={achievement.id}
            className={`relative p-4 rounded-lg border-2 ${
              achievement.unlocked
                ? 'border-yellow-500/50 bg-gradient-to-br from-yellow-500/10 to-orange-500/10 shadow-lg shadow-yellow-500/20'
                : 'border-slate-700 bg-slate-800'
            }`}
          >
            {!achievement.unlocked && (
              <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-[2px] rounded-lg flex items-center justify-center">
                <Lock className="w-8 h-8 text-slate-600" />
              </div>
            )}
            
            <div className="text-center">
              <div className={`text-4xl mb-2 ${achievement.unlocked ? '' : 'grayscale opacity-30'}`}>
                {achievement.icon}
              </div>
              <h3 className="text-sm mb-1 text-white">{achievement.title}</h3>
              <p className="text-xs text-slate-400">{achievement.description}</p>
              {achievement.unlocked && achievement.unlockedAt && (
                <p className="text-xs text-cyan-400 mt-2">
                  Unlocked {achievement.unlockedAt}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}