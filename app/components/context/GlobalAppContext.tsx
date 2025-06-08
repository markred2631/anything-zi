'use client';

import React, { createContext, useContext, ReactNode, useState, useCallback, useMemo, useEffect } from 'react';
import { GlobalAppContextType } from './GlobalAppContext.types';
import { SidebarOption } from '../sidebar/Sidebar.types';
import { RecentSearch } from '../search/SearchBar.types';
import { localStorageKey } from '../utills';

const GlobalAppContext = createContext<GlobalAppContextType | undefined>(undefined);

interface GlobalAppContextProviderProps {
  initialSources: SidebarOption[];
  children: ReactNode;
}

export const GlobalAppContextProvider: React.FC<GlobalAppContextProviderProps> = ({ initialSources, children }) => {
  const [sources, setSources] = useState<SidebarOption[]>(initialSources);

  const setActiveSource = useCallback((name: string) => {
    setSources(prevSources =>
      prevSources.map(source => {
        if (source.name === name) {
          // If this is the source we want to change, flip its 'active' value
          return { ...source, active: !source.active };
        }
        // Otherwise, return the source unchanged
        return source;
      })
    );
  }, []);

  const value = { sources, setActiveSource };
  
  return (
    <GlobalAppContext.Provider value={value}>
      {children}
    </GlobalAppContext.Provider>
  );
};

// --- Hooks ---

export const useGlobalAppContext = (): GlobalAppContextType => {
  const context = useContext(GlobalAppContext);
  if (!context) {
    throw new Error('useGlobalAppContext must be used within a GlobalAppContextProvider');
  }
  return context;
};

/**
 * Custom hook to retrieve active sidebar sources from global context.
 * @returns An array of SidebarOption objects where active === true.
 */
export const useActiveSources = (): SidebarOption[] => {
  const { sources } = useGlobalAppContext();

  return useMemo(
    () => sources.filter((source) => source.active),
    [sources]
  );
};

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