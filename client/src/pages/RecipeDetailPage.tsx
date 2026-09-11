import React, { useState, useEffect } from 'react';
import { 
  Clock, 
  ChefHat, 
  Star, 
  Heart, 
  Share2, 
  Play, 
  Check, 
  Sparkles, 
  ShieldCheck, 
  Utensils, 
  Flame, 
  Timer, 
  ArrowLeft,
  Info,
  Plus,
  Minus,
  Copy,
  AlertTriangle,
  Archive,
  Layers,
  Languages
} from 'lucide-react';
import { Recipe, Language, Ingredient } from '../types';
import { fetchRecipeDetail, fetchRecommendations, toggleFavorite } from '../services/api';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { useTimer } from '../context/TimerContext';
import { RecipeCard } from '../components/RecipeCard';

interface RecipeDetailPageProps {
  slugOrId: string;
  navigate: (path: string) => void;
  openAuthModal: () => void;
}

export const RecipeDetailPage: React.FC<RecipeDetailPageProps> = ({ 
  slugOrId, 
  navigate, 
  openAuthModal 
}) => {
  const { t, language: globalLanguage, setLanguage } = useLanguage();
  const { user } = useAuth();
  const { startTimer } = useTimer();

  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [recommendations, setRecommendations] = useState<Recipe[]>([]);
  const [checkedIngredients, setCheckedIngredients] = useState<Record<number, boolean>>({});
  const [isFavorited, setIsFavorited] = useState(false);
  const [copiedToast, setCopiedToast] = useState(false);
  const [shoppingListToast, setShoppingListToast] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // In-page language switcher state (defaults to global language)
  const [pageLanguage, setPageLanguage] = useState<Language>(globalLanguage);
  // Dynamic servings scaler
  const [servings, setServings] = useState<number>(4);

  // Sync with global language changes if user switches from navbar
  useEffect(() => {
    setPageLanguage(globalLanguage);
  }, [globalLanguage]);

  useEffect(() => {
    async function loadRecipe() {
      try {
        setIsLoading(true);
        const data = await fetchRecipeDetail(slugOrId);
        setRecipe(data.recipe);
        setIsFavorited(data.recipe.isFavorited || false);
        setServings(data.recipe.servings || 4);

        if (data.recipe.id) {
          const recs = await fetchRecommendations(data.recipe.id);
          setRecommendations(recs);
        }
      } catch (err) {
        console.error('Failed to load recipe detail:', err);
      } finally {
        setIsLoading(false);
      }
    }

    loadRecipe();
    setCheckedIngredients({});
  }, [slugOrId]);

  const handleToggleIngredient = (idx: number) => {
    setCheckedIngredients(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  const handleSelectAllIngredients = () => {
    if (!recipe?.ingredients) return;
    const allChecked = Object.keys(checkedIngredients).length === recipe.ingredients.length &&
      Object.values(checkedIngredients).every(Boolean);
    
    if (allChecked) {
      setCheckedIngredients({});
    } else {
      const next: Record<number, boolean> = {};
      recipe.ingredients.forEach((_, idx) => {
        next[idx] = true;
      });
      setCheckedIngredients(next);
    }
  };

  const formatUnit = (unit?: string) => {
    if (!unit) return '';
    const u = unit.trim().toLowerCase();
    
    if (pageLanguage === 'hi') {
      if (u === 'g' || u === 'gm' || u === 'gram' || u === 'grams') return 'ग्राम';
      if (u === 'kg' || u === 'kilo' || u === 'kilogram') return 'किलो';
      if (u === 'ml' || u === 'milliliter') return 'मिली';
      if (u === 'l' || u === 'liter' || u === 'litre') return 'लीटर';
      if (u === 'tbsp' || u === 'tablespoon' || u === 'tablespoons') return 'बड़े चम्मच';
      if (u === 'tsp' || u === 'teaspoon' || u === 'teaspoons') return 'छोटा चम्मच';
      if (u === 'cup' || u === 'cups') return 'कप';
      if (u === 'piece' || u === 'pieces' || u === 'pc' || u === 'pcs') return 'नग';
      if (u === 'pinch' || u === 'pinches') return 'चुटकी';
      if (u === 'to taste' || u === 'as needed') return 'स्वादानुसार';
      if (u === 'bunch' || u === 'bunches') return 'गुच्छा';
      if (u === 'handful') return 'मुट्ठी भर';
      if (u === 'cloves' || u === 'clove') return 'कलियां';
      if (u === 'inch' || u === 'inches') return 'इंच';
      if (u === 'slices' || u === 'slice') return 'स्लाइस';
      if (u === 'bowl' || u === 'bowls') return 'कटोरी';
    } else if (pageLanguage === 'gu') {
      if (u === 'g' || u === 'gm' || u === 'gram' || u === 'grams') return 'ગ્રામ';
      if (u === 'kg' || u === 'kilo' || u === 'kilogram') return 'કિલો';
      if (u === 'ml' || u === 'milliliter') return 'મિલી';
      if (u === 'l' || u === 'liter' || u === 'litre') return 'લીટર';
      if (u === 'tbsp' || u === 'tablespoon' || u === 'tablespoons') return 'ટેબલસ્પૂન';
      if (u === 'tsp' || u === 'teaspoon' || u === 'teaspoons') return 'ચમચી';
      if (u === 'cup' || u === 'cups') return 'કપ';
      if (u === 'piece' || u === 'pieces' || u === 'pc' || u === 'pcs') return 'નંગ';
      if (u === 'pinch' || u === 'pinches') return 'ચપટી';
      if (u === 'to taste' || u === 'as needed') return 'સ્વાદ મુજબ';
      if (u === 'bunch' || u === 'bunches') return 'ઝૂડી';
      if (u === 'handful') return 'મુઠ્ઠી';
      if (u === 'cloves' || u === 'clove') return 'કળીઓ';
      if (u === 'inch' || u === 'inches') return 'ઇંચ';
      if (u === 'slices' || u === 'slice') return 'સ્લાઈસ';
      if (u === 'bowl' || u === 'bowls') return 'વાટકી';
    }
    return unit;
  };

  const handleCopyShoppingList = () => {
    if (!recipe?.ingredients) return;
    const items = recipe.ingredients.map(ing => {
      const qtyStr = formatQuantity(ing);
      const unitStr = formatUnit(ing.unit);
      const name = getIngName(ing);
      const detail = [qtyStr, unitStr].filter(Boolean).join(' ');
      return `• ${name}${detail ? ` (${detail})` : ''}`.trim();
    });

    const listHeading = pageLanguage === 'hi'
      ? `🛒 ${getRecipeName()} के लिए सामग्री सूची (${servings} लोगों के लिए):`
      : pageLanguage === 'gu'
      ? `🛒 ${getRecipeName()} માટે સામગ્રી યાદી (${servings} વ્યક્તિ માટે):`
      : `🛒 Shopping List for ${getRecipeName()} (${servings} servings):`;

    const textToCopy = `${listHeading}\n\n${items.join('\n')}\n\nPrepared with RasoiVerse`;
    navigator.clipboard.writeText(textToCopy);
    setShoppingListToast(true);
    setTimeout(() => setShoppingListToast(false), 3000);
  };

  const handleFavorite = async () => {
    if (!user) {
      openAuthModal();
      return;
    }
    if (!recipe) return;

    try {
      const nextState = !isFavorited;
      setIsFavorited(nextState);
      await toggleFavorite(recipe.id, isFavorited);
    } catch (err) {
      setIsFavorited(!isFavorited);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: getRecipeName(),
        text: getRecipeDesc(),
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopiedToast(true);
      setTimeout(() => setCopiedToast(false), 3000);
    }
  };

  // Language helper accessors
  const getRecipeName = () => {
    if (!recipe) return '';
    if (pageLanguage === 'hi' && recipe.name_hi) return recipe.name_hi;
    if (pageLanguage === 'gu' && recipe.name_gu) return recipe.name_gu;
    return recipe.name;
  };

  const getRecipeDesc = () => {
    if (!recipe) return '';
    if (pageLanguage === 'hi' && recipe.description_hi) return recipe.description_hi;
    if (pageLanguage === 'gu' && recipe.description_gu) return recipe.description_gu;
    return recipe.description;
  };

  const getIngName = (ing: Ingredient) => {
    if (pageLanguage === 'hi' && ing.name_hi) return ing.name_hi;
    if (pageLanguage === 'gu' && ing.name_gu) return ing.name_gu;
    return ing.name;
  };

  const getStepTitle = (step: any) => {
    if (pageLanguage === 'hi' && step.title_hi) return step.title_hi;
    if (pageLanguage === 'gu' && step.title_gu) return step.title_gu;
    return step.title;
  };

  const getStepInstruction = (step: any) => {
    if (pageLanguage === 'hi' && step.instruction_hi) return step.instruction_hi;
    if (pageLanguage === 'gu' && step.instruction_gu) return step.instruction_gu;
    return step.instruction;
  };

  const getStepTip = (step: any) => {
    if (pageLanguage === 'hi' && step.tip_hi) return step.tip_hi;
    if (pageLanguage === 'gu' && step.tip_gu) return step.tip_gu;
    return step.tip;
  };

  const getPrepInstructions = () => {
    if (!recipe) return null;
    if (pageLanguage === 'hi' && recipe.prep_instructions_hi) return recipe.prep_instructions_hi;
    if (pageLanguage === 'gu' && recipe.prep_instructions_gu) return recipe.prep_instructions_gu;
    return recipe.prep_instructions_en;
  };

  const getCommonMistakes = () => {
    if (!recipe) return null;
    if (pageLanguage === 'hi' && recipe.common_mistakes_hi) return recipe.common_mistakes_hi;
    if (pageLanguage === 'gu' && recipe.common_mistakes_gu) return recipe.common_mistakes_gu;
    return recipe.common_mistakes_en;
  };

  const getStorageGuidance = () => {
    if (!recipe) return null;
    if (pageLanguage === 'hi' && recipe.storage_hi) return recipe.storage_hi;
    if (pageLanguage === 'gu' && recipe.storage_gu) return recipe.storage_gu;
    return recipe.storage_en;
  };

  const getServingSuggestions = () => {
    if (!recipe) return null;
    if (pageLanguage === 'hi' && recipe.serving_suggestions_hi) return recipe.serving_suggestions_hi;
    if (pageLanguage === 'gu' && recipe.serving_suggestions_gu) return recipe.serving_suggestions_gu;
    return recipe.serving_suggestions_en || recipe.serving_suggestions;
  };

  // Dynamic quantity formatter
  const formatQuantity = (ing: Ingredient) => {
    if (ing.numeric_quantity && recipe?.servings) {
      const scaled = (ing.numeric_quantity / recipe.servings) * servings;
      if (scaled <= 0) return '';
      if (Math.abs(scaled - 0.25) < 0.05) return '¼';
      if (Math.abs(scaled - 0.5) < 0.05) return '½';
      if (Math.abs(scaled - 0.75) < 0.05) return '¾';
      if (Math.abs(scaled - 0.33) < 0.05) return '⅓';
      if (Math.abs(scaled - 0.67) < 0.05) return '⅔';
      if (Number.isInteger(scaled)) return scaled.toString();
      return scaled.toFixed(1).replace(/\.0$/, '');
    }
    return ing.quantity || '';
  };

  const getHeatBadge = (heatLevel?: string) => {
    if (!heatLevel) return null;
    const level = heatLevel.toLowerCase();
    if (level.includes('high') && !level.includes('medium')) {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-50 text-rose-700 border border-rose-200">
          <Flame className="w-3 h-3 text-rose-600 fill-rose-600" /> High Heat
        </span>
      );
    }
    if (level.includes('medium-high')) {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
          <Flame className="w-3 h-3 text-amber-600 fill-amber-600" /> Med-High
        </span>
      );
    }
    if (level.includes('medium')) {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-orange-50 text-orange-700 border border-orange-200">
          <Flame className="w-3 h-3 text-orange-500 fill-orange-500" /> Medium Heat
        </span>
      );
    }
    if (level.includes('low')) {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-sky-50 text-sky-700 border border-sky-200">
          <Flame className="w-3 h-3 text-sky-500" /> Low Flame
        </span>
      );
    }
    if (level.includes('simmer')) {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-purple-50 text-purple-700 border border-purple-200">
          <Flame className="w-3 h-3 text-purple-500" /> Simmer (दम)
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-stone-100 text-stone-600 border border-stone-200">
        Off Flame / Mix
      </span>
    );
  };

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-4">
        <div className="w-12 h-12 border-4 border-saffron-500 border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-xs font-semibold text-stone-500">Loading authentic recipe from RasoiVerse kitchen...</p>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="max-w-lg mx-auto px-4 py-16 text-center space-y-4">
        <h2 className="text-2xl font-serif font-bold text-stone-900">Recipe Not Found</h2>
        <p className="text-xs text-stone-500">The recipe you are looking for does not exist or has been moved.</p>
        <button
          onClick={() => navigate('/explore')}
          className="px-6 py-2.5 rounded-2xl bg-saffron-600 text-white text-xs font-bold"
        >
          Explore All Recipes
        </button>
      </div>
    );
  }

  const isFarali = recipe.dietary_tags?.some(tag => tag.toLowerCase().includes('farali') || tag.toLowerCase().includes('fasting'));

  return (
    <div className="max-w-7xl 2xl:max-w-[1600px] mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6 sm:space-y-8 pb-28">
      
      {/* Top Bar: Navigation & In-Page Language Switcher */}
      <div className="flex flex-wrap items-center justify-between gap-3 sm:gap-4">
        <button
          onClick={() => navigate('/explore')}
          className="inline-flex items-center gap-2 text-xs font-bold text-stone-600 hover:text-stone-900 transition-colors p-2 rounded-xl hover:bg-stone-100 touch-target"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Recipes</span>
        </button>

        {/* Trilingual In-Page Switcher */}
        <div className="inline-flex items-center p-1 bg-stone-100 rounded-2xl border border-stone-200/90 shadow-2xs">
          <span className="text-[11px] font-bold text-stone-500 px-2 flex items-center gap-1">
            <Languages className="w-3.5 h-3.5 text-saffron-600" />
            <span className="hidden sm:inline">Language:</span>
          </span>
          <button
            onClick={() => setPageLanguage('en')}
            className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all touch-target flex items-center justify-center ${
              pageLanguage === 'en'
                ? 'bg-white text-stone-900 shadow-2xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            English
          </button>
          <button
            onClick={() => setPageLanguage('hi')}
            className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all touch-target flex items-center justify-center ${
              pageLanguage === 'hi'
                ? 'bg-saffron-600 text-white shadow-2xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            हिन्दी
          </button>
          <button
            onClick={() => setPageLanguage('gu')}
            className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all touch-target flex items-center justify-center ${
              pageLanguage === 'gu'
                ? 'bg-cardamom-600 text-white shadow-2xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            ગુજરાતી
          </button>
        </div>
      </div>

      {/* Hero Container with Authentic Photography */}
      <div className="relative rounded-3xl overflow-hidden shadow-soft-hover border border-stone-200/90 aspect-[4/3] sm:aspect-[16/9] lg:aspect-[21/9] bg-stone-900">
        <img 
          src={recipe.image} 
          alt={getRecipeName()}
          className="w-full h-full object-cover opacity-85"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />

        <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6 text-white space-y-1.5 sm:space-y-2">
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            <span className="px-3 py-1 rounded-full bg-saffron-600 text-white text-xs font-bold shadow-2xs">
              {recipe.cuisine}
            </span>
            {recipe.region && (
              <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-medium">
                {recipe.region}
              </span>
            )}
            {isFarali && (
              <span className="px-3 py-1 rounded-full bg-amber-500 text-white text-xs font-bold shadow-2xs flex items-center gap-1">
                <span>🕉️</span> {t('fastingFriendlyBadge')}
              </span>
            )}
            <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-black/40 backdrop-blur-md text-amber-400 text-xs font-bold">
              <Star className="w-3.5 h-3.5 fill-current" />
              <span>{recipe.rating.toFixed(1)}</span>
            </div>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-serif font-bold tracking-tight text-white drop-shadow-sm leading-tight">
            {getRecipeName()}
          </h1>

          <p className="text-xs sm:text-sm text-stone-200 max-w-2xl line-clamp-2 leading-relaxed">
            {getRecipeDesc()}
          </p>
        </div>
      </div>

      {/* Action Bar (Cooking CTA, Favorites, Share) */}
      <div className="bg-white rounded-3xl p-5 border border-stone-200/90 shadow-soft flex flex-wrap items-center justify-between gap-4">
        
        {/* Key Metrics */}
        <div className="flex flex-wrap items-center gap-6 text-xs text-stone-600">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-saffron-600" />
            <div>
              <p className="text-[10px] uppercase font-bold text-stone-400">Total Time</p>
              <p className="font-bold text-stone-800">{recipe.prep_time + recipe.cook_time} {t('mins')}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <ChefHat className="w-4 h-4 text-amber-600" />
            <div>
              <p className="text-[10px] uppercase font-bold text-stone-400">Difficulty</p>
              <p className="font-bold text-stone-800">{recipe.difficulty}</p>
            </div>
          </div>

          {/* Servings Scaler Widget */}
          <div className="flex items-center gap-2.5">
            <Utensils className="w-4 h-4 text-cardamom-600" />
            <div>
              <p className="text-[10px] uppercase font-bold text-stone-400">Servings Scaler</p>
              <div className="flex items-center gap-2 mt-1">
                <button
                  onClick={() => setServings(prev => Math.max(1, prev - 1))}
                  className="w-8 h-8 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold flex items-center justify-center transition-colors touch-target active:scale-95 shadow-2xs"
                  title="Decrease servings"
                  aria-label="Decrease servings"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="font-bold text-stone-900 px-1.5 text-xs sm:text-sm">
                  {servings} {servings === 1 ? 'person' : 'people'}
                </span>
                <button
                  onClick={() => setServings(prev => Math.min(24, prev + 1))}
                  className="w-8 h-8 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold flex items-center justify-center transition-colors touch-target active:scale-95 shadow-2xs"
                  title="Increase servings"
                  aria-label="Increase servings"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {recipe.calories && (
            <div className="hidden sm:block">
              <p className="text-[10px] uppercase font-bold text-stone-400">Energy</p>
              <p className="font-bold text-stone-800">{Math.round((recipe.calories / (recipe.servings || 4)) * servings)} kcal</p>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            onClick={() => navigate(`/cook/${recipe.slug}`)}
            className="flex-1 sm:flex-initial px-6 py-3.5 rounded-2xl bg-gradient-to-r from-saffron-600 to-amber-600 hover:from-saffron-700 hover:to-amber-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-saffron-500/20 transition-all hover:scale-105 active:scale-95 min-h-[48px] touch-target"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>{t('startCookingBtn')}</span>
          </button>

          <button
            onClick={handleFavorite}
            className={`p-3.5 rounded-2xl border min-w-[48px] min-h-[48px] flex items-center justify-center transition-all touch-target ${
              isFavorited
                ? 'bg-rose-50 border-rose-300 text-rose-600 shadow-2xs'
                : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100'
            }`}
            title={isFavorited ? t('removeFromFavoritesBtn') : t('saveToFavoritesBtn')}
            aria-label={isFavorited ? "Remove from favorites" : "Save to favorites"}
          >
            <Heart className={`w-4 h-4 ${isFavorited ? 'fill-current' : ''}`} />
          </button>

          <button
            onClick={handleShare}
            className="p-3.5 rounded-2xl border border-stone-200 bg-stone-50 hover:bg-stone-100 text-stone-700 transition-colors min-w-[48px] min-h-[48px] flex items-center justify-center touch-target"
            title={t('shareRecipeBtn')}
            aria-label="Share recipe"
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Quick Notifications */}
      {copiedToast && (
        <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold text-center animate-in fade-in">
          {t('recipeCopied')}
        </div>
      )}

      {shoppingListToast && (
        <div className="p-3 rounded-2xl bg-cardamom-50 border border-cardamom-200 text-cardamom-800 text-xs font-semibold text-center animate-in fade-in flex items-center justify-center gap-2">
          <Check className="w-4 h-4 text-cardamom-600" />
          <span>Shopping list copied to clipboard! Ready for your grocery trip.</span>
        </div>
      )}

      {/* Fasting Notice */}
      {isFarali && (
        <div className="p-4 rounded-3xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-bold">Satvik & Fasting Guidelines</p>
            <p className="text-amber-800 mt-0.5 leading-relaxed">
              {recipe.fasting_info || t('fastingNotice')}
            </p>
          </div>
        </div>
      )}

      {/* Main Grid: Ingredients Checklist & Steps */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Interactive Ingredients Checklist */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-stone-200/90 shadow-soft sticky top-28 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <div>
                <h3 className="font-serif text-lg font-bold text-stone-900">
                  {pageLanguage === 'hi' ? 'सामग्री' : pageLanguage === 'gu' ? 'જરૂરી સામગ્રી' : t('ingredientsTitle')}
                </h3>
                <p className="text-[11px] text-stone-400 mt-0.5">
                  {pageLanguage === 'hi' 
                    ? `${servings} लोगों के लिए • ${recipe.ingredients?.length || 0} सामग्री`
                    : pageLanguage === 'gu'
                    ? `${servings} વ્યક્તિ માટે • ${recipe.ingredients?.length || 0} સામગ્રી`
                    : `Scaled for ${servings} ${servings === 1 ? 'serving' : 'servings'} • ${recipe.ingredients?.length || 0} items`}
                </p>
              </div>

              {/* Shopping List & Select All Actions */}
              <div className="flex items-center gap-1.5">
                <button
                  onClick={handleSelectAllIngredients}
                  className="px-3 py-1.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-[11px] font-bold transition-colors touch-target flex items-center justify-center"
                  title="Toggle all checkboxes"
                  aria-label="Toggle all checkboxes"
                >
                  Check All
                </button>
                <button
                  onClick={handleCopyShoppingList}
                  className="p-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-700 transition-colors touch-target flex items-center justify-center"
                  title="Copy ingredients to shopping list"
                  aria-label="Copy ingredients to shopping list"
                >
                  <Copy className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <ul className="space-y-1.5 max-h-[500px] overflow-y-auto pr-1">
              {recipe.ingredients?.map((ing, idx) => {
                const isChecked = checkedIngredients[idx];
                const qtyStr = formatQuantity(ing);
                const ingName = getIngName(ing);

                return (
                  <li 
                    key={idx}
                    onClick={() => handleToggleIngredient(idx)}
                    className={`flex items-center gap-3 p-2.5 sm:p-3 rounded-2xl cursor-pointer transition-all min-h-[44px] touch-target ${
                      isChecked ? 'bg-stone-50 text-stone-400 line-through' : 'hover:bg-amber-50/50 text-stone-800'
                    }`}
                  >
                    <div className={`w-6 h-6 rounded-lg border flex items-center justify-center flex-shrink-0 transition-colors ${
                      isChecked ? 'bg-cardamom-600 border-cardamom-600 text-white' : 'border-stone-300 bg-white'
                    }`}>
                      {isChecked && <Check className="w-3.5 h-3.5" />}
                    </div>
                    <div className="text-xs sm:text-sm">
                      <span className="font-semibold">{ingName}</span>
                      {(qtyStr || ing.unit) && (
                        <span className="text-stone-500 font-normal ml-1">
                          — {qtyStr} {formatUnit(ing.unit)}
                        </span>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>

            <button
              onClick={handleCopyShoppingList}
              className="w-full py-3 rounded-2xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-bold flex items-center justify-center gap-2 transition-colors min-h-[44px] touch-target"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>Copy Full Grocery List</span>
            </button>
          </div>
        </div>

        {/* Right Column: Step-by-Step Cooking Steps & Chef Insights */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Chef's Preparation Guidance if available */}
          {getPrepInstructions() && (
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-3xl p-6 border border-amber-200/90 shadow-soft space-y-2">
              <div className="flex items-center gap-2 text-amber-900 font-bold text-xs uppercase tracking-wider">
                <ChefHat className="w-4 h-4 text-amber-600" />
                <span>
                  {pageLanguage === 'hi' ? 'शेफ की तैयारी मार्गदर्शिका' : pageLanguage === 'gu' ? 'શેફની તૈયારી માર્ગદર્શિકા' : "Chef's Preparation Guide"}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-stone-800 leading-relaxed font-medium">
                {getPrepInstructions()}
              </p>
            </div>
          )}

          {/* Cooking Steps Header */}
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-2xl font-bold text-stone-900">
              {pageLanguage === 'hi' ? 'पकाने के चरण' : pageLanguage === 'gu' ? 'રાંધવાની રીત (સ્ટેપ્સ)' : t('cookingStepsTitle')}
            </h3>
            <span className="text-xs font-semibold text-stone-400">
              {recipe.steps?.length || 0} logical steps
            </span>
          </div>

          {/* Steps List */}
          <div className="space-y-4">
            {recipe.steps?.map((step) => (
              <div 
                key={step.step_number}
                className="bg-white rounded-3xl p-6 border border-stone-200/90 shadow-soft space-y-3 transition-all hover:border-amber-300"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-xl bg-saffron-50 text-saffron-700 font-bold text-xs flex items-center justify-center border border-saffron-200">
                      {step.step_number}
                    </span>
                    <h4 className="font-serif text-base font-bold text-stone-900">
                      {getStepTitle(step)}
                    </h4>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Heat Level Badge */}
                    {getHeatBadge(step.heat_level)}

                    {/* Step Timer if present */}
                    {step.timer_seconds && step.timer_seconds > 0 ? (
                      <button
                        onClick={() => startTimer(`step-${step.step_number}`, getStepTitle(step), step.timer_seconds || 300)}
                        className="px-3.5 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 text-xs font-bold flex items-center gap-1.5 transition-colors touch-target min-h-[40px]"
                      >
                        <Timer className="w-3.5 h-3.5 text-amber-600" />
                        <span>{Math.round(step.timer_seconds / 60)} {t('mins')} Timer</span>
                      </button>
                    ) : null}
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-stone-700 leading-relaxed pl-0 sm:pl-11">
                  {getStepInstruction(step)}
                </p>

                {getStepTip(step) && (
                  <div className="ml-0 sm:ml-11 p-3 rounded-2xl bg-amber-50/70 border border-amber-200/80 text-xs text-stone-700 flex items-start gap-2">
                    <Info className="w-4 h-4 text-saffron-600 flex-shrink-0 mt-0.5" />
                    <span><strong className="text-stone-900">Chef Pro Tip:</strong> {getStepTip(step)}</span>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Common Mistakes Card */}
          {getCommonMistakes() && (
            <div className="bg-rose-50/70 rounded-3xl p-6 border border-rose-200/90 shadow-soft space-y-2">
              <div className="flex items-center gap-2 text-rose-900 font-bold text-xs uppercase tracking-wider">
                <AlertTriangle className="w-4 h-4 text-rose-600" />
                <span>
                  {pageLanguage === 'hi' ? 'सामान्य गलतियाँ और बचाव' : pageLanguage === 'gu' ? 'સામાન્ય ભૂલો અને બચવાના ઉપાય' : 'Common Mistakes to Avoid'}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-rose-900/90 leading-relaxed font-medium">
                {getCommonMistakes()}
              </p>
            </div>
          )}

          {/* Storage & Reheating Guidance */}
          {getStorageGuidance() && (
            <div className="bg-stone-50 rounded-3xl p-6 border border-stone-200/90 shadow-soft space-y-2">
              <div className="flex items-center gap-2 text-stone-700 font-bold text-xs uppercase tracking-wider">
                <Archive className="w-4 h-4 text-stone-500" />
                <span>
                  {pageLanguage === 'hi' ? 'भंडारण और पुनर्गर्म' : pageLanguage === 'gu' ? 'સંગ્રહ અને ફરીથી ગરમ કરવાની રીત' : 'Storage & Reheating'}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                {getStorageGuidance()}
              </p>
            </div>
          )}

          {/* Serving Suggestions */}
          {getServingSuggestions() && (
            <div className="bg-cardamom-50/60 rounded-3xl p-6 border border-cardamom-200/90 shadow-soft space-y-2">
              <div className="flex items-center gap-2 text-cardamom-900 font-bold text-xs uppercase tracking-wider">
                <Layers className="w-4 h-4 text-cardamom-600" />
                <span>
                  {pageLanguage === 'hi' ? 'परोसने के सुझाव' : pageLanguage === 'gu' ? 'પીરસવાની રીત' : 'Serving Suggestions'}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-cardamom-950 leading-relaxed font-medium">
                {getServingSuggestions()}
              </p>
            </div>
          )}

          {/* Nutrition Card */}
          <div className="bg-white rounded-3xl p-6 border border-stone-200/90 shadow-soft">
            <h4 className="font-serif text-lg font-bold text-stone-900 mb-4">
              {t('nutritionTitle')} (per serving)
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 text-center">
              <div className="p-3 rounded-2xl bg-stone-50 border border-stone-100">
                <p className="text-xs text-stone-500">Calories</p>
                <p className="font-mono text-base font-bold text-stone-900 mt-1">{recipe.calories || 280}</p>
                <p className="text-[10px] text-stone-400">kcal</p>
              </div>
              <div className="p-3 rounded-2xl bg-stone-50 border border-stone-100">
                <p className="text-xs text-stone-500">Protein</p>
                <p className="font-mono text-base font-bold text-stone-900 mt-1">{recipe.protein || 8}g</p>
                <p className="text-[10px] text-stone-400">grams</p>
              </div>
              <div className="p-3 rounded-2xl bg-stone-50 border border-stone-100">
                <p className="text-xs text-stone-500">Carbs</p>
                <p className="font-mono text-base font-bold text-stone-900 mt-1">{recipe.carbs || 36}g</p>
                <p className="text-[10px] text-stone-400">grams</p>
              </div>
              <div className="p-3 rounded-2xl bg-stone-50 border border-stone-100">
                <p className="text-xs text-stone-500">Fat</p>
                <p className="font-mono text-base font-bold text-stone-900 mt-1">{recipe.fat || 10}g</p>
                <p className="text-[10px] text-stone-400">grams</p>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* "You May Also Like" Recommendations */}
      {recommendations.length > 0 && (
        <section className="pt-10 border-t border-stone-200 space-y-6">
          <h3 className="font-serif text-2xl font-bold text-stone-900">
            {t('youMayAlsoLike')}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 sm:gap-6">
            {recommendations.map((rec) => (
              <RecipeCard
                key={rec.id}
                recipe={rec}
                onClick={() => navigate(`/recipe/${rec.slug}`)}
                openAuthModal={openAuthModal}
              />
            ))}
          </div>
        </section>
      )}

    </div>
  );
};
