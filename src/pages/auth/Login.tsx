import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  Loader2, 
  CheckCircle2, 
  Sparkles,
  ShieldCheck
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { setPortalSession, loginAsAdmin } from '@/lib/portalAuth';

export default function Login() {
  const [email, setEmail] = useState('admin@nexus.ae');
  const [password, setPassword] = useState('NexusSecure2026!');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotSent, setForgotSent] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (email.includes('admin')) {
      loginAsAdmin();
    } else {
      setPortalSession({
        email,
        fullName: email.split('@')[0].toUpperCase(),
        company: email.includes('almarai') ? 'Al Marai Group UAE' : 'Enterprise Partner',
        role: 'client',
        token: `AUTH-${Date.now()}`,
        approvedAt: new Date().toISOString()
      });
    }

    setTimeout(() => {
      setLoading(false);
      setLoginSuccess(true);
      setTimeout(() => {
        navigate('/app');
      }, 700);
    }, 1100);
  };

  const handleQuickFill = (role: 'admin' | 'client' | 'specialist') => {
    if (role === 'admin') {
      setEmail('admin@nexus.ae');
      setPassword('NexusSecure2026!');
      setToastMessage('Loaded Super Admin Profile (Full OS Access)');
    } else if (role === 'client') {
      setEmail('client@almarai.ae');
      setPassword('ClientPortal2026!');
      setToastMessage('Loaded Client Portal Profile (Al Marai Group)');
    } else {
      setEmail('ops@nexus.ae');
      setPassword('EngineerOps2026!');
      setToastMessage('Loaded IT Specialist Profile (Infrastructure)');
    }
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleForgotSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setForgotSent(true);
    setTimeout(() => {
      setShowForgotModal(false);
      setForgotSent(false);
      setToastMessage(`Password recovery link dispatched to ${forgotEmail || email}`);
      setTimeout(() => setToastMessage(null), 4000);
    }, 1200);
  };

  return (
    <div className="w-full max-w-md mx-auto py-2">
      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-20 right-6 z-50 flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-slate-900 text-white text-xs shadow-xl border border-slate-700"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header section matching template */}
      <div className="text-center mb-8">
        <motion.h1 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight"
        >
          Welcome Back
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mt-2 text-sm sm:text-base text-slate-500 font-normal max-w-sm mx-auto"
        >
          Sign in to access your dashboard and continue where you left off.
        </motion.p>
      </div>

      {/* Central Login Card matching template */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        className="bg-white/95 backdrop-blur-xl rounded-3xl p-7 sm:p-9 border border-[#D9E2EC] shadow-[0_16px_40px_-12px_rgba(15,23,42,0.08)]"
      >
        <form onSubmit={handleLogin} className="space-y-5">
          {/* Email Address */}
          <div>
            <label 
              htmlFor="email" 
              className="block text-xs font-semibold text-slate-700 mb-1.5"
            >
              Email Address
            </label>
            <div className="relative flex items-center">
              <div className="absolute left-3.5 text-slate-400 pointer-events-none">
                <Mail className="w-4 h-4" />
              </div>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@company.com"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-[#F9FBFC] text-slate-800 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/10 text-sm transition-all"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label 
                htmlFor="password" 
                className="block text-xs font-semibold text-slate-700"
              >
                Password
              </label>
              <button
                type="button"
                onClick={() => setShowForgotModal(true)}
                className="text-xs font-medium text-slate-500 hover:text-slate-800 transition-colors"
              >
                Forgot?
              </button>
            </div>
            <div className="relative flex items-center">
              <div className="absolute left-3.5 text-slate-400 pointer-events-none">
                <Lock className="w-4 h-4" />
              </div>
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-200 bg-[#F9FBFC] text-slate-800 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/10 text-sm transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 text-slate-400 hover:text-slate-600 transition-colors"
                title={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Template Signature Button: Deep navy to warm copper gradient */}
          <button
            type="submit"
            disabled={loading || loginSuccess}
            className="w-full mt-2 py-3 px-4 rounded-xl text-white font-semibold text-sm bg-gradient-to-r from-[#10233B] via-[#1F3652] to-[#8C4617] hover:opacity-95 active:scale-[0.99] shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-80"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-white" />
                <span>Signing In...</span>
              </>
            ) : loginSuccess ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                <span>Redirecting to Dashboard...</span>
              </>
            ) : (
              <>
                <span>Sign In</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Divider matching template */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-200" />
          </div>
          <div className="relative flex justify-center text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            <span className="bg-white px-3">OR CONTINUE WITH</span>
          </div>
        </div>

        {/* Social SSO Buttons matching template */}
        <div className="grid grid-cols-2 gap-3">
          {/* Google Button */}
          <button
            type="button"
            onClick={() => {
              setToastMessage('Authenticating via Google Workspace...');
              setTimeout(() => navigate('/app'), 800);
            }}
            className="flex items-center justify-center gap-2.5 py-2.5 px-4 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 transition-all shadow-xs hover:border-slate-300 active:scale-[0.99]"
          >
            <svg className="w-4 h-4" viewBox="0 0 48 48">
              <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/>
              <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/>
              <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"/>
              <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"/>
            </svg>
            <span>Google</span>
          </button>

          {/* Apple Button */}
          <button
            type="button"
            onClick={() => {
              setToastMessage('Authenticating via Apple ID...');
              setTimeout(() => navigate('/app'), 800);
            }}
            className="flex items-center justify-center gap-2.5 py-2.5 px-4 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 transition-all shadow-xs hover:border-slate-300 active:scale-[0.99]"
          >
            <svg className="w-4 h-4 fill-current text-slate-900" viewBox="0 0 170 170">
              <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.7-3.04-7.6-7.7-11.71-13.97-6.09-9.18-10.97-19.53-14.65-31.06-3.68-11.53-5.52-22.36-5.52-32.48 0-14.34 3.73-26.06 11.19-35.16 7.46-9.1 16.63-13.75 27.5-13.97 4.93 0 10.15 1.25 15.66 3.76 5.51 2.51 9.07 3.82 10.68 3.93 1.83-.22 5.61-1.63 11.35-4.24 5.73-2.61 10.74-3.82 15.02-3.64 12.08.65 21.64 5.23 28.69 13.73-10.78 6.52-16.06 15.44-15.84 26.77.22 8.92 3.63 16.54 10.23 22.85 6.6 6.31 14.54 10.02 23.82 11.12-1.95 6.1-4.34 12.27-7.18 18.52zm-32.61-105.7c0-6.19 2.29-12.06 6.87-17.62 4.58-5.56 10.23-9.35 16.96-11.38.22 1.3.33 2.5.33 3.6 0 6.09-2.4 12.07-7.2 17.95-4.8 5.87-10.62 9.68-17.46 11.42-.11-1.3-.17-2.6-.17-3.97z"/>
            </svg>
            <span>Apple</span>
          </button>
        </div>

        {/* Quick test credentials helpers */}
        <div className="mt-6 pt-4 border-t border-slate-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide">
              Quick Test Profiles
            </span>
            <span className="text-[10px] text-blue-600 font-medium">1-Click Auto Fill</span>
          </div>
          <div className="grid grid-cols-3 gap-1.5">
            <button
              type="button"
              onClick={() => handleQuickFill('admin')}
              className="py-1.5 px-2 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200/80 text-[11px] font-medium text-slate-700 transition-colors text-center truncate"
            >
              Admin
            </button>
            <button
              type="button"
              onClick={() => handleQuickFill('client')}
              className="py-1.5 px-2 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200/80 text-[11px] font-medium text-slate-700 transition-colors text-center truncate"
            >
              Client
            </button>
            <button
              type="button"
              onClick={() => handleQuickFill('specialist')}
              className="py-1.5 px-2 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200/80 text-[11px] font-medium text-slate-700 transition-colors text-center truncate"
            >
              Specialist
            </button>
          </div>

          {/* Account Signup Request Callout */}
          <div className="mt-4 pt-3 border-t border-slate-100 text-center">
            <p className="text-xs text-slate-500 mb-1.5">
              Don't have an approved enterprise client account?
            </p>
            <Link
              to="/portal?tab=request"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0046AF] hover:underline"
            >
              <Lock className="w-3 h-3" />
              <span>Submit Account Signup Request for Admin Review →</span>
            </Link>
          </div>
        </div>
      </motion.div>

      {/* Forgot Password Modal */}
      <AnimatePresence>
        {showForgotModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="w-full max-w-sm bg-white rounded-2xl p-6 shadow-2xl border border-slate-200"
            >
              <h3 className="text-lg font-bold text-slate-900 mb-1">Reset Password</h3>
              <p className="text-xs text-slate-500 mb-4 leading-relaxed">
                Enter your registered corporate email to receive password recovery instructions.
              </p>

              <form onSubmit={handleForgotSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={forgotEmail || email}
                    onChange={(e) => setForgotEmail(e.target.value)}
                    placeholder="name@company.com"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 text-sm focus:outline-none focus:border-blue-600"
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowForgotModal(false)}
                    className="text-xs h-9"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={forgotSent}
                    className="bg-blue-600 hover:bg-blue-500 text-white text-xs h-9"
                  >
                    {forgotSent ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : 'Send Link'}
                  </Button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
