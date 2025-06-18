"use client"

import { useEffect, useState } from "react"
import { MenuGroup, MenuOption } from "../../menu/types"
import { fetchResults } from "../../search/fetchers"
import IslandEntry from "./IslandEntry"
import { BaseSearchComponentProps } from "../../search/types"

interface IslandViewProps extends BaseSearchComponentProps {
    menuGroup: MenuGroup
    menuOption: MenuOption
    searchQuery: string
}

export default function IslandView({ menuGroup, menuOption, searchQuery, onResultSelect, selectedResult, onNewResults, onLoadingResults, onError }: IslandViewProps) {
    const [resultsGroup, setResultsGroup] = useState<ResultsGroup>()

    useEffect(() => {
        if (menuOption.active && searchQuery) {
            onLoadingResults(menuGroup, menuOption, true)
            fetchResults(menuGroup, menuOption, searchQuery)
                .then((fetchedResultsGroup: ResultsGroup) => {
                    setResultsGroup(fetchedResultsGroup)
                    onLoadingResults(menuGroup, menuOption, false)
                    onNewResults(menuGroup, menuOption, fetchedResultsGroup)
                })
                .catch(error => {
                    // extract a user-friendly message
                    const message = error instanceof Error ? error.message : String(error);
                    // notify parent of the error
                    onError(menuGroup, menuOption, message);
                    // stop loading spinner
                    onLoadingResults(menuGroup, menuOption, false);
                })
        }
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
                    </div>
                </div>
            </div>
        )
    }
}