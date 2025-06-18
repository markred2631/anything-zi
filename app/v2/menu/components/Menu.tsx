"use client"

import React from 'react';
import UserView from './UserView';
import { MenuGroup, MenuOption } from '../types';
import MenuSection from './MenuSection';
import { useUser } from '../hooks';

type MenuProps = {
  menuGroups: MenuGroup[]
  onOptionClick: (menuGroup: MenuGroup, menuOption: MenuOption) => void
  onOptionDoubleClick: (menuGroup: MenuGroup, menuOption: MenuOption) => void
}

export default function Menu({menuGroups, onOptionClick, onOptionDoubleClick}: MenuProps) {
  const { user } = useUser()

  return (
    <div className="flex flex-col">
      {/* User info */}
      {user && (
        <UserView user={user} />
      )}

      {/* Menu sections */}
      <div className="flex-1 overflow-y-auto">
        {menuGroups.map((group: MenuGroup) =>
          <MenuSection
            key={group.name}
            onOptionClick={onOptionClick}
            onOptionDoubleClick={onOptionDoubleClick}
            menuGroup={group} />)}
      </div>
    </div>
  );
}