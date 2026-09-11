import React, { createContext, useContext, useState, useEffect } from 'react';
import { ActiveTimer } from '../types';

interface TimerContextType {
  timers: ActiveTimer[];
  startTimer: (id: string, title: string, seconds: number) => void;
  pauseTimer: (id: string) => void;
  resumeTimer: (id: string) => void;
  resetTimer: (id: string) => void;
  removeTimer: (id: string) => void;
  formatTime: (seconds: number) => string;
}

const TimerContext = createContext<TimerContextType | undefined>(undefined);

// Play a pleasant kitchen timer chime using Web Audio API
function playTimerChime() {
  try {
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();

    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.15);

      gain.gain.setValueAtTime(0.3, ctx.currentTime + idx * 0.15);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.15 + 0.4);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime + idx * 0.15);
      osc.stop(ctx.currentTime + idx * 0.15 + 0.45);
    });
  } catch (e) {
    console.warn('Audio chime could not be played:', e);
  }
}

export const TimerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [timers, setTimers] = useState<ActiveTimer[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimers(prevTimers =>
        prevTimers.map(timer => {
          if (!timer.isRunning || timer.remainingSeconds <= 0) return timer;

          const nextRemaining = timer.remainingSeconds - 1;
          if (nextRemaining === 0) {
            playTimerChime();
          }
          return {
            ...timer,
            remainingSeconds: nextRemaining,
            isRunning: nextRemaining > 0
          };
        })
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const startTimer = (id: string, title: string, seconds: number) => {
    setTimers(prev => {
      const existing = prev.find(t => t.id === id);
      if (existing) {
        return prev.map(t => t.id === id ? { ...t, remainingSeconds: seconds, totalSeconds: seconds, isRunning: true } : t);
      }
      return [...prev, { id, title, totalSeconds: seconds, remainingSeconds: seconds, isRunning: true }];
    });
  };

  const pauseTimer = (id: string) => {
    setTimers(prev => prev.map(t => t.id === id ? { ...t, isRunning: false } : t));
  };

  const resumeTimer = (id: string) => {
    setTimers(prev => prev.map(t => t.id === id && t.remainingSeconds > 0 ? { ...t, isRunning: true } : t));
  };

  const resetTimer = (id: string) => {
    setTimers(prev => prev.map(t => t.id === id ? { ...t, remainingSeconds: t.totalSeconds, isRunning: false } : t));
  };

  const removeTimer = (id: string) => {
    setTimers(prev => prev.filter(t => t.id !== id));
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  return (
    <TimerContext.Provider value={{ timers, startTimer, pauseTimer, resumeTimer, resetTimer, removeTimer, formatTime }}>
      {children}
    </TimerContext.Provider>
  );
};

export const useTimer = () => {
  const context = useContext(TimerContext);
  if (!context) {
    throw new Error('useTimer must be used within a TimerProvider');
  }
  return context;
};
