import { ReactElement } from "react";

export interface SidebarOption {
  name: string;
  icon?: ReactElement;
  active: boolean;
}