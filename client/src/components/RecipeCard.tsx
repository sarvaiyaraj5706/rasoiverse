import React, { useState } from 'react';
import { Heart, Clock, ChefHat, Star, Sparkles, CheckCircle2 } from 'lucide-react';
import { Recipe } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { toggleFavorite } from '../services/api';

interface RecipeCardProps {
  recipe: Recipe;
  onClick: () => void;
  openAuthModal?: () => void;
  showMissingIngredients?: boolean;
}

export const RecipeCard: React.FC<RecipeCardProps> = ({ 
  recipe, 
  onClick, 
  openAuthModal,
  showMissingIngredients = false
}) => {
  const { t, language } = useLanguage();
  const { user } = useAuth();
  const [isFav, setIsFav] = useState(recipe.isFavorited || false);
  const [isLiking, setIsLiking] = useState(false);

  const displayName = language === 'hi' && recipe.name_hi ? recipe.name_hi : language === 'gu' && recipe.name_gu ? recipe.name_gu : recipe.name;
  const displayDesc = language === 'hi' && recipe.description_hi ? recipe.description_hi : language === 'gu' && recipe.description_gu ? recipe.description_gu : recipe.description;

  const handleFavoriteClick = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!user) {
      openAuthModal?.();
      return;
    }

    try {
      setIsLiking(true);
      const nextState = !isFav;
      setIsFav(nextState);
      await toggleFavorite(recipe.id, isFav);
    } catch (err) {
      // Revert on error
      setIsFav(!isFav);
    } finally {
      setIsLiking(false);
    }
  };

  const isFarali = recipe.dietary_tags?.some(tag => tag.toLowerCase().includes('farali') || tag.toLowerCase().includes('fasting'));
  const isJain = recipe.dietary_tags?.some(tag => tag.toLowerCase().includes('jain'));

  return (
    <div 
      onClick={onClick}
      className="group bg-white rounded-3xl overflow-hidden border border-stone-200/80 shadow-soft hover:shadow-soft-hover transition-all duration-300 hover:-translate-y-1 cursor-pointer flex flex-col h-full"
    >
      {/* Food Photography Container */}
      <div className="relative aspect-[4/3] overflow-hidden bg-stone-100">
        <img 
          src={recipe.image} 
          alt={displayName}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
          <div className="flex flex-wrap gap-1.5 pointer-events-auto">
            {isFarali && (
              <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-500 text-white shadow-sm flex items-center gap-1">
                <span>🕉️</span> {t('fastingFriendlyBadge')}
              </span>
            )}
            {isJain && (
              <span className="px-2 py-1 rounded-full text-[10px] font-bold bg-emerald-600 text-white shadow-sm">
                Jain
              </span>
            )}
            {recipe.is_ai_generated && (
              <span className="px-2 py-1 rounded-full text-[10px] font-bold bg-indigo-600 text-white shadow-sm flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> AI
              </span>
            )}
          </div>

          {/* Favorite Heart Button */}
          <button
            onClick={handleFavoriteClick}
            disabled={isLiking}
            className={`pointer-events-auto w-11 h-11 rounded-full backdrop-blur-md transition-all flex items-center justify-center ${
              isFav 
                ? 'bg-rose-500 text-white shadow-md' 
                : 'bg-white/85 text-stone-700 hover:bg-white hover:text-rose-500'
            }`}
            aria-label={isFav ? "Remove from favorites" : "Save to favorites"}
          >
            <Heart className={`w-4 h-4 ${isFav ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Cuisine & Rating at Bottom of Image */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs font-medium">
          <span className="px-2.5 py-0.5 rounded-lg bg-black/40 backdrop-blur-md border border-white/20">
            {recipe.cuisine} {recipe.region ? `• ${recipe.region}` : ''}
          </span>
          <div className="flex items-center gap-1 px-2 py-0.5 rounded-lg bg-black/40 backdrop-blur-md border border-white/20 font-bold text-amber-300">
            <Star className="w-3.5 h-3.5 fill-current" />
            <span>{recipe.rating.toFixed(1)}</span>
          </div>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-serif text-lg font-bold text-stone-900 group-hover:text-saffron-600 transition-colors line-clamp-1">
            {displayName}
          </h3>
          <p className="text-xs text-stone-500 mt-1 line-clamp-2 leading-relaxed">
            {displayDesc}
          </p>

          {/* Missing Ingredients Context (when searching by pantry) */}
          {showMissingIngredients && (
            <div className="mt-3 p-2.5 rounded-2xl bg-amber-50/70 border border-amber-200/60 text-xs">
              <div className="flex items-center gap-1.5 font-bold text-amber-900">
                <CheckCircle2 className="w-3.5 h-3.5 text-cardamom-600" />
                <span>{recipe.matchSummary || `You have ${recipe.matchedCount || 0} ingredients`}</span>
              </div>
              {recipe.missingIngredients && recipe.missingIngredients.length > 0 && (
                <p className="text-[11px] text-stone-600 mt-1">
                  <span className="font-semibold text-rose-700">Missing:</span> {recipe.missingIngredients.join(', ')}
                </p>
              )}
            </div>
          )}
        </div>

        {/* Footer Meta: Time, Difficulty, Calories */}
        <div className="mt-4 pt-4 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500 font-medium">
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-saffron-500" />
            <span>{recipe.prep_time + recipe.cook_time} {t('mins')}</span>
          </div>

          <div className="flex items-center gap-1.5">
            <ChefHat className="w-3.5 h-3.5 text-stone-400" />
            <span>{recipe.difficulty}</span>
          </div>

          {recipe.calories && (
            <span className="text-[11px] font-semibold text-stone-400">
              {recipe.calories} kcal
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
