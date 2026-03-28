import { useState } from 'react';
import { Eye, EyeOff, GraduationCap, Lock, Mail, User } from 'lucide-react';
import './AuthScreen.css';

interface AuthScreenProps {
  onSuccess: (
    token: string,
    remember: boolean,
    user: { id: string; name: string; email: string }
  ) => void;
}

export function AuthScreen({ onSuccess }: AuthScreenProps) {
  const [isSignup, setIsSignup] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [loginIdentifier, setLoginIdentifier] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [showSignupPassword, setShowSignupPassword] = useState(false);

  const apiBaseUrl = import.meta.env.VITE_API_URL ?? 'http://localhost:5001';

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const response = await fetch(`${apiBaseUrl}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          identifier: loginIdentifier,
          password: loginPassword
        })
      });

      const payload = await response.json();
      if (!response.ok) {
        throw new Error(payload.error || 'Login failed');
      }

      onSuccess(payload.token, rememberMe, payload.user);
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Login failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const response = await fetch(`${apiBaseUrl}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: signupName,
          email: signupEmail,
          password: signupPassword
        })
      });

      const payload = await response.json();
      if (!response.ok) {
        throw new Error(payload.error || 'Registration failed');
      }

      onSuccess(payload.token, true, payload.user);
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Registration failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="auth-screen">
      <div className={`auth-wrapper ${isSignup ? 'toggled' : ''}`}>
        <div className="auth-brand">
          <span className="auth-brand-icon">
            <GraduationCap />
          </span>
          <span>CodeQuest</span>
        </div>
        <div className="background-shape" />
        <div className="secondary-shape" />

        <div className="credentials-panel signin">
          <h2 className="slide-element">Login</h2>
          <form onSubmit={handleLogin}>
            <div className="field-wrapper slide-element">
              <input
                type="text"
                value={loginIdentifier}
                onChange={(event) => setLoginIdentifier(event.target.value)}
                required
              />
              <label>Username</label>
              <User className="field-icon" />
            </div>

            <div className="field-wrapper slide-element">
              <input
                type={showLoginPassword ? 'text' : 'password'}
                value={loginPassword}
                onChange={(event) => setLoginPassword(event.target.value)}
                required
              />
              <label>Password</label>
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowLoginPassword((value) => !value)}
                aria-label={showLoginPassword ? 'Hide password' : 'Show password'}
              >
                {showLoginPassword ? <EyeOff /> : <Eye />}
              </button>
            </div>

            <div className="field-wrapper slide-element">
              <button className="submit-button" type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Logging in...' : 'Login'}
              </button>
            </div>

            <label className="remember-row slide-element">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(event) => setRememberMe(event.target.checked)}
              />
              Remember me
            </label>

            {errorMessage && (
              <p className="auth-error slide-element">{errorMessage}</p>
            )}

            <div className="switch-link slide-element">
              <p>
                Don&apos;t have an account? <br />
                <button
                  type="button"
                  className="auth-link"
                  onClick={() => {
                    setIsSignup(true);
                    setErrorMessage('');
                  }}
                >
                  Sign Up
                </button>
              </p>
            </div>
          </form>
        </div>

        <div className="welcome-section signin">
          <h2 className="slide-element">WELCOME BACK!</h2>
        </div>

        <div className="credentials-panel signup">
          <h2 className="slide-element">Register</h2>
          <form onSubmit={handleRegister}>
            <div className="field-wrapper slide-element">
              <input
                type="text"
                value={signupName}
                onChange={(event) => setSignupName(event.target.value)}
                required
              />
              <label>Username</label>
              <User className="field-icon" />
            </div>

            <div className="field-wrapper slide-element">
              <input
                type="email"
                value={signupEmail}
                onChange={(event) => setSignupEmail(event.target.value)}
                required
              />
              <label>Email</label>
              <Mail className="field-icon" />
            </div>

            <div className="field-wrapper slide-element">
              <input
                type={showSignupPassword ? 'text' : 'password'}
                value={signupPassword}
                onChange={(event) => setSignupPassword(event.target.value)}
                required
              />
              <label>Password</label>
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowSignupPassword((value) => !value)}
                aria-label={showSignupPassword ? 'Hide password' : 'Show password'}
              >
                {showSignupPassword ? <EyeOff /> : <Eye />}
              </button>
            </div>

            <div className="field-wrapper slide-element">
              <button className="submit-button" type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Registering...' : 'Register'}
              </button>
            </div>

            {errorMessage && (
              <p className="auth-error slide-element">{errorMessage}</p>
            )}

            <div className="switch-link slide-element">
              <p>
                Already have an account? <br />
                <button
                  type="button"
                  className="auth-link"
                  onClick={() => {
                    setIsSignup(false);
                    setErrorMessage('');
                  }}
                >
                  Sign In
                </button>
              </p>
            </div>
          </form>
        </div>

        <div className="welcome-section signup">
          <h2 className="slide-element">WELCOME!</h2>
        </div>
      </div>

      <div className="footer">
        <p>Made  by <span className="footer-brand">Muhammadu Haleek</span></p>
      </div>
    </div>
  );
}
