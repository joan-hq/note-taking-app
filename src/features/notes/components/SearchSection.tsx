import { SearchBar } from "@/components/SearchBar";
import { useNoteContext } from "../context/noteContext";

export const SearchSection = () => {
    const { setSearchQuery } = useNoteContext();
    return (<>
        <SearchBar
            placeholder="Search Note..."
            className="flex items-center gap-2 px-3 py-1.5 border border-gray-200 rounded-full bg-white"
            inputClassName="flex-1 outline-none text-sm bg-transparent"
            handleClearSearch={() => setSearchQuery('')}
            handleSearchBar={(value) => setSearchQuery(value)}
        />
    </>);
};