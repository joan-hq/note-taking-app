import { NoteLogo } from "../components/NoteLogo";
import { NewNoteButton } from "../components/NewNoteButton";
import { NoteStatusFilter } from "../components/NoteStatusFIilter";
import { TagManagement } from "@/features/tags/views/TagManagement";


export const SideBar= () => {
    return (<>
    <NoteLogo />
    <NewNoteButton />
    <NoteStatusFilter />
    <TagManagement />
    </>);
};
