// --- Components ---

import { SquareArrowOutUpRight } from "lucide-react";
import Placeholder from "../Placeholder";
import { getFirstNChars } from "../utills";
import { useActiveSources } from "../context/GlobalAppContext";

// A single result item card
const ResultCard: React.FC<{ item: ResultItem, onItemSelect: (itemId: string) => void, selectedItemId: string | null }> = ({ item, onItemSelect, selectedItemId }) => (
  <div
    onClick={() => onItemSelect(item.id)}
    className={`group cursor-pointer p-4 flex items-center space-x-4 transition-colors duration-200 ${selectedItemId === item.id
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
    {/* Make the icon invisible by default and visible on group-hover. */}
    {/* - `opacity-0` makes it fully transparent. */}
    {/* - `group-hover:opacity-100` makes it fully opaque when the parent `group` is hovered. */}
    {/* - `transition-opacity` and `duration-200` create a smooth fade-in effect. */}
    <SquareArrowOutUpRight className="text-gray-400 dark:text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
  </div>
);

// A single island (group of results)
const IslandView: React.FC<{ id: string, result: ResultState, onItemSelect: (itemId: string) => void, selectedItemId: string | null }> = ({ id, result, onItemSelect, selectedItemId }) => {
  const sources = useActiveSources();
  
  const island = result.data;
  const doesShow = sources.some(item => item.name === id)

  if (island) {
    return (
      <div className={`mb-8 ${doesShow ? '' : 'hidden'}`}>
        <h2 className="text-lg font-bold text-gray-700 mb-4 px-2">{island.title}</h2>
        <div className="bg-white rounded-3xl shadow-sm overflow-hidden divide-y divide-gray-200">
          {island.results.map((item) => (
            <ResultCard key={item.id} item={item} onItemSelect={onItemSelect} selectedItemId={selectedItemId} />
          ))}
        </div>
      </div>
    );
  }
}

export default IslandView;