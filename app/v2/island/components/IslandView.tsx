"use client"

import { useCallback, useEffect, useState } from "react"
import { MenuGroup, MenuOption } from "../../menu/types"
import { fetchResults } from "../../search/fetchers"
import IslandEntry from "./IslandEntry"
import { BaseSearchComponentProps } from "../../search/types"
import { ResultsGroup } from "../../common/types"
import { ChevronDown, CopyPlus } from "lucide-react"

interface IslandViewProps extends BaseSearchComponentProps {
    menuGroup: MenuGroup
    menuOption: MenuOption
    searchQuery: string
}

export default function IslandView({ menuGroup, menuOption, searchQuery, onResultSelect, selectedResult, onNewResults, onLoadingResults, onError }: IslandViewProps) {
    const [resultsGroup, setResultsGroup] = useState<ResultsGroup>()

    const executeSearch = useCallback(() => {
        if (menuOption.active && searchQuery) {
            onLoadingResults(menuGroup, menuOption, true);
            fetchResults(menuGroup, menuOption, searchQuery)
                .then((fetchedResultsGroup: ResultsGroup) => {
                    setResultsGroup(prevResultsGroup => {
                        // If there are no previous results, return the new ones.
                        if (!prevResultsGroup) {
                            return fetchedResultsGroup;
                        }
    
                        // Otherwise, merge the new results with the previous ones.
                        return {
                            ...prevResultsGroup,
                            // Assuming 'results' is the array you want to append to.
                            // You may need to adjust this depending on your data structure.
                            results: [...prevResultsGroup.results, ...fetchedResultsGroup.results],
                            // You might want to update other properties of resultsGroup as well
                            // For example, a total count or page information
                        };
                    });
                    onLoadingResults(menuGroup, menuOption, false);
                    // Note: You might want to pass the *newly combined* results group
                    // to onNewResults if it needs the full list.
                    // You would need to capture the new state after setting it,
                    // which might require a useEffect hook.
                    onNewResults(menuGroup, menuOption, fetchedResultsGroup); // This still passes only the new results
                })
                .catch(error => {
                    const message = error instanceof Error ? error.message : String(error);
                    onError(menuGroup, menuOption, message);
                    onLoadingResults(menuGroup, menuOption, false);
                });
        }
    }, [searchQuery, menuOption, menuGroup, onLoadingResults, fetchResults, onError, onNewResults]);

    useEffect(() => {
        executeSearch()
    }, [searchQuery])

    const isHidden = !menuOption.active;

    if (resultsGroup) {
        return (
            <div className="mt-4">
                <div className={`mb-8 ${isHidden ? 'hidden' : ''}`}>
                    <h2 className="text-lg font-bold text-gray-700 mb-4 px-2">{resultsGroup.title}</h2>
                    <div className="bg-white rounded-3xl shadow-sm overflow-hidden divide-y divide-gray-200">
                        {resultsGroup.results.map((item) => (
                            <IslandEntry
                                key={item.id}
                                item={item}
                                onResultSelect={onResultSelect}
                                selectedResult={selectedResult} />
                        ))}
                        <div
                            className="group text-gray-500 py-2 cursor-pointer hover:bg-gray-100"
                            title="More results"
                            onClick={() => executeSearch()}>
                            <CopyPlus className="place-self-center" />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}