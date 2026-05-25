import { JDialog } from "@/components/common/overlays/Dialog/JDialog";
import { useJDialog } from "@/components/common/overlays/Dialog/useJDialog";
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { useState } from 'react';

interface AddNewTagDialogProps {
    handleConfirm: (tagName: string) => void;
}

export const AddNewTagDialog = ({ handleConfirm }: AddNewTagDialogProps) => {
    const { open, showDialog, hideDialog } = useJDialog();
    const [inputValue, setInputValue] = useState('');

    const onInternalConfirm = () => {
        handleConfirm(inputValue);
        setInputValue('');
        hideDialog();
    };

    return (
        <>
            <button
                onClick={showDialog}
                title="Add new tag"
                className="p-1.5 rounded-lg transition-colors cursor-pointer"
                style={{ color: 'var(--text-secondary)' }}
                onMouseEnter={e => (e.currentTarget.style.background = 'var(--ghost-hover)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
            >
                <AddOutlinedIcon fontSize="small" />
            </button>

            <JDialog
                open={open}
                title="New Tag"
                confirmText="Create"
                onCancel={() => {
                    setInputValue('');
                    hideDialog();
                }}
                onConfirm={onInternalConfirm}
            >
                <p className="text-xs mb-3" style={{ color: 'var(--text-secondary)' }}>
                    More than 3 characters, less than 20 characters
                </p>
                <input
                    autoFocus
                    type="text"
                    value={inputValue}
                    placeholder="Tag name"
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && onInternalConfirm()}
                    className="w-full px-3 py-2.5 rounded-lg text-sm focus:outline-none transition-all"
                    style={{
                        background: 'var(--ghost-hover)',
                        border: '1.5px solid var(--border)',
                        color: 'var(--text-primary)',
                    }}
                    onFocus={e => (e.currentTarget.style.borderColor = 'var(--primary)')}
                    onBlur={e => (e.currentTarget.style.borderColor = 'var(--border)')}
                />
            </JDialog>
        </>
    );
};
