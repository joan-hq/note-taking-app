import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { useNoteContext } from "../context/noteContext";

export const NewNoteButton = () => {
    const { createNote, filterStatus } = useNoteContext();
    if (filterStatus !== 'all') return null;

    return (
        <button
            onClick={() => createNote()}
            className="
            flex w-full items-center gap-2 px-4 py-2.5 
            rounded-full text-sm font-medium 
            active:scale-95 transition-all
             text-white"
            style={{ backgroundColor: 'var(--color-brand-primary)' }}
        >

            <AddOutlinedIcon fontSize="small" />
            New Note
        </button>
    );
};