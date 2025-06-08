interface ResultState {
  loading: boolean;
  data: Island | null;
  error: string | null;
}

type SearchResultsState = {
  [key: string]: ResultState;
};