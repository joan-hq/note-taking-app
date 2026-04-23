import { ActionButton } from "@/components/common/buttons/actionButton";
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';

interface NewNoteBtnProps {
    handleNewNoteClick: () => void;
};

export const NewNoteButton = ({handleNewNoteClick}: NewNoteBtnProps) => {
    return (<>
        <ActionButton title='New Note' handleFabClick={handleNewNoteClick}>            
            <AddOutlinedIcon />
        </ActionButton>
    </>)
};