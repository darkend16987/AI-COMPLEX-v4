import React, { useRef } from 'react';
import type { SourceImage, ObjectTransform } from '../types';
import { sourceImageToDataUrl } from '../utils';

interface InteractiveCanvasProps {
    bgImage: SourceImage;
    canvaObjects: SourceImage[];
    canvaObjectTransforms: ObjectTransform[];
    setCanvaObjectTransforms: React.Dispatch<React.SetStateAction<ObjectTransform[]>>;
    selectedCanvaObjectIndex: number | null;
    setSelectedCanvaObjectIndex: React.Dispatch<React.SetStateAction<number | null>>;
    isCanvaLayoutLocked: boolean;
}

const ResizeHandle: React.FC<{
    position: string;
    cursor: string;
    onMouseDown: (e: React.MouseEvent<HTMLDivElement>) => void;
}> = ({ position, cursor, onMouseDown }) => (
    <div
      className={`absolute w-4 h-4 bg-white border-2 border-orange-500 rounded-full z-20 ${position}`}
      style={{ cursor }}
      onMouseDown={onMouseDown}
    />
);

export const InteractiveCanvas: React.FC<InteractiveCanvasProps> = ({
    bgImage, canvaObjects, canvaObjectTransforms, setCanvaObjectTransforms,
    selectedCanvaObjectIndex, setSelectedCanvaObjectIndex, isCanvaLayoutLocked
}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const interactionRef = useRef({
        type: null as 'move' | 'scale' | null,
        index: -1,
        startX: 0,
        startY: 0,
        startTransform: null as ObjectTransform | null,
        objectCenterX: 0,
        objectCenterY: 0,
        startDist: 1,
    });

    const handleInteractionStart = (
        e: React.MouseEvent<HTMLDivElement>,
        index: number,
        type: 'move' | 'scale'
    ) => {
        if (isCanvaLayoutLocked) return;
        e.preventDefault();
        e.stopPropagation();
        setSelectedCanvaObjectIndex(index);
        
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const transform = canvaObjectTransforms[index];
        const centerX = rect.left + (transform.x / 100) * rect.width;
        const centerY = rect.top + (transform.y / 100) * rect.height;

        interactionRef.current = {
            type,
            index,
            startX: e.clientX,
            startY: e.clientY,
            startTransform: { ...transform },
            objectCenterX: centerX,
            objectCenterY: centerY,
            startDist: Math.sqrt(Math.pow(e.clientX - centerX, 2) + Math.pow(e.clientY - centerY, 2)),
        };
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (isCanvaLayoutLocked) return;
        const { type, index, startX, startY, startTransform, objectCenterX, objectCenterY, startDist } = interactionRef.current;
        if (type === null || index === -1 || !containerRef.current || !startTransform) return;
        
        e.preventDefault();
        const rect = containerRef.current.getBoundingClientRect();

        if (type === 'move') {
            const dx = e.clientX - startX;
            const dy = e.clientY - startY;

            const newX = startTransform.x + (dx / rect.width) * 100;
            const newY = startTransform.y + (dy / rect.height) * 100;

            setCanvaObjectTransforms(transforms =>
                transforms.map((t, i) =>
                    i === index ? { ...t, x: Math.max(0, Math.min(100, newX)), y: Math.max(0, Math.min(100, newY)) } : t
                )
            );
        } else if (type === 'scale') {
            const currentDist = Math.sqrt(Math.pow(e.clientX - objectCenterX, 2) + Math.pow(e.clientY - objectCenterY, 2));
            if (startDist > 0) {
                const scaleFactor = currentDist / startDist;
                const newScale = startTransform.scale * scaleFactor;
                setCanvaObjectTransforms(transforms =>
                    transforms.map((t, i) =>
                        i === index ? { ...t, scale: Math.max(5, Math.min(200, newScale)) } : t
                    )
                );
            }
        }
    };

    const handleMouseUp = (e: React.MouseEvent<HTMLDivElement>) => {
        if (interactionRef.current.type) {
            e.preventDefault();
            interactionRef.current.type = null;
            interactionRef.current.index = -1;
        }
    };
    
    return (
        <div 
            ref={containerRef}
            className="relative w-full h-full select-none overflow-hidden rounded-lg bg-black/30"
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onClick={() => setSelectedCanvaObjectIndex(null)}
        >
            <img src={sourceImageToDataUrl(bgImage)} alt="Background" className="absolute top-0 left-0 w-full h-full object-contain pointer-events-none" />
            {canvaObjects.map((fgImage, index) => {
                const transform = canvaObjectTransforms[index];
                if (!transform) return null;
                const isSelected = selectedCanvaObjectIndex === index;

                return (
                    <div
                        key={index}
                        className="absolute"
                        style={{
                            left: `${transform.x}%`,
                            top: `${transform.y}%`,
                            width: `${transform.scale}%`,
                            transform: `translate(-50%, -50%) rotate(${transform.rotation}deg)`,
                            zIndex: isSelected ? 10 : 1,
                        }}
                        onMouseDown={(e) => e.stopPropagation()}
                        onClick={(e) => {
                            e.stopPropagation();
                            if (!isCanvaLayoutLocked) {
                                setSelectedCanvaObjectIndex(index);
                            }
                        }}
                    >
                        <div
                            className="relative w-full h-full"
                            style={{ 
                                cursor: isCanvaLayoutLocked 
                                  ? 'default' 
                                  : (interactionRef.current.type === 'move' && isSelected ? 'grabbing' : 'grab') 
                            }}
                            onMouseDown={(e) => handleInteractionStart(e, index, 'move')}
                        >
                           <img
                                src={sourceImageToDataUrl(fgImage)}
                                alt={`Object ${index}`}
                                className="w-full h-auto pointer-events-none"
                                draggable="false"
                                style={{
                                    transform: `scaleX(${transform.flipHorizontal ? -1 : 1}) scaleY(${transform.flipVertical ? -1 : 1})`,
                                }}
                            />
                        </div>

                        {isSelected && !isCanvaLayoutLocked && (
                            <>
                                <div className="absolute inset-0 border-2 border-dashed border-orange-500 pointer-events-none"></div>
                                <ResizeHandle position="-top-2 -left-2" cursor="nwse-resize" onMouseDown={(e) => handleInteractionStart(e, index, 'scale')} />
                                <ResizeHandle position="-top-2 -right-2" cursor="nesw-resize" onMouseDown={(e) => handleInteractionStart(e, index, 'scale')} />
                                <ResizeHandle position="-bottom-2 -left-2" cursor="nesw-resize" onMouseDown={(e) => handleInteractionStart(e, index, 'scale')} />
                                <ResizeHandle position="-bottom-2 -right-2" cursor="nwse-resize" onMouseDown={(e) => handleInteractionStart(e, index, 'scale')} />
                            </>
                        )}
                    </div>
                );
            })}
        </div>
    );
};
