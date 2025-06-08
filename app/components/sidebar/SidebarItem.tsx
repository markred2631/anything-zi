import { FC, ReactNode } from "react";
import { getFirstNChars } from "../utills";

interface SidebarItemProps {
  icon?: ReactNode;
  text: string;
  active?: boolean;
  onClick?: () => void;
}

// Sidebar Item Component
export const SidebarItem: FC<SidebarItemProps> = ({ icon, text, active, onClick }) => {
  // Base classes for styling the sidebar item
  const baseClasses = "relative select-none flex items-center justify-center h-12 w-12 rounded-lg cursor-pointer group";

  // Interaction classes for hover and active states
  // - `transition-transform`: Smooths the scaling animation.
  // - `duration-150`: Sets the animation duration.
  // - `ease-in-out`: Defines the timing function for the animation.
  // - `hover:scale-105`: Scales the item up slightly on hover.
  // - `active:scale-95`: Scales the item down to simulate a "press" on click.
  const interactionClasses = "transition-transform duration-150 ease-in-out hover:scale-105 active:scale-95";

  // Conditional classes for the active state
  const activeClasses = active ? 'bg-gray-200 text-foreground border border-gray-300' : 'bg-gray-50 hover:bg-gray-100 text-gray-500';

  return (
    <div
      onClick={onClick}
      className={`${baseClasses} ${interactionClasses} ${activeClasses}`}
    >

      {/* Either show the icon or the text, never both! */}
      {icon ? (
        icon
      ) : (
        <p className="capitalize">{getFirstNChars(text, 2)}</p>
      )}

      {/* Tooltip */}
      <div className={`
          absolute left-full rounded-md px-2 py-1 ml-6 
          bg-gray-800 text-white text-sm
          invisible opacity-20 -translate-x-3 transition-all
          group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
          whitespace-nowrap
        `}>
        {text}
      </div>
    </div>
  );
};