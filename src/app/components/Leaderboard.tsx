import { Trophy, Medal, Award } from 'lucide-react';

interface LeaderboardEntry {
  rank: number;
  name: string;
  xp: number;
  level: number;
  avatar: string;
}

interface LeaderboardProps {
  entries: LeaderboardEntry[];
  currentUser: string;
}

export function Leaderboard({ entries, currentUser }: LeaderboardProps) {
  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="w-6 h-6 text-yellow-400" />;
      case 2:
        return <Medal className="w-6 h-6 text-slate-400" />;
      case 3:
        return <Medal className="w-6 h-6 text-orange-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-slate-900 border border-cyan-500/30 rounded-xl shadow-2xl shadow-cyan-500/20 p-6">
      <h2 className="text-2xl mb-6 text-white">Leaderboard</h2>

      <div className="space-y-3">
        {entries.map((entry) => {
          const isCurrentUser = entry.name === currentUser;
          
          return (
            <div
              key={entry.rank}
              className={`flex items-center gap-4 p-4 rounded-lg border transition-all ${
                isCurrentUser
                  ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border-cyan-500/50 shadow-lg shadow-cyan-500/20'
                  : 'bg-slate-800 border-slate-700 hover:border-cyan-500/30'
              }`}
            >
              <div className="w-8 text-center">
                {getRankIcon(entry.rank) || <span className="text-slate-400">#{entry.rank}</span>}
              </div>

              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-white text-xl shadow-lg shadow-cyan-500/30">
                {entry.avatar}
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-white">
                    {entry.name}
                  </h3>
                  {isCurrentUser && (
                    <span className="text-xs bg-cyan-500 text-white px-2 py-1 rounded-full shadow-lg shadow-cyan-500/30">
                      You
                    </span>
                  )}
                </div>
                <p className="text-sm text-slate-400">Level {entry.level}</p>
              </div>

              <div className="text-right">
                <p className="text-cyan-400">{entry.xp.toLocaleString()} XP</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}