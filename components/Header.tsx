import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Icon } from './icons';

const LanguageSwitcher: React.FC = () => {
    const { language, setLanguage, t } = useLanguage();

    return (
        <div className="absolute top-4 right-4 md:top-6 md:right-6 z-20">
            <div className="flex space-x-1 bg-slate-800/80 backdrop-blur-md border border-slate-700/50 p-1 rounded-lg">
                <button
                    onClick={() => setLanguage('vi')}
                    aria-label="Switch to Vietnamese"
                    className={`px-3 py-1 text-sm font-bold rounded-md transition-colors duration-200 ${
                        language === 'vi' ? 'bg-red-600 text-white shadow-md shadow-red-500/20' : 'text-slate-300 hover:bg-slate-700'
                    }`}
                >
                    VN
                </button>
                <button
                    onClick={() => setLanguage('en')}
                    aria-label="Switch to English"
                    className={`px-3 py-1 text-sm font-bold rounded-md transition-colors duration-200 ${
                        language === 'en' ? 'bg-orange-600 text-white shadow-md shadow-orange-500/20' : 'text-slate-300 hover:bg-slate-700'
                    }`}
                >
                    EN
                </button>
            </div>
        </div>
    );
};


export const Header: React.FC = () => {
  const { t } = useLanguage();
  return (
    <header className="flex flex-col items-center mb-8 text-center relative">
      <LanguageSwitcher />
      <h1 className="text-4xl sm:text-5xl font-bold tracking-wide text-slate-100" style={{ textShadow: '0 0 20px rgba(99, 102, 241, 0.5), 0 0 5px rgba(255, 255, 255, 0.5)' }}>
        {t('appTitle')}
      </h1>
      <p className="text-slate-400 mt-2 text-sm">{t('developedBy')}</p>
      <p className="text-slate-400 text-sm">{t('sponsoredBy')}</p>
    </header>
  );
}