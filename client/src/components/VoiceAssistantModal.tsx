import React, { useState } from 'react';
import { Mic, MicOff, Volume2, X, Send, Sparkles, MessageSquare } from 'lucide-react';
import { useVoice } from '../context/VoiceContext';
import { useLanguage } from '../context/LanguageContext';

export const VoiceAssistantModal: React.FC = () => {
  const { 
    isVoiceModalOpen, 
    closeVoiceModal, 
    isListening, 
    transcript, 
    assistantReply, 
    startListening, 
    stopListening, 
    sendTextCommand 
  } = useVoice();
  
  const { t, language } = useLanguage();
  const [inputText, setInputText] = useState('');

  if (!isVoiceModalOpen) return null;

  const handleSendText = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    sendTextCommand(inputText.trim());
    setInputText('');
  };

  const handleQuickCommand = (cmd: string) => {
    sendTextCommand(cmd);
  };

  const commandsList = [
    { label: t('cmdNextStep'), cmd: "Next step" },
    { label: t('cmdRepeatStep'), cmd: "Repeat this step" },
    { label: t('cmdGoBack'), cmd: "Go back" },
    { label: t('cmdHowMuchSalt'), cmd: "How much salt?" },
    { label: t('cmdSetTimer'), cmd: "Set a 5 minute timer" },
    { label: t('cmdWhatIngredients'), cmd: "What ingredients do I need?" }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-stone-200 relative overflow-hidden">
        
        {/* Top Header */}
        <div className="flex items-center justify-between pb-4 border-b border-stone-100">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-saffron-600 to-amber-500 flex items-center justify-center shadow-md shadow-saffron-500/20">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-stone-900">
                {t('voiceModalTitle')}
              </h3>
              <p className="text-[11px] text-stone-500">
                Hands-free AI cooking partner • {language.toUpperCase()}
              </p>
            </div>
          </div>

          <button 
            onClick={closeVoiceModal}
            className="p-2 rounded-xl text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Center Mic & Voice Waveform */}
        <div className="py-8 flex flex-col items-center justify-center text-center">
          <div className="relative">
            {isListening && (
              <div className="absolute inset-0 rounded-full bg-saffron-500/20 animate-ping" />
            )}
            <button
              onClick={isListening ? stopListening : startListening}
              className={`relative z-10 w-24 h-24 rounded-full flex items-center justify-center transition-all duration-300 shadow-xl ${
                isListening 
                  ? 'bg-gradient-to-tr from-rose-600 to-saffron-600 text-white scale-110 shadow-rose-500/30' 
                  : 'bg-gradient-to-tr from-saffron-600 to-amber-500 text-white hover:scale-105 shadow-saffron-500/30'
              }`}
            >
              {isListening ? (
                <MicOff className="w-10 h-10 animate-pulse" />
              ) : (
                <Mic className="w-10 h-10" />
              )}
            </button>
          </div>

          {/* Voice Wave Animation when listening */}
          {isListening ? (
            <div className="flex items-center gap-1.5 mt-5 h-8">
              <div className="w-1.5 bg-saffron-600 rounded-full wave-bar" style={{ animationDelay: '0.1s' }} />
              <div className="w-1.5 bg-saffron-600 rounded-full wave-bar" style={{ animationDelay: '0.3s' }} />
              <div className="w-1.5 bg-amber-500 rounded-full wave-bar" style={{ animationDelay: '0.5s' }} />
              <div className="w-1.5 bg-saffron-600 rounded-full wave-bar" style={{ animationDelay: '0.2s' }} />
              <div className="w-1.5 bg-saffron-600 rounded-full wave-bar" style={{ animationDelay: '0.4s' }} />
            </div>
          ) : (
            <p className="text-xs text-stone-500 mt-4 font-medium">
              {t('voiceTapToSpeak')}
            </p>
          )}

          {/* Transcript / Spoken Text */}
          {transcript && (
            <div className="mt-4 px-4 py-2 rounded-2xl bg-stone-100 text-xs font-semibold text-stone-800 max-w-sm">
              “{transcript}”
            </div>
          )}
        </div>

        {/* Assistant Response Bubble */}
        <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 mb-5 flex items-start gap-3">
          <div className="p-2 rounded-xl bg-amber-200 text-amber-900 mt-0.5">
            <Volume2 className="w-4 h-4" />
          </div>
          <div className="text-xs text-stone-800 flex-1 leading-relaxed">
            <p className="font-bold text-amber-950 mb-0.5">Rasoi Assistant:</p>
            <p>{assistantReply}</p>
          </div>
        </div>

        {/* Suggested Quick Commands */}
        <div className="mb-4">
          <p className="text-[11px] font-bold text-stone-500 uppercase tracking-wider mb-2">
            {t('voiceSuggestedCommands')}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {commandsList.map((item, idx) => (
              <button
                key={idx}
                onClick={() => handleQuickCommand(item.cmd)}
                className="px-3 py-1.5 rounded-xl text-xs font-medium bg-stone-100 hover:bg-saffron-50 text-stone-700 hover:text-saffron-700 border border-stone-200/80 transition-all hover:scale-105 active:scale-95"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* Fallback Text Input */}
        <form onSubmit={handleSendText} className="flex gap-2 pt-2 border-t border-stone-100">
          <input 
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={t('typeCommandFallback')}
            className="flex-1 px-4 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-xs focus:outline-none focus:border-saffron-500 focus:bg-white transition-all"
          />
          <button 
            type="submit"
            className="px-4 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm"
          >
            <Send className="w-3.5 h-3.5" />
            <span>{t('sendBtn')}</span>
          </button>
        </form>

      </div>
    </div>
  );
};
