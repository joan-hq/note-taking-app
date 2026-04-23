import { NoteLogo } from "../components/NoteLogo";
import { NoteStatusFilter } from "../components/NoteStatusFIilter";
import { TagManagement } from "@/features/tags/views/TagManagement";

interface SideBar {};

export const SideBar= () => {
    return (<>
    <NoteLogo />
    <NoteStatusFilter />
    <TagManagement />
    </>);
};
