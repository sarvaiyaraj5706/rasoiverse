import React, { useState } from 'react';
import { 
  Sparkles, 
  Clock, 
  ChefHat, 
  Utensils, 
  Check, 
  Play, 
  Heart, 
  RotateCcw, 
  Share2, 
  ShieldAlert, 
  Info,
  Timer
} from 'lucide-react';
import { Recipe, AIRecipeParams } from '../types';
import { generateAIRecipe, toggleFavorite } from '../services/api';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';

interface AIRecipeGeneratorPageProps {
  navigate: (path: string) => void;
  openAuthModal: () => void;
}

export const AIRecipeGeneratorPage: React.FC<AIRecipeGeneratorPageProps> = ({ 
  navigate, 
  openAuthModal 
}) => {
  const { t } = useLanguage();
  const { user } = useAuth();

  const [ingredients, setIngredients] = useState('Potato, onion, tomato, paneer');
  const [cuisine, setCuisine] = useState('Punjabi');
  const [mealType, setMealType] = useState('Dinner');
  const [dietaryPreference, setDietaryPreference] = useState('Vegetarian');
  const [cookingTime, setCookingTime] = useState('Under 30 minutes');
  const [difficulty, setDifficulty] = useState('Medium');

  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedRecipe, setGeneratedRecipe] = useState<Recipe | null>(null);
  const [isFavorited, setIsFavorited] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const cuisines = [
    "Gujarati", "Punjabi", "Rajasthani", "South Indian", "Bengali",
    "Maharashtrian", "Mughlai", "Indian", "Indo-Chinese", "Other"
  ];

  const mealTypes = ["Breakfast", "Lunch", "Dinner", "Snack", "Dessert", "Beverage"];
  const dietaryOptions = ["Vegetarian", "Vegan", "Jain", "Fasting / Farali", "No preference"];
  const timeOptions = ["Under 15 minutes", "Under 30 minutes", "Under 60 minutes", "No limit"];
  const difficultyOptions = ["Easy", "Medium", "Hard"];

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);
    setErrorMsg('');
    try {
      const recipe = await generateAIRecipe({
        ingredients,
        cuisine,
        mealType,
        dietaryPreference,
        cookingTime,
        difficulty
      });
      setGeneratedRecipe(recipe);
      setIsFavorited(false);
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to generate recipe with AI. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSaveRecipe = async () => {
    if (!user) {
      openAuthModal();
      return;
    }
    // Toggle state visually for AI recipes
    setIsFavorited(!isFavorited);
  };

  return (
    <div className="max-w-4xl 2xl:max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-8 sm:space-y-10 pb-28">
      
      {/* Page Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-saffron-50 border border-saffron-200 text-saffron-700 text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-4 h-4 text-saffron-600" />
          <span>Rasoi AI Kitchen Studio</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-stone-900 tracking-tight">
          {t('aiGenTitle')}
        </h1>
        <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
          {t('aiGenSubtitle')}
        </p>
      </div>

      {/* Generator Form Card */}
      {!generatedRecipe ? (
        <form 
          onSubmit={handleGenerate} 
          className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-soft space-y-6"
        >
          {errorMsg && (
            <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium">
              {errorMsg}
            </div>
          )}

          {/* Available Ingredients Input */}
          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1.5">
              {t('inputIngredients')}
            </label>
            <input
              type="text"
              required
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
              placeholder={t('inputIngredientsPlaceholder')}
              className="w-full px-4 py-3.5 rounded-2xl border border-stone-200 text-xs sm:text-sm focus:outline-none focus:border-saffron-500 shadow-2xs font-medium text-stone-800"
            />
            <p className="text-[11px] text-stone-400 mt-1">
              Example: “Potato, onion, tomato, paneer” or whatever you have in the fridge.
            </p>
          </div>

          {/* Dropdown Options Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Cuisine */}
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1.5">
                {t('selectCuisine')}
              </label>
              <select
                value={cuisine}
                onChange={(e) => setCuisine(e.target.value)}
                className="w-full px-3.5 py-3 rounded-2xl border border-stone-200 bg-stone-50 text-xs font-semibold text-stone-800 focus:outline-none focus:border-saffron-500"
              >
                {cuisines.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            {/* Meal Type */}
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1.5">
                {t('selectMealType')}
              </label>
              <select
                value={mealType}
                onChange={(e) => setMealType(e.target.value)}
                className="w-full px-3.5 py-3 rounded-2xl border border-stone-200 bg-stone-50 text-xs font-semibold text-stone-800 focus:outline-none focus:border-saffron-500"
              >
                {mealTypes.map(m => <option key={m} value={m}>{m}</option>)}
              </select>
            </div>

            {/* Dietary Preference */}
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1.5">
                {t('selectDiet')}
              </label>
              <select
                value={dietaryPreference}
                onChange={(e) => setDietaryPreference(e.target.value)}
                className="w-full px-3.5 py-3 rounded-2xl border border-stone-200 bg-stone-50 text-xs font-semibold text-stone-800 focus:outline-none focus:border-saffron-500"
              >
                {dietaryOptions.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>

            {/* Cooking Time */}
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1.5">
                {t('selectTime')}
              </label>
              <select
                value={cookingTime}
                onChange={(e) => setCookingTime(e.target.value)}
                className="w-full px-3.5 py-3 rounded-2xl border border-stone-200 bg-stone-50 text-xs font-semibold text-stone-800 focus:outline-none focus:border-saffron-500"
              >
                {timeOptions.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>

          </div>

          {/* Difficulty Selection */}
          <div>
            <label className="block text-xs font-bold text-stone-700 mb-2">
              {t('selectDifficulty')}
            </label>
            <div className="grid grid-cols-3 gap-3">
              {difficultyOptions.map((diff) => (
                <button
                  key={diff}
                  type="button"
                  onClick={() => setDifficulty(diff)}
                  className={`py-3 rounded-2xl text-xs font-bold border transition-all ${
                    difficulty === diff
                      ? 'bg-stone-900 text-white border-stone-900 shadow-sm'
                      : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                  }`}
                >
                  {diff}
                </button>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isGenerating}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-saffron-600 via-amber-600 to-amber-500 hover:from-saffron-700 hover:to-amber-600 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-saffron-500/20 transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50"
            >
              {isGenerating ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>{t('generatingMessage')}</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>{t('generateRecipeBtn')}</span>
                </>
              )}
            </button>
          </div>

        </form>
      ) : (
        /* Generated Recipe Result Card */
        <div className="space-y-8 animate-in fade-in">
          
          {/* Top Result Banner */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-saffron-100 text-saffron-800 text-xs font-bold flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{t('aiSuggestedRecipe')}</span>
              </span>
            </div>

            <button
              onClick={() => setGeneratedRecipe(null)}
              className="px-4 py-2 rounded-2xl border border-stone-200 text-xs font-bold text-stone-700 hover:bg-stone-100 flex items-center gap-1.5 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{t('generateAnother')}</span>
            </button>
          </div>

          {/* Main Recipe Preview Container */}
          <div className="bg-white rounded-3xl overflow-hidden border border-stone-200/90 shadow-soft space-y-6 p-6 sm:p-8">
            
            {/* Header with Food Image */}
            <div className="relative rounded-2xl overflow-hidden aspect-[16/9] sm:aspect-[21/9] bg-stone-900">
              <img 
                src={generatedRecipe.image} 
                alt={generatedRecipe.name}
                className="w-full h-full object-cover opacity-85"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <div className="flex flex-wrap gap-2 mb-2">
                  <span className="px-2.5 py-0.5 rounded-lg bg-saffron-600 text-white text-xs font-bold">
                    {generatedRecipe.cuisine}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-lg bg-white/20 backdrop-blur-md text-xs">
                    {generatedRecipe.difficulty}
                  </span>
                  {generatedRecipe.dietary_tags?.map(tag => (
                    <span key={tag} className="px-2.5 py-0.5 rounded-lg bg-black/40 backdrop-blur-md text-xs">
                      {tag}
                    </span>
                  ))}
                </div>

                <h2 className="text-2xl sm:text-4xl font-serif font-bold tracking-tight">
                  {generatedRecipe.name}
                </h2>
                <p className="text-xs sm:text-sm text-stone-200 mt-1 line-clamp-2">
                  {generatedRecipe.description}
                </p>
              </div>
            </div>

            {/* Quick Meta Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-2xl bg-stone-50 border border-stone-100 text-center">
              <div>
                <p className="text-[10px] uppercase font-bold text-stone-400">Prep Time</p>
                <p className="font-bold text-stone-800 text-sm mt-0.5">{generatedRecipe.prep_time} mins</p>
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold text-stone-400">Cook Time</p>
                <p className="font-bold text-stone-800 text-sm mt-0.5">{generatedRecipe.cook_time} mins</p>
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold text-stone-400">Servings</p>
                <p className="font-bold text-stone-800 text-sm mt-0.5">{generatedRecipe.servings} people</p>
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold text-stone-400">Energy</p>
                <p className="font-bold text-stone-800 text-sm mt-0.5">{generatedRecipe.calories || 280} kcal</p>
              </div>
            </div>

            {/* AI Safety / Allergy Disclaimer Notice */}
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200/80 text-xs text-amber-900 flex items-start gap-2.5">
              <ShieldAlert className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
              <p className="leading-relaxed">
                <strong>AI Transparency Notice:</strong> {t('aiDisclaimer')}
              </p>
            </div>

            {/* Ingredients Checklist */}
            <div className="space-y-3">
              <h3 className="font-serif text-lg font-bold text-stone-900 flex items-center gap-2">
                <span>{t('ingredientsTitle')}</span>
                <span className="text-xs font-normal text-stone-400">({generatedRecipe.ingredients?.length} items)</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {generatedRecipe.ingredients?.map((ing, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-stone-50 border border-stone-100 flex items-center justify-between text-xs">
                    <span className="font-semibold text-stone-800">{ing.name}</span>
                    <span className="text-stone-500">{ing.quantity} {ing.unit}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Cooking Steps */}
            <div className="space-y-4">
              <h3 className="font-serif text-lg font-bold text-stone-900">
                {t('cookingStepsTitle')}
              </h3>
              <div className="space-y-3">
                {generatedRecipe.steps?.map((step) => (
                  <div key={step.step_number} className="p-4 rounded-2xl bg-stone-50/70 border border-stone-200/80 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <span className="w-6 h-6 rounded-lg bg-saffron-50 text-saffron-700 font-bold text-xs flex items-center justify-center border border-saffron-200">
                          {step.step_number}
                        </span>
                        <h4 className="font-serif text-sm font-bold text-stone-900">
                          {step.title}
                        </h4>
                      </div>
                      {step.timer_seconds ? (
                        <span className="text-[11px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-lg border border-amber-200 flex items-center gap-1">
                          <Timer className="w-3 h-3" /> {Math.round(step.timer_seconds / 60)} mins
                        </span>
                      ) : null}
                    </div>
                    <p className="text-xs text-stone-700 leading-relaxed pl-8">
                      {step.instruction}
                    </p>
                    {step.tip && (
                      <p className="text-[11px] text-stone-500 pl-8 italic">
                        Tip: {step.tip}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Chef Tips */}
            {generatedRecipe.tips && (
              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 text-xs text-stone-700">
                <p className="font-bold text-amber-900 mb-1">Chef Tip:</p>
                <p>{generatedRecipe.tips}</p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="pt-4 border-t border-stone-100 flex flex-wrap gap-3">
              <button
                onClick={handleSaveRecipe}
                className={`px-5 py-3 rounded-2xl text-xs font-bold flex items-center gap-2 transition-all ${
                  isFavorited ? 'bg-rose-50 text-rose-600 border border-rose-200' : 'bg-stone-100 hover:bg-stone-200 text-stone-800'
                }`}
              >
                <Heart className={`w-4 h-4 ${isFavorited ? 'fill-current' : ''}`} />
                <span>{isFavorited ? 'Saved' : t('saveToFavoritesBtn')}</span>
              </button>

              <button
                onClick={() => {
                  navigator.clipboard.writeText(JSON.stringify(generatedRecipe, null, 2));
                  alert('Recipe copied to clipboard!');
                }}
                className="px-5 py-3 rounded-2xl border border-stone-200 bg-white hover:bg-stone-50 text-stone-700 text-xs font-bold flex items-center gap-2"
              >
                <Share2 className="w-4 h-4" />
                <span>{t('shareRecipeBtn')}</span>
              </button>

              <button
                onClick={() => setGeneratedRecipe(null)}
                className="px-6 py-3 rounded-2xl bg-saffron-600 hover:bg-saffron-700 text-white text-xs font-bold flex items-center gap-2 shadow-md transition-all ml-auto"
              >
                <Sparkles className="w-4 h-4" />
                <span>{t('generateAnother')}</span>
              </button>
            </div>

          </div>

        </div>
      )}

    </div>
  );
};
