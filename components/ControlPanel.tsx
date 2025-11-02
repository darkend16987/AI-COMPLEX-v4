import React, { useState, useEffect } from 'react';
import type { ActiveTab, AspectRatio, SourceImage, EditSubMode, ObjectTransform } from '../types';
import { Icon } from './icons';
import { ImageDropzone } from './ImageDropzone';
import { SocialLinks } from './SocialLinks';
import { generatePromptFromImage, generatePromptFromKeywords, classifyImageType } from '../services/geminiService';
import { sourceImageToDataUrl, padImageToAspectRatio } from '../utils';
import { ASPECT_RATIO_OPTIONS } from '../constants';
import { ImageEditor } from './ImageEditor';
import { BrushEditor } from './BrushEditor';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../locales/translations';

const PromptInput: React.FC<{ prompt: string, setPrompt: React.Dispatch<React.SetStateAction<string>>, placeholder: string }> = ({ prompt, setPrompt, placeholder }) => {
    const { t } = useLanguage();
    const handlePaste = async () => {
        try {
            const text = await navigator.clipboard.readText();
            setPrompt(p => p ? `${p} ${text}` : text);
        } catch (err) {
            console.error('Failed to read clipboard contents: ', err);
        }
    };
    return (
        <>
            <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold text-slate-300">{t('prompt')}</h3>
                <button onClick={handlePaste} title="Paste" className="text-slate-400 hover:text-orange-400"><Icon name="clipboard" className="w-5 h-5"/></button>
            </div>
            <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder={placeholder}
                className="w-full bg-slate-900/70 p-3 rounded-md h-28 resize-none text-sm focus:ring-2 focus:ring-orange-500 focus:outline-none border border-slate-700"
            />
        </>
    );
};

