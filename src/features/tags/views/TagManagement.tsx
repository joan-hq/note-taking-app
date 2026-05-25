
import { DeleteableTagUnit } from "../components/DeleteableTagUnit";
import { List } from "@mui/material";
import { useNoteContext } from "@/features/notes/context/noteContext";


export const TagManagement = () => {
    const { tags, deleteTag, filterTagId, setFilterTagId } = useNoteContext();

    return (<>
        <div className="px-3 py-2">
            <span className="text-xs font-medium text-[--color-text-muted] uppercase tracking-wider">
                Tags
            </span>
        </div>

        <List>
            {tags.map((tag) => {

                const isSelected = filterTagId === tag.id;
                return (
                    <DeleteableTagUnit
                        key={tag.id}
                        tagId={tag.id}
                        tagName={tag.label}
                        handleConfirm={() => {
                            deleteTag(tag.id)
                            if (filterTagId === tag.id) setFilterTagId(null);
                        }}

                        onClickTag={() => {
                            setFilterTagId(isSelected ? null : tag.id);
                        }}
                        isSelected={isSelected}
                    />
                )
            })}
        </List>

    </>);

};