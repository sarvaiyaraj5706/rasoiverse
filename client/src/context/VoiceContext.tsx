import React, { createContext, useContext, useState, useRef, useEffect } from 'react';
import { useLanguage } from './LanguageContext';
import { useTimer } from './TimerContext';

interface VoiceCommandCallback {
  onNextStep?: () => void;
  onPreviousStep?: () => void;
  onRepeatStep?: () => void;
  getCurrentStepDetails?: () => { recipeTitle: string; stepNumber: number; instruction: string };
}

interface VoiceContextType {
  isVoiceModalOpen: boolean;
  openVoiceModal: () => void;
  closeVoiceModal: () => void;
  isListening: boolean;
  transcript: string;
  assistantReply: string;
  startListening: () => void;
  stopListening: () => void;
  sendTextCommand: (cmd: string) => Promise<void>;
  speak: (text: string, targetLang?: string) => void;
  registerCookingCallbacks: (callbacks: VoiceCommandCallback) => () => void;
}

const VoiceContext = createContext<VoiceContextType | undefined>(undefined);

export const VoiceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { language } = useLanguage();
  const { startTimer } = useTimer();

  const [isVoiceModalOpen, setIsVoiceModalOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [assistantReply, setAssistantReply] = useState('How can I help with your cooking today?');

  const callbacksRef = useRef<VoiceCommandCallback>({});
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    // Initialize SpeechRecognition if available
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      try {
        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = true;
        recognition.lang = language === 'hi' ? 'hi-IN' : language === 'gu' ? 'gu-IN' : 'en-IN';

        recognition.onstart = () => {
          setIsListening(true);
        };

        recognition.onresult = (event: any) => {
          const current = event.resultIndex;
          const text = event.results[current][0].transcript;
          setTranscript(text);

          if (event.results[current].isFinal) {
            handleCommand(text);
          }
        };

        recognition.onerror = (event: any) => {
          console.warn('Speech recognition error:', event.error);
          setIsListening(false);
        };

        recognition.onend = () => {
          setIsListening(false);
        };

        recognitionRef.current = recognition;
      } catch (e) {
        console.warn('Could not initialize SpeechRecognition:', e);
      }
    }
  }, [language]);

  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);

  useEffect(() => {
    if ('speechSynthesis' in window) {
      const updateVoices = () => {
        const v = window.speechSynthesis.getVoices();
        if (v && v.length > 0) setAvailableVoices(v);
      };
      updateVoices();
      window.speechSynthesis.addEventListener('voiceschanged', updateVoices);
      return () => window.speechSynthesis.removeEventListener('voiceschanged', updateVoices);
    }
  }, []);

  const speak = (text: string, targetLang?: string) => {
    if (!('speechSynthesis' in window) || !text) return;

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.95;
    const activeLang = targetLang || language;
    utterance.lang = activeLang === 'hi' ? 'hi-IN' : activeLang === 'gu' ? 'gu-IN' : 'en-IN';

    // Select optimal Indian accent / language voice if available
    const voices = availableVoices.length > 0 ? availableVoices : window.speechSynthesis.getVoices();
    const langCode = activeLang === 'hi' ? 'hi' : activeLang === 'gu' ? 'gu' : 'en-in';
    const matchedVoice = voices.find(v => v.lang.toLowerCase().includes(langCode)) ||
                         voices.find(v => v.lang.toLowerCase().includes('in')) ||
                         voices.find(v => v.lang.toLowerCase().includes(activeLang));
    if (matchedVoice) utterance.voice = matchedVoice;

    window.speechSynthesis.speak(utterance);
  };

  const handleCommand = async (commandText: string) => {
    setTranscript(commandText);
    const details = callbacksRef.current.getCurrentStepDetails?.() || {
      recipeTitle: 'Indian Recipe',
      stepNumber: 1,
      instruction: 'Follow the cooking steps.'
    };

    try {
      const res = await fetch('/api/ai/assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          recipeTitle: details.recipeTitle,
          currentStepNumber: details.stepNumber,
          currentStepInstruction: details.instruction,
          command: commandText,
          language
        })
      });

      const data = await res.json();
      setAssistantReply(data.reply);
      speak(data.reply);

      // Execute client cooking actions
      if (data.action === 'NEXT_STEP') {
        callbacksRef.current.onNextStep?.();
      } else if (data.action === 'PREVIOUS_STEP') {
        callbacksRef.current.onPreviousStep?.();
      } else if (data.action === 'REPEAT_STEP') {
        callbacksRef.current.onRepeatStep?.();
      } else if (data.action === 'START_TIMER' && data.timer_seconds) {
        startTimer('voice-cooking-timer', 'Step Timer', data.timer_seconds);
      }
    } catch (err) {
      console.error('Voice assistant error:', err);
      setAssistantReply('Could not connect to assistant.');
    }
  };

  const startListening = () => {
    if (recognitionRef.current) {
      try {
        setTranscript('');
        recognitionRef.current.lang = language === 'hi' ? 'hi-IN' : language === 'gu' ? 'gu-IN' : 'en-IN';
        recognitionRef.current.start();
      } catch (e) {
        setIsListening(true);
      }
    } else {
      // Simulation mode for environments without SpeechRecognition
      setIsListening(true);
      setTimeout(() => {
        setTranscript("Next step");
        handleCommand("Next step");
        setIsListening(false);
      }, 2000);
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (e) {}
    }
    setIsListening(false);
  };

  const sendTextCommand = async (cmd: string) => {
    await handleCommand(cmd);
  };

  const registerCookingCallbacks = (callbacks: VoiceCommandCallback) => {
    callbacksRef.current = callbacks;
    return () => {
      callbacksRef.current = {};
    };
  };

  return (
    <VoiceContext.Provider
      value={{
        isVoiceModalOpen,
        openVoiceModal: () => setIsVoiceModalOpen(true),
        closeVoiceModal: () => {
          stopListening();
          setIsVoiceModalOpen(false);
        },
        isListening,
        transcript,
        assistantReply,
        startListening,
        stopListening,
        sendTextCommand,
        speak,
        registerCookingCallbacks
      }}
    >
      {children}
    </VoiceContext.Provider>
  );
};

export const useVoice = () => {
  const context = useContext(VoiceContext);
  if (!context) {
    throw new Error('useVoice must be used within a VoiceProvider');
  }
  return context;
};