const CreatePanel: React.FC<any> = ({
    sourceImage, setSourceImage, referenceImage, setReferenceImage, prompt, setPrompt,
    negativePrompt, setNegativePrompt,
    imageCount, setImageCount, aspectRatio, setAspectRatio, handleSourceImageUpload
}) => {
    const { language, t } = useLanguage();
    const {
        predefinedReferenceImages, stylePrompts, contextPrompts, lightingPrompts, ASPECT_RATIO_LABELS
    } = translations[language].constants;
    
    const [showReferenceGallery, setShowReferenceGallery] = useState(false);
    const [selectedReferenceCategory, setSelectedReferenceCategory] = useState<keyof typeof predefinedReferenceImages>('building');
    const [isGeneratingPrompt, setIsGeneratingPrompt] = useState(false);
    const [isGeneratingPromptFromText, setIsGeneratingPromptFromText] = useState(false);
    const [isProcessingReference, setIsProcessingReference] = useState(false);
    const [imageType, setImageType] = useState<'interior' | 'exterior'>('exterior');

    useEffect(() => {
        if (sourceImage) {
            // Classify image to use the correct prompt template later.
            classifyImageType(sourceImage).then(type => {
                setImageType(type);
            });
        } else {
            setImageType('exterior'); // Reset when image is removed
        }
    }, [sourceImage]);


    const handleGeneratePrompt = async () => {
        if (!sourceImage) {
            alert(t('alertUploadSource'));
            return;
        }
        setIsGeneratingPrompt(true);
        try {
            const newPrompt = await generatePromptFromImage(sourceImage, language, imageType);
            setPrompt(newPrompt);
        } catch (error) {
            alert(t('alertGenerationFailed'));
        } finally {
            setIsGeneratingPrompt(false);
        }
    };

    const handleGeneratePromptFromKeywords = async () => {
        if (!prompt) {
            alert(t('alertEnterPrompt'));
            return;
        }
        setIsGeneratingPromptFromText(true);
        try {
            const newPrompt = await generatePromptFromKeywords(prompt, language, imageType);
            setPrompt(newPrompt);
        } catch (error) {
            alert(t('alertGenerationFailed'));
        } finally {
            setIsGeneratingPromptFromText(false);
        }
    };

    const handleReferenceImageUpload = async (newReferenceImage: SourceImage) => {
        if (!sourceImage) {
            setReferenceImage(newReferenceImage);
            return;
        }

        setIsProcessingReference(true);
        try {
            const sourceImg = new Image();
            sourceImg.src = sourceImageToDataUrl(sourceImage);
            await new Promise<void>((resolve, reject) => {
                sourceImg.onload = () => resolve();
                sourceImg.onerror = reject;
            });
            const targetAspectRatio = sourceImg.naturalWidth / sourceImg.naturalHeight;

            const paddedImage = await padImageToAspectRatio(newReferenceImage, targetAspectRatio);
            setReferenceImage(paddedImage);

        } catch (error) {
            console.error("Failed to pad reference image:", error);
            alert("Could not process reference image. Using original.");
            setReferenceImage(newReferenceImage);
        } finally {
            setIsProcessingReference(false);
        }
    };

    const handleSetReferenceFromUrl = async (url: string) => {
        setIsProcessingReference(true);
        try {
            const response = await fetch(url);
            const blob = await response.blob();
            const newReferenceImage = await new Promise<SourceImage>((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = () => {
                    const dataUrl = reader.result as string;
                    const [, base64] = dataUrl.split(',');
                    if (base64) {
                        resolve({ base64, mimeType: blob.type });
                    } else {
                        reject(new Error("Could not read base64 from data URL."));
                    }
                };
                reader.onerror = reject;
                reader.readAsDataURL(blob);
            });
            
            await handleReferenceImageUpload(newReferenceImage);
            setShowReferenceGallery(false);

        } catch (error) {
            alert("Could not load reference image.");
            setIsProcessingReference(false);
        }
    };

    const handlePromptSelect = (selectedPrompt: string, categoryPrompts: string[]) => {
        if (!selectedPrompt) return;
        setPrompt((currentPrompt: string) => {
            let existingPrompt = categoryPrompts.find(p => currentPrompt.includes(p));
            let newPrompt = currentPrompt;
            if (existingPrompt) newPrompt = newPrompt.replace(existingPrompt, selectedPrompt);
            else newPrompt = newPrompt.trim() === '' ? selectedPrompt : `${newPrompt}, ${selectedPrompt}`;
            return newPrompt;
        });
    };
    
    return (
        <div className="space-y-6">
            <section>
                <h3 className="font-semibold text-slate-300 mb-3">1. {t('uploadImageOptional')}</h3>
                <p className="text-xs text-slate-400 -mt-2 mb-3">{t('handDrawnHint')}</p>
                {sourceImage ? (
                  <div className='space-y-3'>
                      <ImageDropzone onImageUpload={handleSourceImageUpload} className="cursor-pointer rounded-lg"><div className='bg-black/30 rounded-lg p-2'><img src={sourceImageToDataUrl(sourceImage)} alt="Source" className="w-full h-auto object-contain rounded" /></div></ImageDropzone>
                      <button onClick={() => setSourceImage(null)} className='text-red-400 hover:text-red-500 text-sm px-3 py-1.5 rounded-md hover:bg-red-500/10'>{t('delete')}</button>
                  </div>
                ) : (
                  <ImageDropzone onImageUpload={handleSourceImageUpload} className='w-full h-40 border-2 border-dashed border-slate-600 rounded-lg flex items-center justify-center text-center text-slate-400 text-sm cursor-pointer'>
                      <div><p>{t('dropzoneHint')}</p><p className="text-xs mt-1 text-slate-500">{t('dropzoneFormats')}</p></div>
                  </ImageDropzone>
                )}
            </section>

            <section>
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-semibold text-slate-300">2. {t('referenceImage')}</h3>
                  <button onClick={() => setShowReferenceGallery(!showReferenceGallery)} className="text-sm text-orange-400 hover:text-orange-300 px-2 py-1">{showReferenceGallery ? t('close') : t('choosePresetImage')}</button>
                </div>
                {showReferenceGallery && (
                  <div className="bg-slate-900/70 p-3 rounded-md mb-3 border border-slate-700">
                    <div className="flex space-x-1 mb-3 border-b border-slate-700">
                      {(Object.keys(predefinedReferenceImages) as Array<keyof typeof predefinedReferenceImages>).map(cat => (
                        <button key={cat} onClick={() => setSelectedReferenceCategory(cat)} className={`px-3 py-1.5 text-xs font-semibold capitalize rounded-t-md ${selectedReferenceCategory === cat ? 'bg-slate-700 text-white' : 'text-slate-400 hover:bg-slate-800'}`}>{cat}</button>
                      ))}
                    </div>
                    <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto pr-1">
                      {predefinedReferenceImages[selectedReferenceCategory].length > 0 ? (
                        predefinedReferenceImages[selectedReferenceCategory].map(img => <img key={img.url} src={img.url} alt={img.name} onClick={() => handleSetReferenceFromUrl(img.url)} className="w-full h-20 object-cover rounded cursor-pointer hover:ring-2 hover:ring-orange-500" />)
                      ) : <p className="col-span-2 text-center text-xs text-slate-500 py-4">No images in this category yet.</p>}
                    </div>
                  </div>
                )}
                <p className="text-xs text-slate-400 mb-3">{t('referenceImageHelp')}</p>
                {isProcessingReference ? (
                    <div className='w-full h-32 border-2 border-dashed border-slate-600 rounded-lg flex items-center justify-center text-center text-slate-400 text-sm'>
                        <p>{t('processingImage')}</p>
                    </div>
                ) : referenceImage ? (
                  <div className="relative group">
                    <ImageDropzone onImageUpload={handleReferenceImageUpload} className="cursor-pointer rounded-lg"><div className='bg-black/30 rounded-lg p-2'><img src={sourceImageToDataUrl(referenceImage)} alt="Reference" className="w-full h-auto object-contain rounded" /></div></ImageDropzone>
                    <button onClick={() => setReferenceImage(null)} className="absolute top-3 right-3 bg-black/60 rounded-full text-white hover:bg-black/80 p-1 opacity-0 group-hover:opacity-100 z-10"><Icon name="x-circle" className="w-5 h-5" /></button>
                  </div>
                ) : <ImageDropzone onImageUpload={handleReferenceImageUpload} className='w-full h-32 border-2 border-dashed border-slate-600 rounded-lg flex items-center justify-center text-center text-slate-400 text-sm cursor-pointer'><p>{t('dropzoneHint')}</p></ImageDropzone>}
            </section>

            <section>
                <div className="flex justify-between items-center mb-2">
                    <h3 className="font-semibold text-slate-300">3. {t('prompt')}</h3>
                    <button onClick={async () => {
                        const text = await navigator.clipboard.readText();
                        setPrompt((p: string) => p ? `${p} ${text}` : text);
                    }} title="Paste" className="text-slate-400 hover:text-orange-400"><Icon name="clipboard" className="w-5 h-5"/></button>
                </div>
                <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder={t('promptPlaceholder.create')}
                    className="w-full bg-slate-900/70 p-3 rounded-md h-28 resize-none text-sm focus:ring-2 focus:ring-orange-500 focus:outline-none border border-slate-700"
                />
                <div className="mt-3 space-y-2">
                  <p className="text-xs text-slate-400 mb-1">{t('addFromPresets')}</p>
                  <select onChange={(e) => handlePromptSelect(e.target.value, stylePrompts)} value="" className="w-full bg-slate-900/70 p-3 rounded-md text-sm focus:ring-2 focus:ring-orange-500 focus:outline-none appearance-none border border-slate-700" style={{ background: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%2364748b' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e") right 0.5rem center/1.5em 1.5em no-repeat`}}><option value="" disabled>{t('style')}</option>{stylePrompts.map(p => <option key={p} value={p}>{p}</option>)}</select>
                  <select onChange={(e) => handlePromptSelect(e.target.value, contextPrompts)} value="" className="w-full bg-slate-900/70 p-3 rounded-md text-sm focus:ring-2 focus:ring-orange-500 focus:outline-none appearance-none border border-slate-700" style={{ background: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%2364748b' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e") right 0.5rem center/1.5em 1.5em no-repeat`}}><option value="" disabled>{t('context')}</option>{contextPrompts.map(p => <option key={p} value={p}>{p}</option>)}</select>
                  <select onChange={(e) => handlePromptSelect(e.target.value, lightingPrompts)} value="" className="w-full bg-slate-900/70 p-3 rounded-md text-sm focus:ring-2 focus:ring-orange-500 focus:outline-none appearance-none border border-slate-700" style={{ background: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%2364748b' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e") right 0.5rem center/1.5em 1.5em no-repeat`}}><option value="" disabled>{t('lighting')}</option>{lightingPrompts.map(p => <option key={p} value={p}>{p}</option>)}</select>
                </div>
                <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <button 
                        onClick={handleGeneratePrompt} 
                        disabled={!sourceImage || isGeneratingPrompt || isGeneratingPromptFromText}
                        className="w-full flex items-center justify-center gap-2 font-semibold py-2.5 px-4 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-200 disabled:bg-slate-800 disabled:text-slate-500 disabled:cursor-not-allowed"
                    >
                        <Icon name="sparkles" className={`w-5 h-5 ${isGeneratingPrompt ? 'animate-spin' : ''}`} />
                        {isGeneratingPrompt ? t('generating') : t('generateFromImage')}
                    </button>
                    <button 
                        onClick={handleGeneratePromptFromKeywords} 
                        disabled={!prompt || isGeneratingPromptFromText || isGeneratingPrompt}
                        className="w-full flex items-center justify-center gap-2 font-semibold py-2.5 px-4 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-200 disabled:bg-slate-800 disabled:text-slate-500 disabled:cursor-not-allowed"
                    >
                        <Icon name="sparkles" className={`w-5 h-5 ${isGeneratingPromptFromText ? 'animate-spin' : ''}`} />
                        {isGeneratingPromptFromText ? t('generating') : t('generateFromPromptText')}
                    </button>
                </div>
            </section>

             <section>
                <h3 className="font-semibold text-slate-300 mb-2">4. {t('negativePrompt')}</h3>
                <p className="text-xs text-slate-400 mb-3">{t('negativePromptHelp')}</p>
                 <textarea
                    value={negativePrompt}
                    onChange={(e) => setNegativePrompt(e.target.value)}
                    placeholder={t('promptPlaceholder.negative')}
                    className="w-full bg-slate-900/70 p-3 rounded-md h-20 resize-none text-sm focus:ring-2 focus:ring-orange-500 focus:outline-none border border-slate-700"
                />
            </section>

             <section>
                <h3 className="font-semibold text-slate-300 mb-2">5. {t('aspectRatio')}</h3>
                <p className="text-xs text-slate-400 mb-3">{t('aspectRatioHelp')}</p>
                <div className="grid grid-cols-3 gap-2 text-sm">
                    {ASPECT_RATIO_OPTIONS.map(ratio => (
                        <button key={ratio} onClick={() => setAspectRatio(ratio)} className={`py-2 px-2 text-center rounded-md border ${aspectRatio === ratio ? 'bg-orange-600 text-white font-semibold border-orange-500' : 'bg-slate-900/70 hover:bg-slate-700 border-slate-700'}`}>{ASPECT_RATIO_LABELS[ratio]}</button>
                    ))}
                </div>
              </section>

              <section>
                  <h3 className="font-semibold text-slate-300 mb-2">6. {t('imageCount')}</h3>
                  <div className="flex items-center justify-between bg-slate-900/70 rounded-md p-2">
                      <button onClick={() => setImageCount((c: number) => Math.max(1, c - 1))} className="px-4 py-2 rounded text-xl font-bold hover:bg-slate-700">-</button>
                      <span className="text-lg font-semibold">{imageCount}</span>
                      <button onClick={() => setImageCount((c: number) => Math.min(10, c + 1))} className="px-4 py-2 rounded text-xl font-bold hover:bg-slate-700">+</button>
                  </div>
              </section>
        </div>
    );
};

const CameraAnglePanel: React.FC<any> = ({ sourceImage, setSourceImage, prompt, setPrompt, imageCount, setImageCount, isSelectingArea, setIsSelectingArea, areaSelectorRef, handleSourceImageUpload }) => {
    const { t, language } = useLanguage();
    const { cameraAnglePrompts } = translations[language].constants;

    const handleToggleSelectingArea = () => {
        if (!isSelectingArea) {
            areaSelectorRef.current?.clear();
        }
        setIsSelectingArea((prev: boolean) => !prev);
    };

    const handleClearSelection = () => {
        areaSelectorRef.current?.clear();
        if (isSelectingArea) setIsSelectingArea(false);
    };

    return (
        <div className="space-y-6">
            <section>
                <h3 className="font-semibold text-slate-300 mb-3">1. {t('uploadImage')}</h3>
                {sourceImage ? (
                    <div className='space-y-3'>
                        <ImageDropzone onImageUpload={handleSourceImageUpload} className="cursor-pointer rounded-lg"><div className='bg-black/30 rounded-lg p-2'><img src={sourceImageToDataUrl(sourceImage)} alt="Source" className="w-full h-auto object-contain rounded" /></div></ImageDropzone>
                        <button onClick={() => setSourceImage(null)} className='text-red-400 hover:text-red-500 text-sm px-3 py-1.5 rounded-md hover:bg-red-500/10'>{t('delete')}</button>
                    </div>
                ) : <ImageDropzone onImageUpload={handleSourceImageUpload} className='w-full h-40 border-2 border-dashed border-slate-600 rounded-lg flex items-center justify-center text-center text-slate-400 text-sm cursor-pointer'><div><p>{t('dropzoneHint')}</p><p className="text-xs mt-1 text-slate-500">{t('dropzoneFormats')}</p></div></ImageDropzone>}
            </section>

            {sourceImage && (
                <section>
                    <h3 className="font-semibold text-slate-300 mb-3">2. {t('specifyCloseUpAngle')}</h3>
                    <p className="text-xs text-slate-400 mb-3">{t('specifyCloseUpHelp')}</p>
                    <div className='flex items-center gap-2'>
                        <button onClick={handleToggleSelectingArea} className={`w-full flex items-center justify-center gap-2 font-semibold py-2.5 px-4 rounded-lg ${isSelectingArea ? 'bg-red-600 hover:bg-red-700 text-white' : 'bg-slate-700 hover:bg-slate-600 text-slate-200'}`}><Icon name="pencil-swoosh" className="w-5 h-5" />{isSelectingArea ? t('cancel') : t('selectArea')}</button>
                        {(isSelectingArea) && (<button onClick={handleClearSelection} className='flex-shrink-0 flex items-center justify-center gap-2 text-sm text-slate-300 hover:text-slate-100 px-3 py-2.5 rounded-md bg-slate-900/70 hover:bg-slate-700' title={t('clearSelection')}><Icon name="trash" className="w-4 h-4" /></button>)}
                    </div>
                </section>
            )}

            <div className={`${isSelectingArea ? 'opacity-50 pointer-events-none' : ''} transition-opacity space-y-6`}>
                <section>
                    <h3 className="font-semibold text-slate-300 mb-3">3. {t('chooseCameraAngle')}</h3>
                    <select disabled={isSelectingArea} value={cameraAnglePrompts.some(p => p.value === prompt) ? prompt : ""} onChange={(e) => setPrompt(e.target.value)} className="w-full bg-slate-900/70 p-3 rounded-md text-sm focus:ring-2 focus:ring-orange-500 focus:outline-none appearance-none border border-slate-700" style={{ background: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%2364748b' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e") right 0.5rem center/1.5em 1.5em no-repeat`}}><option value="" disabled>{t('selectCameraAnglePlaceholder')}</option>{cameraAnglePrompts.map(p => <option key={p.display} value={p.value}>{p.display}</option>)}</select>
                </section>
                <section>
                    <h3 className="font-semibold text-slate-300 mb-2">4. {t('customDescription')}</h3>
                    <textarea disabled={isSelectingArea} value={prompt} onChange={(e) => setPrompt(e.target.value)} placeholder={t('customDescriptionPlaceholder')} className="w-full bg-slate-900/70 p-3 rounded-md h-24 resize-none text-sm focus:ring-2 focus:ring-orange-500 focus:outline-none border border-slate-700"/>
                </section>
            </div>
            
            <section>
                <h3 className="font-semibold text-slate-300 mb-2">5. {t('imageCount')}</h3>
                <div className="flex items-center justify-between bg-slate-900/70 rounded-md p-2">
                    <button onClick={() => setImageCount((c: number) => Math.max(1, c - 1))} className="px-4 py-2 rounded text-xl font-bold hover:bg-slate-700">-</button>
                    <span className="text-lg font-semibold">{imageCount}</span>
                    <button onClick={() => setImageCount((c: number) => Math.min(10, c + 1))} className="px-4 py-2 rounded text-xl font-bold hover:bg-slate-700">+</button>
                </div>
            </section>
        </div>
    );
};

const EditPanel: React.FC<any> = ({ 
    sourceImage, setSourceImage, prompt, setPrompt, imageCount, setImageCount, 
    editReferenceImage, setEditReferenceImage, editTool, setEditTool, brushSize, setBrushSize, 
    lassoEditorRef, brushEditorRef, handleSourceImageUpload, setMaskImage,
    editSubMode, setEditSubMode, sourceImage2, setSourceImage2 
}) => {
    const { t, language } = useLanguage();
    const { materialChangeOptions, furnitureChangeOptions } = translations[language].constants;

    const [isMobile, setIsMobile] = React.useState(window.innerWidth < 1024);
    
    React.useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 1024);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleEditReferenceImageUpload = async (newReferenceImage: SourceImage) => {
        if (!sourceImage) {
            setEditReferenceImage(newReferenceImage);
            return;
        }

        try {
            const sourceImg = new Image();
            sourceImg.src = sourceImageToDataUrl(sourceImage);
            await new Promise<void>((resolve, reject) => {
                sourceImg.onload = () => resolve();
                sourceImg.onerror = reject;
            });
            const targetAspectRatio = sourceImg.naturalWidth / sourceImg.naturalHeight;

            const paddedImage = await padImageToAspectRatio(newReferenceImage, targetAspectRatio);
            setEditReferenceImage(paddedImage);

        } catch (error) {
            console.error("Failed to pad edit reference image:", error);
            alert("Could not process reference image. Using original.");
            setEditReferenceImage(newReferenceImage);
        }
    };

    const handleSourceImage2Upload = async (newImage: SourceImage) => {
        if (sourceImage && editSubMode !== 'inpaint') {
            const loadingPrompt = prompt;
            setPrompt(t('processingImage'));
            try {
                const img1 = new Image();
                img1.src = sourceImageToDataUrl(sourceImage);
                await new Promise((resolve, reject) => {
                    img1.onload = resolve;
                    img1.onerror = reject;
                });
                
                const targetAspectRatio = img1.naturalWidth / img1.naturalHeight;
                const paddedImage = await padImageToAspectRatio(newImage, targetAspectRatio);
                setSourceImage2(paddedImage);
            } catch (error) {
                console.error("Failed to pad image:", error);
                alert("Could not auto-adjust image ratio. Using original.");
                setSourceImage2(newImage);
            } finally {
                setPrompt(loadingPrompt);
            }
        } else {
            setSourceImage2(newImage);
        }
    };

    const handleSubModeChange = (mode: EditSubMode) => {
        setEditSubMode(mode);
        if (mode === 'mergeHouse') setPrompt('Ghép công trình từ ảnh 2 vào bối cảnh của ảnh 1, giữ nguyên ánh sáng và cây cối của ảnh 1.');
        else if (mode === 'mergeMaterial') setPrompt('Sử dụng vật liệu từ ảnh 2 và áp dụng nó lên bề mặt tường của tòa nhà trong ảnh 1. Giữ nguyên hình khối kiến trúc của ảnh 1.');
        else if (mode === 'mergeFurniture') setPrompt('Thay thế đồ nội thất trong ảnh 1 (ví dụ: ghế sofa) bằng đồ vật tương ứng từ ảnh 2. Giữ nguyên bối cảnh, ánh sáng và không gian nội thất của ảnh 1.');
        else if (mode === 'inpaint') setPrompt('');
    };
    
    return (
        <div className="space-y-6">
            <section>
                <h3 className="font-semibold text-slate-300 mb-2">1. {t('chooseFunction')}</h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                    <button onClick={() => handleSubModeChange('inpaint')} className={`py-2 px-2 text-center rounded-md border ${editSubMode === 'inpaint' ? 'bg-orange-600 text-white font-semibold border-orange-500' : 'bg-slate-900/70 hover:bg-slate-700 border-slate-700'}`}>{t('editSelectedArea')}</button>
                    <button onClick={() => handleSubModeChange('mergeHouse')} className={`py-2 px-2 text-center rounded-md border ${editSubMode === 'mergeHouse' ? 'bg-orange-600 text-white font-semibold border-orange-500' : 'bg-slate-900/70 hover:bg-slate-700 border-slate-700'}`}>{t('mergeHouse')}</button>
                    <button onClick={() => handleSubModeChange('mergeMaterial')} className={`py-2 px-2 text-center rounded-md border ${editSubMode === 'mergeMaterial' ? 'bg-orange-600 text-white font-semibold border-orange-500' : 'bg-slate-900/70 hover:bg-slate-700 border-slate-700'}`}>{t('mergeMaterial')}</button>
                    <button onClick={() => handleSubModeChange('mergeFurniture')} className={`py-2 px-2 text-center rounded-md border ${editSubMode === 'mergeFurniture' ? 'bg-orange-600 text-white font-semibold border-orange-500' : 'bg-slate-900/70 hover:bg-slate-700 border-slate-700'}`}>{t('mergeFurniture')}</button>
                </div>
                <p className="text-xs text-slate-400 mt-2 text-center">{t(`editFunctionHelp.${editSubMode}`)}</p>
            </section>

            <section>
                <h3 className="font-semibold text-slate-300 mb-3">
                    {editSubMode === 'inpaint' ? `2. ${t('uploadSourceImage')}` : 
                     editSubMode === 'mergeHouse' ? `2. ${t('uploadContextImage')}` : `2. ${t('uploadSourceImage')} (Image 1)`}
                </h3>
                {editSubMode === 'mergeHouse' && (
                  <p className="text-xs text-slate-400 mb-3">{t('contextImageHelp')}</p>
                )}
                {sourceImage ? (
                    <div className='space-y-2'>
                        <div className="relative bg-black/30 p-2 rounded-lg">
                            <img src={sourceImageToDataUrl(sourceImage)} alt="Source" className="w-full h-auto object-contain rounded-lg" />
                            {isMobile && editSubMode === 'inpaint' && (editTool === 'lasso' ? <ImageEditor ref={lassoEditorRef} sourceImage={sourceImage} onMaskReady={setMaskImage} strokeWidth={brushSize}/> : <BrushEditor ref={brushEditorRef} sourceImage={sourceImage} onMaskReady={setMaskImage} brushSize={brushSize}/>)}
                        </div>
                        <button onClick={() => setSourceImage(null)} className='text-sm text-red-400 hover:text-red-500 w-full text-left px-3 py-1.5 rounded-md hover:bg-red-500/10'>{t('resetImage')}</button>
                    </div>
                ) : <ImageDropzone onImageUpload={handleSourceImageUpload} className='w-full h-40 border-2 border-dashed border-slate-600 rounded-lg flex items-center justify-center text-center text-slate-400 text-sm cursor-pointer'><div><p>{t('dropzoneHint')}</p><p className="text-xs mt-1 text-slate-500">{t('dropzoneFormats')}</p></div></ImageDropzone>}
            </section>

            {sourceImage && (
                <>
                    {editSubMode === 'inpaint' ? (
                        <>
                            <section>
                                <h3 className="font-semibold text-slate-300 mb-3">3. {t('chooseToolAndDraw')}</h3>
                                 <div className="flex bg-slate-900/70 rounded-md p-1 space-x-1 mb-4">
                                    <button onClick={() => setEditTool('lasso')} className={`w-1/2 py-2 text-sm rounded ${editTool === 'lasso' ? 'bg-orange-600 text-white font-semibold' : 'text-slate-300 hover:bg-slate-700'}`}>{t('lassoTool')}</button>
                                    <button onClick={() => setEditTool('brush')} className={`w-1/2 py-2 text-sm rounded ${editTool === 'brush' ? 'bg-orange-600 text-white font-semibold' : 'text-slate-300 hover:bg-slate-700'}`}>{t('brushTool')}</button>
                                </div>
                                <button onClick={() => { if (editTool === 'lasso') lassoEditorRef.current?.clear(); else brushEditorRef.current?.clear(); setMaskImage(null); }} className='w-full flex items-center justify-center gap-2 text-sm text-slate-300 hover:text-slate-100 px-3 py-2 rounded-md bg-slate-900/70 hover:bg-slate-700'><Icon name="arrow-uturn-left" className="w-4 h-4" />{t('clearSelection')}</button>
                                <div className='mt-4 space-y-2'>
                                    <label htmlFor="brushSize" className="text-sm font-medium text-slate-400">{editTool === 'lasso' ? t('lineThickness') : t('brushSize')}: {brushSize}px</label>
                                    <input id="brushSize" type="range" min="1" max={editTool === 'lasso' ? 10 : 50} value={brushSize} onChange={(e) => setBrushSize(Number(e.target.value))} className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-orange-500"/>
                                </div>
                            </section>
                            <section>
                                <h3 className="font-semibold text-slate-300 mb-3">4. {t('uploadReferenceOptional')}</h3>
                                <p className="text-xs text-slate-400 mb-3">{t('referenceImageHelpEdit')}</p>
                                {editReferenceImage ? (
                                    <div className="relative group">
                                        <ImageDropzone onImageUpload={handleEditReferenceImageUpload} className="cursor-pointer rounded-lg"><div className='bg-black/30 rounded-lg p-2'><img src={sourceImageToDataUrl(editReferenceImage)} alt="Edit Reference" className="w-full h-auto object-contain rounded" /></div></ImageDropzone>
                                        <button onClick={() => setEditReferenceImage(null)} className="absolute top-3 right-3 bg-black/60 rounded-full text-white hover:bg-black/80 p-1 opacity-0 group-hover:opacity-100 z-10"><Icon name="x-circle" className="w-5 h-5" /></button>
                                    </div>
                                ) : <ImageDropzone onImageUpload={handleEditReferenceImageUpload} className='w-full h-32 border-2 border-dashed border-slate-600 rounded-lg flex items-center justify-center text-center text-slate-400 text-sm cursor-pointer'><p>{t('dropzoneHint')}</p></ImageDropzone>}
                            </section>
                            <section>
                               <PromptInput prompt={prompt} setPrompt={setPrompt} placeholder={t('promptPlaceholder.inpaint')} />
                            </section>
                        </>
                    ) : (
                        <>
                           <section>
                                <h3 className="font-semibold text-slate-300 mb-3">{editSubMode === 'mergeHouse' ? `3. ${t('uploadBuildingImage')}` : `3. ${t('uploadMaterialFurnitureImage')}`}</h3>
                                <p className="text-xs text-slate-400 mb-3">{t('image2Help')}</p>
                                {sourceImage2 ? (
                                    <div className='space-y-3'>
                                        <ImageDropzone onImageUpload={handleSourceImage2Upload} className="cursor-pointer rounded-lg"><div className='bg-black/30 rounded-lg p-2'><img src={sourceImageToDataUrl(sourceImage2)} alt="Source 2" className="w-full h-auto object-contain rounded" /></div></ImageDropzone>
                                        <button onClick={() => setSourceImage2(null)} className='text-red-400 hover:text-red-500 text-sm px-3 py-1.5 rounded-md hover:bg-red-500/10'>{t('delete')}</button>
                                    </div>
                                ) : <ImageDropzone onImageUpload={handleSourceImage2Upload} className='w-full h-32 border-2 border-dashed border-slate-600 rounded-lg flex items-center justify-center text-center text-slate-400 text-sm cursor-pointer'><div><p>{t('dropzoneHint')}</p></div></ImageDropzone>}
                            </section>
                            <section>
                                <PromptInput prompt={prompt} setPrompt={setPrompt} placeholder={t(`promptPlaceholder.${editSubMode}`)}/>
                                {(editSubMode === 'mergeMaterial' || editSubMode === 'mergeFurniture') && (
                                    <div className="mt-3">
                                        <p className="text-xs text-slate-400 mb-1">{t('promptExamples')}</p>
                                        <select
                                            value={(editSubMode === 'mergeMaterial' ? materialChangeOptions : furnitureChangeOptions).some(opt => opt.value === prompt) ? prompt : ""}
                                            onChange={(e) => setPrompt(e.target.value)}
                                            className="w-full bg-slate-900/70 p-3 rounded-md text-sm focus:ring-2 focus:ring-orange-500 focus:outline-none appearance-none border border-slate-700"
                                            style={{ background: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%2364748b' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e") right 0.5rem center/1.5em 1.5em no-repeat`}}
                                        >
                                            <option value="" disabled>{t('selectOption')}</option>
                                            {(editSubMode === 'mergeMaterial' ? materialChangeOptions : furnitureChangeOptions).map(opt => (
                                                <option key={opt.value} value={opt.value}>{opt.display}</option>
                                            ))}
                                        </select>
                                    </div>
                                )}
                            </section>
                        </>
                    )}
                    <section>
                        <h3 className="font-semibold text-slate-300 mb-2">5. {t('imageCount')}</h3>
                        <div className="flex items-center justify-between bg-slate-900/70 rounded-md p-2">
                            <button onClick={() => setImageCount((c: number) => Math.max(1, c - 1))} className="px-4 py-2 rounded text-xl font-bold hover:bg-slate-700">-</button>
                            <span className="text-lg font-semibold">{imageCount}</span>
                            <button onClick={() => setImageCount((c: number) => Math.min(10, c + 1))} className="px-4 py-2 rounded text-xl font-bold hover:bg-slate-700">+</button>
                        </div>
                    </section>
                </>
            )}
        </div>
    );
};

const PlanTo3dPanel: React.FC<any> = ({ sourceImage, setSourceImage, prompt, setPrompt, imageCount, setImageCount, referenceImage, setReferenceImage, planTo3dMode, setPlanTo3dMode, handleSourceImageUpload }) => {
    const { t, language } = useLanguage();
    const { planStylePrompts, planColorizePrompts } = translations[language].constants;
    
     const handleModeChange = (mode: 'render' | 'colorize') => {
        setPlanTo3dMode(mode);
        if (mode === 'render') setPrompt(t('promptPlanTo3d'));
        else setPrompt('');
    };
    return (
        <div className="space-y-6">
            <section>
                <h3 className="font-semibold text-slate-300 mb-3">1. {t('upload2dPlan')}</h3>
                {sourceImage ? (
                    <div className='space-y-3'>
                        <ImageDropzone onImageUpload={handleSourceImageUpload} className="cursor-pointer rounded-lg"><div className='bg-black/30 rounded-lg p-2'><img src={sourceImageToDataUrl(sourceImage)} alt="Floor plan" className="w-full h-auto object-contain rounded" /></div></ImageDropzone>
                        <button onClick={() => setSourceImage(null)} className='text-red-400 hover:text-red-500 text-sm px-3 py-1.5 rounded-md hover:bg-red-500/10'>{t('delete')}</button>
                    </div>
                ) : <ImageDropzone onImageUpload={handleSourceImageUpload} className='w-full h-40 border-2 border-dashed border-slate-600 rounded-lg flex items-center justify-center text-center text-slate-400 text-sm cursor-pointer'><div><p>{t('dropzoneHint')}</p><p className="text-xs mt-1 text-slate-500">{t('dropzoneFormats')}</p></div></ImageDropzone>}
            </section>
            <section>
                <h3 className="font-semibold text-slate-300 mb-2">2. {t('chooseGoal')}</h3>
                <div className="flex bg-slate-900/70 rounded-md p-1 space-x-1">
                    <button onClick={() => handleModeChange('render')} className={`w-1/2 py-2 text-sm rounded ${planTo3dMode === 'render' ? 'bg-orange-600 text-white font-semibold' : 'text-slate-300 hover:bg-slate-700'}`}>{t('create3DImage')}</button>
                    <button onClick={() => handleModeChange('colorize')} className={`w-1/2 py-2 text-sm rounded ${planTo3dMode === 'colorize' ? 'bg-orange-600 text-white font-semibold' : 'text-slate-300 hover:bg-slate-700'}`}>{t('colorizePlan')}</button>
                </div>
            </section>
            {planTo3dMode === 'render' && (
                <section>
                    <h3 className="font-semibold text-slate-300">3. {t('referenceImage')}</h3>
                    {referenceImage ? (
                        <div className="relative group">
                            <ImageDropzone onImageUpload={setReferenceImage} className="cursor-pointer rounded-lg"><div className='bg-black/30 rounded-lg p-2'><img src={sourceImageToDataUrl(referenceImage)} alt="Reference" className="w-full h-auto object-contain rounded" /></div></ImageDropzone>
                            <button onClick={() => setReferenceImage(null)} className="absolute top-3 right-3 bg-black/60 rounded-full text-white hover:bg-black/80 p-1 opacity-0 group-hover:opacity-100 z-10"><Icon name="x-circle" className="w-5 h-5" /></button>
                        </div>
                    ) : <ImageDropzone onImageUpload={setReferenceImage} className='w-full h-32 border-2 border-dashed border-slate-600 rounded-lg flex items-center justify-center text-center text-slate-400 text-sm cursor-pointer'><p>{t('dropzoneHint')}</p></ImageDropzone>}
                </section>
            )}
            <section>
                <PromptInput prompt={prompt} setPrompt={setPrompt} placeholder={planTo3dMode === 'render' ? t('promptPlaceholder.planTo3dRender') : t('promptPlaceholder.planTo3dColorize')} />
                 <div className="mt-3 space-y-2">
                     <select onChange={(e) => setPrompt(prompt + ", " + e.target.value)} value="" className="w-full bg-slate-900/70 p-3 rounded-md text-sm focus:ring-2 focus:ring-orange-500 focus:outline-none appearance-none border border-slate-700" style={{ background: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%2364748b' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e") right 0.5rem center/1.5em 1.5em no-repeat`}}>
                        <option value="" disabled>{t('suggestions')}</option>
                        {(planTo3dMode === 'render' ? planStylePrompts : planColorizePrompts).map(p => <option key={p} value={p}>{p}</option>)}
                      </select>
                </div>
            </section>
        </div>
    );
};

const VideoPanel: React.FC<any> = ({ sourceImage, handleSourceImageUpload, setSourceImage, prompt, setPrompt, videoModel, setVideoModel }) => {
    const { t, language } = useLanguage();
    const { videoPrompts } = translations[language].constants;

    return (
        <div className="space-y-6">
            <section>
                <h3 className="font-semibold text-slate-300 mb-3">1. {t('uploadImage')}</h3>
                {sourceImage ? (
                    <div className='space-y-3'>
                        <ImageDropzone onImageUpload={handleSourceImageUpload} className="cursor-pointer rounded-lg"><div className='bg-black/30 rounded-lg p-2'><img src={sourceImageToDataUrl(sourceImage)} alt="Source" className="w-full h-auto object-contain rounded" /></div></ImageDropzone>
                        <button onClick={() => setSourceImage(null)} className='text-red-400 hover:text-red-500 text-sm px-3 py-1.5 rounded-md hover:bg-red-500/10'>{t('delete')}</button>
                    </div>
                ) : <ImageDropzone onImageUpload={handleSourceImageUpload} className='w-full h-40 border-2 border-dashed border-slate-600 rounded-lg flex items-center justify-center text-center text-slate-400 text-sm cursor-pointer'><div><p>{t('dropzoneHint')}</p></div></ImageDropzone>}
            </section>
            <section>
                <h3 className="font-semibold text-slate-300 mb-2">2. {t('chooseModel')}</h3>
                <select
                    value={videoModel}
                    onChange={(e) => setVideoModel(e.target.value)}
                    className="w-full bg-slate-900/70 p-3 rounded-md text-sm focus:ring-2 focus:ring-orange-500 focus:outline-none appearance-none border border-slate-700"
                    style={{ background: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%2364748b' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e") right 0.5rem center/1.5em 1.5em no-repeat`}}
                >
                    <option value="veo-2.0-generate-preview">{t('veo2NoKey')}</option>
                    <option value="veo-3.1-fast-generate-preview">{t('veo31Fast')}</option>
                    <option value="veo-3.1-generate-preview">{t('veo31HighQuality')}</option>
                </select>
            </section>
            <section>
                <h3 className="font-semibold text-slate-300 mb-2">3. {t('motionDescription')}</h3>
                <PromptInput prompt={prompt} setPrompt={setPrompt} placeholder={t('promptPlaceholder.video')}/>
                 <div className="mt-3 space-y-2">
                     <select value={videoPrompts.some(p => p.value === prompt) ? prompt : ""} onChange={(e) => setPrompt(e.target.value)} className="w-full bg-slate-900/70 p-3 rounded-md text-sm focus:ring-2 focus:ring-orange-500 focus:outline-none appearance-none border border-slate-700" style={{ background: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%2364748b' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e") right 0.5rem center/1.5em 1.5em no-repeat`}}>
                        <option value="" disabled>{t('selectSuggestion')}</option>
                        {videoPrompts.map(p => <option key={p.display} value={p.value}>{p.display}</option>)}
                      </select>
                </div>
            </section>
        </div>
    );
};

const CanvaPanel: React.FC<any> = ({
    sourceImage, handleSourceImageUpload, setSourceImage,
    canvaObjects, setCanvaObjects, canvaObjectTransforms, setCanvaObjectTransforms,
    selectedCanvaObjectIndex, setSelectedCanvaObjectIndex, isCanvaLayoutLocked, setIsCanvaLayoutLocked,
    handleDeleteSelectedCanvaObject
}) => {
    const { t } = useLanguage();

    const handleDecorUpload = async (images: SourceImage[]) => {
        if (!sourceImage) {
            alert(t('alertUploadBg'));
            return;
        }

        try {
            // 1. Get target aspect ratio from background image
            const bgImg = new Image();
            bgImg.src = sourceImageToDataUrl(sourceImage);
            await new Promise((resolve, reject) => {
                bgImg.onload = resolve;
                bgImg.onerror = reject;
            });
            const targetAspectRatio = bgImg.naturalWidth / bgImg.naturalHeight;

            // 2. Process each uploaded decor image to match the aspect ratio
            const processedImages = await Promise.all(images.map(img => padImageToAspectRatio(img, targetAspectRatio)));
            
            // 3. Update state with processed images
            const newTransforms: ObjectTransform[] = processedImages.map(() => ({
                x: 50, y: 50, scale: 20, rotation: 0, flipHorizontal: false, flipVertical: false
            }));
            setCanvaObjects((prev: SourceImage[]) => [...prev, ...processedImages]);
            setCanvaObjectTransforms((prev: ObjectTransform[]) => [...prev, ...newTransforms]);
        } catch (error) {
            console.error("Error processing decor images:", error);
            alert("Error processing decor images. Using originals.");
            // Fallback to original images if processing fails
            const newTransforms: ObjectTransform[] = images.map(() => ({
                x: 50, y: 50, scale: 20, rotation: 0, flipHorizontal: false, flipVertical: false
            }));
            setCanvaObjects((prev: SourceImage[]) => [...prev, ...images]);
            setCanvaObjectTransforms((prev: ObjectTransform[]) => [...prev, ...newTransforms]);
        }
    };

    const handleDuplicateObject = (indexToDuplicate: number) => {
        const objectToDuplicate = canvaObjects[indexToDuplicate];
        if (!objectToDuplicate) return;
    
        const newObject = objectToDuplicate; 
        const newTransform: ObjectTransform = {
            x: 50, y: 50, scale: 20, rotation: 0, flipHorizontal: false, flipVertical: false
        };
    
        const newObjectIndex = canvaObjects.length;
    
        setCanvaObjects((prev: SourceImage[]) => [...prev, newObject]);
        setCanvaObjectTransforms((prev: ObjectTransform[]) => [...prev, newTransform]);
        setSelectedCanvaObjectIndex(newObjectIndex);
    };

    const updateSelectedObjectTransform = (updates: Partial<ObjectTransform>) => {
        if (selectedCanvaObjectIndex === null) return;
        setCanvaObjectTransforms((transforms: ObjectTransform[]) =>
            transforms.map((t, i) =>
                i === selectedCanvaObjectIndex ? { ...t, ...updates } : t
            )
        );
    };
    
    const selectedTransform = selectedCanvaObjectIndex !== null ? canvaObjectTransforms[selectedCanvaObjectIndex] : null;

    return (
      <div className="space-y-6">
        <section>
          <h3 className="font-semibold text-slate-300 mb-3">1. {t('uploadSpaceImage')}</h3>
          {sourceImage ? (
            <div className='space-y-3'>
                <ImageDropzone onImageUpload={handleSourceImageUpload} className="cursor-pointer rounded-lg relative group bg-black/30">
                    <img src={sourceImageToDataUrl(sourceImage)} alt="Source" className="w-full h-auto object-contain rounded-lg p-2" />
                    <div className="absolute inset-0 bg-black/70 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-lg">
                        <div className="text-center text-white">
                            <Icon name="arrow-up-tray" className="w-8 h-8 mx-auto mb-2" />
                            <p className="font-semibold">{t('changeBgImage')}</p>
                            <p className="text-xs">{t('clickOrDropNew')}</p>
                        </div>
                    </div>
                </ImageDropzone>
                <button onClick={() => { setSourceImage(null); setCanvaObjects([]); setCanvaObjectTransforms([]); setSelectedCanvaObjectIndex(null); }} className='text-red-400 hover:text-red-500 text-sm px-3 py-1.5 rounded-md hover:bg-red-500/10'>{t('deleteAll')}</button>
            </div>
          ) : (
            <ImageDropzone onImageUpload={handleSourceImageUpload} className='w-full h-40 border-2 border-dashed border-slate-600 rounded-lg flex items-center justify-center text-center text-slate-400 text-sm cursor-pointer'>
                <div><p>{t('dropzoneHint')}</p><p className="text-xs mt-1 text-slate-500">{t('dropzoneFormats')}</p></div>
            </ImageDropzone>
          )}
        </section>

        {sourceImage && (
            <>
                <section>
                    <h3 className="font-semibold text-slate-300 mb-3">2. {t('uploadDecorImage')}</h3>
                    <ImageDropzone onImagesUpload={handleDecorUpload} multiple={true} className='w-full h-24 border-2 border-dashed border-slate-600 rounded-lg flex items-center justify-center text-center text-slate-400 text-sm cursor-pointer'>
                        <div><p>{t('dropzoneHint')}</p><p className="text-xs mt-1 text-slate-500">{t('decorHelp')}</p></div>
                    </ImageDropzone>
                    {canvaObjects.length > 0 && (
                        <div className="mt-3 grid grid-cols-4 gap-2">
                            {canvaObjects.map((obj: SourceImage, i: number) => (
                                <img
                                    key={i}
                                    src={sourceImageToDataUrl(obj)}
                                    alt={`Decor ${i}`}
                                    onClick={() => handleDuplicateObject(i)}
                                    title={t('clickToAdd')}
                                    className={`w-full h-16 object-contain rounded-md cursor-pointer bg-slate-700/50 p-1 hover:ring-2 hover:ring-orange-400`}
                                />
                            ))}
                        </div>
                    )}
                </section>
                
                <section>
                    <h3 className="font-semibold text-slate-300 mb-3">3. {t('adjustments')}</h3>
                    <div className="flex items-center justify-between p-2 bg-slate-900/70 rounded-md">
                        <label htmlFor="lock-layout" className="text-sm flex items-center gap-2 cursor-pointer">
                            <input
                                type="checkbox"
                                id="lock-layout"
                                checked={isCanvaLayoutLocked}
                                onChange={(e) => setIsCanvaLayoutLocked(e.target.checked)}
                                className="w-4 h-4 rounded text-orange-600 bg-slate-700 border-slate-600 focus:ring-orange-500"
                            />
                            {t('lockLayout')}
                        </label>
                        {selectedCanvaObjectIndex !== null && (
                            <button onClick={handleDeleteSelectedCanvaObject} className="text-red-400 hover:text-red-500" title={t('deleteObject')}><Icon name="trash" className="w-5 h-5"/></button>
                        )}
                    </div>
                    {selectedTransform && !isCanvaLayoutLocked && (
                        <div className="mt-3 space-y-3 p-3 bg-slate-900/70 rounded-md">
                            <div>
                                <label className="text-sm">{t('rotate')}: {selectedTransform.rotation}°</label>
                                <input type="range" min="0" max="360" value={selectedTransform.rotation} onChange={(e) => updateSelectedObjectTransform({ rotation: Number(e.target.value) })} className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-orange-500"/>
                            </div>
                            <div className="flex gap-2">
                                <button onClick={() => updateSelectedObjectTransform({ flipHorizontal: !selectedTransform.flipHorizontal })} className="w-full text-sm py-2 px-3 bg-slate-700 hover:bg-slate-600 rounded-md">{t('flipHorizontal')}</button>
                                <button onClick={() => updateSelectedObjectTransform({ flipVertical: !selectedTransform.flipVertical })} className="w-full text-sm py-2 px-3 bg-slate-700 hover:bg-slate-600 rounded-md">{t('flipVertical')}</button>
                            </div>
                        </div>
                    )}
                </section>
            </>
        )}
      </div>
    );
};

const PromptGenPanel: React.FC<any> = ({ sourceImage, handleSourceImageUpload, setSourceImage }) => {
    const { t } = useLanguage();
    return (
        <div className="space-y-6">
            <section>
                <h3 className="font-semibold text-slate-300 mb-3">1. {t('uploadToAnalyze')}</h3>
                {sourceImage ? (
                    <div className='space-y-3'>
                        <ImageDropzone onImageUpload={handleSourceImageUpload} className="cursor-pointer rounded-lg">
                            <div className='bg-black/30 rounded-lg p-2'>
                                <img src={sourceImageToDataUrl(sourceImage)} alt="Source for prompt generation" className="w-full h-auto object-contain rounded" />
                            </div>
                        </ImageDropzone>
                        <button onClick={() => setSourceImage(null)} className='text-red-400 hover:text-red-500 text-sm px-3 py-1.5 rounded-md hover:bg-red-500/10'>{t('delete')}</button>
                    </div>
                ) : (
                    <ImageDropzone onImageUpload={handleSourceImageUpload} className='w-full h-40 border-2 border-dashed border-slate-600 rounded-lg flex items-center justify-center text-center text-slate-400 text-sm cursor-pointer'>
                        <div>
                            <p>{t('dropzoneHint')}</p>
                            <p className="text-xs mt-1 text-slate-500">{t('analyzeHelp')}</p>
                        </div>
                    </ImageDropzone>
                )}
            </section>
        </div>
    );
};

export const ControlPanel: React.FC<any> = (props) => {
    const { activeTab, handleGeneration, isLoading, sourceImage, sourceImage2, editSubMode, canvaObjects } = props;
    const { t } = useLanguage();

    const renderPanel = () => {
        switch (activeTab) {
            case 'create': return <CreatePanel {...props} />;
            case 'cameraAngle': return <CameraAnglePanel {...props} />;
            case 'edit': return <EditPanel {...props} />;
            case 'planTo3d': return <PlanTo3dPanel {...props} />;
            case 'canva': return <CanvaPanel {...props} />;
            case 'prompt': return <PromptGenPanel {...props} />;
            case 'video': return <VideoPanel {...props} />;
            default: return null;
        }
    }
    
    const isGenerationDisabled = () => {
        if (isLoading) return true;
        if (activeTab === 'canva') {
            return !sourceImage || canvaObjects.length === 0;
        }
        if (activeTab === 'prompt') {
            return !sourceImage;
        }
        if (activeTab !== 'create' && !sourceImage) return true;
        if (activeTab === 'edit' && editSubMode !== 'inpaint' && !sourceImage2) return true;
        return false;
    }

    const getButtonText = () => {
        switch(activeTab) {
            case 'video': return t('createVideo');
            case 'prompt': return t('createPrompt');
            default: return t('createImage');
        }
    }

    const getButtonIcon = () => {
        switch(activeTab) {
            case 'video': return 'video-camera';
            case 'prompt': return 'sparkles';
            default: return 'camera';
        }
    }

    return (
        <div className="lg:col-span-4 xl:col-span-3 bg-[#1e293b] p-5 rounded-xl flex flex-col gap-5 h-max shadow-2xl shadow-black/30 border border-slate-700/50">
            {renderPanel()}
            
            <button onClick={handleGeneration} disabled={isGenerationDisabled()} className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2 disabled:bg-slate-600 disabled:cursor-not-allowed mt-4 text-base">
                <Icon name={getButtonIcon()} className="w-5 h-5" />
                {getButtonText()}
            </button>

            <SocialLinks />
        </div>
    );
};