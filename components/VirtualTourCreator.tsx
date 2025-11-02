import React from 'react';
import type { SourceImage } from '../types';
import { useLanguage } from '../contexts/LanguageContext';
import { Icon } from './icons';
import { ImageDropzone } from './ImageDropzone';
import { sourceImageToDataUrl } from '../utils';

// This is the VirtualTourControls component from GalleryPanel.tsx
const VirtualTourControls: React.FC<{
    onNavigate: (prompt: string) => void;
    onUndo: () => void;
    onRedo: () => void;
    canUndo: boolean;
    canRedo: boolean;
}> = ({ onNavigate, onUndo, onRedo, canUndo, canRedo }) => {
    const { t } = useLanguage();
    const navButtons = [
        { label: 'Pan Left 30°', icon: 'arrow-left-circle', prompt: 'pan camera left by 30 degrees' },
        { label: 'Pan Right 30°', icon: 'arrow-right-circle', prompt: 'pan camera right by 30 degrees' },
        { label: 'Look Up', icon: 'arrow-up-circle', prompt: 'tilt the camera view upwards, revealing more of the ceiling and upper details of the scene' },
        { label: 'Look Down', icon: 'arrow-down-circle', prompt: 'tilt the camera view downwards, revealing more of the floor and lower details of the scene' },
        { label: 'Zoom In', icon: 'plus-circle', prompt: 'zoom in on the main subject in the foreground, creating a close-up view that highlights its details' },
        { label: 'Zoom Out', icon: 'minus-circle', prompt: 'zoom out slightly' },
    ];

    return (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-slate-800/80 backdrop-blur-md border border-slate-700/50 rounded-xl shadow-2xl z-10 p-2 flex items-center gap-1">
            <button onClick={onUndo} disabled={!canUndo} className="p-2.5 rounded-lg text-slate-200 hover:bg-slate-700 disabled:text-slate-500 disabled:cursor-not-allowed" title={t('tourUndo')}>
                <Icon name="arrow-uturn-left" className="w-6 h-6" />
            </button>
            <div className="w-px h-8 bg-slate-700 mx-1"></div>
            {navButtons.map(btn => (
                <button key={btn.label} onClick={() => onNavigate(btn.prompt)} className="p-2.5 rounded-lg text-slate-200 hover:bg-slate-700" title={btn.label}>
                    <Icon name={btn.icon} className="w-6 h-6" />
                </button>
            ))}
            <div className="w-px h-8 bg-slate-700 mx-1"></div>
            <button onClick={onRedo} disabled={!canRedo} className="p-2.5 rounded-lg text-slate-200 hover:bg-slate-700 disabled:text-slate-500 disabled:cursor-not-allowed" title={t('tourRedo')}>
                <Icon name="arrow-uturn-right" className="w-6 h-6" />
            </button>
        </div>
    );
};

interface VirtualTourCreatorProps {
    onBack: () => void;
    isLoading: boolean;
    sourceImage: SourceImage | null;
    virtualTourHistory: string[];
    virtualTourIndex: number;
    handleVirtualTourNavigation: (prompt: string) => void;
    handleUndo: () => void;
    handleRedo: () => void;
    handleVirtualTourHistorySelect: (index: number) => void;
    setFullscreenImage: (url: string | null) => void;
    handleVirtualTourImageUpload: (image: SourceImage | null) => void;
}


