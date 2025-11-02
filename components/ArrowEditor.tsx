
import React, { useRef, useEffect, useState, forwardRef, useImperativeHandle } from 'react';
import type { SourceImage } from '../types';

interface AreaSelectorProps {
  sourceImage: SourceImage;
  onAreaSelected: (annotatedImage: SourceImage | null) => void;
}

interface Point { x: number; y: number; }
interface Rect { start: Point; end: Point; }

export const AreaSelector = forwardRef<{ clear: () => void }, AreaSelectorProps>(({ sourceImage, onAreaSelected }, ref) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [selection, setSelection] = useState<Rect | null>(null);
    const [isDrawing, setIsDrawing] = useState(false);
    
    const getCanvasCoordinates = (e: React.MouseEvent<HTMLCanvasElement>): Point | null => {
        const canvas = canvasRef.current;
        if (!canvas) return null;
        const rect = canvas.getBoundingClientRect();
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;
        return {
          x: (e.clientX - rect.left) * scaleX,
          y: (e.clientY - rect.top) * scaleY,
        };
    };

    const clearCanvas = () => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');
        if (ctx && canvas) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
    };

    useImperativeHandle(ref, () => ({
        clear() {
            clearCanvas();
            setSelection(null);
            setIsDrawing(false);
        }
    }));

    useEffect(() => {
        const canvas = canvasRef.current;
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.src = `data:${sourceImage.mimeType};base64,${sourceImage.base64}`;
        img.onload = () => {
            if (canvas) {
                canvas.width = img.naturalWidth;
                canvas.height = img.naturalHeight;
                clearCanvas();
                setSelection(null);
                setIsDrawing(false);
            }
        };
    }, [sourceImage]);

    // Draw selection rectangle
    useEffect(() => {
        clearCanvas();
        if (!selection) return;

        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');
        if (!ctx || !canvas) return;
        
        const { start, end } = selection;
        const width = end.x - start.x;
        const height = end.y - start.y;

        ctx.fillStyle = 'rgba(249, 115, 22, 0.2)'; // orange-500 with 20% opacity
        ctx.fillRect(start.x, start.y, width, height);
        
        ctx.strokeStyle = '#f97316'; // orange-500
        ctx.lineWidth = Math.max(2, canvas.width / 200);
        ctx.setLineDash([6, 4]);
        ctx.strokeRect(start.x, start.y, width, height);
        ctx.setLineDash([]);

    }, [selection]);

    const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
        clearCanvas();
        const coords = getCanvasCoordinates(e);
        if (!coords) return;
        
        setIsDrawing(true);
        setSelection({ start: coords, end: coords });
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
        if (!isDrawing || !selection) return;
        
        const coords = getCanvasCoordinates(e);
        if (!coords) return;

        setSelection(prev => prev ? { ...prev, end: coords } : null);
    };

    const handleMouseUp = () => {
        if (!isDrawing || !selection) {
            setIsDrawing(false);
            return;
        }
        
        setIsDrawing(false);
        
        // Normalize rectangle coordinates
        const startX = Math.min(selection.start.x, selection.end.x);
        const startY = Math.min(selection.start.y, selection.end.y);
        const endX = Math.max(selection.start.x, selection.end.x);
        const endY = Math.max(selection.start.y, selection.end.y);
        const width = endX - startX;
        const height = endY - startY;

        // Ignore tiny selections
        if (width < 20 || height < 20) {
            setSelection(null);
            clearCanvas();
            return;
        }

        // Generate the final combined image
        const offscreenCanvas = document.createElement('canvas');
        const offscreenCtx = offscreenCanvas.getContext('2d');
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.src = `data:${sourceImage.mimeType};base64,${sourceImage.base64}`;

        img.onload = () => {
            if (!offscreenCtx || !offscreenCanvas) return;

            offscreenCanvas.width = img.naturalWidth;
            offscreenCanvas.height = img.naturalHeight;

            // 1. Draw original image
            offscreenCtx.drawImage(img, 0, 0);

            // 2. Draw the final rectangle on top
            offscreenCtx.strokeStyle = '#f97316';
            offscreenCtx.lineWidth = Math.max(4, img.naturalWidth / 150);
            offscreenCtx.strokeRect(startX, startY, width, height);
            
            // 3. Get result and call callback
            const base64 = offscreenCanvas.toDataURL('image/png').split(',')[1];
            onAreaSelected({ base64, mimeType: 'image/png' });
        };
    };

    return (
        <div className="absolute inset-0 w-full h-full cursor-crosshair">
          <canvas
            ref={canvasRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp} // End drawing if mouse leaves canvas
            className="w-full h-full"
          />
        </div>
    );
});
