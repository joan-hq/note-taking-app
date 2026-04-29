import { ActionButton } from '@/components/common/buttons/ActionButton';
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';
import UnarchiveOutlinedIcon from '@mui/icons-material/UnarchiveOutlined';
import FolderDeleteOutlinedIcon from '@mui/icons-material/FolderDeleteOutlined';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import { Box } from "@mui/material";
import { useNoteContext } from '../context/noteContext';
import {Note} from '@/features/notes/types/noteType'


export const ActionBar = () => {
    const {updateNote, deleteNote,selectedNote,setSelectedNoteId} = useNoteContext();
    if(!selectedNote)return null;
    const isArchived = selectedNote.status === 'archived';
    return(<>
    {
        isArchived ? 
        <Box>
            <ActionButton handleFabClick={()=>{
                        updateNote(selectedNote.id, {status: 'active'});
                        setSelectedNoteId(null)
                                            }}>
                <UnarchiveOutlinedIcon />
            </ActionButton>
            <ActionButton handleFabClick={()=>{deleteNote(selectedNote.id);setSelectedNoteId(null)}}>
                <DeleteForeverOutlinedIcon/>
            </ActionButton>
        </Box> 
        
        : 
        
        <Box>
            <ActionButton handleFabClick={()=>{
                updateNote(selectedNote.id, {status: 'archived'});
                setSelectedNoteId(null);
                }}>
                <ArchiveOutlinedIcon />
            </ActionButton>
            <ActionButton handleFabClick={()=>{
                 console.log('trash clicked', selectedNote.id); 
                updateNote(selectedNote.id, {status:'trashed'});
                 setSelectedNoteId(null);
                 
                }                
                }>
                <FolderDeleteOutlinedIcon />
            </ActionButton>
        </Box>
    }
        
    
    </>);
};