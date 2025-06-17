"use client"

import React from 'react';
import UserView from './UserView';
import { MenuGroup } from '../types';
import MenuSection from './MenuSection';
import { useMenuGroups, useUser } from '../hooks';

export default function Menu() {
  const { user } = useUser()
  const { menuGroups, toggleOption } = useMenuGroups()

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
            onOptionClick={toggleOption}
            menuGroup={group} />)}
      </div>
    </div>
  );
}