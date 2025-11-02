import React, { useEffect, useState, useMemo, useRef } from 'react';
import { Icon } from './icons';
import { useImageZoom } from '../hooks/useImageZoom';
import { useLanguage } from '../contexts/LanguageContext';

interface FullscreenViewerProps {
    imageUrl: string;
    onClose: () => void;
}

interface FilterState {
  exposure: number;
  contrast: number;
  saturation: number;
  grain: number;
  clarity: number;
  dehaze: number;
  blur: number;
}

const initialFilters: FilterState = {
  exposure: 100,
  contrast: 100,
  saturation: 100,
  grain: 0,
  clarity: 0,
  dehaze: 0,
  blur: 0,
};

const FilterSlider: React.FC<{ label: string; value: number; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; min: number; max: number; step?: number; }> = ({ label, value, onChange, min, max, step = 1 }) => (
  <div className="flex-1 min-w-[120px]">
    <div className="flex justify-between items-center text-xs mb-1">
      <label htmlFor={`${label}-slider`} className="text-slate-300">{label}</label>
      <input
        type="number"
        value={value}
        onChange={onChange}
        min={min}
        max={max}
        step={step}
        aria-label={`${label} value`}
        className="w-16 text-right bg-slate-900/50 px-1.5 py-0.5 rounded text-slate-300 font-mono focus:ring-1 focus:ring-orange-500 focus:outline-none"
      />
    </div>
    <input
      id={`${label}-slider`}
      type="range"
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={onChange}
      aria-label={label}
      className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-orange-500"
    />
  </div>
);

