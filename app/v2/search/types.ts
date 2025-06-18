import { MenuGroup, MenuOption } from "../menu/types"

export interface BaseSearchComponentProps {
    onResultSelect: (resultItem: ResultItem) => void
    selectedResult: ResultItem | null
    onNewResults: (menuGroup: MenuGroup, menuOption: MenuOption, resultsGroup: ResultsGroup) => void
    onLoadingResults: (menuGroup: MenuGroup, menuOption: MenuOption, isLoading: boolean) => void
    onError: (menuGroup: MenuGroup, menuOption: MenuOption, errorMsg: string) => void
}