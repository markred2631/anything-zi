'use client';

import { useState, useCallback, useEffect } from 'react';
import { RecentSearch } from '../../components/search/SearchBar.types';
import { allBackgrounds, localStorageKey } from './utills';

export function useRecentSearches() {
  const LOCAL_STORAGE_KEY = localStorageKey('recentSearches');

  const [recentSearches, setRecentSearches] = useState<RecentSearch[]>(() => {
    // Read from localStorage on first render (lazy initializer)
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (stored) {
        try {
          return JSON.parse(stored) as RecentSearch[];
        } catch {
          console.warn('Failed to parse recent searches from localStorage');
        }
      }
    }
    // Fallback default
    return [];
  });

  // Sync to localStorage on updates
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(recentSearches));
  }, [recentSearches]);

  return { recentSearches, setRecentSearches };
}

export function useBackground() {
  const LOCAL_STORAGE_KEY = localStorageKey('background');

  const [backgroundIndex, setBackgroundIndex] = useState<number>(0);

  useEffect(() => {
    // Read from localStorage on first render (lazy initializer)
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (stored) {
        try {
          setBackgroundIndex(Number.parseInt(stored))
        } catch {
          console.warn('Failed to parse background from localStorage');
          setBackgroundIndex(0)
        }
      }
    }
    // Fallback default
    setBackgroundIndex(0)
  }, [])

  const switchBackground = useCallback(() => {
    setBackgroundIndex((prevIndex) => {
      const result = (prevIndex + 1) % allBackgrounds.length
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(result));
      return result
    })
    
  }, [])

  return { backgroundIndex, switchBackground };
}