export const FullscreenViewer: React.FC<FullscreenViewerProps> = ({ imageUrl, onClose }) => {
    const { t } = useLanguage();
    const { zoomState, panningRef, handleWheel, handleMouseDown, handleMouseMove, handleMouseUp } = useImageZoom();
    const [filters, setFilters] = useState<FilterState>(initialFilters);
    const imageRef = useRef<HTMLImageElement>(null);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };
        const checkSize = () => setIsMobile(window.innerWidth < 1024);
        
        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('resize', checkSize);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('resize', checkSize);
        };
    }, [onClose]);
    
    const handleFilterChange = (filterName: keyof FilterState, min: number, max: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
        const rawValue = e.target.value;
        // Allow empty input for typing, default to min value if empty.
        let newValue = rawValue === '' ? min : Number(rawValue);

        // Clamp the value to be within the min/max range on every change
        newValue = Math.max(min, Math.min(newValue, max));
        
        setFilters(prev => ({ ...prev, [filterName]: newValue }));
    };

    const resetFilters = () => {
        setFilters(initialFilters);
    };

    const buildFilterString = useMemo(() => {
        const finalContrast = filters.contrast + (filters.clarity / 2) + (filters.dehaze / 2);
        const finalExposure = filters.exposure - (filters.dehaze / 4);

        return [
            `brightness(${finalExposure}%)`,
            `contrast(${finalContrast}%)`,
            `saturate(${filters.saturation}%)`,
            `blur(${filters.blur}px)`,
        ].join(' ');
    }, [filters]);

    const handleDownload = async () => {
        const img = imageRef.current;
        if (!img) return;
    
        try {
            const response = await fetch(img.src);
            if (!response.ok) throw new Error('Network response was not ok');
            const blob = await response.blob();
            const objectURL = URL.createObjectURL(blob);
    
            const imageToDraw = new Image();
            imageToDraw.onload = () => {
                const canvas = document.createElement('canvas');
                canvas.width = imageToDraw.naturalWidth;
                canvas.height = imageToDraw.naturalHeight;
                const ctx = canvas.getContext('2d', { willReadFrequently: true });

                if (!ctx) {
                    URL.revokeObjectURL(objectURL);
                    return;
                }
    
                ctx.filter = buildFilterString;
                ctx.drawImage(imageToDraw, 0, 0, canvas.width, canvas.height);
                
                // Add grain effect to the downloaded image
                if (filters.grain > 0) {
                    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                    const data = imageData.data;
                    const grainAmount = filters.grain * 2; // Adjust multiplier for desired intensity
                    for (let i = 0; i < data.length; i += 4) {
                        const noise = (Math.random() - 0.5) * grainAmount;
                        data[i] = Math.max(0, Math.min(255, data[i] + noise));
                        data[i + 1] = Math.max(0, Math.min(255, data[i + 1] + noise));
                        data[i + 2] = Math.max(0, Math.min(255, data[i + 2] + noise));
                    }
                    ctx.putImageData(imageData, 0, 0);
                }
    
                const link = document.createElement('a');
                link.download = `aicomplex-edited-${Date.now()}.png`;
                link.href = canvas.toDataURL('image/png');
                link.click();
    
                URL.revokeObjectURL(objectURL);
            };
    
            imageToDraw.onerror = () => {
                URL.revokeObjectURL(objectURL);
                alert('Could not load the image for processing.');
            };
            
            imageToDraw.src = objectURL;
    
        } catch (error) {
            console.error('Error downloading or processing image:', error);
            alert('Could not download the image due to network or security policies. You can still right-click the image to save it (without edits).');
        }
    };

    return (
        <div
            className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4 transition-opacity duration-300"
            onClick={onClose}
        >
            <button
                onClick={(e) => { e.stopPropagation(); onClose(); }}
                className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors z-[52]"
                aria-label={t('closeFullscreen')}
            >
                <Icon name="x-circle" className="w-10 h-10" />
            </button>
            <div className="relative w-full h-full flex items-center justify-center" onClick={e => e.stopPropagation()}>
               <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
                    <img
                        ref={imageRef}
                        src={imageUrl}
                        alt="Fullscreen Render"
                        className="max-w-[95vw] max-h-[95vh] object-contain rounded-lg shadow-2xl"
                        onWheel={handleWheel}
                        onMouseDown={handleMouseDown}
                        onMouseMove={handleMouseMove}
                        onMouseUp={handleMouseUp}
                        onMouseLeave={handleMouseUp}
                        style={{
                            transform: `translate(${zoomState.x}px, ${zoomState.y}px) scale(${zoomState.scale})`,
                            cursor: zoomState.scale > 1 ? (panningRef.current.isPanning ? 'grabbing' : 'grab') : 'default',
                            transition: panningRef.current.isPanning ? 'none' : 'transform 0.1s ease-out',
                            willChange: 'transform',
                            filter: buildFilterString,
                        }}
                    />
                    <svg className="absolute w-0 h-0">
                        <defs>
                            <filter id="grainy">
                                <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" stitchTiles="stitch" />
                                <feColorMatrix type="saturate" values="0"/>
                            </filter>
                        </defs>
                    </svg>
                    <div
                        className="absolute inset-0 w-full h-full pointer-events-none"
                        style={{
                            transform: `translate(${zoomState.x}px, ${zoomState.y}px) scale(${zoomState.scale})`,
                            filter: 'url(#grainy)',
                            opacity: filters.grain / 150,
                            mixBlendMode: 'overlay',
                            transition: panningRef.current.isPanning ? 'none' : 'transform 0.1s ease-out',
                        }}
                    ></div>
                </div>
            </div>

            <div
                className={`absolute bg-slate-800/80 backdrop-blur-md border border-slate-700/50 rounded-xl shadow-2xl z-[51] transition-transform duration-300
                    ${isMobile 
                        ? 'bottom-4 left-4 right-4 p-3' 
                        : 'right-4 top-1/2 -translate-y-1/2 p-4 w-64'
                    }`}
                onClick={e => e.stopPropagation()}
            >
                <div className="flex justify-between items-center pb-2 mb-3 border-b border-slate-700">
                    <h3 className="text-base lg:text-lg font-semibold">{t('editImage')}</h3>
                    <button onClick={resetFilters} className="text-xs text-slate-400 hover:text-orange-400 px-2 py-1 rounded-md hover:bg-slate-700/50">{t('reset')}</button>
                </div>
                
                <div className={`grid gap-3 ${isMobile ? 'grid-cols-2 sm:grid-cols-4' : 'grid-cols-1'}`}>
                    <FilterSlider label="Exposure" value={filters.exposure} onChange={handleFilterChange('exposure', 0, 200)} min={0} max={200} />
                    <FilterSlider label="Contrast" value={filters.contrast} onChange={handleFilterChange('contrast', 0, 200)} min={0} max={200} />
                    <FilterSlider label="Saturation" value={filters.saturation} onChange={handleFilterChange('saturation', 0, 200)} min={0} max={200} />
                    <FilterSlider label="Blur" value={filters.blur} onChange={handleFilterChange('blur', 0, 20)} min={0} max={20} />
                    <FilterSlider label="Grain" value={filters.grain} onChange={handleFilterChange('grain', 0, 100)} min={0} max={100} />
                    <FilterSlider label="Clarity" value={filters.clarity} onChange={handleFilterChange('clarity', 0, 100)} min={0} max={100} />
                    <FilterSlider label="Dehaze" value={filters.dehaze} onChange={handleFilterChange('dehaze', 0, 100)} min={0} max={100} />
                </div>
                
                <button
                  onClick={handleDownload}
                  className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 mt-4"
                >
                    <Icon name="download" className="w-5 h-5"/>
                    {t('saveImage')}
                </button>
            </div>
        </div>
    );
};