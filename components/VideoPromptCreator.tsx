import React from 'react';
import type { SourceImage } from '../types';
import { useLanguage } from '../contexts/LanguageContext';
import { Icon } from './icons';
import { ImageDropzone } from './ImageDropzone';
import { sourceImageToDataUrl } from '../utils';

interface VideoPromptCreatorProps {
    onBack: () => void;
    videoPromptSourceImage: SourceImage | null;
    setVideoPromptSourceImage: (image: SourceImage | null) => void;
    videoPromptUserPrompt: string;
    setVideoPromptUserPrompt: (prompt: string) => void;
    videoPromptGeneratedPrompt: string | null;
    handleVideoPromptGeneration: () => void;
    isLoading: boolean;
    copyToClipboard: (text: string) => void;
}

export const VideoPromptCreator: React.FC<VideoPromptCreatorProps> = ({
    onBack,
    videoPromptSourceImage: sourceImage,
    setVideoPromptSourceImage: setSourceImage,
    videoPromptUserPrompt: userPrompt,
    setVideoPromptUserPrompt: setUserPrompt,
    videoPromptGeneratedPrompt: generatedPrompt,
    handleVideoPromptGeneration: handleGenerate,
    isLoading,
    copyToClipboard,
}) => {
    const { t } = useLanguage();

    return (
        <div className="bg-[#1e293b] p-5 rounded-xl border border-slate-700/50 animate-fade-in">
            <div className="flex items-center justify-between mb-8 border-b border-slate-700 pb-4">
                <div className="flex items-center gap-4">
                     <Icon name="video-camera" className="w-8 h-8 text-orange-500" />
                    <div>
                        <h2 className="text-2xl font-bold text-slate-100">{t('videoPromptTitle')}</h2>
                        <p className="text-sm text-slate-400">{t('videoPromptDesc')}</p>
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
                        <h3 className="font-semibold text-slate-300 mb-3">1. {t('uploadImage')}</h3>
                        {sourceImage ? (
                          <div className='space-y-3'>
                              <div className='bg-black/30 rounded-lg p-2'><img src={sourceImageToDataUrl(sourceImage)} alt="Source" className="w-full h-auto object-contain rounded" /></div>
                              <button onClick={() => setSourceImage(null)} className='text-red-400 hover:text-red-500 text-sm px-3 py-1.5 rounded-md hover:bg-red-500/10'>{t('delete')}</button>
                          </div>
                        ) : (
                          <ImageDropzone onImageUpload={setSourceImage} className='w-full h-40 border-2 border-dashed border-slate-600 rounded-lg flex items-center justify-center text-center text-slate-400 text-sm cursor-pointer'>
                              <div><p>{t('dropzoneHint')}</p><p className="text-xs mt-1 text-slate-500">{t('dropzoneFormats')}</p></div>
                          </ImageDropzone>
                        )}
                    </section>
                    
                    <section>
                         <h3 className="font-semibold text-slate-300 mb-2">2. {t('motionRequest')}</h3>
                         <textarea
                            value={userPrompt}
                            onChange={(e) => setUserPrompt(e.target.value)}
                            placeholder={t('promptPlaceholder.videoPrompt')}
                            className="w-full bg-slate-900/70 p-3 rounded-md h-28 resize-none text-sm focus:ring-2 focus:ring-orange-500 focus:outline-none border border-slate-700"
                        />
                    </section>
                   
                    <button onClick={handleGenerate} disabled={isLoading || !sourceImage || !userPrompt} className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2 disabled:bg-slate-600 disabled:cursor-not-allowed text-base">
                        <Icon name="sparkles" className="w-5 h-5" />
                        {isLoading ? t('generating') : t('createPrompt')}
                    </button>
                </div>
                <div className="lg:col-span-8 bg-slate-900/50 rounded-lg min-h-[60vh] flex items-center justify-center p-4 border border-slate-700">
                    {isLoading ? (
                        <div className="text-center text-slate-400">
                            <Icon name="cpu-chip" className="w-12 h-12 animate-spin text-orange-500 mx-auto mb-4" />
                            <p>{t('generatingVideoPrompt')}...</p>
                        </div>
                    ) : generatedPrompt ? (
                       <div className="w-full h-full p-4 bg-slate-800 rounded-lg">
                            <h3 className="text-lg font-semibold text-slate-200 mb-3">{t('generatedVideoPromptTitle')}</h3>
                            <div className="relative">
                                <textarea
                                    readOnly
                                    value={generatedPrompt}
                                    className="w-full h-64 bg-slate-900/70 p-3 rounded-md resize-none text-sm text-slate-300 border border-slate-700 focus:outline-none"
                                />
                                <button
                                    onClick={() => copyToClipboard(generatedPrompt)}
                                    title={t('copyPrompt')}
                                    className="absolute top-2 right-2 text-slate-400 hover:text-orange-400 p-1.5 rounded-md hover:bg-slate-700/50"
                                >
                                    <Icon name="clipboard" className="w-5 h-5" />
                                </button>
                            </div>
                       </div>
                    ) : (
                        <div className="text-center text-slate-500">
                            <Icon name="video-camera" className="w-16 h-16 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold text-slate-400">{t('videoPromptEmptyHeader')}</h3>
                            <p className="mt-2">{t('videoPromptEmptyText')}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};