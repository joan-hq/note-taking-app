import {ListItemAvatar,Avatar,ListItem,ListItemText} from '@mui/material';
import SellOutlinedIcon from '@mui/icons-material/SellOutlined';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import { DeleteTagDialog } from './DeleteTagDialog';


interface TagUnitProps  {
    handleConfirm: () => void;
    tagName: string;
};

export const DeleteableTagUnit = ({tagName,handleConfirm} : TagUnitProps) => {
    return (
        <>
        <ListItem secondaryAction={
            <DeleteTagDialog handleConfirm={handleConfirm} tagName={tagName}>
                <ClearOutlinedIcon fontSize="small" />
                </DeleteTagDialog>
        }>        
             <ListItemAvatar>
                <Avatar>
                    <SellOutlinedIcon />
                </Avatar>
            </ListItemAvatar>
            <ListItemText primary={tagName} />
        </ListItem>
        </>
    );
};