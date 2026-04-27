import { useState } from "react";
import { DeleteableTagUnit } from "../components/DeleteableTagUnit"; 
import { List } from "@mui/material";
import { Tag } from "../types/tagType";
import { useNoteContext } from "@/features/notes/context/noteContext";
import { JDialog } from "@/components/common/overlays/Dialog/JDialog";
import { useJDialog } from "@/components/common/overlays/Dialog/useJDialog";

export const TagManagement = () => {
    const {tags,deleteTag} = useNoteContext();
    console.log('tags',tags);null 
    
    return(<>
        
            <List>
               {tags.map((tag) => (
                <DeleteableTagUnit key={tag.id}
                tagName={tag.label}
                handleConfirm={() => {
                    deleteTag(tag.id)
                }}
                />           
                ))}
            </List>
          
        </>);

};