import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Filter, 
  Sparkles, 
  SlidersHorizontal, 
  X, 
  Clock, 
  ChefHat, 
  RotateCcw,
  ArrowUpDown
} from 'lucide-react';
import { Recipe, SearchFilterState } from '../types';
import { RecipeCard } from '../components/RecipeCard';
import { fetchRecipes, fetchRecipeSuggestions } from '../services/api';
import { useLanguage } from '../context/LanguageContext';

interface ExploreRecipesPageProps {
  initialSearch?: string;
  initialCuisine?: string;
  initialCategory?: string;
  initialDietary?: string;
  navigate: (path: string) => void;
  openAuthModal: () => void;
}

export const ExploreRecipesPage: React.FC<ExploreRecipesPageProps> = ({
  initialSearch = '',
  initialCuisine = '',
  initialCategory = '',
  initialDietary = '',
  navigate,
  openAuthModal
}) => {
  const { t } = useLanguage();

  const [search, setSearch] = useState(initialSearch);
  const [cuisine, setCuisine] = useState(initialCuisine);
  const [category, setCategory] = useState(initialCategory);
  const [dietary, setDietary] = useState(initialDietary);
  const [difficulty, setDifficulty] = useState('');
  const [maxTime, setMaxTime] = useState('');
  const [sort, setSort] = useState('popular');
  const [page, setPage] = useState(1);

  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const cuisinesList = [
    "Gujarati", "Punjabi", "South Indian", "Maharashtrian", 
    "Rajasthani", "Bengali", "Kashmiri", "North Indian", "Street Food", "Farali"
  ];

  const dietaryTags = [
    { label: "All Diets", value: "" },
    { label: "Vegetarian", value: "Vegetarian" },
    { label: "Jain", value: "Jain" },
    { label: "Farali / Vrat", value: "Farali" },
    { label: "Vegan", value: "Vegan" },
  ];

  // Suggestions
  useEffect(() => {
    const timer = setTimeout(async () => {
      if (search.trim().length >= 2) {
        const list = await fetchRecipeSuggestions(search);
        setSuggestions(list);
        setShowSuggestions(true);
      } else {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    }, 200);

    return () => clearTimeout(timer);
  }, [search]);

  // Fetch recipes on filter change
  useEffect(() => {
    async function loadRecipes() {
      try {
        setIsLoading(true);
        const data = await fetchRecipes({
          search,
          cuisine,
          category,
          dietary,
          difficulty,
          maxTime,
          sort,
          page
        });
        setRecipes(data.recipes || []);
        setTotalPages(data.pagination?.totalPages || 1);
        setTotalCount(data.pagination?.total || 0);
      } catch (err) {
        console.error('Failed to load recipes:', err);
      } finally {
        setIsLoading(false);
      }
    }

    loadRecipes();
  }, [search, cuisine, category, dietary, difficulty, maxTime, sort, page]);

  const handleClearFilters = () => {
    setSearch('');
    setCuisine('');
    setCategory('');
    setDietary('');
    setDifficulty('');
    setMaxTime('');
    setSort('popular');
    setPage(1);
  };

  const hasActiveFilters = search || cuisine || category || dietary || difficulty || maxTime;

  return (
    <div className="max-w-7xl 2xl:max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-8 pb-20">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-stone-200 pb-6">
        <div>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900">
            {t('navExplore')}
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            Browse authentic Indian recipes, filter by region, diet, or cooking time ({totalCount} recipes)
          </p>
        </div>

        {/* Top Controls: Search & Filter Toggle */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className={`px-4 py-2.5 rounded-2xl border text-xs font-bold flex items-center gap-2 transition-all ${
              isFilterOpen || hasActiveFilters
                ? 'bg-saffron-50 border-saffron-300 text-saffron-700'
                : 'bg-white border-stone-200 text-stone-700 hover:bg-stone-50'
            }`}
          >
            <SlidersHorizontal className="w-4 h-4 text-saffron-600" />
            <span>Filters</span>
            {hasActiveFilters && (
              <span className="w-2 h-2 rounded-full bg-saffron-600" />
            )}
          </button>

          {/* Sort Select */}
          <div className="relative">
            <select
              value={sort}
              onChange={(e) => { setSort(e.target.value); setPage(1); }}
              className="px-3.5 py-2.5 rounded-2xl bg-white border border-stone-200 text-xs font-semibold text-stone-700 focus:outline-none focus:border-saffron-500 cursor-pointer shadow-2xs"
            >
              <option value="popular">Most Popular</option>
              <option value="rating">Top Rated</option>
              <option value="quickest">Quickest</option>
              <option value="name">Alphabetical</option>
            </select>
          </div>
        </div>
      </div>

      {/* Search Input Bar */}
      <div className="relative max-w-2xl">
        <div className="relative flex items-center">
          <Search className="w-4 h-4 text-stone-400 absolute left-4 pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            placeholder={t('searchPlaceholder')}
            className="w-full pl-11 pr-10 py-3 rounded-2xl bg-white border border-stone-200 shadow-2xs text-xs focus:outline-none focus:border-saffron-500"
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute right-3 p-1 text-stone-400 hover:text-stone-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Autocomplete Suggestions */}
        {showSuggestions && suggestions.length > 0 && (
          <div className="absolute left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl border border-stone-200 py-1.5 z-30">
            {suggestions.map((s, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setSearch(s);
                  setShowSuggestions(false);
                }}
                className="w-full text-left px-4 py-2 text-xs text-stone-700 hover:bg-saffron-50 hover:text-saffron-700 flex items-center gap-2"
              >
                <Search className="w-3.5 h-3.5 text-stone-400" />
                <span>{s}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Filter Drawer / Panel */}
      {isFilterOpen && (
        <div className="bg-white p-6 rounded-3xl border border-stone-200/90 shadow-soft space-y-5 animate-in fade-in">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-base font-bold text-stone-900">
              Refine Recipes
            </h3>
            {hasActiveFilters && (
              <button
                onClick={handleClearFilters}
                className="text-xs text-rose-600 hover:text-rose-700 font-semibold flex items-center gap-1"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset All</span>
              </button>
            )}
          </div>

          {/* Dietary Filters */}
          <div>
            <label className="block text-xs font-bold text-stone-600 mb-2">Dietary Preference</label>
            <div className="flex flex-wrap gap-2">
              {dietaryTags.map((d) => (
                <button
                  key={d.value}
                  onClick={() => { setDietary(d.value); setPage(1); }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                    dietary === d.value
                      ? 'bg-saffron-600 text-white font-bold shadow-2xs'
                      : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                  }`}
                >
                  {d.label}
                </button>
              ))}
            </div>
          </div>

          {/* Cuisine Filters */}
          <div>
            <label className="block text-xs font-bold text-stone-600 mb-2">Cuisine & Tradition</label>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => { setCuisine(''); setPage(1); }}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium ${
                  cuisine === '' ? 'bg-stone-900 text-white font-bold' : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                }`}
              >
                All Cuisines
              </button>
              {cuisinesList.map((c) => (
                <button
                  key={c}
                  onClick={() => { setCuisine(c); setPage(1); }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-medium ${
                    cuisine === c ? 'bg-saffron-600 text-white font-bold shadow-2xs' : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* Time & Difficulty */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-stone-100">
            <div>
              <label className="block text-xs font-bold text-stone-600 mb-2">Cooking Time</label>
              <select
                value={maxTime}
                onChange={(e) => { setMaxTime(e.target.value); setPage(1); }}
                className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs bg-stone-50"
              >
                <option value="">Any duration</option>
                <option value="20">Under 20 minutes (Quick)</option>
                <option value="30">Under 30 minutes</option>
                <option value="45">Under 45 minutes</option>
                <option value="60">Under 60 minutes</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-600 mb-2">Difficulty</label>
              <select
                value={difficulty}
                onChange={(e) => { setDifficulty(e.target.value); setPage(1); }}
                className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs bg-stone-50"
              >
                <option value="">Any difficulty</option>
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Active Filter Chips */}
      {hasActiveFilters && (
        <div className="flex flex-wrap items-center gap-2 pt-2 text-xs">
          <span className="text-stone-400 font-medium">Active:</span>
          {search && (
            <span className="px-2.5 py-1 rounded-full bg-stone-200 text-stone-800 flex items-center gap-1 font-medium">
              Search: "{search}" <button onClick={() => setSearch('')}><X className="w-3 h-3" /></button>
            </span>
          )}
          {cuisine && (
            <span className="px-2.5 py-1 rounded-full bg-amber-100 text-amber-900 flex items-center gap-1 font-medium">
              Cuisine: {cuisine} <button onClick={() => setCuisine('')}><X className="w-3 h-3" /></button>
            </span>
          )}
          {dietary && (
            <span className="px-2.5 py-1 rounded-full bg-cardamom-100 text-cardamom-900 flex items-center gap-1 font-medium">
              Diet: {dietary} <button onClick={() => setDietary('')}><X className="w-3 h-3" /></button>
            </span>
          )}
          {maxTime && (
            <span className="px-2.5 py-1 rounded-full bg-stone-200 text-stone-800 flex items-center gap-1 font-medium">
              ≤ {maxTime} mins <button onClick={() => setMaxTime('')}><X className="w-3 h-3" /></button>
            </span>
          )}
        </div>
      )}

      {/* Recipe Grid or Empty State */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 sm:gap-6">
          {Array.from({ length: 10 }).map((_, i) => (
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
        /* Empty State */
        <div className="p-12 text-center bg-white rounded-3xl border border-stone-200 max-w-lg mx-auto shadow-sm my-12 space-y-4">
          <div className="w-16 h-16 rounded-full bg-amber-50 text-saffron-600 flex items-center justify-center mx-auto">
            <Search className="w-8 h-8" />
          </div>
          <h3 className="font-serif text-2xl font-bold text-stone-800">
            {t('noRecipesFound')}
          </h3>
          <p className="text-xs text-stone-500 leading-relaxed">
            {t('tryAnotherSearch')}
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={handleClearFilters}
              className="px-5 py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold"
            >
              Reset Filters
            </button>
            <button
              onClick={() => navigate('/ingredient-search')}
              className="px-5 py-2.5 rounded-xl bg-stone-900 text-white hover:bg-stone-800 text-xs font-bold"
            >
              Search by Pantry
            </button>
            <button
              onClick={() => navigate('/ai-generator')}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-saffron-600 to-amber-600 text-white text-xs font-bold"
            >
              Generate with AI ✨
            </button>
          </div>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 pt-6">
          <button
            disabled={page === 1}
            onClick={() => setPage(p => Math.max(1, p - 1))}
            className="px-4 py-2 rounded-xl border border-stone-200 text-xs font-bold disabled:opacity-40 hover:bg-stone-50"
          >
            Previous
          </button>
          <span className="text-xs font-semibold text-stone-600 px-3">
            Page {page} of {totalPages}
          </span>
          <button
            disabled={page === totalPages}
            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
            className="px-4 py-2 rounded-xl border border-stone-200 text-xs font-bold disabled:opacity-40 hover:bg-stone-50"
          >
            Next
          </button>
        </div>
      )}

    </div>
  );
};
