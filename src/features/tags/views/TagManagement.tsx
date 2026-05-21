
import { DeleteableTagUnit } from "../components/DeleteableTagUnit";
import { List } from "@mui/material";
import { useNoteContext } from "@/features/notes/context/noteContext";


export const TagManagement = () => {
    const { tags, deleteTag } = useNoteContext();
    console.log('tags', tags);

    return (<>
        <div className="px-3 py-2">
            <span className="text-xs font-medium text-[--color-text-muted] uppercase tracking-wider">
                Tags
            </span>
        </div>

        <List>
            {tags.map((tag) => (
                <DeleteableTagUnit
                    key={tag.id}
                    tagId={tag.id}
                    tagName={tag.label}
                    handleConfirm={() => {
                        deleteTag(tag.id)
                    }}
                />
            ))}
        </List>

    </>);

};