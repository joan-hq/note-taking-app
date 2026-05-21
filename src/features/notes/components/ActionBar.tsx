import { ActionButton } from '@/components/common/buttons/ActionButton';
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';
import UnarchiveOutlinedIcon from '@mui/icons-material/UnarchiveOutlined';
import FolderDeleteOutlinedIcon from '@mui/icons-material/FolderDeleteOutlined';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import { Box } from "@mui/material";
import { useNoteContext } from '../context/noteContext';


export const ActionBar = () => {
    const {updateNote,selectedNote,setSelectedNoteId,permanentlyDeleteNote} = useNoteContext();
    if(!selectedNote)return null;
    const isArchived = selectedNote.status === 'archived';
     const isTrashed = selectedNote.status === 'trashed';
    return(<>
    {
      isTrashed? (
            //
            <Box>
                <ActionButton title="Restore" handleFabClick={() => { 
                        updateNote(selectedNote.id, { status: 'active' }); 
                        setSelectedNoteId(null); 
                        }}>
                    <UnarchiveOutlinedIcon /> 
                </ActionButton>
                <ActionButton title="Delete Forever" handleFabClick={() => permanentlyDeleteNote(selectedNote.id)}>
                    <DeleteForeverOutlinedIcon /> 
                </ActionButton>
            </Box>
        ) : isArchived ? 
        //to active satus
       ( <Box>
            <ActionButton title="Restore" handleFabClick={()=>{
                        updateNote(selectedNote.id, {status: 'active'});
                        setSelectedNoteId(null)
                                            }}>
                <UnarchiveOutlinedIcon />
            </ActionButton>
            <ActionButton title="Move to Trash" handleFabClick={()=>{
                updateNote(selectedNote.id, {status: 'trashed'});
                setSelectedNoteId(null)
                }}>
                <FolderDeleteOutlinedIcon/>
            </ActionButton>
        </Box> )
        
        : 
        //to archived satus
       ( <Box>
            <ActionButton title="Archive" handleFabClick={()=>{
                updateNote(selectedNote.id, {status: 'archived'});
                setSelectedNoteId(null);
                }}>
                <ArchiveOutlinedIcon />
            </ActionButton>
            <ActionButton title="Move to Trash" handleFabClick={()=>{
                 console.log('trash clicked', selectedNote.id); 
                    updateNote(selectedNote.id, {status:'trashed'});
                    setSelectedNoteId(null);
                 
                    }                
                }>
                <FolderDeleteOutlinedIcon />
            </ActionButton>
        </Box>)
    }
        
    
    </>);
};