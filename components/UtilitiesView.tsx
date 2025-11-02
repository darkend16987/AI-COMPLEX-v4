import React, { useState } from 'react';
import type { Utility } from '../types';
import { useLanguage } from '../contexts/LanguageContext';
import { Icon } from './icons';
import { MoodboardCreator } from './MoodboardCreator';
import { LightingCreator } from './LightingCreator';
import { VirtualTourCreator } from './VirtualTourCreator';
import { VideoPromptCreator } from './VideoPromptCreator';

interface UtilityToolPlaceholderProps {
    utility: Utility;
    onBack: () => void;
}

const UtilityToolPlaceholder: React.FC<UtilityToolPlaceholderProps> = ({ utility, onBack }) => {
    const { t } = useLanguage();
    const titles: Record<Utility, string> = {
        moodboard: t('moodboardTitle'),
        videoPrompt: t('videoPromptTitle'),
        lighting: t('lightingTitle'),
        virtualTour: t('virtualTourTitle'),
    };
    return (
        <div className="bg-[#1e293b] p-5 rounded-xl min-h-[70vh] flex flex-col items-center justify-center text-center border border-slate-700/50 relative">
            <button onClick={onBack} className="absolute top-6 left-6 flex items-center gap-2 text-slate-300 hover:text-orange-400 transition-colors">
                <Icon name="arrow-uturn-left" className="w-5 h-5" />
                {t('backToUtilities')}
            </button>
            <Icon name="cpu-chip" className="w-16 h-16 text-slate-500 mb-4" />
            <h2 className="text-4xl font-bold mb-4">{titles[utility]}</h2>
            <p className="text-2xl text-slate-400 bg-slate-800 px-4 py-2 rounded-lg">{t('comingSoon')}</p>
        </div>
    );
};

interface UtilityThumbnailProps {
    icon: string;
    title: string;
    description: string;
    onClick: () => void;
}

const UtilityThumbnail: React.FC<UtilityThumbnailProps> = ({ icon, title, description, onClick }) => (
    <div 
        onClick={onClick}
        className="bg-slate-800 p-6 rounded-lg border border-slate-700 hover:border-orange-500 hover:bg-slate-700/50 transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
    >
        <Icon name={icon} className="w-12 h-12 mb-4 text-orange-500" />
        <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
        <p className="text-slate-400 text-sm">{description}</p>
    </div>
);

export const UtilitiesView: React.FC<any> = (props) => {
    const { t } = useLanguage();
    const [activeUtility, setActiveUtility] = useState<Utility | null>(null);

    const utilities: { id: Utility; icon: string; }[] = [
        { id: 'moodboard', icon: 'clipboard' },
        { id: 'lighting', icon: 'sparkles' },
        { id: 'virtualTour', icon: 'arrows-pointing-out' },
        { id: 'videoPrompt', icon: 'video-camera' },
    ];

    if (activeUtility) {
        let utilityComponent;
        switch(activeUtility) {
            case 'moodboard':
                utilityComponent = <MoodboardCreator onBack={() => setActiveUtility(null)} {...props} />;
                break;
            case 'lighting':
                utilityComponent = <LightingCreator onBack={() => setActiveUtility(null)} {...props} />;
                break;
            case 'virtualTour':
                utilityComponent = <VirtualTourCreator onBack={() => setActiveUtility(null)} {...props} />;
                break;
            case 'videoPrompt':
                utilityComponent = <VideoPromptCreator onBack={() => setActiveUtility(null)} {...props} />;
                break;
            default:
                utilityComponent = <UtilityToolPlaceholder utility={activeUtility} onBack={() => setActiveUtility(null)} />;
                break;
        }
        return (
            <div className="lg:col-span-12">
                {utilityComponent}
            </div>
        );
    }

    return (
        <div className="lg:col-span-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {utilities.map(util => (
                    <UtilityThumbnail 
                        key={util.id}
                        icon={util.icon}
                        title={t(`${util.id}Title`)}
                        description={t(`${util.id}Desc`)}
                        onClick={() => setActiveUtility(util.id)}
                    />
                ))}
            </div>
        </div>
    );
};