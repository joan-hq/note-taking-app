import { ReactNode } from 'react';

interface JDialogProps {
    open: boolean;
    title: string;
    children?: ReactNode;
    confirmText?: string;
    confirmBtnColor?: 'primary' | 'danger';
    onCancel: () => void;
    onConfirm: () => void;
}

export const JDialog = ({ open, title, children, confirmText = 'Confirm', confirmBtnColor = 'primary', onCancel, onConfirm }: JDialogProps) => {
    if (!open) return null;

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/30 z-[998]"
                onClick={onCancel}
            />

            {/* Dialog */}
            <div
                className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[999] 
                w-[calc(100%-2rem)] max-w-sm rounded-xl shadow-xl p-6 flex flex-col gap-4"
                style={{ background: 'var(--surface)' }}
            >
                {/* Title */}
                <h2 className="text-base font-semibold m-0" style={{ color: 'var(--text-primary)' }}>
                    {title}
                </h2>

                {/* Content */}
                <div style={{ color: 'var(--text-secondary)' }}>
                    {children}
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-2 mt-2">
                    <button
                        onClick={onCancel}
                        className="btn-ghost px-4 py-2"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className={confirmBtnColor === 'danger' ? 'btn-danger px-4 py-2' : 'btn-primary px-4 py-2'}
                    >
                        {confirmText}
                    </button>
                </div>
            </div>
        </>
    );
};
