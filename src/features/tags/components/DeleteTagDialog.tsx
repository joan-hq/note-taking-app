import { JDialog } from "@/components/common/overlays/Dialog/JDialog";
import { useJDialog } from "@/components/common/overlays/Dialog/useJDialog";
import { ReactNode } from 'react';

interface DeleteTagDialogProps {
    children: ReactNode;
    handleConfirm: () => void;
    tagName: string;
}

export const DeleteTagDialog = ({ handleConfirm, tagName, children }: DeleteTagDialogProps) => {
    const { open, showDialog, hideDialog } = useJDialog();

    return (
        <>
            <button
                onClick={showDialog}
                className="flex items-center justify-center p-0.5 rounded cursor-pointer bg-transparent border-none"
            >
                {children}
            </button>

            <JDialog
                open={open}
                onCancel={hideDialog}
                title="Delete tag"
                confirmBtnColor="danger"
                confirmText="Delete"
                onConfirm={() => {
                    handleConfirm();
                    hideDialog();
                }}
            >
                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                    Deleting <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>#{tagName}</span> will remove it from all notes.
                </p>
            </JDialog>
        </>
    );
};
