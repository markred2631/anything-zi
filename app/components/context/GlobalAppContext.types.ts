import { SidebarOption } from "../sidebar/Sidebar.types";

export interface GlobalAppContextType {
    sources: SidebarOption[];
    setActiveSource: (name: string) => void;
}