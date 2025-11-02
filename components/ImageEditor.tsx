import React, { useRef, useEffect, useState, forwardRef, useImperativeHandle } from 'react';
import type { SourceImage } from '../types';

interface ImageEditorProps {
  sourceImage: SourceImage;
  onMaskReady: (mask: SourceImage | null) => void;
  strokeWidth: number;
}

interface Point {
  x: number;
  y: number;
}

const CLOSING_THRESHOLD = 15; // pixels on screen to snap-close the polygon

export const ImageEditor = forwardRef<{ clear: () => void }, ImageEditorProps>(({ sourceImage, onMaskReady, strokeWidth }, ref) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const maskCanvasRef = useRef<HTMLCanvasElement | null>(null);
  
  const [points, setPoints] = useState<Point[]>([]);
  const [isClosed, setIsClosed] = useState(false);
  const [cursorPos, setCursorPos] = useState<Point | null>(null);
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });

  const resetState = () => {
    setPoints([]);
    setIsClosed(false);
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
    clear() {
      resetState();
    }
  }));

  // Initialize canvases
  useEffect(() => {
    const img = new Image();
    img.src = `data:${sourceImage.mimeType};base64,${sourceImage.base64}`;
    img.onload = () => {
      const { naturalWidth, naturalHeight } = img;
      setImageSize({ width: naturalWidth, height: naturalHeight });
      
      const canvas = canvasRef.current;
      if (canvas) {
        canvas.width = naturalWidth;
        canvas.height = naturalHeight;
      }
      
      const maskCanvas = document.createElement('canvas');
      maskCanvas.width = naturalWidth;
      maskCanvas.height = naturalHeight;
      const maskCtx = maskCanvas.getContext('2d');
      if (maskCtx) {
        maskCtx.fillStyle = '#000000'; // Black background for mask
        maskCtx.fillRect(0, 0, naturalWidth, naturalHeight);
      }
      maskCanvasRef.current = maskCanvas;
      
      resetState();
    };
  }, [sourceImage]);

  // Drawing logic
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!ctx || !canvas) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    if (points.length === 0) return;

    // Draw the polygon
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    for (let i = 1; i < points.length; i++) {
      ctx.lineTo(points[i].x, points[i].y);
    }

    if (isClosed) {
      ctx.closePath();
      ctx.fillStyle = 'rgba(220, 38, 38, 0.5)'; // semi-transparent red
      ctx.fill();
      ctx.strokeStyle = '#dc2626'; // red-600
      ctx.lineWidth = strokeWidth;
      ctx.stroke();
    } else {
      ctx.strokeStyle = '#dc2626';
      ctx.lineWidth = strokeWidth;
      ctx.stroke();

      // Draw preview line to cursor
      if (cursorPos && points.length > 0) {
        ctx.beginPath();
        ctx.moveTo(points[points.length - 1].x, points[points.length - 1].y);
        ctx.lineTo(cursorPos.x, cursorPos.y);
        ctx.strokeStyle = '#f97316'; // orange-500
        ctx.setLineDash([5, 5]);
        ctx.stroke();
        ctx.setLineDash([]);
      }
    }

    // Draw points (vertices)
    points.forEach((point, index) => {
        ctx.beginPath();
        const radius = strokeWidth + 2;
        ctx.arc(point.x, point.y, radius, 0, 2 * Math.PI);
        ctx.fillStyle = index === 0 && !isClosed ? '#65a30d' : '#dc2626'; // Start point is green
        ctx.fill();
    });

  }, [points, cursorPos, isClosed, imageSize, strokeWidth]);
  
  // Generate final mask when polygon is closed
  useEffect(() => {
      if (isClosed) {
          const maskCanvas = maskCanvasRef.current;
          const maskCtx = maskCanvas?.getContext('2d');
          if (!maskCtx || !maskCanvas || points.length < 3) return;

          maskCtx.fillStyle = '#000000';
          maskCtx.fillRect(0, 0, maskCanvas.width, maskCanvas.height);
          
          maskCtx.beginPath();
          maskCtx.moveTo(points[0].x, points[0].y);
          for (let i = 1; i < points.length; i++) {
              maskCtx.lineTo(points[i].x, points[i].y);
          }
          maskCtx.closePath();
          maskCtx.fillStyle = '#FFFFFF'; // White fill for the mask
          maskCtx.fill();
          
          const base64 = maskCanvas.toDataURL('image/png').split(',')[1];
          onMaskReady({ base64, mimeType: 'image/png' });
      }
  }, [isClosed, points, onMaskReady]);

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

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (isClosed) return;

    const coords = getCanvasCoordinates(e);
    if (!coords) return;

    if (points.length >= 3) {
      const firstPoint = points[0];
      const canvas = canvasRef.current!;
      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width;
      
      const distance = Math.sqrt(
        Math.pow(coords.x - firstPoint.x, 2) + Math.pow(coords.y - firstPoint.y, 2)
      );

      if (distance < (CLOSING_THRESHOLD * scaleX) ) {
        setIsClosed(true);
        return;
      }
    }

    setPoints(prev => [...prev, coords]);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (isClosed) {
      setCursorPos(null);
      return;
    }
    setCursorPos(getCanvasCoordinates(e));
  };
  
  const handleMouseLeave = () => {
      setCursorPos(null);
  };

  return (
    <div className="absolute inset-0 w-full h-full cursor-crosshair">
      <canvas
        ref={canvasRef}
        onClick={handleCanvasClick}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="w-full h-full"
      />
    </div>
  );
});