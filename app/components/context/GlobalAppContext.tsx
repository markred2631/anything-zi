'use client';

import React, { createContext, useContext, ReactNode, useState, useCallback, useMemo } from 'react';
import { GlobalAppContextType } from './GlobalAppContext.types';
import { SidebarOption } from '../sidebar/Sidebar.types';

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