import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { LanguageProvider } from './context/LanguageContext';
import { TimerProvider, useTimer } from './context/TimerContext';
import { VoiceProvider, useVoice } from './context/VoiceContext';

import { Navbar } from './components/Navbar';
import { MobileNav } from './components/MobileNav';
import { Footer } from './components/Footer';
import { VoiceAssistantModal } from './components/VoiceAssistantModal';
import { AuthModal } from './components/AuthModal';

import { HomePage } from './pages/HomePage';
import { ExploreRecipesPage } from './pages/ExploreRecipesPage';
import { RecipeDetailPage } from './pages/RecipeDetailPage';
import { CookingModePage } from './pages/CookingModePage';
import { AIRecipeGeneratorPage } from './pages/AIRecipeGeneratorPage';
import { IngredientSearchPage } from './pages/IngredientSearchPage';
import { FaraliVratPage } from './pages/FaraliVratPage';
import { FavoritesPage } from './pages/FavoritesPage';
import { ProfilePage } from './pages/ProfilePage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { Bell, Mic } from 'lucide-react';

function AppContent() {
  const { user } = useAuth();
  const { timers, formatTime } = useTimer();
  const { openVoiceModal } = useVoice();

  const [currentPath, setCurrentPath] = useState(window.location.pathname || '/');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState<'login' | 'signup'>('login');

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (path: string) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openAuth = (tab: 'login' | 'signup' = 'login') => {
    setAuthModalTab(tab);
    setIsAuthModalOpen(true);
  };

  // Active timers count
  const activeTimer = timers.find(t => t.isRunning);

  // Router resolution
  const renderPage = () => {
    const url = new URL(window.location.origin + currentPath);
    const pathname = url.pathname;
    const searchParams = url.searchParams;

    if (pathname.startsWith('/cook/')) {
      const slug = pathname.replace('/cook/', '');
      return (
        <CookingModePage 
          slugOrId={slug} 
          navigate={navigate} 
          openAuthModal={openAuth} 
        />
      );
    }

    if (pathname.startsWith('/recipe/')) {
      const slug = pathname.replace('/recipe/', '');
      return (
        <RecipeDetailPage 
          slugOrId={slug} 
          navigate={navigate} 
          openAuthModal={openAuth} 
        />
      );
    }

    if (pathname === '/explore') {
      return (
        <ExploreRecipesPage 
          initialSearch={searchParams.get('search') || ''}
          initialCuisine={searchParams.get('cuisine') || ''}
          initialCategory={searchParams.get('category') || ''}
          initialDietary={searchParams.get('dietary') || ''}
          navigate={navigate} 
          openAuthModal={openAuth} 
        />
      );
    }

    if (pathname === '/ai-generator') {
      return (
        <AIRecipeGeneratorPage 
          navigate={navigate} 
          openAuthModal={openAuth} 
        />
      );
    }

    if (pathname === '/ingredient-search') {
      return (
        <IngredientSearchPage 
          navigate={navigate} 
          openAuthModal={openAuth} 
        />
      );
    }

    if (pathname === '/farali') {
      return (
        <FaraliVratPage 
          navigate={navigate} 
          openAuthModal={openAuth} 
        />
      );
    }

    if (pathname === '/regional') {
      return (
        <ExploreRecipesPage 
          initialCategory="regional"
          navigate={navigate} 
          openAuthModal={openAuth} 
        />
      );
    }

    if (pathname === '/quick') {
      return (
        <ExploreRecipesPage 
          initialDietary=""
          navigate={navigate} 
          openAuthModal={openAuth} 
        />
      );
    }

    if (pathname === '/favorites') {
      return (
        <FavoritesPage 
          navigate={navigate} 
          openAuthModal={openAuth} 
        />
      );
    }

    if (pathname === '/profile') {
      return (
        <ProfilePage 
          navigate={navigate} 
          openAuthModal={openAuth} 
        />
      );
    }

    if (pathname === '/admin') {
      return (
        <AdminDashboardPage 
          navigate={navigate} 
        />
      );
    }

    // Default Home Page
    return (
      <HomePage 
        navigate={navigate} 
        openAuthModal={openAuth} 
      />
    );
  };

  const isCookingMode = currentPath.startsWith('/cook/');

  return (
    <div className="min-h-screen flex flex-col bg-[#FDFBF7]">
      {/* Hide standard navbar and footer when inside distraction-free Cooking Mode */}
      {!isCookingMode && (
        <Navbar 
          currentPath={currentPath} 
          navigate={navigate} 
          openAuthModal={() => openAuth('login')} 
        />
      )}

      {/* Main Content Area */}
      <main className="flex-1 pb-20 xl:pb-0">
        {renderPage()}
      </main>

      {/* Floating Active Timer Pill if running in background */}
      {!isCookingMode && activeTimer && (
        <div 
          onClick={openVoiceModal}
          className="fixed bottom-20 xl:bottom-6 right-4 sm:right-6 z-40 bg-stone-900 text-white px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-2xl shadow-xl flex items-center gap-2.5 sm:gap-3 border border-amber-500/50 cursor-pointer hover:scale-105 transition-all animate-bounce"
        >
          <div className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" />
          <div className="text-xs">
            <span className="text-stone-400 font-semibold mr-1">{activeTimer.title}:</span>
            <span className="font-mono font-bold text-amber-300">{formatTime(activeTimer.remainingSeconds)}</span>
          </div>
        </div>
      )}

      {/* Floating Voice Assistant Action Button */}
      {!isCookingMode && (
        <button
          onClick={openVoiceModal}
          className="fixed bottom-20 xl:bottom-6 left-4 sm:left-6 z-40 w-12 h-12 rounded-2xl bg-gradient-to-tr from-saffron-600 to-amber-500 text-white flex items-center justify-center shadow-lg shadow-saffron-600/30 hover:scale-110 active:scale-95 transition-all touch-target"
          title="Talk to Rasoi Voice Assistant"
          aria-label="Open Voice Assistant"
        >
          <Mic className="w-5 h-5 animate-pulse" />
        </button>
      )}

      {!isCookingMode && (
        <Footer navigate={navigate} />
      )}

      {/* Mobile Bottom Tab Bar */}
      {!isCookingMode && (
        <MobileNav 
          currentPath={currentPath} 
          navigate={navigate} 
          openAuthModal={() => openAuth('login')} 
          isLoggedIn={!!user}
        />
      )}

      {/* Modals */}
      <VoiceAssistantModal />
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
        initialTab={authModalTab}
      />
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <TimerProvider>
          <VoiceProvider>
            <AppContent />
          </VoiceProvider>
        </TimerProvider>
      </AuthProvider>
    </LanguageProvider>
  );
}
