import React, { useState, useRef, useCallback } from 'react';

export const useImageZoom = () => {
    const [zoomState, setZoomState] = useState({ scale: 1, x: 0, y: 0 });
    const panningRef = useRef({ isPanning: false, startX: 0, startY: 0, lastX: 0, lastY: 0 });

    const resetZoom = useCallback(() => {
        setZoomState({ scale: 1, x: 0, y: 0 });
    }, []);

    const handleWheel = (e: React.WheelEvent<HTMLImageElement>) => {
        e.preventDefault();
        const { deltaY, clientX, clientY } = e;
        const rect = e.currentTarget.getBoundingClientRect();

        const scaleFactor = 1.1;
        const newScale = deltaY < 0 ? zoomState.scale * scaleFactor : zoomState.scale / scaleFactor;
        const clampedScale = Math.min(Math.max(1, newScale), 10);

        const currentScale = zoomState.scale;
        
        if (clampedScale === currentScale) {
            if (clampedScale === 1 && (zoomState.x !== 0 || zoomState.y !== 0)) {
                resetZoom();
            }
            return;
        }

        const mouseX = clientX - rect.left;
        const mouseY = clientY - rect.top;

        const newX = mouseX - (mouseX - zoomState.x) * (clampedScale / currentScale);
        const newY = mouseY - (mouseY - zoomState.y) * (clampedScale / currentScale);
        
        if (clampedScale <= 1) {
            resetZoom();
        } else {
            setZoomState({ scale: clampedScale, x: newX, y: newY });
        }
    };

    const handleMouseDown = (e: React.MouseEvent<HTMLImageElement>) => {
        if (zoomState.scale <= 1) return;
        e.preventDefault();
        panningRef.current = {
            isPanning: true,
            startX: e.clientX,
            startY: e.clientY,
            lastX: zoomState.x,
            lastY: zoomState.y,
        };
        e.currentTarget.style.cursor = 'grabbing';
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLImageElement>) => {
        if (!panningRef.current.isPanning) return;
        const dx = e.clientX - panningRef.current.startX;
        const dy = e.clientY - panningRef.current.startY;
        setZoomState(prev => ({
            ...prev,
            x: panningRef.current.lastX + dx,
            y: panningRef.current.lastY + dy,
        }));
    };

    const handleMouseUp = (e: React.MouseEvent<HTMLImageElement>) => {
        if (panningRef.current.isPanning) {
            panningRef.current.isPanning = false;
            e.currentTarget.style.cursor = 'grab';
        }
    };

    return { zoomState, panningRef, handleWheel, handleMouseDown, handleMouseMove, handleMouseUp };
};
