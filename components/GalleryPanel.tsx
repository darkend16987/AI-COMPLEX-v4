import React from 'react';
import { Icon } from './icons';
import type { ActiveTab, SourceImage, ObjectTransform } from '../types';
import { ImageEditor } from './ImageEditor';
import { BrushEditor } from './BrushEditor';
import { AreaSelector } from './ArrowEditor';
import { InteractiveCanvas } from './InteractiveCanvas';
import { useLanguage } from '../contexts/LanguageContext';

interface GalleryPanelProps {
    isLoading: boolean;
    loadingMessage: string;
    imageCount: number;
    activeTab: ActiveTab;
    generatedVideoUrl: string | null;
    generatedImages: string[];
    generatedPrompts: string | null;
    selectedImage: string | null;
    lastUsedPrompt: string;
    sourceImage: SourceImage | null;
    sourceImage2: SourceImage | null;
    isSelectingArea: boolean;
    isEditingMask: boolean;
    editTool: 'lasso' | 'brush';
    brushSize: number;
    setSelectedImage: (image: string) => void;
    setMaskImage: (mask: SourceImage | null) => void;
    onAreaSelected: (annotatedImage: SourceImage | null) => void;
    setFullscreenImage: (url: string | null) => void;
    handleStartEditing: () => void;
    handleSetAsSourceImage: () => void;
    copyToClipboard: (text: string) => void;
    onGenerateFromPrompt: (prompt: string) => void;
    areaSelectorRef: React.RefObject<{ clear: () => void }>;
    lassoEditorRef: React.RefObject<{ clear: () => void }>;
    brushEditorRef: React.RefObject<{ clear: () => void }>;
    canvaObjects: SourceImage[];
    canvaObjectTransforms: ObjectTransform[];
    setCanvaObjectTransforms: React.Dispatch<React.SetStateAction<ObjectTransform[]>>;
    selectedCanvaObjectIndex: number | null;
    setSelectedCanvaObjectIndex: React.Dispatch<React.SetStateAction<number | null>>;
    isCanvaLayoutLocked: boolean;
}

