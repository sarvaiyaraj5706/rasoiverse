import React from 'react';
import { Home, Search, Sparkles, Heart, User } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface MobileNavProps {
  currentPath: string;
  navigate: (path: string) => void;
  openAuthModal: () => void;
  isLoggedIn: boolean;
}

export const MobileNav: React.FC<MobileNavProps> = ({ currentPath, navigate, openAuthModal, isLoggedIn }) => {
  const { t } = useLanguage();

  const tabs = [
    { path: '/', label: t('navHome'), icon: Home },
    { path: '/explore', label: t('searchRecipesBtn'), icon: Search },
    { path: '/ai-generator', label: 'AI', icon: Sparkles, highlight: true },
    { 
      path: '/favorites', 
      label: t('navFavorites'), 
      icon: Heart,
      requiresAuth: true
    },
    { 
      path: '/profile', 
      label: 'Profile', 
      icon: User,
      requiresAuth: true
    }
  ];

  const handleTabClick = (tab: typeof tabs[0]) => {
    if (tab.requiresAuth && !isLoggedIn) {
      openAuthModal();
      return;
    }
    navigate(tab.path);
  };

  return (
    <nav 
      className="fixed bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-t border-stone-200 xl:hidden pb-safe select-none shadow-lg"
      aria-label="Mobile Bottom Navigation"
    >
      <div className="grid grid-cols-5 h-16 max-w-lg mx-auto px-1 sm:px-2">
        {tabs.map((tab) => {
          const isActive = currentPath === tab.path;
          const Icon = tab.icon;

          return (
            <button
              key={tab.path}
              onClick={() => handleTabClick(tab)}
              className={`flex flex-col items-center justify-center gap-0.5 sm:gap-1 transition-all touch-target ${
                isActive ? 'text-saffron-600 font-bold' : 'text-stone-500 hover:text-stone-800'
              }`}
              aria-label={tab.label}
            >
              <div className={`relative p-1 rounded-xl transition-transform ${isActive ? 'scale-110' : ''} ${
                tab.highlight ? 'bg-gradient-to-tr from-amber-500 to-saffron-500 text-white p-1.5 shadow-xs -mt-2' : ''
              }`}>
                <Icon className={tab.highlight ? 'w-5 h-5 text-white' : 'w-5 h-5'} />
              </div>
              <span className={`text-[10px] truncate max-w-full px-0.5 leading-tight ${tab.highlight ? 'text-saffron-600 font-bold' : ''}`}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
