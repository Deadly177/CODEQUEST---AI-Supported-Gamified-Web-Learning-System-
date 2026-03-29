import { useState } from 'react';
import { ArrowLeft, KeyRound, UserRound } from 'lucide-react';

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
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [profileMessage, setProfileMessage] = useState('');
  const [passwordMessage, setPasswordMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSavingProfile, setIsSavingProfile] = useState(false);
  const [isSavingPassword, setIsSavingPassword] = useState(false);

  const joinedText = user.createdAt
    ? new Date(user.createdAt).toLocaleDateString()
    : 'Unknown';

  async function handleProfileSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
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

  return (
    <div className="max-w-4xl mx-auto space-y-5">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-slate-400 hover:text-cyan-400 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-5 items-start">
        <div className="bg-slate-900 border border-cyan-500/20 rounded-2xl p-5 self-start">
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center mb-3">
            <UserRound className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-xl text-white">{user.name}</h1>
          <p className="text-slate-400 mt-1 break-all">{user.email}</p>
          <p className="text-sm text-slate-500 mt-3">Joined {joinedText}</p>
        </div>

        <div className="space-y-5">
          <form onSubmit={handleProfileSubmit} className="bg-slate-900 border border-cyan-500/20 rounded-2xl p-5">
            <h2 className="text-xl text-white mb-3">Profile</h2>
            <label className="block text-sm text-slate-400 mb-2">User name</label>
            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="w-full rounded-lg bg-slate-800 border border-slate-700 px-4 py-2.5 text-white outline-none focus:border-cyan-500"
            />
            <button
              type="submit"
              disabled={isSavingProfile}
              className="mt-3 px-4 py-2.5 rounded-lg bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 hover:bg-cyan-500/30 transition-all disabled:opacity-60"
            >
              {isSavingProfile ? 'Saving...' : 'Save Profile'}
            </button>
            {profileMessage && <p className="mt-2 text-sm text-green-400">{profileMessage}</p>}
          </form>

          <form onSubmit={handlePasswordSubmit} className="bg-slate-900 border border-cyan-500/20 rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <KeyRound className="w-5 h-5 text-cyan-400" />
              <h2 className="text-xl text-white">Change Password</h2>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-sm text-slate-400 mb-1.5">Current password</label>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(event) => setCurrentPassword(event.target.value)}
                  className="w-full rounded-lg bg-slate-800 border border-slate-700 px-4 py-2.5 text-white outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-sm text-slate-400 mb-1.5">New password</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(event) => setNewPassword(event.target.value)}
                  className="w-full rounded-lg bg-slate-800 border border-slate-700 px-4 py-2.5 text-white outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-sm text-slate-400 mb-1.5">Confirm new password</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                  className="w-full rounded-lg bg-slate-800 border border-slate-700 px-4 py-2.5 text-white outline-none focus:border-cyan-500"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSavingPassword}
              className="mt-3 px-4 py-2.5 rounded-lg bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 hover:bg-cyan-500/30 transition-all disabled:opacity-60"
            >
              {isSavingPassword ? 'Updating...' : 'Update Password'}
            </button>

            {passwordMessage && <p className="mt-2 text-sm text-green-400">{passwordMessage}</p>}
            {errorMessage && <p className="mt-2 text-sm text-red-400">{errorMessage}</p>}
          </form>
        </div>
      </div>
    </div>
  );
}
