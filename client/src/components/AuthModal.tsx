import React, { useState } from 'react';
import { X, Flame, Shield, UserCheck, Lock, Mail, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: 'login' | 'signup';
}

export const AuthModal: React.FC<AuthModalProps> = ({ 
  isOpen, 
  onClose, 
  initialTab = 'login' 
}) => {
  const { login, signup } = useAuth();
  const { t, language } = useLanguage();

  const [tab, setTab] = useState<'login' | 'signup'>(initialTab);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [forgotMsg, setForgotMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setForgotMsg('');
    setIsSubmitting(true);

    if (tab === 'login') {
      const res = await login(email, password);
      if (res.success) {
        onClose();
      } else {
        setErrorMsg(res.error || 'Failed to login');
      }
    } else {
      if (password !== confirmPassword) {
        setErrorMsg('Passwords do not match');
        setIsSubmitting(false);
        return;
      }
      const res = await signup(name, email, password, confirmPassword);
      if (res.success) {
        onClose();
      } else {
        setErrorMsg(res.error || 'Failed to sign up');
      }
    }
    setIsSubmitting(false);
  };

  const fillDemoChef = () => {
    setEmail('chef@rasoiverse.com');
    setPassword('Chef@123');
    setTab('login');
    setErrorMsg('');
  };

  const fillDemoAdmin = () => {
    setEmail('admin@rasoiverse.com');
    setPassword('Admin@123');
    setTab('login');
    setErrorMsg('');
  };

  const handleForgotPassword = async () => {
    if (!email) {
      setErrorMsg('Please enter your email above to reset password');
      return;
    }
    try {
      const res = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      const data = await res.json();
      setForgotMsg(data.message);
    } catch (e) {
      setErrorMsg('Could not process reset request');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-stone-200 relative overflow-hidden">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Brand Header */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-saffron-600 to-amber-500 flex items-center justify-center shadow-lg shadow-saffron-500/20 mx-auto mb-3">
            <Flame className="w-6 h-6 text-white" />
          </div>
          <h3 className="font-serif text-2xl font-bold text-stone-900">
            {tab === 'login' ? t('loginHeading') : t('signupHeading')}
          </h3>
          <p className="text-xs text-stone-500 mt-1">
            {t('brandTagline')}
          </p>
        </div>

        {/* Demo Fast Login Buttons */}
        <div className="mb-5 p-3 rounded-2xl bg-amber-50 border border-amber-200/80">
          <p className="text-[11px] font-bold text-amber-900 mb-1.5 flex items-center gap-1">
            <span>⚡ Instant Demo Testing:</span>
          </p>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={fillDemoChef}
              className="px-2.5 py-1.5 rounded-xl bg-white text-stone-800 border border-amber-300 hover:bg-amber-100 text-[11px] font-semibold flex items-center justify-center gap-1 transition-all shadow-2xs"
            >
              <UserCheck className="w-3.5 h-3.5 text-cardamom-600" />
              <span>Chef Account</span>
            </button>
            <button
              type="button"
              onClick={fillDemoAdmin}
              className="px-2.5 py-1.5 rounded-xl bg-stone-900 text-white hover:bg-stone-800 text-[11px] font-semibold flex items-center justify-center gap-1 transition-all shadow-2xs"
            >
              <Shield className="w-3.5 h-3.5 text-amber-400" />
              <span>Admin Account</span>
            </button>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex rounded-xl bg-stone-100 p-1 mb-5">
          <button
            type="button"
            onClick={() => { setTab('login'); setErrorMsg(''); }}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
              tab === 'login' ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-500 hover:text-stone-800'
            }`}
          >
            {t('loginBtn')}
          </button>
          <button
            type="button"
            onClick={() => { setTab('signup'); setErrorMsg(''); }}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
              tab === 'signup' ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-500 hover:text-stone-800'
            }`}
          >
            {t('signupBtn')}
          </button>
        </div>

        {/* Error / Success Feedback */}
        {errorMsg && (
          <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium">
            {errorMsg}
          </div>
        )}
        {forgotMsg && (
          <div className="mb-4 p-3 rounded-xl bg-cardamom-50 border border-cardamom-200 text-cardamom-800 text-xs font-medium">
            {forgotMsg}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3.5">
          {tab === 'signup' && (
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">{t('nameLabel')}</label>
              <div className="relative">
                <User className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Priya Patel"
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-stone-200 text-xs focus:outline-none focus:border-saffron-500"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">{t('emailLabel')}</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-stone-200 text-xs focus:outline-none focus:border-saffron-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">{t('passwordLabel')}</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-stone-200 text-xs focus:outline-none focus:border-saffron-500"
              />
            </div>
          </div>

          {tab === 'signup' && (
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">{t('confirmPasswordLabel')}</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-stone-200 text-xs focus:outline-none focus:border-saffron-500"
                />
              </div>
            </div>
          )}

          {tab === 'login' && (
            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-1.5 cursor-pointer text-stone-600">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded text-saffron-600 focus:ring-saffron-500"
                />
                <span>{t('rememberMe')}</span>
              </label>

              <button
                type="button"
                onClick={handleForgotPassword}
                className="text-saffron-600 hover:text-saffron-700 font-semibold"
              >
                {t('forgotPassword')}
              </button>
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 rounded-2xl bg-gradient-to-r from-saffron-600 to-amber-600 hover:from-saffron-700 hover:to-amber-700 text-white font-bold text-xs shadow-md shadow-saffron-500/20 transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 mt-2"
          >
            {isSubmitting 
              ? 'Please wait...' 
              : tab === 'login' ? t('loginBtn') : t('signupBtn')}
          </button>
        </form>

        <div className="mt-5 text-center text-xs text-stone-500">
          {tab === 'login' ? (
            <button 
              type="button" 
              onClick={() => { setTab('signup'); setErrorMsg(''); }}
              className="hover:text-stone-800"
            >
              {t('needAccount')}
            </button>
          ) : (
            <button 
              type="button" 
              onClick={() => { setTab('login'); setErrorMsg(''); }}
              className="hover:text-stone-800"
            >
              {t('haveAccount')}
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
