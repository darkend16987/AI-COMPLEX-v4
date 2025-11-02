import type { SourceImage } from './types';

export const sourceImageToDataUrl = (image: SourceImage): string => {
    return `data:${image.mimeType};base64,${image.base64}`;
}

export const dataUrlToSourceImage = (dataUrl: string): SourceImage | null => {
    if (!dataUrl) return null;

    const [header, base64Data] = dataUrl.split(',');
    if (!header || !base64Data) {
        console.error("Invalid data URL format for selected image.");
        return null;
    }

    const mimeTypeMatch = header.match(/:(.*?);/);
    if (!mimeTypeMatch || !mimeTypeMatch[1]) {
        console.error("Could not extract mimeType from data URL.");
        return null;
    }
    
    const mimeType = mimeTypeMatch[1];
    
    return {
        base64: base64Data,
        mimeType: mimeType
    };
};

export const copyToClipboard = (text: string) => {
    if (!text) return;
    navigator.clipboard.writeText(text).catch(err => {
        console.error('Failed to copy text: ', err);
    });
};

/**
 * Crops an image to a target aspect ratio, cutting from the center.
 * @param image The source image to crop.
 * @param targetAspectRatio The desired aspect ratio (width / height).
 * @returns A promise that resolves to the cropped SourceImage.
 */
export const cropImageToAspectRatio = (image: SourceImage, targetAspectRatio: number): Promise<SourceImage> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = sourceImageToDataUrl(image);

    img.onload = () => {
      const originalWidth = img.naturalWidth;
      const originalHeight = img.naturalHeight;
      const originalAspectRatio = originalWidth / originalHeight;

      let sx = 0, sy = 0, sWidth = originalWidth, sHeight = originalHeight;

      if (originalAspectRatio > targetAspectRatio) {
        // Image is wider than target, crop the sides (reduce width)
        sWidth = originalHeight * targetAspectRatio;
        sx = (originalWidth - sWidth) / 2;
      } else if (originalAspectRatio < targetAspectRatio) {
        // Image is taller than target, crop the top/bottom (reduce height)
        sHeight = originalWidth / targetAspectRatio;
        sy = (originalHeight - sHeight) / 2;
      }

      const canvas = document.createElement('canvas');
      canvas.width = Math.round(sWidth);
      canvas.height = Math.round(sHeight);
      const ctx = canvas.getContext('2d');

      if (!ctx) {
        return reject(new Error('Could not get canvas context'));
      }
      
      ctx.drawImage(
        img, 
        sx, sy, sWidth, sHeight,
        0, 0, canvas.width, canvas.height
      );

      const dataUrl = canvas.toDataURL(image.mimeType);
      const newSourceImage = dataUrlToSourceImage(dataUrl);

      if (newSourceImage) {
        resolve(newSourceImage);
      } else {
        reject(new Error('Failed to convert cropped canvas to SourceImage'));
      }
    };

    img.onerror = (err) => {
      reject(new Error(`Image could not be loaded: ${err}`));
    };
  });
};

/**
 * Pads an image with transparency to match a target aspect ratio.
 * The original image is centered within the new canvas.
 * @param image The source image to pad.
 * @param targetAspectRatio The desired aspect ratio (width / height).
 * @returns A promise that resolves to the padded SourceImage.
 */
export const padImageToAspectRatio = (image: SourceImage, targetAspectRatio: number): Promise<SourceImage> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = sourceImageToDataUrl(image);

    img.onload = () => {
      const originalWidth = img.naturalWidth;
      const originalHeight = img.naturalHeight;
      const originalAspectRatio = originalWidth / originalHeight;

      if (Math.abs(originalAspectRatio - targetAspectRatio) < 0.01) {
        // Aspect ratios are close enough, no padding needed.
        resolve(image);
        return;
      }

      let canvasWidth = originalWidth;
      let canvasHeight = originalHeight;
      let dx = 0;
      let dy = 0;

      if (originalAspectRatio > targetAspectRatio) {
        // Image is wider than target. New canvas height will be larger.
        canvasHeight = originalWidth / targetAspectRatio;
        dy = (canvasHeight - originalHeight) / 2;
      } else {
        // Image is taller than target. New canvas width will be larger.
        canvasWidth = originalHeight * targetAspectRatio;
        dx = (canvasWidth - originalWidth) / 2;
      }

      const canvas = document.createElement('canvas');
      canvas.width = Math.round(canvasWidth);
      canvas.height = Math.round(canvasHeight);
      const ctx = canvas.getContext('2d');

      if (!ctx) {
        return reject(new Error('Could not get canvas context'));
      }
      
      ctx.drawImage(img, dx, dy, originalWidth, originalHeight);

      const dataUrl = canvas.toDataURL('image/png'); // Always use PNG to preserve transparency
      const newSourceImage = dataUrlToSourceImage(dataUrl);

      if (newSourceImage) {
        resolve(newSourceImage);
      } else {
        reject(new Error('Failed to convert padded canvas to SourceImage'));
      }
    };

    img.onerror = (err) => {
      reject(new Error(`Image could not be loaded: ${err}`));
    };
  });
};
