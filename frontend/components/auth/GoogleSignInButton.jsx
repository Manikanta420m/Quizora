'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2, Info, X } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useSound } from '@/context/SoundContext';

/**
 * Official Multi-color Google "G" Vector Icon
 */
export function GoogleIcon({ className = 'w-5 h-5' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
        fill="#EA4335"
      />
    </svg>
  );
}

/**
 * GoogleSignInButton Component
 * Supports Google Identity Services (GIS) One-Tap / OAuth popup
 * with instant Dev Mode Fallback for local evaluation.
 */
export function GoogleSignInButton({
  role = 'student',
  mode = 'continue', // 'signin' | 'signup' | 'continue'
  className = '',
  onError,
}) {
  const { googleLogin } = useAuth();
  const { playSound } = useSound();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [showDevModal, setShowDevModal] = useState(false);
  const googleBtnRef = useRef(null);

  const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || '';

  // Handle GIS credential callback
  const handleGoogleCredentialResponse = useCallback(
    async (response) => {
      if (!response?.credential) {
        onError?.('No credential returned from Google');
        return;
      }

      setIsLoading(true);
      try {
        playSound('click');
        await googleLogin({ credential: response.credential, role });
        router.replace('/dashboard');
      } catch (err) {
        onError?.(err.message || 'Google authentication failed');
      } finally {
        setIsLoading(false);
      }
    },
    [googleLogin, role, onError, playSound, router]
  );

  // Setup Google Identity Services if client ID is configured
  useEffect(() => {
    if (!googleClientId) return;

    const initializeGIS = () => {
      if (!window.google?.accounts?.id) return;

      window.google.accounts.id.initialize({
        client_id: googleClientId,
        callback: handleGoogleCredentialResponse,
        auto_select: false,
        cancel_on_tap_outside: true,
      });

      if (googleBtnRef.current) {
        window.google.accounts.id.renderButton(googleBtnRef.current, {
          theme: 'outline',
          size: 'large',
          width: '100%',
          text: mode === 'signup' ? 'signup_with' : 'signin_with',
          shape: 'pill',
        });
      }
    };

    const loadGoogleScript = () => {
      if (document.getElementById('google-jssdk')) return;
      const script = document.createElement('script');
      script.id = 'google-jssdk';
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;
      script.onload = () => initializeGIS();
      document.body.appendChild(script);
    };

    if (window.google?.accounts?.id) {
      initializeGIS();
    } else {
      loadGoogleScript();
    }
  }, [googleClientId, mode, handleGoogleCredentialResponse]);

  // Button click trigger
  const handleClick = () => {
    playSound('click');

    // If real Google Client ID is configured and GIS is ready, trigger prompt
    if (googleClientId && window.google?.accounts?.id) {
      window.google.accounts.id.prompt();
      return;
    }

    // Otherwise, open sleek Dev/Demo Google Sign-In helper modal (DEV ONLY)
    if (process.env.NODE_ENV !== 'production') {
      setShowDevModal(true);
    } else {
      onError?.('Google authentication is not configured for this production environment.');
    }
  };

  // Execute dev-simulated Google Sign-In
  const handleSimulateGoogleLogin = async (customEmail, customName) => {
    setIsLoading(true);
    setShowDevModal(false);
    try {
      const email = customEmail || `manikanta.student@gmail.com`;
      const name = customName || 'ManiKanta';
      const fakeToken = `dev-google-token:${email}:${name}:gid_${Date.now()}`;

      await googleLogin({ credential: fakeToken, role });
      router.replace('/dashboard');
    } catch (err) {
      onError?.(err.message || 'Google login failed');
    } finally {
      setIsLoading(false);
    }
  };

  const buttonText =
    mode === 'signup'
      ? 'Sign up with Google'
      : mode === 'signin'
      ? 'Sign in with Google'
      : 'Continue with Google';

  return (
    <>
      <button
        type="button"
        onClick={handleClick}
        disabled={isLoading}
        className={`w-full py-2.5 px-4 rounded-xl border border-[#E2E8F0] dark:border-[#334155] bg-white dark:bg-[#1E293B] hover:bg-[#F8FAFC] dark:hover:bg-[#334155]/60 text-[#0F172A] dark:text-[#F8FAFC] font-semibold text-sm transition-all duration-200 shadow-2xs hover:shadow-sm active:scale-[0.99] flex items-center justify-center gap-3 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed ${className}`}
      >
        {isLoading ? (
          <Loader2 className="w-5 h-5 animate-spin text-[#2563EB]" />
        ) : (
          <GoogleIcon className="w-5 h-5 shrink-0" />
        )}
        <span>{isLoading ? 'Connecting to Google...' : buttonText}</span>
      </button>

      {/* Hidden container for native Google rendered button if client ID is active */}
      <div ref={googleBtnRef} className="hidden" />

      {/* Developer / Demo Mode Google Sign-In Modal */}
      {showDevModal && process.env.NODE_ENV !== 'production' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0F172A]/50 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white dark:bg-[#1E293B] border border-[#E2E8F0] dark:border-[#334155] rounded-2xl p-6 max-w-md w-full shadow-2xl space-y-5 text-left relative">
            <button
              type="button"
              onClick={() => setShowDevModal(false)}
              className="absolute top-4 right-4 p-1 rounded-lg text-[#64748B] hover:text-[#0F172A] dark:hover:text-white hover:bg-[#F1F5F9] dark:hover:bg-[#334155] transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center border border-blue-100 dark:border-blue-800">
                <GoogleIcon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-[#0F172A] dark:text-white">
                  Sign In with Google
                </h3>
                <p className="text-xs text-[#64748B] dark:text-[#94A3B8]">
                  Select an account to test Google Authentication
                </p>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200/60 dark:border-blue-800/40 text-xs text-blue-900 dark:text-blue-200 flex items-start gap-2">
              <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
              <div className="space-y-1 leading-relaxed">
                <span>
                  <strong>Development Mode Active:</strong> Ready for real Google Cloud credentials via{' '}
                  <code className="font-mono text-[11px] bg-blue-100 dark:bg-blue-900 px-1 py-0.5 rounded">NEXT_PUBLIC_GOOGLE_CLIENT_ID</code>.
                </span>
                <span className="block">
                  You can click any profile below to instantly test the end-to-end Google OAuth session!
                </span>
              </div>
            </div>

            {/* Quick Demo Google Accounts */}
            <div className="space-y-2">
              <button
                type="button"
                onClick={() => handleSimulateGoogleLogin('manikanta.student@gmail.com', 'ManiKanta')}
                className="w-full p-3 rounded-xl border border-[#E2E8F0] dark:border-[#334155] hover:border-[#2563EB] hover:bg-blue-50/40 dark:hover:bg-blue-950/20 flex items-center justify-between transition-all group text-left cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#4285F4] text-white flex items-center justify-center font-bold text-sm">
                    M
                  </div>
                  <div>
                    <span className="font-bold text-xs text-[#0F172A] dark:text-white block">
                      ManiKanta (Student)
                    </span>
                    <span className="text-[11px] text-[#64748B] dark:text-[#94A3B8]">
                      manikanta.student@gmail.com
                    </span>
                  </div>
                </div>
                <span className="text-xs font-semibold text-[#2563EB] opacity-0 group-hover:opacity-100 transition-opacity">
                  Sign In &rarr;
                </span>
              </button>
            </div>

            <div className="pt-2 flex items-center justify-end gap-2 border-t border-[#E2E8F0] dark:border-[#334155]">
              <button
                type="button"
                onClick={() => setShowDevModal(false)}
                className="px-4 py-2 text-xs font-semibold text-[#64748B] hover:text-[#0F172A] dark:hover:text-white transition-colors cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default GoogleSignInButton;
