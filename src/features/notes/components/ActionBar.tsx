import { ActionButton } from '@/components/common/buttons/ActionButton';
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';
import UnarchiveOutlinedIcon from '@mui/icons-material/UnarchiveOutlined';
import FolderDeleteOutlinedIcon from '@mui/icons-material/FolderDeleteOutlined';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import { Box } from "@mui/material";
import { useNoteContext } from '../context/noteContext';
import {Note} from '@/features/notes/types/noteType'
interface ActionBarProps {
    note: Note;
};

export const ActionBar = ({note}: ActionBarProps) => {
    const {updateNote, deleteNote} = useNoteContext();
    const isArchived = note.status === 'archived';
    return(<>
    {
        isArchived ? 
        <Box>
            <ActionButton handleFabClick={()=>updateNote(note.id, {status: 'active'})}>
                <UnarchiveOutlinedIcon />
            </ActionButton>
            <ActionButton handleFabClick={()=>deleteNote(note.id)}>
                <DeleteForeverOutlinedIcon/>
            </ActionButton>
        </Box> 
        
        : 
        
        <Box>
            <ActionButton handleFabClick={()=>updateNote(note.id, {status: 'archived'})}>
                <ArchiveOutlinedIcon />
            </ActionButton>
            <ActionButton handleFabClick={()=>updateNote(note.id, {status:'trashed'})}>
                <FolderDeleteOutlinedIcon />
            </ActionButton>
        </Box>
    }
        
    
    </>);
};