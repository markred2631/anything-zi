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