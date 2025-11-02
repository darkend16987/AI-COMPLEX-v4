import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

export const WelcomeScreen: React.FC<{ onStart: () => void }> = ({ onStart }) => {
  const { t } = useLanguage();
  return (
    <div 
      className="min-h-screen w-full flex items-center justify-center bg-cover bg-center" 
      style={{ backgroundImage: "url('https://images.unsplash.com/photo-1534447677768-be436a0979f9?q=80&w=2070&auto=format&fit=crop')" }}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
      <div className="relative z-10 text-center p-8 flex flex-col items-center">
        <img
          src="https://raw.githubusercontent.com/Khanhltvpp1a/Media/refs/heads/main/pictureaiapp/AIAI%20Logo-02.jpg"
          alt="AIcomplex Logo"
          className="w-32 h-auto rounded-xl shadow-lg mb-6"
        />
        <h1 className="text-5xl sm:text-7xl font-bold tracking-wide text-slate-100 mb-4" style={{ textShadow: '0 0 25px rgba(255, 255, 255, 0.4)' }}>
          {t('welcomeHeader')}
        </h1>
        <p className="text-slate-300 text-lg mb-10 max-w-2xl">
          {t('welcomeDescription')}
        </p>
        <button
          onClick={onStart}
          className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-4 px-10 rounded-lg text-xl transition-all duration-300 transform hover:scale-105 shadow-lg shadow-orange-500/30"
        >
          {t('welcomeStartButton')}
        </button>
      </div>
    </div>
  );
};