import React, { useState, useEffect } from 'react';
import { 
  Flame, 
  Sparkles, 
  Search, 
  Heart, 
  User, 
  Globe, 
  Mic, 
  ShieldCheck, 
  Menu, 
  X, 
  LogOut, 
  Clock, 
  MapPin, 
  UtensilsCrossed,
  Home,
  ChevronRight
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { useVoice } from '../context/VoiceContext';
import { Language } from '../types';

interface NavbarProps {
  currentPath: string;
  navigate: (path: string) => void;
  openAuthModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPath, navigate, openAuthModal }) => {
  const { language, setLanguage, t } = useLanguage();
  const { user, logout } = useAuth();
  const { openVoiceModal } = useVoice();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  // Prevent background scroll when mobile drawer is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const navItems = [
    { path: '/', label: t('navHome'), icon: Home },
    { path: '/explore', label: t('navExplore'), icon: Search },
    { path: '/ai-generator', label: t('navAiGenerator'), icon: Sparkles, highlight: true },
    { path: '/ingredient-search', label: t('navIngredientSearch'), icon: UtensilsCrossed },
    { path: '/farali', label: t('navFarali'), icon: ShieldCheck, badge: 'Vrat' },
    { path: '/regional', label: t('navRegional'), icon: MapPin },
    { path: '/quick', label: t('navQuick'), icon: Clock },
  ];

  const handleLangChange = (lang: Language) => {
    setLanguage(lang);
    setIsLangDropdownOpen(false);
  };

  const handleDrawerNavigate = (path: string) => {
    setIsMobileMenuOpen(false);
    navigate(path);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200/80 shadow-xs transition-all">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Brand Logo - Compact & Adaptive for 320px+ */}
          <div 
            onClick={() => navigate('/')} 
            className="flex items-center gap-2 sm:gap-3 cursor-pointer group select-none min-w-0"
          >
            <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl bg-gradient-to-tr from-saffron-600 via-saffron-500 to-amber-500 flex items-center justify-center shadow-md shadow-saffron-500/20 group-hover:scale-105 transition-transform duration-300 flex-shrink-0">
              <Flame className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1 sm:gap-1.5">
                <span className="text-lg sm:text-2xl font-bold tracking-tight text-stone-900 font-serif whitespace-nowrap">
                  Rasoi<span className="text-saffron-600">Verse</span>
                </span>
                <span className="text-[9px] sm:text-[10px] uppercase font-bold tracking-widest px-1 py-0.2 sm:px-1.5 sm:py-0.5 rounded bg-saffron-50 text-saffron-700 border border-saffron-200">
                  AI
                </span>
              </div>
              <p className="text-[10px] sm:text-[11px] text-stone-500 hidden md:block tracking-tight font-medium truncate max-w-[200px] lg:max-w-none">
                {t('brandTagline')}
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links (>= 1280px) */}
          <nav className="hidden xl:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = currentPath === item.path;
              const Icon = item.icon;
              return (
                <button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className={`relative px-3.5 py-2 rounded-xl text-sm font-medium transition-all duration-200 flex items-center gap-1.5 ${
                    isActive
                      ? 'text-saffron-600 bg-saffron-50/80 font-semibold'
                      : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100/70'
                  } ${item.highlight ? 'text-amber-700 hover:text-amber-800' : ''}`}
                >
                  {Icon && <Icon className={`w-4 h-4 ${isActive ? 'text-saffron-600' : 'text-amber-500'}`} />}
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-cardamom-50 text-cardamom-700 border border-cardamom-200">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Controls */}
          <div className="flex items-center gap-1.5 sm:gap-2.5">
            
            {/* Quick Search Shortcut on Mobile / Tablet */}
            <button
              onClick={() => navigate('/explore')}
              className="xl:hidden p-2 sm:p-2.5 rounded-xl text-stone-600 hover:text-stone-900 hover:bg-stone-100 touch-target flex items-center justify-center transition-colors"
              title="Search recipes"
              aria-label="Search recipes"
            >
              <Search className="w-5 h-5 text-stone-600" />
            </button>

            {/* Voice Assistant Launcher (Visible on md+) */}
            <button
              onClick={openVoiceModal}
              title="Talk to Rasoi Assistant"
              className="hidden md:flex p-2 sm:p-2.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-700 border border-amber-200 items-center gap-1.5 transition-colors group shadow-xs touch-target"
            >
              <Mic className="w-4 h-4 group-hover:scale-110 transition-transform text-saffron-600 animate-pulse" />
              <span className="text-xs font-semibold hidden lg:inline">Voice Assistant</span>
            </button>

            {/* Language Selector Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                className="px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-xl border border-stone-200 hover:border-stone-300 bg-stone-50/80 hover:bg-stone-100 text-stone-700 text-xs font-semibold flex items-center gap-1 sm:gap-1.5 transition-colors touch-target"
                aria-label="Change language"
              >
                <Globe className="w-3.5 h-3.5 text-stone-500 flex-shrink-0" />
                <span className="font-medium">
                  {language === 'en' ? 'EN' : language === 'hi' ? 'हिन्दी' : 'ગુજ'}
                </span>
              </button>

              {isLangDropdownOpen && (
                <div className="absolute right-0 mt-2 w-36 bg-white rounded-2xl shadow-xl border border-stone-100 py-1.5 z-50 animate-in fade-in zoom-in-95">
                  <button
                    onClick={() => handleLangChange('en')}
                    className={`w-full text-left px-3.5 py-2 text-xs font-medium flex items-center justify-between hover:bg-saffron-50 transition-colors ${
                      language === 'en' ? 'text-saffron-600 font-semibold bg-saffron-50/50' : 'text-stone-700'
                    }`}
                  >
                    <span>English</span>
                    <span className="text-[10px] text-stone-400">EN</span>
                  </button>
                  <button
                    onClick={() => handleLangChange('hi')}
                    className={`w-full text-left px-3.5 py-2 text-xs font-medium flex items-center justify-between hover:bg-saffron-50 transition-colors ${
                      language === 'hi' ? 'text-saffron-600 font-semibold bg-saffron-50/50' : 'text-stone-700'
                    }`}
                  >
                    <span>हिन्दी</span>
                    <span className="text-[10px] text-stone-400">HI</span>
                  </button>
                  <button
                    onClick={() => handleLangChange('gu')}
                    className={`w-full text-left px-3.5 py-2 text-xs font-medium flex items-center justify-between hover:bg-saffron-50 transition-colors ${
                      language === 'gu' ? 'text-saffron-600 font-semibold bg-saffron-50/50' : 'text-stone-700'
                    }`}
                  >
                    <span>ગુજરાતી</span>
                    <span className="text-[10px] text-stone-400">GU</span>
                  </button>
                </div>
              )}
            </div>

            {/* Desktop User Profile / Auth State */}
            {user ? (
              <div className="relative hidden sm:block">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-2 p-1.5 pl-2 pr-2.5 rounded-2xl bg-stone-50 hover:bg-stone-100 border border-stone-200 transition-colors"
                >
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-gradient-to-br from-saffron-500 to-amber-600 text-white font-bold text-xs flex items-center justify-center shadow-xs">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-xs font-semibold text-stone-800 max-w-[80px] sm:max-w-[100px] truncate hidden md:inline">
                    {user.name}
                  </span>
                </button>

                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-52 bg-white rounded-2xl shadow-xl border border-stone-100 py-2 z-50">
                    <div className="px-4 py-2 border-b border-stone-100">
                      <p className="text-xs font-bold text-stone-800 truncate">{user.name}</p>
                      <p className="text-[11px] text-stone-500 truncate">{user.email}</p>
                    </div>

                    <button
                      onClick={() => {
                        navigate('/profile');
                        setIsUserMenuOpen(false);
                      }}
                      className="w-full text-left px-4 py-2.5 text-xs text-stone-700 hover:bg-stone-50 flex items-center gap-2"
                    >
                      <User className="w-3.5 h-3.5 text-stone-400" />
                      <span>{t('navProfile')}</span>
                    </button>

                    <button
                      onClick={() => {
                        navigate('/favorites');
                        setIsUserMenuOpen(false);
                      }}
                      className="w-full text-left px-4 py-2.5 text-xs text-stone-700 hover:bg-stone-50 flex items-center gap-2"
                    >
                      <Heart className="w-3.5 h-3.5 text-rose-500" />
                      <span>{t('navFavorites')}</span>
                    </button>

                    {user.role === 'admin' && (
                      <button
                        onClick={() => {
                          navigate('/admin');
                          setIsUserMenuOpen(false);
                        }}
                        className="w-full text-left px-4 py-2.5 text-xs text-amber-700 hover:bg-amber-50 flex items-center gap-2 font-semibold"
                      >
                        <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
                        <span>{t('navAdmin')}</span>
                      </button>
                    )}

                    <div className="border-t border-stone-100 mt-1 pt-1">
                      <button
                        onClick={() => {
                          logout();
                          setIsUserMenuOpen(false);
                          navigate('/');
                        }}
                        className="w-full text-left px-4 py-2.5 text-xs text-rose-600 hover:bg-rose-50 flex items-center gap-2"
                      >
                        <LogOut className="w-3.5 h-3.5 text-rose-500" />
                        <span>{t('navLogout')}</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={openAuthModal}
                className="hidden sm:inline-flex px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold transition-all shadow-xs touch-target items-center justify-center"
              >
                {t('navLogin')}
              </button>
            )}

            {/* Mobile / Tablet Hamburger Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="xl:hidden p-2 rounded-xl text-stone-700 hover:bg-stone-100 touch-target flex items-center justify-center transition-colors"
              aria-label="Open Navigation Drawer"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* ========================================== */}
      {/* MOBILE SLIDE-OVER DRAWER & BACKDROP        */}
      {/* ========================================== */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 xl:hidden">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity duration-300"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Slide-over Container */}
          <aside 
            className="fixed top-0 right-0 bottom-0 w-full max-w-[320px] sm:max-w-sm bg-white shadow-2xl flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-300 z-10"
            aria-label="Mobile Navigation Menu"
          >
            {/* Drawer Top Header */}
            <div>
              <div className="p-4 sm:p-5 border-b border-stone-100 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-saffron-600 to-amber-500 flex items-center justify-center shadow-xs text-white">
                    <Flame className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-stone-900 text-base">
                      Rasoi<span className="text-saffron-600">Verse</span>
                    </h3>
                    <p className="text-[10px] text-stone-400 font-medium">
                      Smart Culinary Platform
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 rounded-xl text-stone-500 hover:text-stone-900 hover:bg-stone-100 touch-target flex items-center justify-center transition-colors"
                  aria-label="Close navigation"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* User Status / Login Banner in Drawer */}
              <div className="p-4 border-b border-stone-100 bg-stone-50/70">
                {user ? (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-saffron-500 to-amber-600 text-white font-bold text-sm flex items-center justify-center shadow-xs">
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-stone-900 truncate">{user.name}</p>
                        <p className="text-[11px] text-stone-500 truncate">{user.email}</p>
                      </div>
                    </div>
                    {user.role === 'admin' && (
                      <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 text-[10px] font-bold">
                        Admin
                      </span>
                    )}
                  </div>
                ) : (
                  <div className="text-center space-y-2">
                    <p className="text-xs font-medium text-stone-600">
                      Cook, save favorites & generate AI recipes
                    </p>
                    <button
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        openAuthModal();
                      }}
                      className="w-full py-2.5 rounded-xl bg-stone-900 text-white text-xs font-bold shadow-xs hover:bg-stone-800 transition-all touch-target flex items-center justify-center"
                    >
                      {t('navLogin')} / Register
                    </button>
                  </div>
                )}
              </div>

              {/* Navigation Items List */}
              <div className="p-3 space-y-1">
                {navItems.map((item) => {
                  const isActive = currentPath === item.path;
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.path}
                      onClick={() => handleDrawerNavigate(item.path)}
                      className={`w-full text-left px-3.5 py-3 rounded-xl text-xs font-medium flex items-center justify-between transition-colors touch-target ${
                        isActive
                          ? 'bg-saffron-50 text-saffron-700 font-bold'
                          : 'text-stone-700 hover:bg-stone-50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className={`w-4 h-4 ${isActive ? 'text-saffron-600' : 'text-stone-400'}`} />
                        <span>{item.label}</span>
                      </div>
                      {item.badge && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-cardamom-100 text-cardamom-800">
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}

                {/* Voice Assistant Direct Button in Drawer */}
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    openVoiceModal();
                  }}
                  className="w-full text-left px-3.5 py-3 rounded-xl text-xs font-bold text-amber-800 bg-amber-50 hover:bg-amber-100/80 flex items-center justify-between transition-colors touch-target border border-amber-200/80"
                >
                  <div className="flex items-center gap-3">
                    <Mic className="w-4 h-4 text-saffron-600 animate-pulse" />
                    <span>Talk to Voice Assistant</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-amber-600" />
                </button>

                {/* Favorites Link */}
                <button
                  onClick={() => handleDrawerNavigate('/favorites')}
                  className={`w-full text-left px-3.5 py-3 rounded-xl text-xs font-medium flex items-center justify-between transition-colors touch-target ${
                    currentPath === '/favorites' ? 'bg-rose-50 text-rose-700 font-bold' : 'text-stone-700 hover:bg-stone-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Heart className="w-4 h-4 text-rose-500" />
                    <span>{t('navFavorites')}</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-stone-300" />
                </button>

                {/* Profile Link */}
                <button
                  onClick={() => handleDrawerNavigate('/profile')}
                  className={`w-full text-left px-3.5 py-3 rounded-xl text-xs font-medium flex items-center justify-between transition-colors touch-target ${
                    currentPath === '/profile' ? 'bg-stone-100 text-stone-900 font-bold' : 'text-stone-700 hover:bg-stone-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <User className="w-4 h-4 text-stone-500" />
                    <span>{t('navProfile')}</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-stone-300" />
                </button>

                {/* Admin Link if admin */}
                {user && user.role === 'admin' && (
                  <button
                    onClick={() => handleDrawerNavigate('/admin')}
                    className="w-full text-left px-3.5 py-3 rounded-xl text-xs font-bold text-amber-800 bg-amber-50 hover:bg-amber-100 flex items-center justify-between transition-colors touch-target border border-amber-200"
                  >
                    <div className="flex items-center gap-3">
                      <ShieldCheck className="w-4 h-4 text-amber-600" />
                      <span>{t('navAdmin')}</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-amber-600" />
                  </button>
                )}
              </div>
            </div>

            {/* Drawer Bottom: Segmented Language Switcher & Logout */}
            <div className="p-4 border-t border-stone-100 bg-stone-50/70 space-y-3 pb-safe">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-stone-400 mb-1.5">
                  App Language
                </p>
                <div className="grid grid-cols-3 gap-1 p-1 bg-stone-200/80 rounded-xl">
                  <button
                    onClick={() => handleLangChange('en')}
                    className={`py-2 rounded-lg text-xs font-bold transition-all ${
                      language === 'en' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-600 hover:text-stone-900'
                    }`}
                  >
                    English
                  </button>
                  <button
                    onClick={() => handleLangChange('hi')}
                    className={`py-2 rounded-lg text-xs font-bold transition-all ${
                      language === 'hi' ? 'bg-saffron-600 text-white shadow-xs' : 'text-stone-600 hover:text-stone-900'
                    }`}
                  >
                    हिन्दी
                  </button>
                  <button
                    onClick={() => handleLangChange('gu')}
                    className={`py-2 rounded-lg text-xs font-bold transition-all ${
                      language === 'gu' ? 'bg-cardamom-600 text-white shadow-xs' : 'text-stone-600 hover:text-stone-900'
                    }`}
                  >
                    ગુજરાતી
                  </button>
                </div>
              </div>

              {user && (
                <button
                  onClick={() => {
                    logout();
                    setIsMobileMenuOpen(false);
                    navigate('/');
                  }}
                  className="w-full py-2.5 rounded-xl border border-rose-200 bg-rose-50/50 hover:bg-rose-50 text-rose-700 text-xs font-semibold flex items-center justify-center gap-2 transition-colors touch-target"
                >
                  <LogOut className="w-4 h-4 text-rose-500" />
                  <span>{t('navLogout')}</span>
                </button>
              )}
            </div>

          </aside>
        </div>
      )}
    </header>
  );
};
