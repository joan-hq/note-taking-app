import { ReactNode } from 'react';
import { Tooltip } from '@mui/material';


interface ActionButtonProps {
    title?: string,
    children?: ReactNode,
    handleFabClick: (e?: React.MouseEvent<HTMLElement>) => void;
    variant?: 'ghost' | 'danger';

};

export const ActionButton = ({
    title,
    children,
    handleFabClick,
    variant = 'ghost',
}: ActionButtonProps) => {
    return (
        <Tooltip title={title ?? ''} arrow placement="top">
            <button
                onClick={handleFabClick}
                className={variant === 'danger'
                    ? 'p-1.5 rounded-lg text-red-600 hover:bg-red-50 transition-colors cursor-pointer'
                    : 'p-1.5 rounded-lg transition-colors cursor-pointer'}
                style={variant === 'ghost' ? { color: 'var(--text-secondary)' } : {}}
                onMouseEnter={e => variant === 'ghost' && (e.currentTarget.style.background = 'var(--ghost-hover)')}
                onMouseLeave={e => variant === 'ghost' && (e.currentTarget.style.background = 'transparent')}
            >
                {children}
            </button>
        </Tooltip>
    );
};