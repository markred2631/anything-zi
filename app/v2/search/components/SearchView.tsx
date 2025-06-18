'use client'

import { useState } from "react";
import IslandView from "../../island/components/IslandView";
import { MenuGroup, MenuOption } from "../../menu/types";
import SearchBar from "./SearchBar";
import { BaseSearchComponentProps } from "../types";

interface SearchViewProps extends BaseSearchComponentProps {
    menuGroups: MenuGroup[]
}

export default function SearchView({ menuGroups, onResultSelect, selectedResult, onNewResults, onLoadingResults, onError }: SearchViewProps) {
    const [searchQuery, setSearchQuery] = useState("")

    return (
        <div className="mx-auto my-auto flex flex-col justify-center w-full">
            <div className="sticky top-0">
                <SearchBar
                    onSearch={(query: string) => setSearchQuery(query)} />
            </div>

            {menuGroups.flatMap(group =>
                group.options.map(option => (
                    <IslandView
                        key={`${group.name}-${option.name}`}
                        menuGroup={group}
                        menuOption={option}
                        searchQuery={searchQuery}
                        onResultSelect={onResultSelect}
                        selectedResult={selectedResult}
                        onNewResults={onNewResults}
                        onLoadingResults={onLoadingResults}
                        onError={onError}
                    />
                ))
            )}
        </div>
    )
}