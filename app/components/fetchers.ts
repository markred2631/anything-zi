'use cache'

import { SidebarOption } from "./sidebar/Sidebar.types";

export async function fetchSources(): Promise<SidebarOption[]> {
    // TODO api call OR replace url
    const response = await fetch("http://127.0.0.1:3000/api/sidebar");
    const data = await response.json();
    return data;
  }
  
  export async function fetchSearch(source: string, searchInput: string): Promise<ResultsGroup> {
    'use cache'
    // TODO api call OR replace url
    const response = await fetch(`http://127.0.0.1:3000/api/search/${source}?search=${searchInput}`, { next: { revalidate: 3600 } });
    const data = await response.json();
    return data;
  }
  