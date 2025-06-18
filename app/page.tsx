"use client"

import { useState } from "react";
import ClassificationHeader from "./v2/classification/components/ClassificationHeader";
import Menu from "./v2/menu/components/Menu";
import { useMenuGroups } from "./v2/menu/hooks";
import SearchView from "./v2/search/components/SearchView";
import { MenuGroup, MenuOption } from "./v2/menu/types";
import DetailView from "./v2/detail/components/DetailView";
import { ResultItem, ResultsGroup } from "./v2/common/types";

export default function Home() {
  const { menuGroups, toggleOption, setOptionCount, disableAllOtherOptions, setLoading, setErrMsg } = useMenuGroups()
  const [selectedResult, setSelectedResult] = useState<ResultItem | null>(null);

  const onResultSelect = (selectedResult: ResultItem) => {
    setSelectedResult(selectedResult);
  };

  const onNewResults = (menuGroup: MenuGroup, menuOption: MenuOption, resultsGroup: ResultsGroup) => {
    setOptionCount(menuGroup, menuOption, resultsGroup.results.length)
  }

  const screenBaseSliceStyles = "p-4"
  const screenLeftRightSliceStyles = "border-1 border-gray-200 rounded-lg bg-white"
  const isSplitView = selectedResult!!

  return (
    <div className="px-4 pb-4 h-screen font-sans flex flex-col bg-neutral-50">
      <ClassificationHeader />

      <main className="mt-4 mx-auto flex flex-row flex-grow w-full overflow-hidden gap-x-4">
        <div className={`w-64 ${screenBaseSliceStyles} ${screenLeftRightSliceStyles}`}>
          <Menu
            menuGroups={menuGroups}
            onOptionClick={toggleOption}
            onOptionDoubleClick={disableAllOtherOptions} />
        </div>
        <div className="h-full flex justify-center flex-grow gap-x-4 overflow-hidden">
          <div className={`w-1/2 overflow-y-auto flex ${screenBaseSliceStyles}`}>
            <SearchView
              menuGroups={menuGroups}
              onResultSelect={onResultSelect}
              selectedResult={selectedResult}
              onNewResults={onNewResults}
              onLoadingResults={setLoading}
              onError={setErrMsg} />
          </div>
          {isSplitView && (
            <div className={`w-1/2 ${screenBaseSliceStyles} ${screenLeftRightSliceStyles}`}>
              <DetailView selectedResult={selectedResult} onClose={() => { setSelectedResult(null) }} />
            </div>
          )}
        </div>
      </main>
    </div>
  );
}