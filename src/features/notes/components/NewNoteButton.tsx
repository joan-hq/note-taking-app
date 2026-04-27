import { ActionButton } from '@/components/common/buttons/ActionButton';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { useNoteContext } from "../context/noteContext";

export const NewNoteButton = () => {
    const {createNote} = useNoteContext();
    return (<>
        <ActionButton title='New Note' handleFabClick={()=>createNote}>            
            <AddOutlinedIcon />
        </ActionButton>
    </>)
};