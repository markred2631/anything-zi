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
                { loading: false, name: 'Dashboard', active: false },
                { loading: false, name: 'History', active: true },
                { loading: false, name: 'Analysis', active: false },
                { loading: false, name: 'Finances', active: true },
            ]
        },
        {
            name: "Finance",
            options: [
                { loading: false, name: 'Messages', active: true },
                { loading: false, name: 'Documents', active: false },
                { loading: false, name: 'Products', active: true },
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