export const VirtualTourCreator: React.FC<VirtualTourCreatorProps> = ({
    onBack,
    isLoading,
    sourceImage,
    virtualTourHistory,
    virtualTourIndex,
    handleVirtualTourNavigation,
    handleUndo,
    handleRedo,
    handleVirtualTourHistorySelect,
    setFullscreenImage,
    handleVirtualTourImageUpload,
}) => {
    const { t } = useLanguage();
    const currentTourImage = virtualTourHistory[virtualTourIndex];
    
    return (
         <div className="bg-[#1e293b] p-5 rounded-xl border border-slate-700/50 animate-fade-in">
            <div className="flex items-center justify-between mb-8 border-b border-slate-700 pb-4">
                <div className="flex items-center gap-4">
                     <Icon name="arrows-pointing-out" className="w-8 h-8 text-orange-500" />
                    <div>
                        <h2 className="text-2xl font-bold text-slate-100">{t('virtualTourTitle')}</h2>
                        <p className="text-sm text-slate-400">{t('virtualTourDesc')}</p>
                    </div>
                </div>
                <button onClick={onBack} className="flex items-center gap-2 text-slate-300 hover:text-orange-400 transition-colors px-3 py-2 rounded-lg hover:bg-slate-700/50">
                    <Icon name="arrow-uturn-left" className="w-5 h-5" />
                    <span>{t('backToUtilities')}</span>
                </button>
            </div>

             <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                 <div className="lg:col-span-4 space-y-6">
                    <section>
                        <h3 className="font-semibold text-slate-300 mb-3">{t('uploadStartImage')}</h3>
                        <p className="text-xs text-slate-400 -mt-2 mb-3">{t('virtualTourHelp')}</p>
                        {sourceImage ? (
                            <div className='space-y-3'>
                                <div className='bg-black/30 rounded-lg p-2'><img src={sourceImageToDataUrl(sourceImage)} alt="Virtual tour start" className="w-full h-auto object-contain rounded" /></div>
                                <button onClick={() => handleVirtualTourImageUpload(null)} className='text-red-400 hover:text-red-500 text-sm px-3 py-1.5 rounded-md hover:bg-red-500/10'>{t('delete')}</button>
                            </div>
                        ) : (
                            <ImageDropzone onImageUpload={handleVirtualTourImageUpload} className='w-full h-40 border-2 border-dashed border-slate-600 rounded-lg flex items-center justify-center text-center text-slate-400 text-sm cursor-pointer'>
                                <div><p>{t('dropzoneHint')}</p><p className="text-xs mt-1 text-slate-500">{t('dropzoneFormats')}</p></div>
                            </ImageDropzone>
                        )}
                    </section>
                </div>
                 <div className="lg:col-span-8 bg-slate-900/50 rounded-lg min-h-[60vh] flex items-center justify-center p-4 border border-slate-700">
                    {isLoading ? (
                        <div className="text-center text-slate-400">
                            <Icon name="sparkles" className="w-12 h-12 animate-spin text-orange-500 mx-auto mb-4" />
                            <p>AI is generating the next frame...</p>
                        </div>
                    ) : !currentTourImage ? (
                        <div className="text-center text-slate-500">
                            <Icon name="arrows-pointing-out" className="w-16 h-16 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold text-slate-400">{t('emptyTourHeader')}</h3>
                            <p className="mt-2">{t('emptyTourText')}</p>
                        </div>
                    ) : (
                       <div className="flex flex-col h-full w-full">
                            <div className="flex-grow relative w-full flex items-center justify-center group min-h-0">
                                <img src={currentTourImage} alt="Virtual tour frame" className="max-w-full max-h-full object-contain" />
                                <VirtualTourControls
                                    onNavigate={handleVirtualTourNavigation}
                                    onUndo={handleUndo}
                                    onRedo={handleRedo}
                                    canUndo={virtualTourIndex > 0}
                                    canRedo={virtualTourIndex < virtualTourHistory.length - 1}
                                />
                                <div className="absolute top-1/2 right-4 -translate-y-1/2 flex flex-col items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <button onClick={() => currentTourImage && setFullscreenImage(currentTourImage)} className="bg-slate-800/80 backdrop-blur-sm border border-slate-600 hover:bg-slate-700 text-white p-2.5 rounded-full" title={t('fullscreen')}>
                                        <Icon name="arrows-pointing-out" className="w-5 h-5" />
                                    </button>
                                    <a href={currentTourImage} download={`aicomplex-tour-${Date.now()}.png`} className="bg-slate-800/80 backdrop-blur-sm border border-slate-600 hover:bg-slate-700 text-white p-2.5 rounded-full inline-flex" title={t('downloadImage')}>
                                        <Icon name="download" className="w-5 h-5" />
                                    </a>
                                </div>
                            </div>
                            {virtualTourHistory.length > 1 && (
                                <div className="flex-shrink-0 mt-4">
                                    <h4 className="text-sm font-semibold text-slate-300 mb-2 px-1">{t('tourHistory')}</h4>
                                    <div className="flex overflow-x-auto space-x-2 pb-2 thin-scrollbar -mx-2 px-2">
                                        {virtualTourHistory.map((image, index) => (
                                            <div
                                                key={index}
                                                onClick={() => handleVirtualTourHistorySelect(index)}
                                                className={`flex-shrink-0 w-24 h-24 rounded-md overflow-hidden cursor-pointer transition-all duration-200 ${virtualTourIndex === index ? 'ring-2 ring-orange-500' : 'opacity-60 hover:opacity-100'}`}
                                            >
                                                <img src={image} alt={`History ${index + 1}`} className="w-full h-full object-cover" />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};