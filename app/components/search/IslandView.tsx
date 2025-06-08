// --- Components ---

import { SquareArrowOutUpRight } from "lucide-react";
import Placeholder from "../Placeholder";
import { getFirstNChars } from "../utills";
import { useActiveSources } from "../context/GlobalAppContext";

// A single result item card
const ResultCard: React.FC<{ item: ResultItem, onItemSelect: (itemId: string) => void, selectedItemId: string | null }> = ({ item, onItemSelect, selectedItemId }) => {
  // This function handles the double-click on the entire card.
  // It opens the item's URL in a new tab if it exists.
  const handleDoubleClick = () => {
    if (item.url) {
      window.open(item.url, '_blank', 'noopener,noreferrer');
    }
  };
  
  return (
    <div
      onClick={() => onItemSelect(item.id)}
      onDoubleClick={handleDoubleClick}
      className={`group select-none cursor-pointer p-4 flex items-center space-x-4 transition-colors duration-200 ${selectedItemId === item.id
        ? 'bg-blue-50'
        : 'border-gray-200 hover:bg-gray-50'
        }`}
    >
      <Placeholder
        key={item.title}
        text={getFirstNChars(item.title, 6)}
        backgroundColor="#e2e8f0"
        textColor="#4a5568"
        className="capitalize"
        size={60}
      />
  
      <div className="flex-1">
        <h3 className="font-semibold text-gray-800">{item.title}</h3>
        <p className="text-gray-600 text-sm">{item.description}</p>
      </div>
  
      {item.url && (
        <a
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
          aria-label={`Open ${item.title} in a new tab`}
        >
          <SquareArrowOutUpRight className="text-gray-400 dark:text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
        </a>
      )}
    </div>
  );
}

// A single results group (group of results)
const IslandView: React.FC<{ id: string, result: ResultState, onItemSelect: (itemId: string) => void, selectedItemId: string | null }> = ({ id, result, onItemSelect, selectedItemId }) => {
  const sources = useActiveSources();

  const resultsGroup = result.data;
  const doesShow = sources.some(item => item.name === id)

  if (resultsGroup) {
    return (
      <div className={`mb-8 ${doesShow ? '' : 'hidden'}`}>
        <h2 className="text-lg font-bold text-gray-700 mb-4 px-2">{resultsGroup.title}</h2>
        <div className="bg-white rounded-3xl shadow-sm overflow-hidden divide-y divide-gray-200">
          {resultsGroup.results.map((item) => (
            <ResultCard key={item.id} item={item} onItemSelect={onItemSelect} selectedItemId={selectedItemId} />
          ))}
        </div>
      </div>
    );
  }
}

export default IslandView;