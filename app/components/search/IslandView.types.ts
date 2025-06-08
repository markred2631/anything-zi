// Define the types for our data structure
interface ResultItem {
  id: string;
  title: string;
  description: string;
  date: string;
  details?: string;
  url?: string;
}

interface ResultsGroup {
  id: string;
  title: string;
  results: ResultItem[];
}