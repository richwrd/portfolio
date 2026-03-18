"use client";

import { useEffect } from 'react';
import { useAssetLoading } from '@/context/AssetLoadingContext';

export default function AssetPreloader() {
  const { registerAsset, markAsLoaded } = useAssetLoading();

  useEffect(() => {
    // List of critical assets to preload
    const criticalAssets = [
      { id: 'font-geist-sans', url: null }, // Fonts are usually preloaded by Next.js but we can track them
      { id: 'logo-animation', url: null },
      { id: 'main-song', url: '/song.mp3', type: 'audio' },
    ];

    criticalAssets.forEach(asset => {
      registerAsset(asset.id);
      
      if (asset.url) {
        if (asset.type === 'audio') {
          const audio = new Audio();
          audio.src = asset.url;
          audio.oncanplaythrough = () => markAsLoaded(asset.id);
          audio.onerror = () => markAsLoaded(asset.id); // Don't block on error
          audio.load();
        } else if (asset.type === 'image') {
          const img = new Image();
          img.src = asset.url;
          img.onload = () => markAsLoaded(asset.id);
          img.onerror = () => markAsLoaded(asset.id);
        }
      } else {
        // For non-fetch assets, just mark them as ready after a small delay
        // (or we can manually mark them from elsewhere)
        setTimeout(() => markAsLoaded(asset.id), 1000);
      }
    });
    
    // Also track all images in the document
    const images = Array.from(document.images);
    images.forEach((img, i) => {
      const id = `img-${i}-${img.src}`;
      registerAsset(id);
      if (img.complete) {
        markAsLoaded(id);
      } else {
        img.addEventListener('load', () => markAsLoaded(id));
        img.addEventListener('error', () => markAsLoaded(id));
      }
    });

    // Stuck protection: if after 10 seconds we're still loading, just force it
    const stuckTimeout = setTimeout(() => {
        // This is a bit hacky since we don't have a 'forceAll' but we can just resolve everything
        // Or the LoadingScreen can have its own timeout
    }, 10000);

    return () => clearTimeout(stuckTimeout);
  }, [registerAsset, markAsLoaded]);

  return null;
}
