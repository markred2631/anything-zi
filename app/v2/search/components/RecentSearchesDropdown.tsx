import Placeholder from "@/app/v2/common/components/Placeholder"
import { RecentSearch } from "@/app/components/search/SearchBar.types"
import { getFirstNChars, stringToColor } from "@/app/v2/common/utills"

type RecentSearchesDropdownProps = {
    recentSearches: RecentSearch[]
    onRecentSearchClick: (value: string) => void
    onClearRecentSearches: () => void
}

export default function RecentSearchesDropdown({recentSearches, onRecentSearchClick, onClearRecentSearches}: RecentSearchesDropdownProps) {
    return (
        <div className="absolute top-32 inset-x-0 mt-2 bg-white dark:bg-[#282828] rounded-lg p-4 shadow-lg animate-fade-in-down border border-gray-200 dark:border-transparent">
            <h2 className="text-gray-900 font-bold text-lg mb-4">Recent searches</h2>

            <ul className="flex flex-col gap-3 mb-4">
                {recentSearches.map((item) => (
                    <li
                        key={item.id}
                        onClick={() => onRecentSearchClick(item.title)}
                        className="flex items-center gap-4 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-white/10 cursor-pointer transition-colors duration-200"
                    >
                        <Placeholder
                            key={item.title}
                            text={getFirstNChars(item.title, 2)}
                            backgroundColor={stringToColor(item.title)}
                            className="uppercase"
                            size={60}
                        />

                        <div>
                            <p className="text-gray-800 dark:text-white font-semibold">{item.title}</p>
                            <p className="text-gray-500 dark:text-gray-400 text-sm">{item.type}</p>
                        </div>
                    </li>
                ))}
            </ul>

            <button
                onClick={onClearRecentSearches}
                className="w-full bg-foreground text-background hover:bg-[#383838] font-bold py-2 px-4 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all duration-300"
            >
                Clear recent searches
            </button>
        </div>
    )
}