import { SearchBar } from "@/components/SearchBar";
import { useNoteContext } from "../context/noteContext";

export const SearchSection = () => {
    const { setSearchQuery } = useNoteContext();

    return (
        <SearchBar
            placeholder="Search notes..."
            className="flex items-center gap-2 px-1.5 py-1.5 rounded-full transition-all"
            containerStyle={{
                background: 'var(--ghost-hover)',
                border: '1.5px solid var(--border)',
            }}
            inputClassName="flex-1 outline-none text-sm bg-transparent"
            handleClearSearch={() => setSearchQuery('')}
            handleSearchBar={(value) => setSearchQuery(value)}
        />
    );
};
