import React from 'react';
import type { HistoryItem } from '../types';
import { Icon } from './icons';
import { sourceImageToDataUrl } from '../utils';
import { useLanguage } from '../contexts/LanguageContext';

interface HistoryPanelProps {
    history: HistoryItem[];
    onRestore: (item: HistoryItem) => void;
    onClear: () => void;
}

export const HistoryPanel: React.FC<HistoryPanelProps> = ({ history, onRestore, onClear }) => {
    const { t } = useLanguage();

    const handleClear = () => {
        if (window.confirm(t('clearHistoryConfirm'))) {
            onClear();
        }
    };

    return (
        <section className="max-w-[1800px] mx-auto mt-8">
            <div className="flex justify-between items-center mb-4 px-1">
                <h2 className="text-xl font-semibold text-slate-300 flex items-center gap-2">
                    <Icon name="clock" className="w-6 h-6" />
                    {t('history')}
                </h2>
                {history.length > 0 && (
                    <button
                        onClick={handleClear}
                        className="flex items-center gap-1.5 text-sm text-slate-400 hover:text-red-400 transition-colors px-3 py-1.5 rounded-md hover:bg-red-500/10"
                        title={t('clearAll')}
                    >
                        <Icon name="trash" className="w-4 h-4" />
                        <span>{t('clearAll')}</span>
                    </button>
                )}
            </div>
            {history.length > 0 ? (
                <div className="flex overflow-x-auto space-x-4 pb-4 -mx-4 px-4">
                    {history.map(item => {
                        const thumbnailUrl = item.generatedImages.length > 0
                            ? item.generatedImages[0]
                            : item.sourceImage
                            ? sourceImageToDataUrl(item.sourceImage)
                            : '';
                        
                        return (
                            <div
                                key={item.id}
                                className="group flex-shrink-0 w-52 bg-slate-800 rounded-lg cursor-pointer transition-all duration-200 hover:ring-2 hover:ring-orange-500 shadow-lg overflow-hidden"
                                onClick={() => onRestore(item)}
                            >
                                <div className="relative">
                                    <img
                                        src={thumbnailUrl}
                                        alt="History thumbnail"
                                        className="w-full h-32 object-cover bg-slate-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                        <p className="text-white font-bold text-sm">{t('review')}</p>
                                    </div>
                                    <span className="absolute bottom-1 right-2 text-white text-xs bg-black/50 px-1.5 py-0.5 rounded">
                                        {item.tab === 'prompt' ? t('prompts') : `${item.imageCount} ${t('images')}`}
                                    </span>
                                </div>
                                <div className="p-2">
                                    <p className="text-xs text-slate-300 line-clamp-2" title={item.prompt}>{item.prompt}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            ) : (
                <div className="bg-[#1e293b] border border-slate-700/50 p-6 rounded-xl text-center text-slate-500">
                    <p>{t('historyEmpty')}</p>
                </div>
            )}
        </section>
    );
};