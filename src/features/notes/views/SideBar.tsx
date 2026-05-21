import { NoteLogo } from "../components/NoteLogo";
import { NewNoteButton } from "../components/NewNoteButton";
import { NoteStatusFilter } from "../components/NoteStatusFIilter";
import { TagManagement } from "@/features/tags/views/TagManagement";
import { UserMenu } from "../components/UserMenu";


export const SideBar = () => {
    return (
        <div className="flex flex-col h-full">
            <div className="p-4">
                <NoteLogo />
            </div>
            <div className="px-2">
                <NewNoteButton />
            </div>
            <div className="mt-2">
                <NoteStatusFilter />
            </div>
            <div className="mt-2 flex-1 overflow-y-auto max-h-56">
                <TagManagement />
            </div>
            <div className="border-t border-gray-100 mt-auto">
                <UserMenu />
            </div>
        </div>
    );
};
