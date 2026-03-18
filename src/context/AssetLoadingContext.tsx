"use client";

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';

interface AssetLoadingContextType {
  registerAsset: (id: string) => void;
  unregisterAsset: (id: string) => void;
  markAsLoaded: (id: string) => void;
  progress: number;
  isEverythingLoaded: boolean;
  totalAssets: number;
  loadedAssets: number;
}

const AssetLoadingContext = createContext<AssetLoadingContextType | undefined>(undefined);

export function AssetLoadingProvider({ children }: { children: React.ReactNode }) {
  const [assets, setAssets] = useState<Map<string, boolean>>(new Map());
  const [isEverythingLoaded, setIsEverythingLoaded] = useState(false);

  const registerAsset = useCallback((id: string) => {
    setAssets(prev => {
      const next = new Map(prev);
      if (!next.has(id)) {
        next.set(id, false);
      }
      return next;
    });
  }, []);

  const unregisterAsset = useCallback((id: string) => {
    setAssets(prev => {
      const next = new Map(prev);
      next.delete(id);
      return next;
    });
  }, []);

  const markAsLoaded = useCallback((id: string) => {
    setAssets(prev => {
      const next = new Map(prev);
      if (next.has(id)) {
        next.set(id, true);
      }
      return next;
    });
  }, []);

  const assetEntries = Array.from(assets.entries());
  const totalAssets = assetEntries.length;
  const loadedAssets = assetEntries.filter(([_, loaded]) => loaded).length;
  const progress = totalAssets === 0 ? 100 : Math.round((loadedAssets / totalAssets) * 100);

  useEffect(() => {
    // If we have assets and all are loaded
    if (totalAssets > 0 && loadedAssets === totalAssets) {
      // Small delay for smoothness
      const timer = setTimeout(() => {
        setIsEverythingLoaded(true);
      }, 500);
      return () => clearTimeout(timer);
    } 
    // If no assets registered yet, we're not "ready" until at least some critical ones are or a timeout happens
    else if (totalAssets === 0) {
        // We'll handle the "initial" state in the LoadingScreen
    }
  }, [loadedAssets, totalAssets]);

  return (
    <AssetLoadingContext.Provider value={{
      registerAsset,
      unregisterAsset,
      markAsLoaded,
      progress,
      isEverythingLoaded,
      totalAssets,
      loadedAssets
    }}>
      {children}
    </AssetLoadingContext.Provider>
  );
}

export function useAssetLoading() {
  const context = useContext(AssetLoadingContext);
  if (context === undefined) {
    throw new Error('useAssetLoading must be used within an AssetLoadingProvider');
  }
  return context;
}
