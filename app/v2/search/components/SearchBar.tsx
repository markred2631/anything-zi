"use client"

import React, { useState, useRef, useEffect } from 'react';
import { Search, WandSparkles } from 'lucide-react';
import { SearchBarProps } from '@/app/components/search/SearchBar.types';
import { useBackground, useRecentSearches } from '@/app/components/context/GlobalAppContext';
import { allBackgrounds, generateAvatarUrl, getFirstNChars, stringToColor } from '@/app/components/utills';
import RecentSearchesDropdown from './RecentSearchesDropdown';


export default function SearchBar({ onSearch }: SearchBarProps) {
  // State for the current background index
  const { backgroundIndex, switchBackground } = useBackground();

  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const {recentSearches, setRecentSearches} = useRecentSearches();

  // --- Refs ---
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null); // Ref for the input element

  // --- Misc functions ---
  const appendRecentSearch = (value: string): void => {
    // Check if value is already in the list
    const alreadyExists = recentSearches.some(
      (item) => item.title.toLowerCase() === value.toLowerCase()
    );

    if (alreadyExists) {
      // Do nothing — value already present
      return;
    }

    // Add new item
    const updatedSearches = [
      ...recentSearches,
      {
        id: crypto.randomUUID(),
        title: value,
        searchDate: 'Today', // TODO change
        imageUrl: generateAvatarUrl(value),
      },
    ];

    // Keep only the last 5 items
    const lastFiveSearches = updatedSearches.slice(-5);

    setRecentSearches(lastFiveSearches);
  };

  // --- Event Handlers with Typed Events ---
  const handleFocus = (): void => {
    setIsFocused(true);
  };

  const handleClearSearches = (): void => {
    setRecentSearches([]);
  };

  const handleSearch = (value: string) => {
    const inputValue = value.trim(); // trim to ignore spaces
    if (inputValue === '') {
      // Optionally handle empty input, e.g., ignore or show message;
      return;
    }
    // Submit new search
    onSearch(inputValue);
    // Hide recent searches
    setIsFocused(false);
    appendRecentSearch(inputValue);
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') {
      handleSearch(e.currentTarget.value);
    } else {
      // Show recent searches again as user types
      setIsFocused(true);
    }
  };

  const handleSubmitClick = (): void => {
    if (inputRef.current) {
      handleSearch(inputRef.current.value);
    }
  };

  // This function will be called when a list item is clicked.
  // It receives the title of the clicked item as an argument.
  const handleRecentSearchClick = (title: string) => {
    setSearchQuery(title);
    handleSearch(title);
  };

  // --- Effect to focus input on mount ---
  useEffect(() => {
    // When the component mounts, we want to focus the search input.
    // The ref 'inputRef' gives us direct access to the input DOM element.
    // The optional chaining (?.) ensures we don't get an error if the ref is not yet attached.
    inputRef.current?.focus();
  }, []); // The empty dependency array [] ensures this effect runs only once after the initial render.

  // --- Effect for handling clicks outside ---
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setIsFocused(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchContainerRef]);

  // This effect adds a global event listener to focus the input when the user starts typing.
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // We check if the event is coming from an element that should accept typing, like another input or a button.
      // If so, we don't want to hijack the user's interaction.
      const target = event.target as HTMLElement;
      if (['INPUT', 'TEXTAREA', 'BUTTON'].includes(target.tagName)) {
        return;
      }

      // We also check if the key pressed is a single, printable character.
      // This avoids focusing the input for keys like 'Shift', 'Control', or 'Tab'.
      if (event.key.length === 1 && !event.ctrlKey && !event.metaKey) {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }
    };

    // We add the event listener to the window.
    window.addEventListener('keydown', handleKeyDown);

    // This is a cleanup function. React will run this when the component is removed
    // from the screen to prevent memory leaks by removing the event listener.
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Derived state
  const showRecents: boolean = isFocused && recentSearches.length > 0;

  // Get the current background object based on the index
  const currentBackground = allBackgrounds[backgroundIndex];

  return (
    <div className={`${currentBackground.backgroundClasses} relative p-1.5 rounded-3xl`} ref={searchContainerRef}>
      {/* Top bar with title */}
      <div className="flex items-center px-4 py-2 text-white">
        <span className="text-sm font-semibold">Just Do It</span>
      </div>

      {/* Main input and controls area */}
      <div className="bg-white rounded-3xl shadow-inner p-4">
        <div className="flex items-center w-full">
          <input
            ref={inputRef}
            type="text"
            value={searchQuery}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyPress}
            onFocus={handleFocus}
            className="flex-grow text-gray-700 placeholder-gray-400 focus:outline-none bg-transparent text-lg"
            placeholder="What do you want to play?"
          />

          <button
            onClick={handleSubmitClick}
            className={`${currentBackground.primaryButtonClasses} ml-4 mr-2 flex-shrink-0 bg-orange-100 rounded-full w-10 h-10 flex items-center justify-center transition-colors duration-200`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          </button>
          <button
            onClick={switchBackground}
            title="Change Background"
            className="flex-shrink-0 bg-gray-100 hover:bg-gray-200 text-gray-500 rounded-full w-10 h-10 flex items-center justify-center transition-colors duration-200"
          >
            <WandSparkles className="h-5 w-5" />
          </button>
        </div>
      </div>

      {showRecents && (
        <RecentSearchesDropdown
          recentSearches={recentSearches}
          onRecentSearchClick={handleRecentSearchClick}
          onClearRecentSearches={handleClearSearches} />
      )}
    </div>
  );
}

