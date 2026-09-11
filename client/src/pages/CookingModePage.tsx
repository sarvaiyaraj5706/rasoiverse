import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  ArrowLeft, 
  ArrowRight, 
  Mic, 
  Volume2, 
  X, 
  Timer, 
  Sparkles, 
  CheckCircle, 
  Heart,
  RotateCcw,
  Info,
  Flame,
  Languages
} from 'lucide-react';
import { Recipe, Language } from '../types';
import { fetchRecipeDetail, toggleFavorite } from '../services/api';
import { useLanguage } from '../context/LanguageContext';
import { useVoice } from '../context/VoiceContext';
import { useAuth } from '../context/AuthContext';
import { CookingTimer } from '../components/CookingTimer';

interface CookingModePageProps {
  slugOrId: string;
  navigate: (path: string) => void;
  openAuthModal: () => void;
}

export const CookingModePage: React.FC<CookingModePageProps> = ({ 
  slugOrId, 
  navigate, 
  openAuthModal 
}) => {
  const { t, language: globalLang, setLanguage } = useLanguage();
  const { user } = useAuth();
  const { openVoiceModal, speak, registerCookingCallbacks } = useVoice();

  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [currentStepIdx, setCurrentStepIdx] = useState(0);
  const [isFavorited, setIsFavorited] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // In-session language toggle (defaults to global app language)
  const [cookLang, setCookLang] = useState<Language>(globalLang);

  const handleLanguageChange = (l: Language) => {
    setCookLang(l);
    setLanguage(l);
  };

  useEffect(() => {
    setCookLang(globalLang);
  }, [globalLang]);

  useEffect(() => {
    async function loadRecipe() {
      try {
        setIsLoading(true);
        const data = await fetchRecipeDetail(slugOrId);
        setRecipe(data.recipe);
        setIsFavorited(data.recipe.isFavorited || false);
      } catch (err) {
        console.error('Failed to load recipe in cooking mode:', err);
      } finally {
        setIsLoading(false);
      }
    }

    loadRecipe();
  }, [slugOrId]);

  // Language helper accessors
  const getRecipeName = () => {
    if (!recipe) return '';
    if (cookLang === 'hi' && recipe.name_hi) return recipe.name_hi;
    if (cookLang === 'gu' && recipe.name_gu) return recipe.name_gu;
    return recipe.name;
  };

  const getStepTitle = (step: any) => {
    if (!step) return '';
    if (cookLang === 'hi' && step.title_hi) return step.title_hi;
    if (cookLang === 'gu' && step.title_gu) return step.title_gu;
    return step.title;
  };

  const getStepInstruction = (step: any) => {
    if (!step) return '';
    if (cookLang === 'hi' && step.instruction_hi) return step.instruction_hi;
    if (cookLang === 'gu' && step.instruction_gu) return step.instruction_gu;
    return step.instruction;
  };

  const getStepTip = (step: any) => {
    if (!step) return null;
    if (cookLang === 'hi' && step.tip_hi) return step.tip_hi;
    if (cookLang === 'gu' && step.tip_gu) return step.tip_gu;
    return step.tip;
  };

  // Register voice callbacks to allow hands-free voice commands
  useEffect(() => {
    if (!recipe || !recipe.steps) return;

    const unregister = registerCookingCallbacks({
      onNextStep: () => {
        setCurrentStepIdx(curr => {
          if (curr < (recipe.steps?.length || 1) - 1) {
            return curr + 1;
          } else {
            handleComplete();
            return curr;
          }
        });
      },
      onPreviousStep: () => {
        setCurrentStepIdx(curr => Math.max(0, curr - 1));
      },
      onRepeatStep: () => {
        const step = recipe.steps?.[currentStepIdx];
        if (step) {
          const ins = getStepInstruction(step);
          speak(ins, cookLang);
        }
      },
      getCurrentStepDetails: () => {
        const step = recipe.steps?.[currentStepIdx];
        return {
          recipeTitle: getRecipeName(),
          stepNumber: (currentStepIdx + 1),
          instruction: step ? getStepInstruction(step) : ''
        };
      }
    });

    return () => unregister();
  }, [recipe, currentStepIdx, cookLang]);

  const handleNext = () => {
    if (!recipe?.steps) return;
    if (currentStepIdx < recipe.steps.length - 1) {
      setCurrentStepIdx(idx => idx + 1);
    } else {
      handleComplete();
    }
  };

  const handlePrevious = () => {
    setCurrentStepIdx(idx => Math.max(0, idx - 1));
  };

  const handleReadAloud = () => {
    const step = recipe?.steps?.[currentStepIdx];
    if (step) {
      const stepNumText = cookLang === 'hi' ? `चरण ${step.step_number}` : cookLang === 'gu' ? `પગલું ${step.step_number}` : `${t('step')} ${step.step_number}`;
      const title = getStepTitle(step);
      const instruction = getStepInstruction(step);
      speak(`${stepNumText}. ${title}. ${instruction}`, cookLang);
    }
  };

  const handleRepeatStep = () => {
    handleReadAloud();
  };

  const handleComplete = () => {
    setIsCompleted(true);
    try {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 }
      });
    } catch (e) {}
  };

  const handleToggleFav = async () => {
    if (!user) {
      openAuthModal();
      return;
    }
    if (!recipe) return;

    try {
      const next = !isFavorited;
      setIsFavorited(next);
      await toggleFavorite(recipe.id, isFavorited);
    } catch (e) {
      setIsFavorited(!isFavorited);
    }
  };

  const getHeatBadge = (heatLevel?: string) => {
    if (!heatLevel) return null;
    const level = heatLevel.toLowerCase();
    if (level.includes('high') && !level.includes('medium')) {
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-950/80 text-rose-400 border border-rose-800/80 shadow-md">
          <Flame className="w-4 h-4 text-rose-500 fill-rose-500 animate-pulse" />
          <span>High Heat (तेज आंच / તેજ તાપ)</span>
        </span>
      );
    }
    if (level.includes('medium-high')) {
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-950/80 text-amber-400 border border-amber-800/80 shadow-md">
          <Flame className="w-4 h-4 text-amber-500 fill-amber-500" />
          <span>Medium-High (मध्यम-तेज / મધ્યમ-તેજ)</span>
        </span>
      );
    }
    if (level.includes('medium')) {
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-orange-950/80 text-orange-400 border border-orange-800/80 shadow-md">
          <Flame className="w-4 h-4 text-orange-500 fill-orange-500" />
          <span>Medium Flame (मध्यम आंच / મધ્યમ આંચ)</span>
        </span>
      );
    }
    if (level.includes('low')) {
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-sky-950/80 text-sky-400 border border-sky-800/80 shadow-md">
          <Flame className="w-4 h-4 text-sky-400" />
          <span>Low Flame (धीमी आंच / ધીમી આંચ)</span>
        </span>
      );
    }
    if (level.includes('simmer')) {
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-purple-950/80 text-purple-300 border border-purple-800/80 shadow-md">
          <Flame className="w-4 h-4 text-purple-400" />
          <span>Simmer / Dum (दम पर / ધીમો ઉભરો)</span>
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-stone-800 text-stone-300 border border-stone-700 shadow-md">
        <span>Off Flame / Mix & Prep (तैयारी)</span>
      </span>
    );
  };

  if (isLoading || !recipe) {
    return (
      <div className="min-h-screen bg-stone-900 text-white flex items-center justify-center">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 border-4 border-saffron-500 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs font-semibold text-stone-400">Opening hands-free cooking studio...</p>
        </div>
      </div>
    );
  }

  const steps = recipe.steps || [];
  const currentStep = steps[currentStepIdx] || {
    step_number: 1,
    title: "Prepare ingredients",
    instruction: "Follow recipe steps."
  };
  const totalSteps = steps.length;

  return (
    <div className="fixed inset-0 z-50 bg-[#141210] text-white flex flex-col justify-between overflow-y-auto font-sans select-none">
      
      {/* Top Header Bar */}
      <header className="p-3 sm:p-5 border-b border-stone-800/80 bg-stone-900/80 backdrop-blur-md flex items-center justify-between gap-2 sm:gap-3">
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <button
            onClick={() => navigate(`/recipe/${recipe.slug}`)}
            className="p-2 sm:p-2.5 rounded-xl bg-stone-800 text-stone-300 hover:text-white hover:bg-stone-700 transition-colors touch-target flex items-center justify-center flex-shrink-0"
            title={t('exitCookingMode')}
            aria-label="Exit cooking mode"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="min-w-0">
            <span className="text-[10px] font-bold uppercase tracking-wider text-saffron-400 block">
              {t('cookingModeTitle')}
            </span>
            <h2 className="text-xs sm:text-base font-serif font-bold text-white truncate max-w-[130px] sm:max-w-xs md:max-w-md">
              {getRecipeName()}
            </h2>
          </div>
        </div>

        {/* Trilingual Switcher & Voice Assistant CTA */}
        <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
          {/* Quick Trilingual Toggle */}
          <div className="inline-flex p-0.5 sm:p-1 bg-stone-800/90 rounded-xl border border-stone-700 text-[11px] sm:text-xs font-bold">
            <button
              onClick={() => handleLanguageChange('en')}
              className={`px-2 sm:px-2.5 py-1 rounded-lg transition-all touch-target flex items-center justify-center ${
                cookLang === 'en' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-400 hover:text-white'
              }`}
            >
              EN
            </button>
            <button
              onClick={() => handleLanguageChange('hi')}
              className={`px-2 sm:px-2.5 py-1 rounded-lg transition-all touch-target flex items-center justify-center ${
                cookLang === 'hi' ? 'bg-saffron-600 text-white shadow-xs' : 'text-stone-400 hover:text-white'
              }`}
            >
              हिन्दी
            </button>
            <button
              onClick={() => handleLanguageChange('gu')}
              className={`px-2 sm:px-2.5 py-1 rounded-lg transition-all touch-target flex items-center justify-center ${
                cookLang === 'gu' ? 'bg-cardamom-600 text-white shadow-xs' : 'text-stone-400 hover:text-white'
              }`}
            >
              ગુજરાતી
            </button>
          </div>

          <button
            onClick={openVoiceModal}
            className="p-2 sm:px-3.5 sm:py-2 rounded-xl bg-saffron-600 hover:bg-saffron-500 text-white text-xs font-bold flex items-center gap-1.5 sm:gap-2 shadow-lg shadow-saffron-600/30 transition-all hover:scale-105 touch-target"
            title="Talk to Voice Assistant"
            aria-label="Talk to Voice Assistant"
          >
            <Mic className="w-4 h-4 animate-pulse" />
            <span className="hidden sm:inline">{t('voiceAssistant')}</span>
          </button>
        </div>
      </header>

      {/* Progress Dots / Bar */}
      <div className="w-full bg-stone-800/50 h-1.5 flex">
        {steps.map((_, idx) => (
          <div
            key={idx}
            className={`flex-1 h-full transition-all duration-300 ${
              idx <= currentStepIdx ? 'bg-saffron-500' : 'bg-transparent'
            }`}
          />
        ))}
      </div>

      {/* Center Stage: Step Display */}
      <main className="flex-1 flex flex-col items-center justify-center p-3 sm:p-8 max-w-4xl mx-auto w-full text-center overflow-y-auto">
        
        {!isCompleted ? (
          <div className="space-y-4 sm:space-y-6 w-full animate-in fade-in py-4">
            
            {/* Step Counter Badge & Heat Level Indicator */}
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
              <div className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full bg-stone-800/90 border border-stone-700 text-amber-300 font-mono text-xs font-bold tracking-widest uppercase shadow-2xs">
                <span>{cookLang === 'hi' ? 'चरण' : cookLang === 'gu' ? 'સ્ટેપ' : t('step')} {currentStepIdx + 1} / {totalSteps}</span>
              </div>
              {getHeatBadge(currentStep.heat_level)}
            </div>

            {/* Step Title */}
            <h3 className="text-xl sm:text-3xl lg:text-5xl font-serif font-bold text-white tracking-tight leading-tight">
              {getStepTitle(currentStep)}
            </h3>

            {/* Instruction Text (Large & High Contrast for Kitchen Display) */}
            <p className="text-base sm:text-xl lg:text-2xl text-stone-200 max-w-3xl mx-auto leading-relaxed font-normal bg-stone-900/40 p-4 sm:p-6 rounded-2xl sm:rounded-3xl border border-stone-800/60 shadow-inner">
              {getStepInstruction(currentStep)}
            </p>

            {/* Chef Tip if available */}
            {getStepTip(currentStep) && (
              <div className="max-w-xl mx-auto p-3 sm:p-3.5 rounded-2xl bg-amber-950/40 border border-amber-800/60 text-xs text-amber-200 flex items-center justify-center gap-2">
                <Info className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span><strong>Chef Tip:</strong> {getStepTip(currentStep)}</span>
              </div>
            )}

            {/* Step Timer Widget (if step specifies a timer) */}
            {currentStep.timer_seconds && currentStep.timer_seconds > 0 ? (
              <div className="max-w-md mx-auto pt-1">
                <CookingTimer
                  timerId={`step-${currentStep.step_number}`}
                  title={`${getRecipeName()} — Step ${currentStep.step_number}`}
                  totalSeconds={currentStep.timer_seconds}
                />
              </div>
            ) : null}

            {/* Audio Controls: Repeat Step & Read Aloud */}
            <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 pt-2">
              <button
                onClick={handleRepeatStep}
                className="px-4 py-3 rounded-2xl bg-stone-800 hover:bg-stone-700 text-amber-400 hover:text-amber-300 border border-amber-900/40 text-xs font-semibold inline-flex items-center gap-2 transition-colors shadow-md min-h-[44px] touch-target"
                title="Repeat step instruction audio"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Repeat Step</span>
              </button>

              <button
                onClick={handleReadAloud}
                className="px-4 py-3 rounded-2xl bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white border border-stone-700 text-xs font-semibold inline-flex items-center gap-2 transition-colors shadow-md min-h-[44px] touch-target"
              >
                <Volume2 className="w-4 h-4 text-amber-400" />
                <span>{t('readStepAloud')}</span>
              </button>
            </div>

          </div>
        ) : (
          /* Completion Screen */
          <div className="space-y-6 text-center animate-in zoom-in-95 max-w-lg mx-auto py-6">
            <div className="w-20 h-20 rounded-full bg-cardamom-600 text-white flex items-center justify-center mx-auto shadow-xl">
              <CheckCircle className="w-10 h-10" />
            </div>

            <h3 className="text-3xl sm:text-4xl font-serif font-bold text-white">
              {t('congratsCooked')}!
            </h3>

            <p className="text-sm text-stone-300 leading-relaxed">
              Your authentic <strong className="text-amber-400">{getRecipeName()}</strong> is hot and ready to serve. Enjoy your royal meal!
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4 w-full">
              <button
                onClick={handleToggleFav}
                className={`w-full sm:w-auto px-6 py-3.5 rounded-2xl text-xs font-bold flex items-center justify-center gap-2 transition-all min-h-[48px] touch-target ${
                  isFavorited ? 'bg-rose-600 text-white' : 'bg-stone-800 text-stone-200 hover:bg-stone-700'
                }`}
              >
                <Heart className={`w-4 h-4 ${isFavorited ? 'fill-current' : ''}`} />
                <span>{isFavorited ? 'Saved to Favorites' : 'Save Recipe'}</span>
              </button>

              <button
                onClick={() => navigate(`/recipe/${recipe.slug}`)}
                className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-saffron-600 hover:bg-saffron-500 text-white text-xs font-bold transition-all shadow-md min-h-[48px] touch-target flex items-center justify-center"
              >
                {t('backToRecipe')}
              </button>
            </div>
          </div>
        )}

      </main>

      {/* Bottom Control Bar */}
      <footer className="p-3 sm:p-5 border-t border-stone-800/80 bg-stone-900/80 backdrop-blur-md pb-safe">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-3 sm:gap-4">
          
          <button
            onClick={handlePrevious}
            disabled={currentStepIdx === 0}
            className="flex-1 sm:flex-initial px-5 sm:px-6 py-3.5 rounded-2xl bg-stone-800 hover:bg-stone-700 disabled:opacity-30 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all disabled:pointer-events-none min-h-[48px] touch-target"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{t('previousStep')}</span>
          </button>

          <span className="text-xs font-mono text-stone-400 font-semibold hidden md:inline">
            Step {currentStepIdx + 1} of {totalSteps}
          </span>

          <button
            onClick={handleNext}
            className="flex-1 sm:flex-initial px-6 sm:px-8 py-3.5 rounded-2xl bg-gradient-to-r from-saffron-600 to-amber-600 hover:from-saffron-500 hover:to-amber-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-saffron-600/30 transition-all hover:scale-105 active:scale-95 min-h-[48px] touch-target"
          >
            <span>{currentStepIdx === totalSteps - 1 ? 'Finish & Celebrate 🎉' : t('nextStep')}</span>
            <ArrowRight className="w-4 h-4" />
          </button>

        </div>
      </footer>

    </div>
  );
};
