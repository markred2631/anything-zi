"use client"

import { Database } from "lucide-react";
import { MenuGroup, MenuOption, User } from "./types"

export async function fetchUser(): Promise<User> {
    return {
        name: "Jack",
        surname: "Bloodline",
    }
}

export async function fetchMenuGroups(): Promise<MenuGroup[]> {
    const response = [
        {
            name: "Banking",
            options: [
                { name: 'Dashboard', active: false },
                { name: 'History', active: false },
                { name: 'Analysis', active: false },
                { name: 'Finances', active: true },
            ]
        },
        {
            name: "Finance",
            options: [
                { name: 'Messages', badge: 9, active: false },
                { name: 'Documents', active: false },
                { name: 'Products', active: true },
            ]
        }
    ];

    // post-processing
    response.forEach(group => group.options = group.options.map((option: any) => {
        return {
            ...option,
            icon: Database
        }
    }))

    return response
}