export interface RecentSearch {
  id: string;
  title: string;
  searchDate: string;
}

export interface SearchBarProps {
  onSearch: (query: string) => void;
}