const PromptDisplay: React.FC<{ 
    promptsText: string; 
    copyToClipboard: (text: string) => void; 
    onGenerateFromPrompt: (prompt: string) => void;
}> = ({ promptsText, copyToClipboard, onGenerateFromPrompt }) => {
    const { t } = useLanguage();
    const lines = promptsText.split('\n').filter(line => line.trim() !== '');

    return (
        <div className="space-y-2 text-slate-300 h-full p-2">
            {lines.map((line, index) => {
                const cleanLine = line.trim();
                // Regex to detect new header format, e.g., "1️⃣ 5 góc toàn cảnh (wide shots)"
                // This is specific enough to avoid misclassifying regular prompts as headers.
                const isHeader = /^\s*\d+️⃣\s*\d+\s*góc/i.test(cleanLine);

                if (isHeader) {
                    return (
                        <h4 key={index} className="text-lg font-semibold text-slate-200 pt-4 first:pt-0">
                            {cleanLine}
                        </h4>
                    );
                }
                return (
                    <div key={index} className="flex items-center justify-between gap-2 p-3 bg-slate-900/50 rounded-md border border-slate-700/80 hover:bg-slate-700/50 transition-colors">
                        <p className="text-sm flex-grow">{cleanLine}</p>
                        <div className="flex items-center gap-1 flex-shrink-0">
                            <button onClick={() => onGenerateFromPrompt(cleanLine)} title={t('createFromThisPrompt')} className="text-slate-400 hover:text-orange-400 p-1.5 rounded-md hover:bg-slate-600/50">
                                <Icon name="camera" className="w-5 h-5"/>
                            </button>
                            <button onClick={() => copyToClipboard(cleanLine)} title={t('copyPrompt')} className="text-slate-400 hover:text-orange-400 p-1.5 rounded-md hover:bg-slate-600/50">
                                <Icon name="clipboard" className="w-5 h-5"/>
                            </button>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

const LoadingState: React.FC<{ isVideo: boolean, isPromptGen: boolean, message: string }> = ({ isVideo, isPromptGen, message }) => {
    const { t } = useLanguage();
    if (isPromptGen) {
        return (
            <div className="h-full flex flex-col items-center justify-center text-center text-slate-400">
                <Icon name="cpu-chip" className="w-16 h-16 mb-4 text-slate-500 animate-pulse" />
                <h3 className="text-xl font-semibold text-slate-300">{message || t('loadingPromptHeader')}</h3>
                <p className="mt-2 text-sm max-w-sm">{t('loadingPromptHelp')}</p>
            </div>
        );
    }
    if (isVideo) {
        return (
            <div className="h-full flex flex-col items-center justify-center text-center text-slate-400">
                <Icon name="video-camera" className="w-16 h-16 mb-4 text-slate-500 animate-pulse" />
                <h3 className="text-xl font-semibold text-slate-300">{message || t('loadingVideoHeader')}</h3>
                <p className="mt-2 text-sm max-w-sm">{t('loadingVideoHelp')}</p>
            </div>
        );
    }
    return (
        <div className="h-full flex flex-col items-center justify-center text-center">
            <Icon name="camera" className="w-16 h-16 mb-6 text-slate-500 animate-pulse" />
            <h3 className="text-xl font-semibold text-slate-300 mb-8">{message || t('loadingMessageDefault')}</h3>
            <div className="p-4 bg-slate-800/50 border border-slate-700 rounded-lg text-slate-400 text-sm w-full max-w-lg text-left space-y-2">
                <p><strong className="font-semibold text-slate-300">{t('loadingUsageLimit')}</strong> {t('loadingUsageText')}</p>
                <p>{t('loadingUsageNote')}</p>
            </div>
        </div>
    );
};

const EmptyState: React.FC<{ activeTab: ActiveTab }> = ({ activeTab }) => {
    const { t } = useLanguage();
    let message = t('emptyStateHeader');
    let subMessage = t('emptyStateText');

    if (activeTab === 'canva') {
        message = t('emptyCanvaHeader');
        subMessage = t('emptyCanvaText');
    }

    if (activeTab === 'prompt') {
        message = t('emptyPromptHeader');
        subMessage = t('emptyPromptText');
    }

    return (
        <div className="h-full flex flex-col items-center justify-center text-center text-slate-500">
            <Icon name={'sparkles'} className="w-16 h-16 mb-4 text-slate-600" />
            <h3 className="text-xl font-semibold text-slate-400">
                {message}
            </h3>
            <p className="mt-2">
                {subMessage}
            </p>
        </div>
    );
};

export const GalleryPanel: React.FC<GalleryPanelProps> = ({
    isLoading, loadingMessage, imageCount, activeTab, generatedVideoUrl, generatedImages, generatedPrompts, selectedImage, lastUsedPrompt, sourceImage, sourceImage2,
    isSelectingArea, isEditingMask, editTool, brushSize, setSelectedImage, setMaskImage, onAreaSelected, setFullscreenImage,
    handleStartEditing, handleSetAsSourceImage, copyToClipboard, onGenerateFromPrompt, areaSelectorRef, lassoEditorRef, brushEditorRef,
    canvaObjects, canvaObjectTransforms, setCanvaObjectTransforms, selectedCanvaObjectIndex, setSelectedCanvaObjectIndex, isCanvaLayoutLocked
}) => {
    const { t } = useLanguage();
    const [isMobile, setIsMobile] = React.useState(window.innerWidth < 1024);
    
    React.useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 1024);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const renderContent = () => {
        if (isLoading) {
            return <LoadingState isVideo={activeTab === 'video'} isPromptGen={activeTab === 'prompt'} message={loadingMessage} />;
        }

        if (activeTab === 'prompt' && generatedPrompts) {
            return <PromptDisplay promptsText={generatedPrompts} copyToClipboard={copyToClipboard} onGenerateFromPrompt={onGenerateFromPrompt} />;
        }

        // Handle Canva's state BEFORE generation results are available
        if (activeTab === 'canva' && generatedImages.length === 0) {
            if (sourceImage) {
                return (
                    <InteractiveCanvas
                        bgImage={sourceImage}
                        canvaObjects={canvaObjects}
                        canvaObjectTransforms={canvaObjectTransforms}
                        setCanvaObjectTransforms={setCanvaObjectTransforms}
                        selectedCanvaObjectIndex={selectedCanvaObjectIndex}
                        setSelectedCanvaObjectIndex={setSelectedCanvaObjectIndex}
                        isCanvaLayoutLocked={isCanvaLayoutLocked}
                    />
                );
            }
            return <EmptyState activeTab={activeTab} />;
        }
        
        if (generatedVideoUrl) {
            return (
                <div className="flex flex-col h-full">
                    <div className="flex-grow flex items-center justify-center relative group bg-black/30 rounded-lg overflow-hidden">
                        <video src={generatedVideoUrl} controls autoPlay loop className="max-w-full max-h-[75vh] object-contain" />
                        <div className="absolute bottom-2 right-2 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <a href={generatedVideoUrl} download={`aicomplex-video-${Date.now()}.mp4`} className="bg-slate-800/80 backdrop-blur-sm border border-slate-600 hover:bg-slate-700 text-white p-2 rounded-md" title={t('downloadVideo')}>
                                <Icon name="download" className="w-5 h-5" />
                            </a>
                        </div>
                    </div>
                     <div className="my-4 p-3 bg-slate-900/50 rounded-md border border-slate-700/80">
                      <div className="flex justify-between items-start gap-3">
                        <p className="text-sm text-slate-300 flex-grow">{lastUsedPrompt}</p>
                        <button onClick={() => copyToClipboard(lastUsedPrompt)} title={t('copyPrompt')} className="text-slate-400 hover:text-orange-400 flex-shrink-0">
                          <Icon name="clipboard" className="w-5 h-5"/>
                        </button>
                      </div>
                    </div>
                </div>
            );
        }
        
        // This now handles results for ALL tabs, including Canva
        if (generatedImages.length > 0 && selectedImage) {
            return (
                <div className="flex flex-col h-full">
                    <div className="flex-grow flex items-center justify-center relative group bg-black/30 rounded-lg overflow-hidden">
                        <img src={selectedImage} alt="Selected Render" className="max-w-full max-h-[65vh] object-contain" />
                        {activeTab === 'cameraAngle' && sourceImage && isSelectingArea && (
                            <AreaSelector ref={areaSelectorRef} sourceImage={sourceImage} onAreaSelected={onAreaSelected} />
                        )}
                        {!isMobile && activeTab === 'edit' && sourceImage && (
                            editTool === 'lasso' ? (isEditingMask && <ImageEditor ref={lassoEditorRef} sourceImage={sourceImage} onMaskReady={setMaskImage} strokeWidth={brushSize}/>)
                            : (<BrushEditor ref={brushEditorRef} sourceImage={sourceImage} onMaskReady={setMaskImage} brushSize={brushSize}/>)
                        )}
                        <div className="absolute top-1/2 right-4 -translate-y-1/2 flex flex-col items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <button onClick={() => selectedImage && setFullscreenImage(selectedImage)} className="bg-slate-800/80 backdrop-blur-sm border border-slate-600 hover:bg-slate-700 text-white p-2.5 rounded-full" title={t('fullscreen')}>
                                <Icon name="arrows-pointing-out" className="w-5 h-5" />
                            </button>
                            <button onClick={handleStartEditing} className="bg-slate-800/80 backdrop-blur-sm border border-slate-600 hover:bg-slate-700 text-white p-2.5 rounded-full" title={t('editThisImage')}>
                                <Icon name="pencil-swoosh" className="w-5 h-5" />
                            </button>
                            <button onClick={handleSetAsSourceImage} className="bg-slate-800/80 backdrop-blur-sm border border-slate-600 hover:bg-slate-700 text-white p-2.5 rounded-full" title={t('useAsSource')}>
                                <Icon name="arrow-up-tray" className="w-5 h-5" />
                            </button>
                            <a href={selectedImage} download={`aicomplex-${Date.now()}.png`} className="bg-slate-800/80 backdrop-blur-sm border border-slate-600 hover:bg-slate-700 text-white p-2.5 rounded-full inline-flex" title={t('downloadImage')}>
                                <Icon name="download" className="w-5 h-5" />
                            </a>
                        </div>
                    </div>
                    <div className="my-4 p-3 bg-slate-900/50 rounded-md border border-slate-700/80">
                        <div className="flex justify-between items-start gap-3">
                            <p className="text-sm text-slate-300 flex-grow">{lastUsedPrompt || (activeTab === 'edit' && t('noPrompt'))}</p>
                            <button onClick={() => copyToClipboard(lastUsedPrompt)} title={t('copyPrompt')} className="text-slate-400 hover:text-orange-400 flex-shrink-0">
                                <Icon name="clipboard" className="w-5 h-5"/>
                            </button>
                        </div>
                    </div>
                    {generatedImages.length > 1 && (
                        <div className={`flex-shrink-0 grid grid-cols-${Math.min(generatedImages.length, 4)} gap-2`}>
                            {generatedImages.map((image, index) => (
                                <div key={index} className={`relative cursor-pointer rounded-md overflow-hidden transition-all duration-200 h-28 ${selectedImage === image ? 'ring-2 ring-orange-500' : 'opacity-60 hover:opacity-100'}`} onClick={() => setSelectedImage(image)}>
                                    <img src={image} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover" />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            );
        }
        return <EmptyState activeTab={activeTab} />;
    };
    
    return (
        <div className="lg:col-span-8 xl:col-span-9 bg-[#1e293b] p-4 rounded-xl shadow-2xl shadow-black/30 border border-slate-700/50 min-h-[60vh] lg:min-h-0">
            <div className='h-full max-h-[85vh] overflow-y-auto pr-2'>
                {renderContent()}
            </div>
        </div>
    );
};