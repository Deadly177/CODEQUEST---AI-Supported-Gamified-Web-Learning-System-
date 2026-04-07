import { useMemo, useState } from 'react';
import {
  Flame,
  Medal,
  Search,
  Trophy
} from 'lucide-react';

const firstPlaceImage = new URL('../../assets/leaderboard/First.png', import.meta.url).href;
const secondPlaceImage = new URL('../../assets/leaderboard/Second.png', import.meta.url).href;
const thirdPlaceImage = new URL('../../assets/leaderboard/Third.png', import.meta.url).href;

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

type Period = 'weekly' | 'all-time';

const tierByRank: Record<number, string> = {
  1: 'Apex Architect',
  2: 'Diamond Tier',
  3: 'Platinum Tier'
};

const podiumImageByRank: Record<number, string> = {
  1: firstPlaceImage,
  2: secondPlaceImage,
  3: thirdPlaceImage
};

export function Leaderboard({ entries, currentUser }: LeaderboardProps) {
  const [period, setPeriod] = useState<Period>('weekly');
  const [query, setQuery] = useState('');

  const sortedEntries = useMemo(
    () => [...entries].sort((left, right) => left.rank - right.rank),
    [entries]
  );

  const podiumEntries = sortedEntries.slice(0, 3);
  const tableEntries = sortedEntries.slice(3);
  const topXp = podiumEntries[0]?.xp ?? 1;

  const currentUserEntry =
    sortedEntries.find((entry) => entry.name.toLowerCase() === currentUser.toLowerCase()) ?? sortedEntries[0];

  const filteredTableEntries = tableEntries.filter((entry) =>
    entry.name.toLowerCase().includes(query.trim().toLowerCase())
  );

  const displayEntries = query.trim() ? filteredTableEntries : tableEntries;

  return (
    <div className="space-y-10">
      <section className="mb-2">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="font-['Space_Grotesk'] text-[3.5rem] font-bold leading-none tracking-tight text-[#f1f3fc]">
              The Pantheon
            </h2>
            <p className="mt-2 max-w-2xl text-lg text-[#a8abb3]">
              Where legends are compiled. Rise through the ranks of Code Quest&apos;s elite architects.
            </p>
          </div>

          <div className="inline-flex rounded-2xl border border-[#44484f]/10 bg-[#0f141a] p-1">
            <button
              type="button"
              onClick={() => setPeriod('weekly')}
              className={`rounded-xl px-6 py-2 font-['Space_Grotesk'] text-xs font-bold uppercase tracking-[0.24em] transition-all ${
                period === 'weekly'
                  ? 'bg-[#1b2028] text-[#94aaff] shadow-lg'
                  : 'text-[#a8abb3] hover:text-[#f1f3fc]'
              }`}
            >
              Weekly
            </button>
            <button
              type="button"
              onClick={() => setPeriod('all-time')}
              className={`rounded-xl px-6 py-2 font-['Space_Grotesk'] text-xs font-bold uppercase tracking-[0.24em] transition-all ${
                period === 'all-time'
                  ? 'bg-[#1b2028] text-[#94aaff] shadow-lg'
                  : 'text-[#a8abb3] hover:text-[#f1f3fc]'
              }`}
            >
              All-Time
            </button>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 items-end gap-6 md:grid-cols-3">
        {[podiumEntries[1], podiumEntries[0], podiumEntries[2]].map((entry, index) => {
          if (!entry) return null;

          const isChampion = index === 1;
          const rankLabel = isChampion ? 1 : index === 0 ? 2 : 3;
          const progressWidth = Math.max(42, Math.round((entry.xp / topXp) * 100));
          const imageSize = isChampion ? 'h-32 w-32' : 'h-20 w-20';
          const tier = tierByRank[rankLabel] ?? 'Gold Tier';
          const cardClasses = isChampion
            ? 'border border-[#feaa00]/35 bg-gradient-to-b from-[#2b3350]/90 to-[#151a21] px-8 pb-8 pt-10 shadow-[0_0_30px_rgba(254,170,0,0.06)]'
            : 'border border-[#44484f]/18 bg-[#151a21] px-6 pb-8 pt-6';
          const ringClasses = isChampion
            ? 'border-[#feaa00] shadow-[0_0_30px_rgba(254,170,0,0.18)]'
            : rankLabel === 2
            ? 'border-[#44484f] shadow-[0_0_12px_rgba(192,192,192,0.08)]'
            : 'border-[#5b341a] shadow-[0_0_12px_rgba(205,127,50,0.08)]';
          const badgeClasses =
            rankLabel === 1
              ? 'from-[#feaa00] to-[#ec9e00] text-[#1f1600]'
              : rankLabel === 2
              ? 'from-[#f1f3fc] to-[#c7cbd8] text-[#0f2a7a]'
              : 'from-[#d78843] to-[#b4601f] text-white';
          const xpClass = rankLabel === 1 ? 'text-[#feaa00]' : 'text-[#5cfd80]';
          const cardHeight = isChampion ? 'min-h-[25rem]' : rankLabel === 2 ? 'min-h-[19.5rem]' : 'min-h-[18rem]';

          return (
            <div
              key={entry.rank}
              className={`${isChampion ? '' : 'flex h-full flex-col justify-end'} ${
                index === 0 ? 'order-2 md:order-1' : index === 1 ? 'order-1 md:order-2' : 'order-3'
              }`}
            >
              <div
                className={`relative overflow-hidden rounded-lg border-b-4 text-center transition-colors hover:bg-[#1b2028] ${cardClasses} ${cardHeight} ${
                  isChampion ? 'border-b-[#feaa00]' : 'border-b-[#20262f]'
                }`}
              >
                {isChampion && (
                  <div className="absolute left-1/2 top-2 h-40 w-40 -translate-x-1/2 rounded-full bg-[#feaa00]/8 blur-[60px]" />
                )}

                <div className={`relative z-10 ${isChampion ? 'mb-6' : 'mb-4'}`}>
                  <div className={`relative mx-auto ${imageSize}`}>
                    <div
                      className={`flex h-full w-full items-center justify-center overflow-hidden rounded-full border-[4px] bg-[#1a171a] ${isChampion ? 'text-5xl' : 'text-3xl'} ${ringClasses}`}
                    >
                      {podiumImageByRank[rankLabel] ? (
                        <img
                          src={podiumImageByRank[rankLabel]}
                          alt={`${entry.name} avatar`}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <span>{entry.avatar}</span>
                      )}
                    </div>
                    <div
                      className={`absolute ${isChampion ? '-bottom-3 -right-3 h-12 w-12 border-4 border-[#0b1018]' : '-bottom-2 -right-2 h-8 w-8 border-4 border-[#0b1018]'} flex items-center justify-center rounded-full bg-gradient-to-br ${badgeClasses} shadow-xl`}
                    >
                      <Medal className={`${isChampion ? 'h-6 w-6' : 'h-4 w-4'}`} />
                    </div>
                  </div>
                </div>

                <h3
                  className={`font-['Space_Grotesk'] ${
                    isChampion ? 'text-3xl font-black tracking-tight' : 'text-xl font-bold tracking-tight'
                  } text-[#f1f3fc]`}
                >
                  {entry.name}
                </h3>
                <p
                  className={`mt-4 font-['Space_Grotesk'] ${
                    isChampion ? 'text-lg font-medium' : 'text-sm font-medium'
                  } tracking-[0.18em] ${xpClass}`}
                >
                  {entry.xp.toLocaleString()} XP
                </p>

                <div className={`mx-auto ${isChampion ? 'mt-6 w-full' : 'mt-4 w-full'}`}>
                  <div className={`${isChampion ? 'h-2' : 'h-1'} overflow-hidden rounded-full ${isChampion ? 'bg-[#2b3240]' : 'bg-[#232a35]'}`}>
                    <div
                      className={`h-full rounded-full ${rankLabel === 1 ? 'bg-[#feaa00]' : 'bg-[#5cff7b]'}`}
                      style={{ width: `${progressWidth}%` }}
                    />
                  </div>
                </div>

                <span
                  className={`mt-8 block font-['Space_Grotesk'] ${
                    isChampion ? 'text-xs font-bold tracking-[0.24em] text-[#ffbd5c]' : 'text-[10px] font-bold tracking-[0.16em] text-[#a8abb3]'
                  } uppercase`}
                >
                  {tier}
                </span>

                {!isChampion && (
                  <div
                    className={`pointer-events-none absolute inset-x-0 bottom-0 h-16 rounded-b-lg ${
                      rankLabel === 2 ? 'bg-gradient-to-t from-[#0c1016] to-transparent' : 'bg-gradient-to-t from-[#0c1016] to-transparent'
                    }`}
                  />
                )}
              </div>
            </div>
          );
        })}
      </section>

      <section className="space-y-4">
        <div className="flex flex-col gap-4 rounded-2xl bg-[#151a21] px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-[10px] uppercase tracking-[0.32em] text-[#a8abb3] font-['Space_Grotesk']">
            <div className="grid grid-cols-[4rem_minmax(0,1fr)_8rem_7rem] gap-4">
              <span>Rank</span>
              <span>Architect</span>
              <span className="hidden text-center sm:block">Streak</span>
              <span className="text-right">Experience</span>
            </div>
          </div>

          <div className="relative w-full sm:max-w-xs">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#a8abb3]" />
            <input
              type="text"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search leaderboard..."
              className="w-full rounded-full border border-[#44484f]/20 bg-[#0f141a] py-2 pl-10 pr-4 text-sm text-[#f1f3fc] outline-none placeholder:text-[#72757d]"
            />
          </div>
        </div>

        {currentUserEntry && (
          <div className="rounded-2xl border-l-4 border-[#94aaff] bg-[#94aaff]/10 p-4 shadow-[0_0_15px_rgba(148,170,255,0.16)] sm:px-8">
            <LeaderboardRow entry={currentUserEntry} currentUser={currentUser} highlight />
          </div>
        )}

        <div className="space-y-3">
          {displayEntries.map((entry) => (
            <div
              key={entry.rank}
              className="rounded-2xl bg-[#151a21] p-4 transition-colors hover:bg-[#1b2028] sm:px-8"
            >
              <LeaderboardRow entry={entry} currentUser={currentUser} />
            </div>
          ))}
        </div>
      </section>

      <footer className="mt-12 flex flex-col items-center justify-between gap-6 sm:flex-row">
        <div className="text-sm text-[#a8abb3]">
          Showing 1-{sortedEntries.length} of {Math.max(2450, sortedEntries.length)} competitors
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            className="rounded-xl border border-[#44484f]/10 bg-[#1b2028] px-4 py-2 font-['Space_Grotesk'] text-xs font-bold uppercase tracking-[0.16em] text-[#f1f3fc] transition-colors hover:bg-[#20262f]"
          >
            Previous
          </button>
          <div className="flex gap-1">
            <button type="button" className="h-10 w-10 rounded-xl bg-[#94aaff] font-['Space_Grotesk'] font-bold text-[#00257b]">
              1
            </button>
            <button type="button" className="h-10 w-10 rounded-xl font-['Space_Grotesk'] font-bold text-[#f1f3fc] transition-colors hover:bg-[#20262f]">
              2
            </button>
            <button type="button" className="h-10 w-10 rounded-xl font-['Space_Grotesk'] font-bold text-[#f1f3fc] transition-colors hover:bg-[#20262f]">
              3
            </button>
          </div>
          <button
            type="button"
            className="rounded-xl border border-[#44484f]/10 bg-[#1b2028] px-4 py-2 font-['Space_Grotesk'] text-xs font-bold uppercase tracking-[0.16em] text-[#f1f3fc] transition-colors hover:bg-[#20262f]"
          >
            Next
          </button>
        </div>
      </footer>
    </div>
  );
}

