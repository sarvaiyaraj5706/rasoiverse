import React, { useState, useEffect } from 'react';
import { ShieldCheck, Sparkles, Filter, Info } from 'lucide-react';
import { Recipe } from '../types';
import { fetchRecipes } from '../services/api';
import { useLanguage } from '../context/LanguageContext';
import { RecipeCard } from '../components/RecipeCard';

interface FaraliVratPageProps {
  navigate: (path: string) => void;
  openAuthModal: () => void;
}

export const FaraliVratPage: React.FC<FaraliVratPageProps> = ({ navigate, openAuthModal }) => {
  const { t } = useLanguage();
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [filterStaple, setFilterStaple] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  const fastingStaples = [
    { label: "All Vrat Recipes", value: "" },
    { label: "Sabudana (Tapioca)", value: "sabudana" },
    { label: "Rajgira / Amaranth", value: "rajgira" },
    { label: "Moraiyo (Sama Rice)", value: "moraiyo" },
    { label: "Singhara (Water Chestnut)", value: "singhara" },
    { label: "Makhana (Foxnuts)", value: "makhana" },
    { label: "Sweet Potato (Shakarkandi)", value: "shakarkandi" },
    { label: "Aloo (Potato)", value: "aloo" },
  ];

  useEffect(() => {
    async function loadFaraliRecipes() {
      try {
        setIsLoading(true);
        const data = await fetchRecipes({
          dietary: 'Farali',
          search: filterStaple,
          limit: 30
        });
        setRecipes(data.recipes || []);
      } catch (err) {
        console.error('Failed to load farali recipes:', err);
      } finally {
        setIsLoading(false);
      }
    }

    loadFaraliRecipes();
  }, [filterStaple]);

  return (
    <div className="max-w-7xl 2xl:max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-8 pb-28">
      
      {/* Page Header */}
      <div className="rounded-3xl bg-gradient-to-r from-amber-500 via-saffron-600 to-amber-700 text-white p-8 sm:p-12 shadow-xl relative overflow-hidden">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold uppercase tracking-wider border border-white/30">
            <span>🕉️ Sacred Fasting Collection</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-serif font-bold tracking-tight">
            {t('fastingSpotlightTitle')}
          </h1>

          <p className="text-xs sm:text-base text-amber-100 leading-relaxed">
            {t('fastingSpotlightSubtitle')}
          </p>

          {/* Prominent Fasting Rules Notice */}
          <div className="p-4 rounded-2xl bg-black/25 backdrop-blur-md border border-white/20 text-xs text-amber-50 flex items-start gap-3 mt-4">
            <ShieldCheck className="w-5 h-5 text-amber-300 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-white uppercase tracking-wider text-[11px]">Important Fasting Notice</p>
              <p className="leading-relaxed mt-0.5">
                “{t('fastingNotice')}”
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filter by Vrat Staple */}
      <div className="flex flex-wrap items-center gap-2 pt-2">
        <span className="text-xs font-bold text-stone-500 mr-2 flex items-center gap-1">
          <Filter className="w-3.5 h-3.5 text-saffron-600" />
          <span>Fasting Grain:</span>
        </span>
        {fastingStaples.map((staple) => (
          <button
            key={staple.value}
            onClick={() => setFilterStaple(staple.value)}
            className={`px-3.5 py-2 rounded-2xl text-xs font-medium transition-all ${
              filterStaple === staple.value
                ? 'bg-amber-500 text-white font-bold shadow-sm'
                : 'bg-white text-stone-700 border border-stone-200 hover:bg-stone-50'
            }`}
          >
            {staple.label}
          </button>
        ))}
      </div>

      {/* Recipe Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 sm:gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="bg-white rounded-3xl h-80 animate-pulse border border-stone-200" />
          ))}
        </div>
      ) : recipes.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 sm:gap-6">
          {recipes.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              onClick={() => navigate(`/recipe/${recipe.slug}`)}
              openAuthModal={openAuthModal}
            />
          ))}
        </div>
      ) : (
        <div className="p-12 text-center bg-white rounded-3xl border border-stone-200 max-w-md mx-auto space-y-3">
          <p className="text-sm font-bold text-stone-800">No specific recipes found for this staple</p>
          <button
            onClick={() => setFilterStaple('')}
            className="px-5 py-2 rounded-xl bg-amber-500 text-white text-xs font-bold"
          >
            View All Farali Recipes
          </button>
        </div>
      )}

    </div>
  );
};
