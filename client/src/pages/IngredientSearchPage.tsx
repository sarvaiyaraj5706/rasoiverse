import React, { useState } from 'react';
import { 
  Search, 
  Sparkles, 
  X, 
  Plus, 
  Utensils, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight,
  HelpCircle
} from 'lucide-react';
import { Recipe } from '../types';
import { searchByIngredients, parseNaturalLanguage } from '../services/api';
import { useLanguage } from '../context/LanguageContext';
import { RecipeCard } from '../components/RecipeCard';

interface IngredientSearchPageProps {
  navigate: (path: string) => void;
  openAuthModal: () => void;
}

export const IngredientSearchPage: React.FC<IngredientSearchPageProps> = ({ 
  navigate, 
  openAuthModal 
}) => {
  const { t } = useLanguage();

  const [ingredients, setIngredients] = useState<string[]>(['Potato', 'Tomato', 'Onion']);
  const [currentInput, setCurrentInput] = useState('');
  const [naturalText, setNaturalText] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [isParsing, setIsParsing] = useState(false);

  const [exactMatches, setExactMatches] = useState<Recipe[]>([]);
  const [missingOneOrTwo, setMissingOneOrTwo] = useState<Recipe[]>([]);
  const [similarRecipes, setSimilarRecipes] = useState<Recipe[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [activeTab, setActiveTab] = useState<'exact' | 'missing' | 'similar'>('exact');

  const popularStaples = [
    'Paneer', 'Curd', 'Rice', 'Besan', 'Sabudana', 'Peanuts', 
    'Spinach', 'Green Chilli', 'Ginger', 'Garlic', 'Lemon', 'Coriander'
  ];

  const handleAddIngredient = (name: string) => {
    const trimmed = name.trim();
    if (!trimmed) return;
    if (!ingredients.some(i => i.toLowerCase() === trimmed.toLowerCase())) {
      setIngredients(prev => [...prev, trimmed]);
    }
    setCurrentInput('');
  };

  const handleRemoveIngredient = (indexToRemove: number) => {
    setIngredients(prev => prev.filter((_, idx) => idx !== indexToRemove));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      handleAddIngredient(currentInput);
    }
  };

  const handleFindRecipes = async () => {
    if (ingredients.length === 0) return;
    setIsSearching(true);
    setHasSearched(true);
    try {
      const data = await searchByIngredients(ingredients);
      setExactMatches(data.exactMatches || []);
      setMissingOneOrTwo(data.missingOneOrTwo || []);
      setSimilarRecipes(data.similarRecipes || []);

      // Auto select tab with most relevant results
      if (data.exactMatches?.length > 0) setActiveTab('exact');
      else if (data.missingOneOrTwo?.length > 0) setActiveTab('missing');
      else setActiveTab('similar');
    } catch (err) {
      console.error('Ingredient search error:', err);
    } finally {
      setIsSearching(false);
    }
  };

  const handleParseNatural = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!naturalText.trim()) return;
    setIsParsing(true);
    try {
      const parsed = await parseNaturalLanguage(naturalText.trim());
      if (parsed && parsed.length > 0) {
        // Merge without duplicates
        const unique = Array.from(new Set([...ingredients, ...parsed]));
        setIngredients(unique);
      }
      setNaturalText('');
    } catch (err) {
      console.error('NLP parse error:', err);
    } finally {
      setIsParsing(false);
    }
  };

  const currentDisplayList = 
    activeTab === 'exact' ? exactMatches : 
    activeTab === 'missing' ? missingOneOrTwo : 
    similarRecipes;

  return (
    <div className="max-w-6xl 2xl:max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-10 pb-28">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cardamom-50 border border-cardamom-200 text-cardamom-800 text-xs font-bold uppercase tracking-wider">
          <Utensils className="w-4 h-4" />
          <span>Smart Pantry Finder</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-stone-900 tracking-tight">
          {t('ingredientSearchTitle')}
        </h1>
        <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
          {t('ingredientSearchSubtitle')}
        </p>
      </div>

      {/* Input Manager Container */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-soft space-y-6">
        
        {/* Ingredient Chips Display */}
        <div>
          <label className="block text-xs font-bold text-stone-700 mb-2">
            Selected Ingredients ({ingredients.length})
          </label>

          <div className="min-h-[60px] p-3 rounded-2xl bg-stone-50 border border-stone-200 flex flex-wrap items-center gap-2">
            {ingredients.map((ing, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-stone-300 text-xs font-bold text-stone-800 shadow-2xs group"
              >
                <span>{ing}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveIngredient(idx)}
                  className="text-stone-400 hover:text-rose-600 transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </span>
            ))}

            {/* Inline typing input */}
            <input
              type="text"
              value={currentInput}
              onChange={(e) => setCurrentInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={ingredients.length === 0 ? t('enterIngredientPlaceholder') : "Add another ingredient..."}
              className="flex-1 min-w-[200px] bg-transparent border-none text-xs focus:outline-none text-stone-800 py-1"
            />
          </div>
        </div>

        {/* Quick Add Suggestions */}
        <div>
          <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider block mb-2">
            Quick Add Common Staples:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {popularStaples.map((staple) => (
              <button
                key={staple}
                type="button"
                onClick={() => handleAddIngredient(staple)}
                className="px-3 py-1 rounded-xl bg-stone-100 hover:bg-saffron-50 text-stone-700 hover:text-saffron-700 border border-stone-200/80 text-xs font-medium flex items-center gap-1 transition-all"
              >
                <Plus className="w-3 h-3 text-stone-400" />
                <span>{staple}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Natural Language Input Section */}
        <div className="pt-4 border-t border-stone-100">
          <label className="block text-xs font-bold text-stone-700 mb-1.5">
            {t('naturalLanguageTitle')}
          </label>
          <form onSubmit={handleParseNatural} className="flex gap-2">
            <input
              type="text"
              value={naturalText}
              onChange={(e) => setNaturalText(e.target.value)}
              placeholder={t('naturalLanguagePlaceholder')}
              className="flex-1 px-4 py-3 rounded-2xl bg-stone-50 border border-stone-200 text-xs focus:outline-none focus:border-saffron-500 text-stone-800"
            />
            <button
              type="submit"
              disabled={isParsing || !naturalText.trim()}
              className="px-5 py-3 rounded-2xl bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold text-xs flex items-center gap-1.5 transition-colors disabled:opacity-50"
            >
              {isParsing ? 'Parsing...' : t('convertAndSearchBtn')}
            </button>
          </form>
        </div>

        {/* Submit Search Button */}
        <div className="pt-2">
          <button
            onClick={handleFindRecipes}
            disabled={isSearching || ingredients.length === 0}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-saffron-600 to-amber-600 hover:from-saffron-700 hover:to-amber-700 text-white font-bold text-sm shadow-md shadow-saffron-500/20 flex items-center justify-center gap-2 transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50"
          >
            {isSearching ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Scanning 70+ authentic Indian recipes...</span>
              </>
            ) : (
              <>
                <Search className="w-4 h-4" />
                <span>{t('findRecipesBtn')} ({ingredients.length} ingredients)</span>
              </>
            )}
          </button>
        </div>

      </div>

      {/* Results Section */}
      {hasSearched && (
        <div className="space-y-6 animate-in fade-in">
          
          {/* Result Tabs */}
          <div className="flex rounded-2xl bg-stone-100 p-1.5 max-w-xl mx-auto text-xs font-bold">
            <button
              onClick={() => setActiveTab('exact')}
              className={`flex-1 py-2.5 rounded-xl transition-all flex items-center justify-center gap-1.5 ${
                activeTab === 'exact' ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-500 hover:text-stone-800'
              }`}
            >
              <span>{t('exactMatchesTab')}</span>
              <span className="px-1.5 py-0.2 rounded-full bg-saffron-100 text-saffron-800 text-[10px]">
                {exactMatches.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('missing')}
              className={`flex-1 py-2.5 rounded-xl transition-all flex items-center justify-center gap-1.5 ${
                activeTab === 'missing' ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-500 hover:text-stone-800'
              }`}
            >
              <span>{t('missingOneTwoTab')}</span>
              <span className="px-1.5 py-0.2 rounded-full bg-amber-100 text-amber-800 text-[10px]">
                {missingOneOrTwo.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('similar')}
              className={`flex-1 py-2.5 rounded-xl transition-all flex items-center justify-center gap-1.5 ${
                activeTab === 'similar' ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-500 hover:text-stone-800'
              }`}
            >
              <span>{t('similarTab')}</span>
              <span className="px-1.5 py-0.2 rounded-full bg-stone-200 text-stone-700 text-[10px]">
                {similarRecipes.length}
              </span>
            </button>
          </div>

          {/* Results Grid or Empty Notice */}
          {currentDisplayList.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 sm:gap-6">
              {currentDisplayList.map((recipe) => (
                <RecipeCard
                  key={recipe.id}
                  recipe={recipe}
                  onClick={() => navigate(`/recipe/${recipe.slug}`)}
                  openAuthModal={openAuthModal}
                  showMissingIngredients={true}
                />
              ))}
            </div>
          ) : (
            <div className="p-10 text-center bg-white rounded-3xl border border-stone-200 max-w-md mx-auto space-y-3">
              <AlertCircle className="w-8 h-8 text-amber-500 mx-auto" />
              <h4 className="font-serif text-lg font-bold text-stone-800">
                No recipes in this tab
              </h4>
              <p className="text-xs text-stone-500">
                {t('noIngredientResults')}
              </p>
              <button
                onClick={() => navigate('/ai-generator')}
                className="mt-2 px-5 py-2.5 rounded-xl bg-saffron-600 text-white font-bold text-xs"
              >
                Create Custom Dish with AI ✨
              </button>
            </div>
          )}

        </div>
      )}

    </div>
  );
};
