import { SearchSection } from "../components/SearchSection";
import { NoteSortButton } from "../components/NoteSortButton";
import { NoteList } from "../components/NoteList";


export const MiddlerBar = () => {

    return(<>   
        <SearchSection/>
        <NoteSortButton/>
        <NoteList/>
        </>
    );

}