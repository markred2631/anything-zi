import { LucideIcon } from "lucide-react";

export interface User {
    name: string;
    surname: string;
}

export interface MenuGroup {
    name: string;
    options: MenuOption[];
}

export interface MenuOption {
    icon: LucideIcon;
    name: string;
    active: boolean;
    badge?: number;
}