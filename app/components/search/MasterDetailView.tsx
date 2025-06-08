import React, { useEffect, useState } from 'react';
import SearchBar from './SearchBar';
import IslandView from './IslandView';
import { useActiveSources, useGlobalAppContext } from '../context/GlobalAppContext';
import { fetchSearch } from '../utills';

// Custom CSS for animations
const customStyles = `
  @keyframes slideIn {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  .animate-slideIn {
    animation: slideIn 0.5s ease-out;
  }
  
  .animate-fadeIn {
    animation: fadeIn 0.4s ease-out;
  }
  
  .animation-delay-100 {
    animation-delay: 0.1s;
    opacity: 0;
    animation-fill-mode: forwards;
  }
  
  .animation-delay-200 {
    animation-delay: 0.2s;
    opacity: 0;
    animation-fill-mode: forwards;
  }
`;

/**
 * Flattens all ResultItems from a SearchResultsState.
 * Ignores entries where data is null or in a loading/error state.
 */
function flattenSearchResults(state: SearchResultsState): ResultItem[] {
  return Object.values(state)
    .flatMap(({ loading, error, data }) =>
      // only include when not loading, no error, and data exists
      !loading && !error && data
        ? data.results
        : []
    );
}

// ItemList Component
interface ItemListProps {
  searchResults: SearchResultsState;
  selectedItemId: string | null;
  onItemSelect: (itemId: string) => void;
  onSearchSubmit: (value: string) => void;
  isLoading: boolean;
  isInSplitView?: boolean;
}

const ItemList: React.FC<ItemListProps> = ({ searchResults, selectedItemId, onItemSelect, onSearchSubmit, isLoading, isInSplitView = false }) => {
  // Turn the dictionary into an array of [key, value]
  const entries = Object.entries(searchResults) as [string, ResultState][];

  return (
    <div className={`${isInSplitView ? 'w-full h-full' : 'w-full max-w-2xl'}`}>

      <SearchBar onSearch={onSearchSubmit} isLoading={isLoading} />

      <div className="mt-8">
        {entries.map(([id, result]) => (
          <IslandView
            id={id}
            result={result}
            key={id}
            onItemSelect={onItemSelect}
            selectedItemId={selectedItemId}
          />
        ))}
      </div>
    </div>
  );
};

// DetailView Component
interface DetailViewProps {
  item: ResultItem;
  onClose: () => void;
}

const DetailView: React.FC<DetailViewProps> = ({ item, onClose }) => {
  return (
    <div className="w-full p-6 bg-white border-gray-200 animate-slideIn rounded-3xl">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-3xl font-bold text-gray-800 animate-fadeIn">{item.title}</h2>
          <div className="flex items-center gap-3 animate-fadeIn">
            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
              {item.date}
            </span>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors duration-200"
              aria-label="Close detail view"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
        <p className="text-lg text-gray-600 mb-6 animate-fadeIn animation-delay-100">{item.description}</p>
      </div>

      <div className="space-y-6 animate-fadeIn animation-delay-200">
        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-3">Detailed Information</h3>
          <div className="prose text-gray-700 leading-relaxed">
            {item.details}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 pt-6 border-t border-gray-100">
          <div className="p-4 bg-gray-50 rounded-lg">
            <h4 className="font-semibold text-gray-800 mb-2">Item ID</h4>
            <p className="text-gray-600 font-mono">{item.id}</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <h4 className="font-semibold text-gray-800 mb-2">Release Date</h4>
            <p className="text-gray-600">{item.date}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main Master-Detail Component
const MasterDetailView: React.FC = () => {
  const sources = useActiveSources();
  const [searchResults, setSearchResults] = useState<SearchResultsState>({});
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const selectedItem = selectedItemId ? flattenSearchResults(searchResults).find(item => item.id === selectedItemId) : null;

  const handleItemSelect = (itemId: string) => {
    setSelectedItemId(itemId);
  };

  // --- Logic to submit and process results from a search ---

  // Whenever the searchResults object changes, recompute isLoading
  useEffect(() => {
    // If *any* result is still loading, we are loading
    const anyStillLoading = Object.values(searchResults).some(
      (result) => result.loading
    );
    setIsLoading(anyStillLoading);
  }, [searchResults]);

  // TODO use the value param somewhere
  const handleSearchSubmit = (searchInput: string) => {
    // Hide previous results if user started a new search
    setSearchResults({});

    sources.forEach(source => {
      setSearchResults(prevResults => ({
        ...prevResults,
        [source.name]: { loading: true, data: null, error: null },
      }));

      fetchSearch(source.name, searchInput)
        .then(data => {
          setSearchResults(prevResults => ({
            ...prevResults,
            [source.name]: { loading: false, data: data, error: null },
          }));
        })
        .catch(error => {
          setSearchResults(prevResults => ({
            ...prevResults,
            [source.name]: { loading: false, data: null, error: (error as Error).message },
          }));
        });
    });
  };

  // --- JSX below ---

  return (
    <>
      <style>{customStyles}</style>
      <div className="w-[calc(100%-5rem)]">
        <div className="flex justify-center transition-all duration-500 ease-in-out space-x-12">
          {/* Left pane - List */}
          <div className={`transition-all duration-500 ease-in-out ${!selectedItemId
            ? 'w-full flex justify-center items-center'
            : 'w-2/5'
            }`}>
            <ItemList
              searchResults={searchResults}
              selectedItemId={selectedItemId}
              onItemSelect={handleItemSelect}
              onSearchSubmit={handleSearchSubmit}
              isLoading={isLoading}
              isInSplitView={!!selectedItemId}
            />
          </div>

          {/* Right pane - Detail */}
          <div className={`sticky top-20 transition-all duration-500 ease-in-out overflow-hidden ${!selectedItemId
            ? 'w-0 opacity-0'
            : 'h-full w-2/5 opacity-100'
            }`}>
            {selectedItem && (
              <div className="transform transition-transform duration-500 ease-in-out ">
                <DetailView
                  item={selectedItem}
                  onClose={() => setSelectedItemId(null)}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default MasterDetailView;