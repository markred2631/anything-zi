interface ResultState {
  loading: boolean;
  data: ResultsGroup | null;
  error: string | null;
}

type SearchResultsState = {
  [key: string]: ResultState;
};