import React, { useState, useEffect } from 'react';
import { Heart, Search, Compass, Sparkles } from 'lucide-react';
import { Recipe } from '../types';
import { fetchFavorites } from '../services/api';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { RecipeCard } from '../components/RecipeCard';

interface FavoritesPageProps {
  navigate: (path: string) => void;
  openAuthModal: () => void;
}

export const FavoritesPage: React.FC<FavoritesPageProps> = ({ navigate, openAuthModal }) => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const [favorites, setFavorites] = useState<Recipe[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadFavorites() {
      if (!user) {
        setIsLoading(false);
        return;
      }
      try {
        setIsLoading(true);
        const data = await fetchFavorites();
        setFavorites(data || []);
      } catch (err) {
        console.error('Failed to load favorites:', err);
      } finally {
        setIsLoading(false);
      }
    }

    loadFavorites();
  }, [user]);

  if (!user) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center mx-auto shadow-sm">
          <Heart className="w-8 h-8 fill-current" />
        </div>
        <h2 className="text-2xl font-serif font-bold text-stone-900">
          Save Your Favorite Dishes
        </h2>
        <p className="text-xs text-stone-500 leading-relaxed">
          Log in or sign up to curate your personal Indian recipe cookbook and access your saved favorites from any device.
        </p>
        <button
          onClick={openAuthModal}
          className="px-6 py-3 rounded-2xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold shadow-md transition-all"
        >
          Login / Sign Up
        </button>
      </div>
    );
  }

  const filteredFavorites = favorites.filter(r => 
    r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.cuisine.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-7xl 2xl:max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-8 pb-28">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-stone-200 pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-600 uppercase tracking-wider mb-1">
            <Heart className="w-4 h-4 fill-current" />
            <span>Personal Collection</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900">
            {t('navFavorites')}
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            Recipes you have bookmarked for quick cooking ({favorites.length} saved)
          </p>
        </div>

        {/* Search within favorites */}
        {favorites.length > 0 && (
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter favorites..."
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-white border border-stone-200 text-xs focus:outline-none focus:border-saffron-500"
            />
          </div>
        )}
      </div>

      {/* Grid or Empty */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 sm:gap-6">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="bg-white rounded-3xl h-80 animate-pulse border border-stone-200" />
          ))}
        </div>
      ) : filteredFavorites.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 sm:gap-6">
          {filteredFavorites.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              onClick={() => navigate(`/recipe/${recipe.slug}`)}
              openAuthModal={openAuthModal}
            />
          ))}
        </div>
      ) : (
        <div className="p-16 text-center bg-white rounded-3xl border border-stone-200 max-w-md mx-auto shadow-sm space-y-4">
          <div className="w-16 h-16 rounded-full bg-stone-100 text-stone-400 flex items-center justify-center mx-auto">
            <Heart className="w-8 h-8" />
          </div>
          <h3 className="font-serif text-xl font-bold text-stone-800">
            {t('emptyFavorites')}
          </h3>
          <p className="text-xs text-stone-500 leading-relaxed">
            Click the ❤️ icon on any recipe card to save it to your personal favorites collection.
          </p>
          <button
            onClick={() => navigate('/explore')}
            className="px-6 py-2.5 rounded-2xl bg-saffron-600 hover:bg-saffron-700 text-white font-bold text-xs shadow-sm transition-all"
          >
            {t('exploreRecipesLink')}
          </button>
        </div>
      )}

    </div>
  );
};
