import { IconButton, IconButtonProps, Tooltip} from '@mui/material';
import { ReactNode } from 'react';

interface CustomActionButtonProps {
    title?:string,
    children?: ReactNode,
    handleFabClick: () => void;

};

interface ActionButtonProps extends CustomActionButtonProps, IconButtonProps{}

export const ActionButton = ({
    title,
    children,
    handleFabClick,
    ...props
}:ActionButtonProps) => {
    return(
        <Tooltip title={title ?? ''}>
            <IconButton onClick={handleFabClick} size="small" {...props}>
                {children}
            </IconButton>
        </Tooltip>
        );
};