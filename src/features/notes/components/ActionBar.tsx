import { ActionButton } from '@/components/common/buttons/ActionButton';
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';
import UnarchiveOutlinedIcon from '@mui/icons-material/UnarchiveOutlined';
import FolderDeleteOutlinedIcon from '@mui/icons-material/FolderDeleteOutlined';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import { useNoteContext } from '../context/noteContext';

export const ActionBar = () => {
    const { updateNote, selectedNote, setSelectedNoteId, permanentlyDeleteNote } = useNoteContext();
    if (!selectedNote) return null;

    const isArchived = selectedNote.status === 'archived';
    const isTrashed = selectedNote.status === 'trashed';

    return (
        <div className="flex items-center gap-1">
            {isTrashed ? (
                <>
                    <ActionButton title="Restore" handleFabClick={() => { updateNote(selectedNote.id, { status: 'active' }); setSelectedNoteId(null); }}>
                        <UnarchiveOutlinedIcon fontSize="small" />
                    </ActionButton>
                    <ActionButton title="Archive" handleFabClick={() => { updateNote(selectedNote.id, { status: 'archived' }); setSelectedNoteId(null); }}>
                        <ArchiveOutlinedIcon fontSize="small" />
                    </ActionButton>
                    <ActionButton title="Delete Forever" variant="danger" handleFabClick={() => permanentlyDeleteNote(selectedNote.id)}>
                        <DeleteForeverOutlinedIcon fontSize="small" />
                    </ActionButton>
                </>
            ) : isArchived ? (
                <>
                    <ActionButton title="Restore" handleFabClick={() => { updateNote(selectedNote.id, { status: 'active' }); setSelectedNoteId(null); }}>
                        <UnarchiveOutlinedIcon fontSize="small" />
                    </ActionButton>
                    <ActionButton title="Move to Trash" handleFabClick={() => { updateNote(selectedNote.id, { status: 'trashed' }); setSelectedNoteId(null); }}>
                        <FolderDeleteOutlinedIcon fontSize="small" />
                    </ActionButton>
                    <ActionButton title="Delete Forever" variant="danger" handleFabClick={() => permanentlyDeleteNote(selectedNote.id)}>
                        <DeleteForeverOutlinedIcon fontSize="small" />
                    </ActionButton>
                </>
            ) : (
                <>
                    <ActionButton title="Archive" handleFabClick={() => { updateNote(selectedNote.id, { status: 'archived' }); setSelectedNoteId(null); }}>
                        <ArchiveOutlinedIcon fontSize="small" />
                    </ActionButton>
                    <ActionButton title="Move to Trash" handleFabClick={() => { updateNote(selectedNote.id, { status: 'trashed' }); setSelectedNoteId(null); }}>
                        <FolderDeleteOutlinedIcon fontSize="small" />
                    </ActionButton>
                    <ActionButton title="Delete Forever" variant="danger" handleFabClick={() => permanentlyDeleteNote(selectedNote.id)}>
                        <DeleteForeverOutlinedIcon fontSize="small" />
                    </ActionButton>
                </>
            )}
        </div>
    );
};
