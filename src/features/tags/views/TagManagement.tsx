import { DeleteableTagUnit } from "../components/DeleteableTagUnit"; 
import {Tag} from '@/features/tags/types/tagType'
import { List } from "@mui/material";


interface TagManagementProps {
    tags: Tag[];
};

export const TagManagement = ({tags}:TagManagementProps) => {
    
    return(<>
        
            <List>
               {tags.map((tag) => (
                <DeleteableTagUnit key={tag.id}
                tagName={tag.label}
                handleConfirm={() => {
                    console.log('deleting',tag.id)
                    //Parent need handle this function
                }}
                />
                ))}
            </List>
        </>);

};