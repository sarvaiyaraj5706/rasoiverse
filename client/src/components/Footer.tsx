import React from 'react';
import { Flame, Heart, Sparkles, ShieldCheck, MapPin } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const Footer: React.FC<{ navigate: (path: string) => void }> = ({ navigate }) => {
  const { t } = useLanguage();

  return (
    <footer className="bg-stone-900 text-stone-300 pt-16 pb-24 xl:pb-16 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          
          {/* Brand Info */}
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-saffron-600 to-amber-500 flex items-center justify-center shadow-lg shadow-saffron-600/30">
                <Flame className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-bold font-serif text-white tracking-tight">
                Rasoi<span className="text-saffron-500">Verse</span>
              </span>
            </div>
            <p className="text-xs text-stone-400 leading-relaxed">
              {t('brandTagline')}
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs text-stone-400">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
              <span>Intelligent Indian Cooking Platform</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white tracking-wider uppercase font-sans">
              Explore Cuisines
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li><button onClick={() => navigate('/explore?cuisine=Gujarati')} className="hover:text-saffron-400 transition-colors">Gujarati Thali & Farsan</button></li>
              <li><button onClick={() => navigate('/explore?cuisine=Punjabi')} className="hover:text-saffron-400 transition-colors">Hearty Punjabi Curries</button></li>
              <li><button onClick={() => navigate('/explore?cuisine=South Indian')} className="hover:text-saffron-400 transition-colors">South Indian Tiffins</button></li>
              <li><button onClick={() => navigate('/farali')} className="hover:text-saffron-400 transition-colors text-amber-400 font-medium">Farali & Vrat Specialities</button></li>
              <li><button onClick={() => navigate('/explore?category=street-food')} className="hover:text-saffron-400 transition-colors">Street & Fast Food Chaats</button></li>
              <li><button onClick={() => navigate('/explore?category=desserts')} className="hover:text-saffron-400 transition-colors">Heritage Mithai & Desserts</button></li>
            </ul>
          </div>

          {/* AI Features */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white tracking-wider uppercase font-sans">
              AI Smart Kitchen
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <button onClick={() => navigate('/ai-generator')} className="hover:text-saffron-400 flex items-center gap-1.5 transition-colors">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>AI Recipe Generator</span>
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/ingredient-search')} className="hover:text-saffron-400 transition-colors">
                  What Can I Cook? (Pantry Match)
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/explore')} className="hover:text-saffron-400 transition-colors">
                  Distraction-Free Cooking Mode
                </button>
              </li>
              <li>
                <span className="text-stone-500">Rasoi Voice Assistant (Hands-Free)</span>
              </li>
            </ul>
          </div>

          {/* Fasting & Tradition Disclaimer */}
          <div className="space-y-3 bg-stone-800/60 p-4 rounded-2xl border border-stone-700/50">
            <h4 className="text-xs font-semibold text-amber-300 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>Satvik & Fasting Promise</span>
            </h4>
            <p className="text-[11px] text-stone-400 leading-relaxed">
              {t('fastingNotice')}
            </p>
            <p className="text-[11px] text-stone-500 pt-1">
              AI generated recipes provide culinary inspiration. Always verify ingredients for personal dietary needs.
            </p>
          </div>

        </div>

        <div className="mt-12 pt-6 border-t border-stone-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p>© {new Date().getFullYear()} RasoiVerse. Built with devotion to Indian culinary heritage.</p>
          <div className="flex items-center gap-4 text-[11px]">
            <span>English • हिन्दी • ગુજરાતી</span>
            <span>Made with ❤️ for Indian Food Lovers</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
