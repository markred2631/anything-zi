"use client"

import { FC } from "react";
import { SidebarItem } from "./SidebarItem";
import {
  Info,
} from 'lucide-react';
import { useGlobalAppContext } from "../context/GlobalAppContext";

export const Sidebar: FC = () => {
  const { sources, setActiveSource } = useGlobalAppContext();

  return (
    <aside className="min-h-[calc(100%-6rem)] mt-14 fixed top-0 left-2 mb-2 bg-white text-gray-800 p-2 flex flex-col items-center justify-between rounded-3xl">
      {/* Top section with logo and navigation items */}
      <div className="flex flex-col items-center gap-4">
        {/* Logo */}
        <div className="w-12 h-12 bg-gray-900 text-white flex items-center justify-center rounded-full mb-4 cursor-pointer">
          <span>✨</span>
        </div>

        <h5 className="uppercase tracking-wide text-sm font-semibold text-gray-600">Data</h5>

        {/* Navigation Items rendered from the array */}
        <div className="w-full flex flex-col items-center gap-2">
          {sources.map(item => (
            <SidebarItem
              key={item.name}
              icon={item.icon}
              text={item.name}
              active={item.active}
              onClick={() => setActiveSource(item.name)}
            />
          ))}
        </div>
      </div>

      {/* Bottom section with settings and user info */}
      <div className="flex flex-col items-center gap-4">
        <SidebarItem icon={<Info size={24} />} text="Info" />
      </div>
    </aside>
  );
};