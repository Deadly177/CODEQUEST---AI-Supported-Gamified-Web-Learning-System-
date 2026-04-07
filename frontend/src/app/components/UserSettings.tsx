import { useMemo, useState } from 'react';
import {
  ArrowLeft,
  Badge,
  BellRing,
  ChevronRight,
  Edit3,
  KeyRound,
  Mail,
  Route,
  Save,
  ShieldCheck,
  UserRound
} from 'lucide-react';

interface UserProfile {
  id: string;
  name: string;
  email: string;
  createdAt?: string;
}

interface UserSettingsProps {
  user: UserProfile;
  onBack: () => void;
  onUpdateName: (name: string) => Promise<void>;
  onChangePassword: (currentPassword: string, newPassword: string) => Promise<void>;
}

export function UserSettings({ user, onBack, onUpdateName, onChangePassword }: UserSettingsProps) {
  const [name, setName] = useState(user.name);
  const [bio, setBio] = useState(
    'Architecting the future of decentralised code. Level 42 explorer. Rust enthusiast.'
  );
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [profileMessage, setProfileMessage] = useState('');
  const [passwordMessage, setPasswordMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSavingProfile, setIsSavingProfile] = useState(false);
  const [isSavingPassword, setIsSavingPassword] = useState(false);
  const [xpGoal, setXpGoal] = useState(500);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [questReminders, setQuestReminders] = useState(true);
  const [xpMilestones, setXpMilestones] = useState(true);
  const [marketplaceUpdates, setMarketplaceUpdates] = useState(false);

  const level = useMemo(() => {
    const joinedYear = user.createdAt ? new Date(user.createdAt).getFullYear() : new Date().getFullYear();
    return Math.max(1, 42 - Math.max(0, new Date().getFullYear() - joinedYear));
  }, [user.createdAt]);

  async function syncProfile() {
    setErrorMessage('');
    setProfileMessage('');
    setIsSavingProfile(true);

    try {
      await onUpdateName(name);
      setProfileMessage('Profile updated successfully.');
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Failed to update profile');
    } finally {
      setIsSavingProfile(false);
    }
  }

  async function handleProfileSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await syncProfile();
  }

  async function handlePasswordSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage('');
    setPasswordMessage('');

    if (newPassword !== confirmPassword) {
      setErrorMessage('New password and confirmation do not match.');
      return;
    }

    setIsSavingPassword(true);
    try {
      await onChangePassword(currentPassword, newPassword);
      setPasswordMessage('Password updated successfully.');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Failed to update password');
    } finally {
      setIsSavingPassword(false);
    }
  }

  function resetChanges() {
    setName(user.name);
    setBio('Architecting the future of decentralised code. Level 42 explorer. Rust enthusiast.');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setProfileMessage('');
    setPasswordMessage('');
    setErrorMessage('');
    setXpGoal(500);
    setTwoFactorEnabled(false);
    setQuestReminders(true);
    setXpMilestones(true);
    setMarketplaceUpdates(false);
  }

  return (
    <div className="relative space-y-8">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute right-[-10%] top-[-10%] h-[500px] w-[500px] rounded-full bg-[#94aaff]/5 blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-5%] h-[400px] w-[400px] rounded-full bg-[#5cfd80]/5 blur-[100px]" />
      </div>

      <header className="mb-8 flex items-start justify-between gap-6">
        <div>
          <h1 className="mb-1 font-['Space_Grotesk'] text-[2rem] font-bold tracking-tight text-[#f1f3fc] md:text-[2.25rem]">
            SYSTEM_SETTINGS
          </h1>
          <p className="font-['Inter'] text-sm text-[#a8abb3] md:text-[15px]">
            Configure your neural interface and quest preferences.
          </p>
        </div>

        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 rounded-full border border-[#44484f]/20 px-4 py-2.5 text-[11px] font-bold uppercase tracking-[0.18em] text-[#94aaff] transition-colors hover:bg-[#20262f]"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>
      </header>

      <div className="grid grid-cols-12 gap-6">
        <section className="group relative col-span-12 overflow-hidden rounded-lg bg-[#0f141a] p-6 lg:col-span-8">
          <div className="absolute right-0 top-0 p-8 opacity-10">
            <UserRound className="h-20 w-20" />
          </div>

          <h2 className="mb-6 flex items-center gap-3 font-['Space_Grotesk'] text-[1.5rem] font-bold text-[#f1f3fc]">
            <Badge className="h-5 w-5 text-[#94aaff]" />
            Public Profile
          </h2>

          <form onSubmit={handleProfileSubmit} className="flex flex-col gap-8 md:flex-row">
            <div className="flex flex-col items-center gap-3">
              <div className="relative">
                <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border-2 border-[#94aaff] shadow-[0_0_15px_rgba(148,170,255,0.3)]">
                  <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#233455] to-[#0a0e14]">
                    <UserRound className="h-10 w-10 text-[#94aaff]" />
                  </div>
                </div>
                <button
                  type="button"
                  className="absolute bottom-0 right-0 rounded-full bg-[#809bff] p-2 text-[#001b61] shadow-lg transition-transform hover:scale-110"
                >
                  <Edit3 className="h-3.5 w-3.5" />
                </button>
              </div>
              <span className="font-['Inter'] text-[10px] uppercase tracking-[0.18em] text-[#a8abb3]">Avatar Signature</span>
            </div>

            <div className="flex-1 space-y-4">
              <div className="space-y-2">
                <label className="font-['Inter'] text-[11px] uppercase tracking-[0.18em] text-[#94aaff]">Username</label>
                <input
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  className="w-full rounded-md border-none bg-[#000000] px-4 py-2.5 font-['Inter'] text-sm text-[#f1f3fc] outline-none transition-shadow focus:ring-1 focus:ring-[#94aaff]/50"
                />
              </div>

              <div className="space-y-2">
                <label className="font-['Inter'] text-[11px] uppercase tracking-[0.18em] text-[#94aaff]">Neural Bio</label>
                <textarea
                  rows={3}
                  value={bio}
                  onChange={(event) => setBio(event.target.value)}
                  className="w-full resize-none rounded-md border-none bg-[#000000] px-4 py-2.5 font-['Inter'] text-sm leading-6 text-[#f1f3fc] outline-none transition-shadow focus:ring-1 focus:ring-[#94aaff]/50"
                />
              </div>

              {(profileMessage || errorMessage) && (
                <div className="space-y-2">
                  {profileMessage && <p className="text-sm text-[#5cfd80]">{profileMessage}</p>}
                  {errorMessage && <p className="text-sm text-[#ff6e84]">{errorMessage}</p>}
                </div>
              )}
            </div>
          </form>
        </section>

        <section className="col-span-12 rounded-lg bg-[#0f141a] p-6 lg:col-span-4">
          <h2 className="mb-6 flex items-center gap-3 font-['Space_Grotesk'] text-[1.5rem] font-bold text-[#f1f3fc]">
            <Route className="h-5 w-5 text-[#ffbd5c]" />
            Preferences
          </h2>

          <div className="space-y-6">
            <div className="space-y-3">
              <label className="font-['Inter'] text-[11px] uppercase tracking-[0.18em] text-[#a8abb3]">Learning Path</label>
              <div className="space-y-2">
                <button
                  type="button"
                  className="group flex w-full items-center justify-between rounded-md border border-[#94aaff]/20 bg-[#1b2028] p-3 text-left"
                >
                  <span className="font-['Inter'] text-sm font-medium text-[#f1f3fc]">Full-Stack Architect</span>
                  <ChevronRight className="h-4 w-4 text-[#94aaff] transition-transform group-hover:translate-x-1" />
                </button>
                <button
                  type="button"
                  className="group flex w-full items-center justify-between rounded-md bg-[#000000] p-3 text-left transition-colors hover:bg-[#1b2028]"
                >
                  <span className="font-['Inter'] text-sm text-[#a8abb3]">Security Researcher</span>
                  <ChevronRight className="h-4 w-4 text-[#72757d]" />
                </button>
              </div>
            </div>

            <div className="space-y-3">
              <label className="font-['Inter'] text-[11px] uppercase tracking-[0.18em] text-[#a8abb3]">Daily XP Goal</label>
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  min={100}
                  max={1000}
                  step={50}
                  value={xpGoal}
                  onChange={(event) => setXpGoal(Number(event.target.value))}
                  className="h-2 flex-1 cursor-pointer appearance-none rounded-full bg-[#000000] accent-[#5cfd80]"
                />
                <span className="font-['Space_Grotesk'] text-base font-bold text-[#5cfd80]">{xpGoal} XP</span>
              </div>
            </div>
          </div>
        </section>

        <section className="col-span-12 rounded-lg bg-[#0f141a] p-6 lg:col-span-7">
          <h2 className="mb-6 flex items-center gap-3 font-['Space_Grotesk'] text-[1.5rem] font-bold text-[#f1f3fc]">
            <ShieldCheck className="h-5 w-5 text-[#ff6e84]" />
            Account Security
          </h2>

          <form onSubmit={handlePasswordSubmit} className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label className="font-['Inter'] text-[11px] uppercase tracking-[0.18em] text-[#a8abb3]">Email Address</label>
              <div className="flex items-center gap-3 rounded-md bg-[#000000] px-4 py-2.5">
                <Mail className="h-4 w-4 text-[#a8abb3]" />
                <span className="font-['Inter'] text-sm">{user.email}</span>
              </div>
            </div>

            <div className="space-y-2">
              <label className="font-['Inter'] text-[11px] uppercase tracking-[0.18em] text-[#a8abb3]">Password</label>
              <button
                type="button"
                className="flex w-full items-center justify-between rounded-md bg-[#000000] px-4 py-2.5 transition-colors hover:bg-[#1b2028]"
              >
                <span className="font-['Inter'] text-sm">••••••••••••</span>
                <span className="font-['Inter'] text-[11px] font-bold text-[#94aaff]">CHANGE</span>
              </button>
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="font-['Inter'] text-[11px] uppercase tracking-[0.18em] text-[#a8abb3]">Current Password</label>
              <input
                type="password"
                value={currentPassword}
                onChange={(event) => setCurrentPassword(event.target.value)}
                className="w-full rounded-md border-none bg-[#000000] px-4 py-2.5 font-['Inter'] text-sm text-[#f1f3fc] outline-none transition-shadow focus:ring-1 focus:ring-[#94aaff]/50"
              />
            </div>

            <div className="space-y-2">
              <label className="font-['Inter'] text-[11px] uppercase tracking-[0.18em] text-[#a8abb3]">New Password</label>
              <input
                type="password"
                value={newPassword}
                onChange={(event) => setNewPassword(event.target.value)}
                className="w-full rounded-md border-none bg-[#000000] px-4 py-2.5 font-['Inter'] text-sm text-[#f1f3fc] outline-none transition-shadow focus:ring-1 focus:ring-[#94aaff]/50"
              />
            </div>

            <div className="space-y-2">
              <label className="font-['Inter'] text-[11px] uppercase tracking-[0.18em] text-[#a8abb3]">Confirm New Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                className="w-full rounded-md border-none bg-[#000000] px-4 py-2.5 font-['Inter'] text-sm text-[#f1f3fc] outline-none transition-shadow focus:ring-1 focus:ring-[#94aaff]/50"
              />
            </div>

            <div className="col-span-full pt-2">
              <div className="flex items-center justify-between rounded-md border border-[#ff6e84]/10 bg-[#ff6e84]/5 p-4">
                <div>
                  <div className="font-['Inter'] text-sm font-bold text-[#ff6e84]">Two-Factor Authentication</div>
                  <div className="font-['Inter'] text-xs text-[#a8abb3]">
                    Secure your account with an extra layer of protection.
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setTwoFactorEnabled((value) => !value)}
                  className={`relative flex h-6 w-12 cursor-pointer items-center rounded-full border p-1 transition-colors ${
                    twoFactorEnabled
                      ? 'justify-end border-[#5cfd80]/30 bg-[#006e2a]/30 shadow-[0_0_15px_rgba(92,253,128,0.3)]'
                      : 'justify-start border-[#44484f]/30 bg-[#20262f]'
                  }`}
                >
                  <div className={`h-4 w-4 rounded-full ${twoFactorEnabled ? 'bg-[#5cfd80]' : 'bg-[#a8abb3]'}`} />
                </button>
              </div>
            </div>

            <div className="col-span-full space-y-2">
              {passwordMessage && <p className="text-sm text-[#5cfd80]">{passwordMessage}</p>}
              {errorMessage && <p className="text-sm text-[#ff6e84]">{errorMessage}</p>}
            </div>
          </form>
        </section>

        <section className="col-span-12 rounded-lg bg-[#0f141a] p-6 lg:col-span-5">
          <h2 className="mb-6 flex items-center gap-3 font-['Space_Grotesk'] text-[1.5rem] font-bold text-[#f1f3fc]">
            <BellRing className="h-5 w-5 text-[#5cfd80]" />
            Alert Protocols
          </h2>

          <div className="space-y-5">
            <ToggleRow
              title="Quest Reminders"
              description="Daily alerts for your current learning path."
              enabled={questReminders}
              onToggle={() => setQuestReminders((value) => !value)}
            />
            <ToggleRow
              title="XP Milestones"
              description="Notify when friends beat your score."
              enabled={xpMilestones}
              onToggle={() => setXpMilestones((value) => !value)}
            />
            <ToggleRow
              title="Marketplace Updates"
              description="When new inventory items drop."
              enabled={marketplaceUpdates}
              muted
              onToggle={() => setMarketplaceUpdates((value) => !value)}
            />
          </div>
        </section>
      </div>

      <footer className="mt-8 flex justify-end gap-4">
        <button
          type="button"
          onClick={resetChanges}
          className="rounded-full border border-[#44484f]/20 px-7 py-2.5 font-['Inter'] text-sm font-bold transition-colors hover:bg-[#20262f] active:scale-95"
        >
          RESET CHANGES
        </button>
        <button
          type="button"
          onClick={() => void syncProfile()}
          className="rounded-full bg-gradient-to-br from-[#94aaff] to-[#6c8cff] px-8 py-2.5 font-['Inter'] text-sm font-black tracking-[0.08em] text-[#00257b] shadow-[0_0_15px_rgba(148,170,255,0.3)] transition-all hover:shadow-[#94aaff]/40 active:scale-95"
        >
          {isSavingProfile ? 'SYNCING...' : 'SYNC PROTOCOLS'}
        </button>
      </footer>
    </div>
  );
}

function ToggleRow({
  title,
  description,
  enabled,
  onToggle,
  muted = false
}: {
  title: string;
  description: string;
  enabled: boolean;
  onToggle: () => void;
  muted?: boolean;
}) {
  return (
    <div className={`flex items-center justify-between ${muted ? 'opacity-50' : ''}`}>
      <div>
        <div className="font-medium">{title}</div>
        <div className="text-xs text-[#a8abb3]">{description}</div>
      </div>
      <button
        type="button"
        onClick={onToggle}
        className={`relative flex h-6 w-12 cursor-pointer items-center rounded-full border p-1 transition-all ${
          enabled
            ? 'justify-end border-[#5cfd80]/30 bg-[#006e2a]/30 shadow-[0_0_15px_rgba(92,253,128,0.3)]'
            : 'justify-start border-[#44484f]/30 bg-[#20262f]'
        }`}
      >
        <div className={`h-4 w-4 rounded-full ${enabled ? 'bg-[#5cfd80]' : 'bg-[#a8abb3]'}`} />
      </button>
    </div>
  );
}
