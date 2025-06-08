export interface RecentSearch {
  id: string;
  title: string;
  type: string;
  imageUrl: string;
}

export interface SearchBarProps {
  onSearch: (query: string) => void;
  isLoading: boolean;
}