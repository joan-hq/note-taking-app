import { SearchSection } from "../components/SearchSection";
import { NoteSortButton } from "../components/NoteSortButton";
import { NoteList } from "../components/NoteList";
import { useNoteContext } from "../context/noteContext";


const titleMap = {
    all: 'All Notes',
    archived: 'Archived Notes',
    trashed: 'Spam Notes',
};


export const MiddlerBar = () => {

    const { filterStatus } = useNoteContext();

    return (<>
        <div className="flex flex-col h-full">

            <div className="px-4 pt-4 pb-2">

                <h2 className="text-2xl font-semibold mb-5" style={{ color: 'var(--color-brand-primary)' }}>
                    {titleMap[filterStatus]}
                </h2>

                <div className="flex items-center gap-2">
                    <div className="flex-1">
                        <SearchSection />
                    </div>
                    <NoteSortButton />
                </div>

            </div>

            <div className="flex-1 overflow-y-auto min-h-0">
                <NoteList />
            </div>
        </div>
    </>
    );

}