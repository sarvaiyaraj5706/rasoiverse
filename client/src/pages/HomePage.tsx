import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Sparkles, 
  ArrowRight, 
  Flame, 
  Mic, 
  Timer, 
  ShieldCheck, 
  Heart, 
  Compass, 
  Clock, 
  ChevronRight,
  Utensils
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useVoice } from '../context/VoiceContext';
import { Recipe, Category } from '../types';
import { RecipeCard } from '../components/RecipeCard';
import { fetchRecipes, fetchCategories, fetchRecipeSuggestions } from '../services/api';

interface HomePageProps {
  navigate: (path: string) => void;
  openAuthModal: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ navigate, openAuthModal }) => {
  const { t } = useLanguage();
  const { openVoiceModal } = useVoice();

  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [featuredRecipes, setFeaturedRecipes] = useState<Recipe[]>([]);
  const [faraliRecipes, setFaraliRecipes] = useState<Recipe[]>([]);
  const [streetFoodRecipes, setStreetFoodRecipes] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const exampleSearches = [
    "Farali Aloo Paratha",
    "Paneer Butter Masala",
    "Dhokla",
    "Biryani",
    "Potato",
    "Rice + Paneer",
    "Quick dinner"
  ];

  useEffect(() => {
    async function loadHomeData() {
      try {
        setIsLoading(true);
        const [cats, featRes, faraliRes, streetRes] = await Promise.all([
          fetchCategories(),
          fetchRecipes({ sort: 'popular', limit: 8 }),
          fetchRecipes({ dietary: 'Farali', limit: 4 }),
          fetchRecipes({ category: 'street-food', limit: 4 })
        ]);

        setCategories(cats);
        setFeaturedRecipes(featRes.recipes || []);
        setFaraliRecipes(faraliRes.recipes || []);
        setStreetFoodRecipes(streetRes.recipes || []);
      } catch (err) {
        console.error('Failed to load homepage data:', err);
      } finally {
        setIsLoading(false);
      }
    }

    loadHomeData();
  }, []);

  // Autocomplete suggestions
  useEffect(() => {
    const timer = setTimeout(async () => {
      if (searchQuery.trim().length >= 2) {
        const list = await fetchRecipeSuggestions(searchQuery);
        setSuggestions(list);
        setShowSuggestions(true);
      } else {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    }, 200);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const handleSearchSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!searchQuery.trim()) {
      navigate('/explore');
      return;
    }
    navigate(`/explore?search=${encodeURIComponent(searchQuery.trim())}`);
  };

  const handleExampleClick = (query: string) => {
    setSearchQuery(query);
    navigate(`/explore?search=${encodeURIComponent(query)}`);
  };

  return (
    <div className="space-y-16 pb-20">
      
      {/* ========================================== */}
      {/* 1. HERO SECTION */}
      {/* ========================================== */}
      <section className="relative overflow-hidden pt-12 pb-16 lg:pt-20 lg:pb-24 bg-gradient-to-b from-amber-50/50 via-cream-50 to-transparent">
        {/* Subtle Decorative Background Spices */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-gradient-to-br from-saffron-500/10 to-amber-400/10 blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 left-0 -ml-20 w-80 h-80 rounded-full bg-gradient-to-tr from-cardamom-500/10 to-amber-300/10 blur-3xl pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center relative z-10">
          
          {/* Eyebrow Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-saffron-50 border border-saffron-200/80 text-saffron-700 text-xs font-bold uppercase tracking-wider mb-6 shadow-2xs animate-fade-in">
            <Flame className="w-4 h-4 text-saffron-600 animate-pulse" />
            <span>Smart Indian Culinary Platform</span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-stone-900 tracking-tight font-serif leading-[1.15]">
            {t('heroHeading')}
          </h1>

          {/* Subtitle */}
          <p className="mt-5 text-base sm:text-lg text-stone-600 max-w-2xl mx-auto leading-relaxed">
            {t('heroSubtitle')}
          </p>

          {/* Search Box with Suggestions */}
          <div className="mt-8 max-w-2xl mx-auto relative">
            <form onSubmit={handleSearchSubmit} className="relative flex items-center">
              <div className="absolute left-4 pointer-events-none text-stone-400">
                <Search className="w-5 h-5 text-saffron-600" />
              </div>

              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => searchQuery.length >= 2 && setShowSuggestions(true)}
                placeholder={t('searchPlaceholder')}
                className="w-full pl-12 pr-36 py-4 rounded-3xl bg-white border-2 border-stone-200/90 shadow-soft hover:shadow-soft-hover focus:border-saffron-500 focus:outline-none text-sm text-stone-800 transition-all"
              />

              <div className="absolute right-2 flex items-center gap-1">
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-2xl bg-saffron-600 hover:bg-saffron-700 text-white font-bold text-xs shadow-md shadow-saffron-600/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  {t('searchRecipesBtn')}
                </button>
              </div>
            </form>

            {/* Suggestions Dropdown */}
            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl border border-stone-200 py-2 z-40 text-left">
                {suggestions.map((s, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setSearchQuery(s);
                      setShowSuggestions(false);
                      navigate(`/explore?search=${encodeURIComponent(s)}`);
                    }}
                    className="w-full px-4 py-2.5 text-xs font-medium text-stone-700 hover:bg-saffron-50 hover:text-saffron-700 flex items-center gap-2 transition-colors"
                  >
                    <Search className="w-3.5 h-3.5 text-stone-400" />
                    <span>{s}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Example Searches */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs">
            <span className="text-stone-400 font-semibold">{t('exampleSearches')}</span>
            {exampleSearches.map((ex, idx) => (
              <button
                key={idx}
                onClick={() => handleExampleClick(ex)}
                className="px-3 py-1 rounded-full bg-white/80 hover:bg-saffron-50 text-stone-600 hover:text-saffron-700 border border-stone-200/80 transition-all hover:scale-105 shadow-2xs text-[11px] font-medium"
              >
                {ex}
              </button>
            ))}
          </div>

          {/* Quick Action CTA Buttons */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => navigate('/explore')}
              className="px-6 py-3 rounded-2xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold flex items-center gap-2 shadow-md transition-all hover:scale-105"
            >
              <Compass className="w-4 h-4" />
              <span>{t('searchRecipesBtn')}</span>
            </button>

            <button
              onClick={() => navigate('/ai-generator')}
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-saffron-600 to-amber-500 hover:from-saffron-700 hover:to-amber-600 text-white text-xs font-bold flex items-center gap-2 shadow-md shadow-saffron-500/20 transition-all hover:scale-105"
            >
              <Sparkles className="w-4 h-4" />
              <span>{t('generateWithAiBtn')}</span>
            </button>

            <button
              onClick={openVoiceModal}
              className="px-5 py-3 rounded-2xl bg-white hover:bg-stone-50 border border-stone-200 text-stone-800 text-xs font-bold flex items-center gap-2 shadow-sm transition-all hover:scale-105"
            >
              <Mic className="w-4 h-4 text-saffron-600 animate-pulse" />
              <span>{t('voiceModalTitle')}</span>
            </button>
          </div>

        </div>
      </section>

      {/* ========================================== */}
      {/* 2. CATEGORIES CAROUSEL */}
      {/* ========================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">
              {t('categoriesTitle')}
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 mt-1">
              {t('categoriesSubtitle')}
            </p>
          </div>
          <button
            onClick={() => navigate('/explore')}
            className="hidden sm:flex items-center gap-1 text-xs font-bold text-saffron-600 hover:text-saffron-700 group"
          >
            <span>{t('viewAllRecipes')}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3 sm:gap-4">
          {categories.map((cat) => (
            <div
              key={cat.id}
              onClick={() => navigate(`/explore?category=${cat.slug}`)}
              className="group relative rounded-2xl overflow-hidden bg-stone-100 aspect-square shadow-sm hover:shadow-soft-hover border border-stone-200/80 cursor-pointer transition-all duration-300 hover:-translate-y-1 flex flex-col justify-end p-3"
            >
              <img
                src={cat.image}
                alt={cat.name}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              <div className="relative z-10 text-white">
                <h3 className="font-serif text-sm font-bold leading-tight group-hover:text-amber-300 transition-colors">
                  {cat.name}
                </h3>
                <p className="text-[10px] text-stone-300 mt-0.5">
                  {cat.recipe_count || 10}+ recipes
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================== */}
      {/* 3. TRENDING FEATURED RECIPES */}
      {/* ========================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-saffron-600 uppercase tracking-wider mb-1">
              <Flame className="w-4 h-4" />
              <span>Chef's Choice</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">
              {t('featuredDishes')}
            </h2>
          </div>
          <button
            onClick={() => navigate('/explore')}
            className="flex items-center gap-1 text-xs font-bold text-saffron-600 hover:text-saffron-700 group"
          >
            <span>{t('viewAllRecipes')}</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 sm:gap-6">
          {featuredRecipes.slice(0, 8).map((recipe) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              onClick={() => navigate(`/recipe/${recipe.slug}`)}
              openAuthModal={openAuthModal}
            />
          ))}
        </div>
      </section>

      {/* ========================================== */}
      {/* 4. DEDICATED FARALI / VRAT SPOTLIGHT */}
      {/* ========================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-amber-500 via-saffron-600 to-amber-700 text-white p-8 sm:p-12 shadow-xl relative overflow-hidden">
          {/* Subtle Om Mandala texture overlay */}
          <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none transform translate-x-10 translate-y-10">
            <span className="text-9xl font-serif">🕉️</span>
          </div>

          <div className="relative z-10 max-w-2xl">
            <span className="px-3.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-[11px] font-bold tracking-widest uppercase border border-white/30">
              Satvik & Vrat Collection
            </span>

            <h2 className="text-3xl sm:text-4xl font-serif font-bold mt-4 tracking-tight">
              {t('fastingSpotlightTitle')}
            </h2>

            <p className="mt-3 text-sm sm:text-base text-amber-100 leading-relaxed">
              {t('fastingSpotlightSubtitle')}
            </p>

            {/* Fasting Notice Box */}
            <div className="mt-6 p-4 rounded-2xl bg-black/20 backdrop-blur-md border border-white/20 text-xs text-amber-50 flex items-start gap-2.5">
              <ShieldCheck className="w-5 h-5 text-amber-300 flex-shrink-0 mt-0.5" />
              <p className="leading-relaxed">
                <strong className="text-white">Tradition Notice:</strong> {t('fastingNotice')}
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              <button
                onClick={() => navigate('/farali')}
                className="px-6 py-3 rounded-2xl bg-white text-stone-900 hover:bg-amber-50 font-bold text-xs shadow-lg transition-all hover:scale-105"
              >
                {t('exploreFasting')} →
              </button>

              <button
                onClick={() => navigate('/recipe/farali-aloo-paratha')}
                className="px-6 py-3 rounded-2xl bg-black/30 hover:bg-black/40 border border-white/30 text-white font-bold text-xs transition-all"
              >
                Featured: Farali Aloo Paratha
              </button>
            </div>
          </div>
        </div>

        {/* Farali recipe cards below banner */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 sm:gap-6 mt-6">
          {faraliRecipes.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              onClick={() => navigate(`/recipe/${recipe.slug}`)}
              openAuthModal={openAuthModal}
            />
          ))}
        </div>
      </section>

      {/* ========================================== */}
      {/* 5. "WHAT CAN I COOK WITH WHAT I HAVE?" TEASER */}
      {/* ========================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-white border border-stone-200/90 p-8 sm:p-12 shadow-soft flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="max-w-xl space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cardamom-50 text-cardamom-700 border border-cardamom-200 text-xs font-bold uppercase tracking-wider">
              <Utensils className="w-3.5 h-3.5" />
              <span>Smart Pantry Match</span>
            </div>
            <h2 className="text-3xl font-serif font-bold text-stone-900 leading-tight">
              {t('ingredientSearchTitle')}
            </h2>
            <p className="text-sm text-stone-600 leading-relaxed">
              {t('ingredientSearchSubtitle')}
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              <span className="px-3 py-1 rounded-xl bg-stone-100 text-xs font-medium text-stone-700">Potato ✓</span>
              <span className="px-3 py-1 rounded-xl bg-stone-100 text-xs font-medium text-stone-700">Tomato ✓</span>
              <span className="px-3 py-1 rounded-xl bg-stone-100 text-xs font-medium text-stone-700">Paneer ✓</span>
              <span className="px-3 py-1 rounded-xl bg-saffron-50 text-xs font-bold text-saffron-700 border border-saffron-200">
                You have 4/5 ingredients!
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => navigate('/ingredient-search')}
              className="px-8 py-4 rounded-2xl bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs shadow-md transition-all hover:scale-105"
            >
              {t('findRecipesBtn')} →
            </button>
            <button
              onClick={() => navigate('/ai-generator')}
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-saffron-600 to-amber-500 text-white font-bold text-xs shadow-md shadow-saffron-500/20 transition-all hover:scale-105"
            >
              {t('generateWithAiBtn')} ✨
            </button>
          </div>
        </div>
      </section>

      {/* ========================================== */}
      {/* 6. STREET FOOD & FAST FOOD SHOWCASE */}
      {/* ========================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-amber-600 uppercase tracking-wider mb-1">
              <span>Street Flavours</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">
              {t('streetFoodTitle')}
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 mt-1">
              {t('streetFoodSubtitle')}
            </p>
          </div>
          <button
            onClick={() => navigate('/explore?category=street-food')}
            className="flex items-center gap-1 text-xs font-bold text-saffron-600 hover:text-saffron-700 group"
          >
            <span>{t('viewAllRecipes')}</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {streetFoodRecipes.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              onClick={() => navigate(`/recipe/${recipe.slug}`)}
              openAuthModal={openAuthModal}
            />
          ))}
        </div>
      </section>

      {/* ========================================== */}
      {/* 7. HANDS-FREE COOKING ASSISTANT SHOWCASE */}
      {/* ========================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-stone-900 text-white p-8 sm:p-12 shadow-xl grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          <div className="lg:col-span-2 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-saffron-500/20 text-saffron-400 border border-saffron-500/30 text-xs font-bold uppercase tracking-wider">
              <Mic className="w-3.5 h-3.5" />
              <span>Rasoi Voice Assistant</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold tracking-tight">
              Cook with Both Hands Free. Your AI Sous-Chef Listens.
            </h2>
            <p className="text-xs sm:text-sm text-stone-400 leading-relaxed">
              Never smudge flour or oil on your phone screen again. Say “Next step”, “Repeat step”, or “Set a 5 minute timer”, and Rasoi assistant will talk back in English, Hindi, or Gujarati.
            </p>

            <div className="flex flex-wrap gap-2 pt-2 text-xs">
              <span className="px-3 py-1.5 rounded-xl bg-stone-800 text-amber-300 font-mono">“Next step”</span>
              <span className="px-3 py-1.5 rounded-xl bg-stone-800 text-amber-300 font-mono">“How much salt?”</span>
              <span className="px-3 py-1.5 rounded-xl bg-stone-800 text-amber-300 font-mono">“Set a 5 minute timer”</span>
              <span className="px-3 py-1.5 rounded-xl bg-stone-800 text-amber-300 font-mono">“Repeat the instructions”</span>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center p-6 rounded-2xl bg-stone-800/80 border border-stone-700/60 text-center">
            <button
              onClick={openVoiceModal}
              className="w-20 h-20 rounded-full bg-gradient-to-tr from-saffron-600 to-amber-500 text-white flex items-center justify-center shadow-lg shadow-saffron-500/30 hover:scale-105 active:scale-95 transition-all group"
            >
              <Mic className="w-8 h-8 group-hover:scale-110 transition-transform animate-pulse" />
            </button>
            <p className="text-xs font-bold text-white mt-4">Tap to Speak</p>
            <p className="text-[11px] text-stone-400 mt-1">Try: “Next step”</p>
          </div>
        </div>
      </section>

    </div>
  );
};
