import Placeholder from "@/app/v2/common/components/Placeholder";
import { getFirstNChars } from "@/app/v2/common/utills";
import { SquareArrowOutUpRight } from "lucide-react";
import { ResultItem } from "../../common/types";

type IslandEntry = {
    item: ResultItem
    onResultSelect: (item: ResultItem) => void
    selectedResult: ResultItem
}

export default function IslandEntry({item, onResultSelect, selectedResult}: IslandEntry) {
    // This function handles the double-click on the entire card.
    // It opens the item's URL in a new tab if it exists.
    const handleDoubleClick = () => {
        if (item.url) {
            window.open(item.url, '_blank', 'noopener,noreferrer');
        }
    };

    return (
        <div
            onClick={() => onResultSelect(item)}
            onDoubleClick={handleDoubleClick}
            className={`group select-none cursor-pointer p-4 flex items-center space-x-4 transition-colors duration-200 ${selectedResult && (selectedResult.id === item.id)
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