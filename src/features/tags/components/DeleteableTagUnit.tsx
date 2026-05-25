import SellOutlinedIcon from '@mui/icons-material/SellOutlined';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import { DeleteTagDialog } from './DeleteTagDialog';

interface TagUnitProps {
    handleConfirm: () => void;
    tagName: string;
    tagId: string;
    isSelected: boolean;
    onClickTag: () => void;
}

export const DeleteableTagUnit = ({ tagName, handleConfirm, isSelected, onClickTag, tagId }: TagUnitProps) => {
    return (
        <div
            onClick={onClickTag}
            className={`filter-btn group justify-between ${isSelected ? 'filter-btn-active' : ''}`}
        >
            <div className="flex items-center gap-2 truncate">
                <SellOutlinedIcon style={{ fontSize: 14 }} />
                <span className="text-sm truncate">{tagName}</span>
            </div>

            <div onClick={(e) => e.stopPropagation()}>
                <DeleteTagDialog handleConfirm={handleConfirm} tagName={tagName}>
                    <ClearOutlinedIcon
                        style={{ fontSize: 14 }}
                        className={`transition-colors cursor-pointer ${isSelected
                                ? 'text-[--color-active-text]'
                                : 'opacity-0 group-hover:opacity-100 text-[--color-text-muted] hover:text-red-500'
                            }`}
                    />
                </DeleteTagDialog>
            </div>
        </div>
    );
};
