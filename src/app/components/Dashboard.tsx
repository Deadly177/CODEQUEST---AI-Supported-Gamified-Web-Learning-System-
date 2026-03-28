import { Trophy, Flame, Star, Award } from 'lucide-react';

interface DashboardProps {
  userStats: {
    name: string;
    level: number;
    xp: number;
    xpToNextLevel: number;
    streak: number;
    totalPoints: number;
    badges: string[];
  };
}

export function Dashboard({ userStats }: DashboardProps) {
  const xpProgress = (userStats.xp / userStats.xpToNextLevel) * 100;

  return (
    <div className="bg-slate-900 border border-cyan-500/30 rounded-2xl p-6 text-white shadow-2xl shadow-cyan-500/20">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-3xl mb-1">Welcome back, <span className="text-cyan-400">{userStats.name}</span>!</h2>
          <p className="text-slate-400">Keep up the great work!</p>
        </div>
        <div className="bg-yellow-500/20 rounded-full p-4 shadow-lg shadow-yellow-500/30">
          <Trophy className="w-12 h-12 text-yellow-400" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-slate-800 border border-cyan-500/20 backdrop-blur rounded-xl p-4 hover:border-cyan-500/40 transition-all">
          <div className="flex items-center gap-3">
            <div className="bg-yellow-500/20 rounded-lg p-3 shadow-md shadow-yellow-500/10">
              <Star className="w-6 h-6 text-yellow-400" />
            </div>
            <div>
              <p className="text-sm text-slate-400">Level</p>
              <p className="text-2xl text-cyan-400">{userStats.level}</p>
            </div>
          </div>
        </div>

        <div className="bg-slate-800 border border-cyan-500/20 backdrop-blur rounded-xl p-4 hover:border-cyan-500/40 transition-all">
          <div className="flex items-center gap-3">
            <div className="bg-orange-500/20 rounded-lg p-3 shadow-md shadow-orange-500/10">
              <Flame className="w-6 h-6 text-orange-400" />
            </div>
            <div>
              <p className="text-sm text-slate-400">Day Streak</p>
              <p className="text-2xl text-cyan-400">{userStats.streak}</p>
            </div>
          </div>
        </div>

        <div className="bg-slate-800 border border-cyan-500/20 backdrop-blur rounded-xl p-4 hover:border-cyan-500/40 transition-all">
          <div className="flex items-center gap-3">
            <div className="bg-blue-500/20 rounded-lg p-3 shadow-md shadow-blue-500/10">
              <Award className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <p className="text-sm text-slate-400">Total XP</p>
              <p className="text-2xl text-cyan-400">{userStats.totalPoints}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-slate-800 border border-cyan-500/20 backdrop-blur rounded-xl p-4">
        <div className="flex justify-between items-center mb-2">
          <p className="text-sm text-slate-400">Progress to Level {userStats.level + 1}</p>
          <p className="text-sm text-cyan-400">{userStats.xp} / {userStats.xpToNextLevel} XP</p>
        </div>
        <div className="w-full bg-slate-700 rounded-full h-3 overflow-hidden">
          <div 
            className="bg-gradient-to-r from-cyan-400 to-blue-500 h-full rounded-full transition-all duration-500 shadow-lg shadow-cyan-500/50"
            style={{ width: `${xpProgress}%` }}
          />
        </div>
      </div>
    </div>
  );
}
