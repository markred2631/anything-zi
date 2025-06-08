"use client"

import React, { useState, useEffect, useRef } from 'react';

// Tailwind CSS is assumed to be available in the project.
// If not, you can add it via CDN: <script src="https://cdn.tailwindcss.com"></script>

/**
 * Typewriter Component Props
 */
interface TypewriterProps {
  text?: string;
  speed?: number;
  loop?: boolean;
  loopDelay?: number;
  onComplete?: () => void;
  className?: string;
}

/**
 * Typewriter Component
 *
 * Displays text with a typewriter animation.
 */
export const Typewriter = ({
  text = "",
  speed = 70,
  loop = false,
  loopDelay = 1500,
  className = '',
}) => {
  const [displayedText, setDisplayedText] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(false); // Initialize to false
  const currentIndexRef = useRef<number>(0);
  const timeoutIdRef = useRef<NodeJS.Timeout | null>(null); // To store the timeout ID

  useEffect(() => {
    // Clear any existing animation timeout when props change or component unmounts
    if (timeoutIdRef.current) {
      clearTimeout(timeoutIdRef.current);
    }

    // Reset state for new animation
    setDisplayedText('');
    currentIndexRef.current = 0;

    // Guard against null/undefined text, default to empty string if so.
    const currentText = text || "";

    if (currentText === "") {
      setIsTyping(false);
      return; // No animation needed for empty text
    }

    setIsTyping(true); // Set isTyping to true only if there's text to type

    const typeCharacter = (): void => {
      if (currentIndexRef.current < currentText.length) {
        setDisplayedText((prev) => prev + currentText.charAt(currentIndexRef.current));
        currentIndexRef.current++;
        timeoutIdRef.current = setTimeout(typeCharacter, speed);
      } else {
        // Typing finished for the current pass
        setIsTyping(false);
        if (loop) {
          timeoutIdRef.current = setTimeout(() => {
            setDisplayedText('');
            currentIndexRef.current = 0;
            setIsTyping(true); // Set isTyping to true before starting loop
            typeCharacter(); // Start typing again
          }, loopDelay);
        }
      }
    };

    // Start the animation
    timeoutIdRef.current = setTimeout(typeCharacter, speed);

    // Cleanup function to clear timeout when component unmounts or props change
    return () => {
      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current);
      }
    };
  }, [text, speed, loop, loopDelay]);

  return (
    <span className={`typewriter-container ${className}`}>
      {displayedText}
      {/* Show cursor if text prop is not empty, it will blink via CSS.
          It remains after typing completes if not looping.
          It remains during the loopDelay if looping. */}
      {text && text.length > 0 && <span className="blinking-cursor-dynamic">|</span>}
    </span>
  );
};