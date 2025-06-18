export interface Configuration {
    NEXT_FOO: string;
}

export interface ResultItem {
    id: string;
    title: string;
    description: string;
    date: string;
    details?: string;
    url?: string;
}

export interface ResultsGroup {
    id: string;
    title: string;
    results: ResultItem[];
}

export interface ResultState {
    loading: boolean;
    data: ResultsGroup | null;
    error: string | null;
}

export type SearchResultsState = {
    [key: string]: ResultState;
};

export interface RecentSearch {
    id: string;
    title: string;
    searchDate: string;
}

export interface SearchBarProps {
    onSearch: (query: string) => void;
}