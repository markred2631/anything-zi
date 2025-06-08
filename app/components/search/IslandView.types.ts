// Define the types for our data structure
interface ResultItem {
  id: string;
  title: string;
  description: string;
  date: string;
  details?: string;
}

interface Island {
  id: string;
  title: string;
  results: ResultItem[];
}