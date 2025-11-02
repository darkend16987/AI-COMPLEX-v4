import React, { useState, useRef } from 'react';
import type { SourceImage } from '../types';

interface ImageDropzoneProps {
  onImageUpload?: (image: SourceImage) => void;
  onImagesUpload?: (images: SourceImage[]) => void;
  children: React.ReactNode;
  className?: string;
  multiple?: boolean;
}

export const ImageDropzone: React.FC<ImageDropzoneProps> = ({ onImageUpload, onImagesUpload, children, className, multiple = false }) => {
    const [isDraggingOver, setIsDraggingOver] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const processFiles = (files: FileList) => {
        if (!files || files.length === 0) return;

        const imageFiles = Array.from(files).filter(file => file.type.startsWith('image/'));
        if (imageFiles.length === 0) {
            alert("Please upload valid image files (PNG, JPG, WEBP).");
            return;
        }

        if (multiple && onImagesUpload) {
            const imagePromises: Promise<SourceImage>[] = imageFiles.map(file => {
                return new Promise((resolve, reject) => {
                    const reader = new FileReader();
                    reader.onload = (e) => {
                        const base64 = (e.target?.result as string)?.split(',')[1];
                        if (base64) {
                            resolve({ base64, mimeType: file.type });
                        } else {
                            reject(new Error(`Failed to read file: ${file.name}`));
                        }
                    };
                    reader.onerror = reject;
                    reader.readAsDataURL(file);
                });
            });

            Promise.all(imagePromises)
                .then(images => {
                    if (images.length > 0) {
                        onImagesUpload(images);
                    }
                })
                .catch(err => {
                    console.error("Error processing files:", err);
                    alert("An error occurred while processing the images.");
                });

        } else if (onImageUpload) {
            const file = imageFiles[0];
            const reader = new FileReader();
            reader.onload = (e) => {
                const base64 = (e.target?.result as string)?.split(',')[1];
                if (base64) {
                    onImageUpload({ base64, mimeType: file.type });
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) processFiles(event.target.files);
        // Reset the input value to allow re-uploading the same file(s)
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };
    
    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setIsDraggingOver(true);
    };

    const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setIsDraggingOver(false);
    };

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setIsDraggingOver(false);
        if (event.dataTransfer.files) processFiles(event.dataTransfer.files);
    };
    
    return (
        <>
            <div
                onClick={() => fileInputRef.current?.click()}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`${className} ${isDraggingOver ? 'border-orange-500 bg-slate-700/50' : ''}`}
            >
                {children}
            </div>
            <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/png, image/jpeg, image/webp" multiple={multiple} />
        </>
    );
};