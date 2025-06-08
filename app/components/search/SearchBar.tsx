"use client"

import React, { useState, useRef, useEffect } from 'react';
import { RecentSearch, SearchBarProps } from './SearchBar.types';
import { generateAvatarUrl, getFirstNChars, stringToColor } from '../utills';
import { Search } from 'lucide-react';
import Placeholder from '../Placeholder';


export default function SearchBar({ onSearch, isLoading }: SearchBarProps) {
  // --- State Management with TypeScript ---
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [recentSearches, setRecentSearches] = useState<RecentSearch[]>([
    { id: crypto.randomUUID(), title: 'lofi chill', type: 'Spotify', imageUrl: 'https://placehold.co/60x60/2dd4bf/ffffff?text=LC' },
    { id: crypto.randomUUID(), title: 'focus music', type: 'Playlist', imageUrl: 'https://placehold.co/60x60/f97316/ffffff?text=FM' },
    { id: crypto.randomUUID(), title: 'daily mix 1', type: 'Playlist', imageUrl: 'https://placehold.co/60x60/8b5cf6/ffffff?text=DM' },
  ]);

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
        type: 'Netflix', // TODO change
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

  const handleClearSearches = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
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
  }, []); // The empty dependency array means this effect runs only once when the component mounts.

  // Derived state
  const showRecents: boolean = isFocused && recentSearches.length > 0;

  return (
    <div className="sticky top-20 flex flex-col items-center" ref={searchContainerRef}>
      {/* Search Input Container */}
      <div className="bg-orange-500 p-1.5 w-full shadow-lg rounded-3xl">
        {/* Top bar with title */}
        <div className="flex items-center px-4 py-2 text-white">
          {isLoading && (
            <>
              <div className="animate-spin mr-3">
                <Search className="w-5 h-5" />
              </div>
              <span className="text-sm font-semibold">Batman is looking around...</span>
            </>
          )}
          {!isLoading && (
            <span className="text-sm font-semibold">Just Do It</span>
          )}
        </div>

        {/* Main input and controls area */}
        <div className="bg-white rounded-2xl shadow-inner p-4">
          <div className="flex items-center w-full">
            <input
              ref={inputRef} // Attach the ref to the input element
              type="text"
              value={searchQuery}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyPress}
              onFocus={handleFocus}
              className="flex-grow text-gray-700 placeholder-gray-400 focus:outline-none bg-transparent text-lg"
              placeholder="What do you want to play?"
            />
            <button className="ml-4 flex-shrink-0 bg-orange-100 hover:bg-orange-200 text-orange-500 rounded-full w-10 h-10 flex items-center justify-center transition-colors duration-200">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Recent Searches Dropdown */}
      {showRecents && (
        <div className="absolute top-32 inset-x-0 mt-2 bg-white dark:bg-[#282828] rounded-lg p-4 shadow-lg animate-fade-in-down border border-gray-200 dark:border-transparent">
          <h2 className="text-gray-900 font-bold text-lg mb-4">Recent searches</h2>

          <ul className="flex flex-col gap-3 mb-4">
            {recentSearches.map((item) => (
              <li
                key={item.id}
                onClick={() => handleRecentSearchClick(item.title)}
                className="flex items-center gap-4 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-white/10 cursor-pointer transition-colors duration-200"
              >
                <Placeholder
                  key={item.title}
                  text={getFirstNChars(item.title, 2)}
                  backgroundColor={stringToColor(item.title)}
                  // textColor="#ffffff"
                  className="uppercase"
                  size={60}
                />

                <div>
                  <p className="text-gray-800 dark:text-white font-semibold">{item.title}</p>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">{item.type}</p>
                </div>
              </li>
            ))}
          </ul>

          <button
            onClick={handleClearSearches}
            className="w-full bg-foreground text-background hover:bg-[#383838] font-bold py-2 px-4 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all duration-300"
          >
            Clear recent searches
          </button>
        </div>
      )}
    </div>
  );
}

