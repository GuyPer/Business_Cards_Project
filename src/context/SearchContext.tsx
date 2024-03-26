import { createContext, useState } from "react"

interface SearchContextType {
    searchVal: string
    setSearchVal: (searchVal: string) => void;
}

export const SearchContext = createContext<SearchContextType | undefined>(undefined);

export default function SearchProvider({ children }: { children: React.ReactNode }) {

    const [searchVal, setSearchVal] = useState<string>("")

    return (
        <SearchContext.Provider value={{ searchVal, setSearchVal }}>
            {children}
        </SearchContext.Provider>
    )
}