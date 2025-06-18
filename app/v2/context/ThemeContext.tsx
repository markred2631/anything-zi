import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react'
import { localStorageKey } from '../common/utills';

const LOCAL_STORAGE_KEY = localStorageKey('background') // customize if needed
const allBackgrounds = ['bg1', 'bg2', 'bg3'] // replace with your actual background list

interface ThemeContextType {
    backgroundIndex: number;
    switchBackground: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
    const [backgroundIndex, setBackgroundIndex] = useState<number>(0);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
            if (stored) {
                const parsed = Number.parseInt(stored);
                if (!Number.isNaN(parsed)) {
                    setBackgroundIndex(parsed);
                    return;
                } else {
                    console.warn('Failed to parse background from localStorage');
                }
            }
        }
        setBackgroundIndex(0);
    }, []);

    const switchBackground = useCallback(() => {
        setBackgroundIndex((prevIndex) => {
            const next = (prevIndex + 1) % allBackgrounds.length;
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(next));
            return next;
        });
    }, []);

    return (
        <ThemeContext.Provider value={{ backgroundIndex, switchBackground }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = (): ThemeContextType => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};