function LeaderboardRow({
  entry,
  currentUser,
  highlight = false
}: {
  entry: LeaderboardEntry;
  currentUser: string;
  highlight?: boolean;
}) {
  const isCurrentUser = entry.name.toLowerCase() === currentUser.toLowerCase();
  const streak = Math.max(0, Math.round(entry.xp / 900) - entry.rank);
  const streakActive = streak > 0;
  const tier = entry.level >= 20 ? 'Apex Tier' : entry.level >= 15 ? 'Diamond Tier' : entry.level >= 10 ? 'Platinum Tier' : 'Gold Tier';

  return (
    <div className="flex items-center gap-4">
      <div className={`w-12 font-['Space_Grotesk'] ${highlight ? 'text-xl font-black text-[#94aaff]' : 'font-bold text-[#a8abb3]'}`}>
        {String(entry.rank).padStart(2, '0')}
      </div>

      <div className="flex flex-1 items-center gap-4">
        <div className={`flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border ${highlight ? 'border-[#94aaff]/30 bg-[#20262f]' : 'border-[#44484f]/30 bg-[#20262f]'}`}>
          <span className="text-lg">{entry.avatar}</span>
        </div>
        <div className="flex flex-col">
          <span className="font-['Space_Grotesk'] font-bold text-[#f1f3fc]">
            {entry.name}
            {isCurrentUser && (
              <span className="ml-2 rounded-full bg-[#809bff] px-2 py-0.5 text-[10px] font-black uppercase tracking-[0.18em] text-[#001b61]">
                You
              </span>
            )}
          </span>
          <span className="text-xs text-[#a8abb3]">
            {tier} • Level {entry.level}
          </span>
        </div>
      </div>

      <div className={`hidden w-32 items-center justify-center gap-1 sm:flex ${streakActive ? 'text-[#ffbd5c]' : 'text-[#a8abb3]'}`}>
        <Flame className={`h-4 w-4 ${streakActive ? 'fill-current' : ''}`} />
        <span className="font-['Space_Grotesk'] font-bold">{streak}d</span>
      </div>

      <div className="w-24 text-right">
        <span className="font-['Space_Grotesk'] font-black text-[#f1f3fc]">{entry.xp.toLocaleString()}</span>
      </div>
    </div>
  );
}
