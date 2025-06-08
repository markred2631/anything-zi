export interface RecentSearch {
  id: string;
  title: string;
  type: string;
}

export interface SearchBarProps {
  onSearch: (query: string) => void;
  isLoading: boolean;
}