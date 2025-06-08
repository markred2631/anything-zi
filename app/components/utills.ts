// --- Dates ---

import { SidebarOption } from "./sidebar/Sidebar.types";

/**
 * Returns the day-of-year number for a given date.
 * Jan 1 → 1, Jan 2 → 2, Feb 1 → 32, etc.
 */
function getDayOfYear(date: Date): number {
  // Create a date for "day zero" of this year: Dec 31 of the previous year
  const startOfYear = new Date(date.getFullYear(), 0, 0);
  // Difference in milliseconds, then convert to days
  const diffMs = date.getTime() - startOfYear.getTime();
  const msPerDay = 1000 * 60 * 60 * 24;
  return Math.floor(diffMs / msPerDay);
}

/**
 * Returns the total number of days in the given year (365 or 366).
 */
function getDaysInYear(year: number): number {
  // A year is a leap year if divisible by 4 but not by 100,
  // unless it’s also divisible by 400.
  const isLeap =
    (year % 4 === 0 && year % 100 !== 0) ||
    year % 400 === 0;
  return isLeap ? 366 : 365;
}

/**
 * Example: “#2/365” for Jan 2, or “#32/365” for Feb 1.
 */
export function formatDayOfYear(date: Date): string {
  const dayNum = getDayOfYear(date);
  const total = getDaysInYear(date.getFullYear());
  return `Day ${dayNum} of ${total}`;
}

// --- Avatars ---

const colors = [
  '8b5cf6', 'f59e0b', '10b981', 'ef4444', '3b82f6', 'ec4899', '6366f1'
];

export const randomColor = (): string => {
  const index = Math.floor(Math.random() * colors.length);
  return `#${colors[index]}`;
};

/**
 * Deterministically maps any string to one of the colors.
 */
export function stringToColor(str: string): string {
  // djb2 hash
  let hash = 5381;
  for (let i = 0; i < str.length; i++) {
    // (hash * 33) ^ charCode
    hash = ((hash << 5) + hash) ^ str.charCodeAt(i);
  }
  // Convert to positive integer
  hash = Math.abs(hash);
  // Map into [0..colors.length-1]
  const idx = hash % colors.length;
  return `#${colors[idx]}`;
}

export const generateAvatarUrl = (value: string): string => {
  const bgColor = randomColor();
  const text = value.slice(0, 2).toUpperCase();

  return `https://placehold.co/60x60/${bgColor}/ffffff?text=${text}`;
};

// --- Text manipulation ---

export const getFirstTwoChars = (value: string): string => {
  return getFirstNChars(value, 2)
}

export const getFirstNChars = (value: string, n: number): string => {
  return value.length >= n ? value.substring(0, n) : '';
}

// --- Delay ---

/**
 * Simple helper to pause execution.
 * @param ms Milliseconds to wait.
 */
export const delay = (ms: number) => new Promise<void>(resolve => setTimeout(resolve, ms));

/**
 * Simple helper to pause execution.
 * @param minMs Min milliseconds to wait.
 * @param maxMs Max milliseconds to wait.
 */
export const randomDelay = (minMs: number, maxMs: number) => {
  const randomMs = Math.floor(Math.random() * (maxMs - minMs + 1)) + minMs;
  return new Promise<void>(resolve => setTimeout(resolve, randomMs));
};

// --- Local storage ---

export const localStorageKey = (key: string) => {
  return `LITITLESS_${key.toUpperCase()}`
}

// --- Tailwind background colors with gradients ---

export interface BackgroundGradient {
  backgroundClasses: string;
  primaryButtonClasses: string;
}

const skyBackground: BackgroundGradient = {
  backgroundClasses: "bg-gradient-to-r from-sky-500 to-indigo-500",
  primaryButtonClasses: `bg-sky-100 hover:bg-sky-200 text-sky-500`
};

const purpleBackground: BackgroundGradient = {
  backgroundClasses: "bg-gradient-to-br from-purple-500 to-pink-500",
  primaryButtonClasses: `bg-purple-100 hover:bg-purple-200 text-purple-500`
};

const greenBackground: BackgroundGradient = {
  backgroundClasses: "bg-gradient-to-b from-emerald-500 to-teal-600",
  primaryButtonClasses: `bg-teal-100 hover:bg-emerald-200 text-emerald-500`
};

const sunBackground: BackgroundGradient = {
  backgroundClasses: "bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500",
  primaryButtonClasses: `bg-red-100 hover:bg-red-200 text-red-500`
};

export const allBackgrounds: BackgroundGradient[] = [
  skyBackground,
  purpleBackground,
  greenBackground,
  sunBackground,
];