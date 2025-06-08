"use client"

import { useState } from "react";
import { Typewriter } from "../text/Typewriter";

const Dialog = ({ onClose }: { onClose: () => void }) => {
  return (
    // The modal overlay, covering the entire screen
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-60 backdrop-blur-sm"
      onClick={onClose} // Close the dialog if the overlay is clicked
    >
      {/* The dialog box itself */}
      <div
        className="relative mx-4 w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-2xl"
        onClick={(e) => e.stopPropagation()} // Prevents closing when clicking inside the dialog
      >
        <h2 className="mt-4 text-2xl font-bold text-gray-800">
          Well Done! 🕵️
        </h2>
        <p className="mt-2 text-gray-600">
          <Typewriter text="YYou've found the hidden Easter egg" />
        </p>
        <button
          onClick={onClose}
          className="mt-6 w-full rounded-lg bg-foreground text-background px-4 py-2 font-semibold transition-transform duration-150 ease-in-out hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 active:scale-95"
        >
          Awesome!
        </button>
      </div>
    </div>
  );
};

export const Footer = () => {
  // State to manage the visibility of the dialog
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // This function is called when the footer is double-clicked
  const handleFooterDoubleClick = () => {
    setIsDialogOpen(true);
  };

  // This function closes the dialog
  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  return (
    <footer
      className="row-start-3 select-none cursor-help"
      onDoubleClick={handleFooterDoubleClick}>
      <div className="flex gap-[24px] flex-wrap items-center justify-center">
        <p className="uppercase text-sm tracking-wide">Made with ❤️ for you</p>
      </div>

      {/* Conditionally render the Dialog component */}
      {isDialogOpen && <Dialog onClose={handleCloseDialog} />}
    </footer>
  )
}