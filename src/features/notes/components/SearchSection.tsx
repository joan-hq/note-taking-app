import { SearchBar } from "@/components/SearchBar";
import { useNoteContext } from "../context/noteContext";

export const SearchSection = () => {
    const {setSearchQuery} = useNoteContext();
    return (<>
        <SearchBar 
        placeholder="Search Note..."
        handleClearSearch={()=>setSearchQuery('')}
        handleSearchBar={(value)=>setSearchQuery(value)}
        />
    </>);
};