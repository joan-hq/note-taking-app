import SellOutlinedIcon from '@mui/icons-material/SellOutlined';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import { DeleteTagDialog } from './DeleteTagDialog';
import { useNoteContext } from '@/features/notes/context/noteContext';

interface TagUnitProps {
    handleConfirm: () => void;
    tagName: string;
    tagId: string;
}

export const DeleteableTagUnit = ({ tagName, handleConfirm, tagId }: TagUnitProps) => {
    const { filterTagId, setFilterTagId } = useNoteContext();
    const isSelected = filterTagId === tagId;

    return (
        <div
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg cursor-pointer transition-colors
                ${isSelected ? 'bg-teal-50 text-teal-700' : 'hover:bg-[--color-bg-hover] text-[--color-text-secondary]'}`}
        >
            <SellOutlinedIcon sx={{ fontSize: 14 }} />
            <span
                className="flex-1 text-sm"
                onClick={() => setFilterTagId(isSelected ? null : tagId)}
            >
                {tagName}
            </span>
            <DeleteTagDialog handleConfirm={handleConfirm} tagName={tagName}>
                <ClearOutlinedIcon sx={{ fontSize: 14 }} />
            </DeleteTagDialog>
        </div>
    );
};