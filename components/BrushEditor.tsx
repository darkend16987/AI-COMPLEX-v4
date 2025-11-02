
import React, { useRef, useEffect, useState, forwardRef, useImperativeHandle } from 'react';
import type { SourceImage } from '../types';

interface BrushEditorProps {
  sourceImage: SourceImage;
  onMaskReady: (mask: SourceImage | null) => void;
  brushSize: number;
}

interface Point {
  x: number;
  y: number;
}

export const BrushEditor = forwardRef<{ clear: () => void }, BrushEditorProps>(({ sourceImage, onMaskReady, brushSize }, ref) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const maskCanvasRef = useRef<HTMLCanvasElement | null>(null);
  
  const [isDrawing, setIsDrawing] = useState(false);
  const [lastPoint, setLastPoint] = useState<Point | null>(null);
  const [currentStroke, setCurrentStroke] = useState<Point[]>([]);

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

  const clear = () => {
    setIsDrawing(false);
    setLastPoint(null);
    setCurrentStroke([]);
    onMaskReady(null);

    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      ctx?.clearRect(0, 0, canvas.width, canvas.height);
    }

    const maskCanvas = maskCanvasRef.current;
    if (maskCanvas) {
      const maskCtx = maskCanvas.getContext('2d');
      if (maskCtx) {
        maskCtx.fillStyle = '#000000';
        maskCtx.fillRect(0, 0, maskCanvas.width, maskCanvas.height);
      }
    }
  };

  useImperativeHandle(ref, () => ({
    clear
  }));

  // Initialize canvases
  useEffect(() => {
    const img = new Image();
    img.src = `data:${sourceImage.mimeType};base64,${sourceImage.base64}`;
    img.onload = () => {
      const { naturalWidth, naturalHeight } = img;
      
      const canvas = canvasRef.current;
      if (canvas) {
        canvas.width = naturalWidth;
        canvas.height = naturalHeight;
      }
      
      const maskCanvas = document.createElement('canvas');
      maskCanvas.width = naturalWidth;
      maskCanvas.height = naturalHeight;
      maskCanvasRef.current = maskCanvas;
      
      clear();
    };
  }, [sourceImage]);

  const drawLine = (start: Point, end: Point) => {
    const visibleCtx = canvasRef.current?.getContext('2d');
    const maskCtx = maskCanvasRef.current?.getContext('2d');
    if (!visibleCtx || !maskCtx) return;

    // Draw on visible canvas (for user feedback)
    visibleCtx.beginPath();
    visibleCtx.moveTo(start.x, start.y);
    visibleCtx.lineTo(end.x, end.y);
    visibleCtx.strokeStyle = 'rgba(220, 38, 38, 0.7)'; // semi-transparent red
    visibleCtx.lineWidth = brushSize;
    visibleCtx.lineCap = 'round';
    visibleCtx.lineJoin = 'round';
    visibleCtx.stroke();
    
    // Draw on mask canvas (the actual mask)
    maskCtx.beginPath();
    maskCtx.moveTo(start.x, start.y);
    maskCtx.lineTo(end.x, end.y);
    maskCtx.strokeStyle = '#FFFFFF'; // White
    maskCtx.lineWidth = brushSize;
    maskCtx.lineCap = 'round';
    maskCtx.lineJoin = 'round';
    maskCtx.stroke();
  };
  
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
      const coords = getCanvasCoordinates(e);
      if (!coords) return;
      setIsDrawing(true);
      setLastPoint(coords);
      setCurrentStroke([coords]);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const coords = getCanvasCoordinates(e);
    if (!coords || !lastPoint) return;

    drawLine(lastPoint, coords);
    setLastPoint(coords);
    setCurrentStroke(prev => [...prev, coords]);
  };

  const handleMouseUp = () => {
    if (!isDrawing) return;

    // Check if the drawn path is a closed loop
    if (currentStroke.length > 2) {
      const startPoint = currentStroke[0];
      const endPoint = currentStroke[currentStroke.length - 1];
      const distance = Math.sqrt(Math.pow(endPoint.x - startPoint.x, 2) + Math.pow(endPoint.y - startPoint.y, 2));
      
      // Define a threshold for closing the loop, proportional to brush size.
      const closingThreshold = brushSize * 1.5;

      if (distance < closingThreshold) {
        // It's a closed shape, so we fill it.
        const visibleCtx = canvasRef.current?.getContext('2d');
        const maskCtx = maskCanvasRef.current?.getContext('2d');
        if (visibleCtx && maskCtx) {
          // Create the path from the stroke points
          const path = new Path2D();
          path.moveTo(currentStroke[0].x, currentStroke[0].y);
          for (let i = 1; i < currentStroke.length; i++) {
              path.lineTo(currentStroke[i].x, currentStroke[i].y);
          }
          path.closePath();

          // Fill the path on the visible canvas
          visibleCtx.fillStyle = 'rgba(220, 38, 38, 0.7)';
          visibleCtx.fill(path);

          // Fill the path on the mask canvas
          maskCtx.fillStyle = '#FFFFFF';
          maskCtx.fill(path);
        }
      }
    }
    
    // Finalize the drawing state
    setIsDrawing(false);
    setLastPoint(null);
    setCurrentStroke([]);
    
    // Update the parent component with the new mask
    const maskCanvas = maskCanvasRef.current;
    if (maskCanvas) {
        const base64 = maskCanvas.toDataURL('image/png').split(',')[1];
        onMaskReady({ base64, mimeType: 'image/png' });
    }
  };

  const handleMouseLeave = () => {
    if (isDrawing) {
        handleMouseUp();
    }
  };

  return (
    <div className="absolute inset-0 w-full h-full cursor-crosshair">
      <canvas
        ref={canvasRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        className="w-full h-full"
      />
    </div>
  );
});
