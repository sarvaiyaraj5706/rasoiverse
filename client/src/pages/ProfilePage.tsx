import React, { useState, useEffect } from 'react';
import { 
  User, 
  Heart, 
  Clock, 
  Sparkles, 
  Settings, 
  Globe, 
  Shield, 
  LogOut, 
  Trash2,
  Calendar,
  CheckCircle2
} from 'lucide-react';
import { Recipe, Language } from '../types';
import { fetchFavorites, fetchHistory, fetchAIHistory } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { RecipeCard } from '../components/RecipeCard';

interface ProfilePageProps {
  navigate: (path: string) => void;
  openAuthModal: () => void;
}

export const ProfilePage: React.FC<ProfilePageProps> = ({ navigate, openAuthModal }) => {
  const { user, logout, updateUser } = useAuth();
  const { t, language, setLanguage } = useLanguage();

  const [activeTab, setActiveTab] = useState<'favorites' | 'history' | 'ai' | 'settings'>('favorites');
  const [favorites, setFavorites] = useState<Recipe[]>([]);
  const [history, setHistory] = useState<Recipe[]>([]);
  const [aiHistory, setAiHistory] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [editName, setEditName] = useState(user?.name || '');
  const [selectedLang, setSelectedLang] = useState<Language>(user?.preferred_language || language);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    if (!user) return;
    setEditName(user.name);
    setSelectedLang(user.preferred_language || language);

    async function loadUserData() {
      try {
        setIsLoading(true);
        const [favs, hist, aiHist] = await Promise.all([
          fetchFavorites().catch(() => []),
          fetchHistory().catch(() => []),
          fetchAIHistory().catch(() => [])
        ]);

        setFavorites(favs || []);
        setHistory(hist || []);
        setAiHistory(aiHist || []);
      } catch (e) {
        console.error('Failed to load profile data:', e);
      } finally {
        setIsLoading(false);
      }
    }

    loadUserData();
  }, [user]);

  if (!user) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-stone-100 text-stone-600 flex items-center justify-center mx-auto shadow-sm">
          <User className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-serif font-bold text-stone-900">
          Account Profile
        </h2>
        <p className="text-xs text-stone-500 leading-relaxed">
          Log in or create a RasoiVerse account to manage your profile, saved recipes, and personal cooking history.
        </p>
        <button
          onClick={openAuthModal}
          className="px-6 py-3 rounded-2xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold shadow-md"
        >
          Login / Signup
        </button>
      </div>
    );
  }

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/auth/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('rasoi_token')}`
        },
        body: JSON.stringify({
          name: editName,
          preferred_language: selectedLang
        })
      });

      if (res.ok) {
        updateUser({ name: editName, preferred_language: selectedLang });
        setLanguage(selectedLang);
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3000);
      }
    } catch (e) {
      console.error('Failed to update profile:', e);
    }
  };

  const handleClearHistory = async () => {
    try {
      await fetch('/api/history', {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('rasoi_token')}` }
      });
      setHistory([]);
    } catch (e) {}
  };

  return (
    <div className="max-w-7xl 2xl:max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-10 pb-28">
      
      {/* Profile Header Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-soft flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
          <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-saffron-600 to-amber-500 text-white flex items-center justify-center font-serif text-3xl font-bold shadow-lg shadow-saffron-500/30">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <h1 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">
                {user.name}
              </h1>
              {user.role === 'admin' && (
                <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 text-xs font-bold flex items-center gap-1">
                  <Shield className="w-3 h-3 text-amber-600" /> Admin
                </span>
              )}
            </div>
            <p className="text-xs text-stone-500 mt-1">{user.email}</p>
            <p className="text-[11px] text-stone-400 mt-0.5">
              Preferred Language: <strong className="text-stone-700 uppercase">{user.preferred_language || 'EN'}</strong>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {user.role === 'admin' && (
            <button
              onClick={() => navigate('/admin')}
              className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold transition-all shadow-sm"
            >
              Admin Dashboard
            </button>
          )}

          <button
            onClick={() => {
              logout();
              navigate('/');
            }}
            className="px-4 py-2.5 rounded-xl border border-rose-200 bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold flex items-center gap-1.5 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>{t('navLogout')}</span>
          </button>
        </div>
      </div>

      {/* Profile Navigation Tabs */}
      <div className="flex flex-wrap rounded-2xl bg-stone-100 p-1.5 max-w-2xl text-xs font-bold">
        <button
          onClick={() => setActiveTab('favorites')}
          className={`flex-1 min-w-[120px] py-3 rounded-xl transition-all flex items-center justify-center gap-1.5 ${
            activeTab === 'favorites' ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-500 hover:text-stone-800'
          }`}
        >
          <Heart className="w-3.5 h-3.5 text-rose-500" />
          <span>{t('savedFavoritesTab')} ({favorites.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('history')}
          className={`flex-1 min-w-[120px] py-3 rounded-xl transition-all flex items-center justify-center gap-1.5 ${
            activeTab === 'history' ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-500 hover:text-stone-800'
          }`}
        >
          <Clock className="w-3.5 h-3.5 text-amber-500" />
          <span>{t('recentlyViewedTab')} ({history.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('ai')}
          className={`flex-1 min-w-[120px] py-3 rounded-xl transition-all flex items-center justify-center gap-1.5 ${
            activeTab === 'ai' ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-500 hover:text-stone-800'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5 text-saffron-600" />
          <span>{t('aiRecipesTab')} ({aiHistory.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('settings')}
          className={`flex-1 min-w-[120px] py-3 rounded-xl transition-all flex items-center justify-center gap-1.5 ${
            activeTab === 'settings' ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-500 hover:text-stone-800'
          }`}
        >
          <Settings className="w-3.5 h-3.5 text-stone-500" />
          <span>{t('settingsTab')}</span>
        </button>
      </div>

      {/* Tab Contents */}
      <div>
        
        {/* 1. FAVORITES TAB */}
        {activeTab === 'favorites' && (
          <div>
            {favorites.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 sm:gap-6">
                {favorites.map((recipe) => (
                  <RecipeCard
                    key={recipe.id}
                    recipe={recipe}
                    onClick={() => navigate(`/recipe/${recipe.slug}`)}
                    openAuthModal={openAuthModal}
                  />
                ))}
              </div>
            ) : (
              <div className="p-16 text-center bg-white rounded-3xl border border-stone-200 max-w-md mx-auto space-y-3">
                <Heart className="w-8 h-8 text-stone-300 mx-auto" />
                <p className="text-sm font-bold text-stone-800">{t('emptyFavorites')}</p>
                <button
                  onClick={() => navigate('/explore')}
                  className="px-5 py-2.5 rounded-xl bg-saffron-600 text-white font-bold text-xs"
                >
                  Discover Recipes
                </button>
              </div>
            )}
          </div>
        )}

        {/* 2. RECENTLY VIEWED TAB */}
        {activeTab === 'history' && (
          <div className="space-y-4">
            <div className="flex justify-end">
              {history.length > 0 && (
                <button
                  onClick={handleClearHistory}
                  className="text-xs text-stone-500 hover:text-rose-600 flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Clear History</span>
                </button>
              )}
            </div>

            {history.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 sm:gap-6">
                {history.map((recipe) => (
                  <RecipeCard
                    key={recipe.id}
                    recipe={recipe}
                    onClick={() => navigate(`/recipe/${recipe.slug}`)}
                    openAuthModal={openAuthModal}
                  />
                ))}
              </div>
            ) : (
              <div className="p-16 text-center bg-white rounded-3xl border border-stone-200 max-w-md mx-auto space-y-3">
                <Clock className="w-8 h-8 text-stone-300 mx-auto" />
                <p className="text-sm font-bold text-stone-800">{t('emptyHistory')}</p>
              </div>
            )}
          </div>
        )}

        {/* 3. AI GENERATED RECIPES TAB */}
        {activeTab === 'ai' && (
          <div>
            {aiHistory.length > 0 ? (
              <div className="space-y-4">
                {aiHistory.map((item) => (
                  <div 
                    key={item.id}
                    className="p-6 rounded-3xl bg-white border border-stone-200/90 shadow-soft flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded-lg bg-saffron-50 text-saffron-700 text-[10px] font-bold">
                          AI Created
                        </span>
                        <span className="text-[11px] text-stone-400">
                          {new Date(item.created_at).toLocaleDateString()}
                        </span>
                      </div>
                      <h4 className="font-serif text-lg font-bold text-stone-900">
                        {item.title}
                      </h4>
                      <p className="text-xs text-stone-500">
                        Input prompt: {item.prompt?.ingredients || 'Custom ingredients'} • {item.prompt?.cuisine}
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        navigate('/ai-generator');
                      }}
                      className="px-4 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold"
                    >
                      View in Studio
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-16 text-center bg-white rounded-3xl border border-stone-200 max-w-md mx-auto space-y-3">
                <Sparkles className="w-8 h-8 text-stone-300 mx-auto" />
                <p className="text-sm font-bold text-stone-800">{t('emptyAiRecipes')}</p>
                <button
                  onClick={() => navigate('/ai-generator')}
                  className="px-5 py-2.5 rounded-xl bg-saffron-600 text-white font-bold text-xs"
                >
                  Generate with AI
                </button>
              </div>
            )}
          </div>
        )}

        {/* 4. SETTINGS TAB */}
        {activeTab === 'settings' && (
          <form 
            onSubmit={handleUpdateProfile} 
            className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-soft max-w-xl space-y-5"
          >
            <h3 className="font-serif text-lg font-bold text-stone-900">
              Account Preferences
            </h3>

            {saveSuccess && (
              <div className="p-3 rounded-xl bg-cardamom-50 border border-cardamom-200 text-cardamom-800 text-xs font-semibold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cardamom-600" />
                <span>Profile preferences updated successfully!</span>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">Your Name</label>
              <input 
                type="text"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-xs focus:outline-none focus:border-saffron-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">Email (Cannot be changed)</label>
              <input 
                type="text"
                disabled
                value={user.email}
                className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-xs bg-stone-50 text-stone-400"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">Preferred Language</label>
              <select
                value={selectedLang}
                onChange={(e) => setSelectedLang(e.target.value as Language)}
                className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-xs bg-stone-50 font-medium"
              >
                <option value="en">English (EN)</option>
                <option value="hi">हिन्दी (Hindi)</option>
                <option value="gu">ગુજરાતી (Gujarati)</option>
              </select>
            </div>

            <button
              type="submit"
              className="px-6 py-3 rounded-2xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold shadow-sm transition-all"
            >
              Save Preferences
            </button>
          </form>
        )}

      </div>

    </div>
  );
};
