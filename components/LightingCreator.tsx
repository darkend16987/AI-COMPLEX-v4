
import React, { useEffect } from 'react';
import type { SourceImage } from '../types';
import { useLanguage } from '../contexts/LanguageContext';
import { Icon } from './icons';
import { ImageDropzone } from './ImageDropzone';
import { sourceImageToDataUrl } from '../utils';
import { translations } from '../locales/translations';

interface LightingCreatorProps {
    onBack: () => void;
    lightingSourceImage: SourceImage | null;
    setLightingSourceImage: (image: SourceImage | null) => void;
    lightingSelectedPrompts: { interior: string; exterior: string };
    setLightingSelectedPrompts: (prompts: { interior: string; exterior: string }) => void;
    lightingImageCount: number;
    setLightingImageCount: (count: number) => void;
    lightingGeneratedImages: string[];
    lightingSelectedImage: string | null;
    setLightingSelectedImage: (image: string | null) => void;
    handleLightingGeneration: () => void;
    isLoading: boolean;
}

export const LightingCreator: React.FC<LightingCreatorProps> = ({
    onBack,
    lightingSourceImage: sourceImage,
    setLightingSourceImage: setSourceImage,
    lightingSelectedPrompts: selectedPrompts,
    setLightingSelectedPrompts: setSelectedPrompts,
    lightingImageCount: imageCount,
    setLightingImageCount: setImageCount,
    lightingGeneratedImages: generatedImages,
    lightingSelectedImage: selectedImage,
    setLightingSelectedImage: setSelectedImage,
    handleLightingGeneration: handleGenerate,
    isLoading
}) => {
    const { t, language } = useLanguage();
    // FIX: Replaced `t()` with a direct import of `translations` to correctly fetch the constants object.
    const { interiorLightingOptions, exteriorLightingOptions } = translations[language].constants;

    useEffect(() => {
        if (generatedImages.length > 0 && !selectedImage) {
            setSelectedImage(generatedImages[0]);
        }
    }, [generatedImages, selectedImage, setSelectedImage]);

    const handlePromptChange = (type: 'interior' | 'exterior', value: string) => {
        if (type === 'interior') {
            setSelectedPrompts({ interior: value, exterior: '' });
        } else { // type === 'exterior'
            setSelectedPrompts({ interior: '', exterior: value });
        }
    };

    return (
        <div className="bg-[#1e293b] p-5 rounded-xl border border-slate-700/50 animate-fade-in">
            <div className="flex items-center justify-between mb-8 border-b border-slate-700 pb-4">
                <div className="flex items-center gap-4">
                    <Icon name="sparkles" className="w-8 h-8 text-orange-500" />
                    <div>
                        <h2 className="text-2xl font-bold text-slate-100">{t('lightingTitle')}</h2>
                        <p className="text-sm text-slate-400">{t('lightingDesc')}</p>
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
                        <h3 className="font-semibold text-slate-300 mb-3">{t('uploadModelImage')}</h3>
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
                        <h3 className="font-semibold text-slate-300 mb-2">{t('chooseLighting')}</h3>
                        <div className="space-y-3">
                            <select value={selectedPrompts.interior} onChange={(e) => handlePromptChange('interior', e.target.value)} className="w-full bg-slate-900/70 p-3 rounded-md text-sm focus:ring-2 focus:ring-orange-500 focus:outline-none appearance-none border border-slate-700" style={{ background: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%2364748b' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e") right 0.5rem center/1.5em 1.5em no-repeat`}}>
                                {interiorLightingOptions.map((opt: { display: string; value: string; }) => <option key={opt.value} value={opt.value}>{opt.display}</option>)}
                            </select>
                             <select value={selectedPrompts.exterior} onChange={(e) => handlePromptChange('exterior', e.target.value)} className="w-full bg-slate-900/70 p-3 rounded-md text-sm focus:ring-2 focus:ring-orange-500 focus:outline-none appearance-none border border-slate-700" style={{ background: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%2364748b' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e") right 0.5rem center/1.5em 1.5em no-repeat`}}>
                                {exteriorLightingOptions.map((opt: { display: string; value: string; }) => <option key={opt.value} value={opt.value}>{opt.display}</option>)}
                            </select>
                        </div>
                    </section>
                    <section>
                        <h3 className="font-semibold text-slate-300 mb-2">{t('imageCount')}</h3>
                        <div className="flex items-center justify-between bg-slate-900/70 rounded-md p-2">
                            <button onClick={() => setImageCount(Math.max(1, imageCount - 1))} className="px-4 py-2 rounded text-xl font-bold hover:bg-slate-700">-</button>
                            <span className="text-lg font-semibold">{imageCount}</span>
                            <button onClick={() => setImageCount(Math.min(4, imageCount + 1))} className="px-4 py-2 rounded text-xl font-bold hover:bg-slate-700">+</button>
                        </div>
                    </section>
                    <button onClick={handleGenerate} disabled={isLoading || !sourceImage || (!selectedPrompts.interior && !selectedPrompts.exterior)} className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2 disabled:bg-slate-600 disabled:cursor-not-allowed text-base">
                        <Icon name="sparkles" className="w-5 h-5" />
                        {isLoading ? t('generating') : t('generateLightingButton')}
                    </button>
                </div>
                <div className="lg:col-span-8 bg-slate-900/50 rounded-lg min-h-[60vh] flex items-center justify-center p-4 border border-slate-700">
                    {isLoading ? (
                        <div className="text-center text-slate-400">
                            <Icon name="sparkles" className="w-12 h-12 animate-spin text-orange-500 mx-auto mb-4" />
                            <p>{t('generatingLighting')}...</p>
                        </div>
                    ) : generatedImages.length > 0 && selectedImage ? (
                        <div className="flex flex-col h-full w-full">
                            <div className="flex-grow flex items-center justify-center relative group bg-black/30 rounded-lg overflow-hidden">
                                <img src={selectedImage} alt="Selected Lighting Render" className="max-w-full max-h-[65vh] object-contain" />
                                <div className="absolute top-1/2 right-4 -translate-y-1/2 flex flex-col items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <a href={selectedImage} download={`aicomplex-lighting-${Date.now()}.png`} className="bg-slate-800/80 backdrop-blur-sm border border-slate-600 hover:bg-slate-700 text-white p-2.5 rounded-full inline-flex" title={t('downloadImage')}>
                                        <Icon name="download" className="w-5 h-5" />
                                    </a>
                                </div>
                            </div>
                            {generatedImages.length > 1 && (
                                <div className={`flex-shrink-0 mt-4 grid grid-cols-${Math.min(generatedImages.length, 4)} gap-2`}>
                                    {generatedImages.map((image, index) => (
                                        <div key={index} className={`relative cursor-pointer rounded-md overflow-hidden transition-all duration-200 h-28 ${selectedImage === image ? 'ring-2 ring-orange-500' : 'opacity-60 hover:opacity-100'}`} onClick={() => setSelectedImage(image)}>
                                            <img src={image} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover" />
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="text-center text-slate-500">
                            <Icon name="sparkles" className="w-16 h-16 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold text-slate-400">{t('lightingEmptyHeader')}</h3>
                            <p className="mt-2">{t('lightingEmptyText')}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};