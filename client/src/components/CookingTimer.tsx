import React from 'react';
import { Play, Pause, RotateCcw, X, Bell } from 'lucide-react';
import { useTimer } from '../context/TimerContext';
import { useLanguage } from '../context/LanguageContext';

interface CookingTimerProps {
  timerId: string;
  title?: string;
  totalSeconds: number;
  inline?: boolean;
}

export const CookingTimer: React.FC<CookingTimerProps> = ({ 
  timerId, 
  title = "Cooking Timer", 
  totalSeconds,
  inline = false
}) => {
  const { timers, startTimer, pauseTimer, resumeTimer, resetTimer, removeTimer, formatTime } = useTimer();
  const { t } = useLanguage();

  const currentTimer = timers.find(t => t.id === timerId);
  const remainingSeconds = currentTimer ? currentTimer.remainingSeconds : totalSeconds;
  const isRunning = currentTimer?.isRunning || false;
  const isFinished = currentTimer ? currentTimer.remainingSeconds === 0 : false;

  const progressPercent = currentTimer 
    ? ((currentTimer.totalSeconds - currentTimer.remainingSeconds) / currentTimer.totalSeconds) * 100 
    : 0;

  const handleStartOrToggle = () => {
    if (!currentTimer) {
      startTimer(timerId, title, totalSeconds);
    } else if (isRunning) {
      pauseTimer(timerId);
    } else if (remainingSeconds === 0) {
      resetTimer(timerId);
      resumeTimer(timerId);
    } else {
      resumeTimer(timerId);
    }
  };

  return (
    <div className={`rounded-3xl border transition-all ${
      isFinished 
        ? 'bg-rose-50 border-rose-300 shadow-md animate-bounce' 
        : isRunning 
          ? 'bg-amber-50/80 border-amber-300 shadow-sm' 
          : 'bg-stone-50 border-stone-200'
    } ${inline ? 'p-3' : 'p-5'}`}>
      
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${
            isFinished ? 'bg-rose-500 text-white' : isRunning ? 'bg-amber-500 text-white animate-pulse' : 'bg-stone-200 text-stone-700'
          }`}>
            <Bell className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-stone-900">{title}</h4>
            <p className="text-[10px] text-stone-500">
              {isFinished ? t('timerFinished') : isRunning ? 'Active timer' : 'Ready'}
            </p>
          </div>
        </div>

        {currentTimer && !inline && (
          <button 
            onClick={() => removeTimer(timerId)}
            className="text-stone-400 hover:text-stone-600 p-1"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Digits & Progress Bar */}
      <div className="flex items-center justify-between mt-3">
        <div className="font-mono text-3xl font-extrabold tracking-wider text-stone-900">
          {formatTime(remainingSeconds)}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleStartOrToggle}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all ${
              isRunning 
                ? 'bg-stone-800 hover:bg-stone-900 text-white' 
                : 'bg-saffron-600 hover:bg-saffron-700 text-white'
            }`}
          >
            {isRunning ? (
              <>
                <Pause className="w-3.5 h-3.5" />
                <span>{t('pauseTimer')}</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>{remainingSeconds === totalSeconds ? t('startTimer') : t('resumeTimer')}</span>
              </>
            )}
          </button>

          {currentTimer && (
            <button
              onClick={() => resetTimer(timerId)}
              className="p-2 rounded-xl border border-stone-200 bg-white hover:bg-stone-100 text-stone-600 transition-colors"
              title={t('resetTimer')}
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Progress Track */}
      <div className="w-full h-1.5 bg-stone-200 rounded-full overflow-hidden mt-3">
        <div 
          className={`h-full transition-all duration-1000 ${isFinished ? 'bg-rose-500' : 'bg-amber-500'}`}
          style={{ width: `${progressPercent}%` }}
        />
      </div>
    </div>
  );
};
