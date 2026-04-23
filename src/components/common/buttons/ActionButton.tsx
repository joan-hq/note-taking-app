import {Fab,FabProps} from '@mui/material';
import { ReactNode } from 'react';

interface CustomActionButtonProps {
    title?:string,
    children?: ReactNode,
    handleFabClick: () => void;

};

interface ActionButtonProps extends CustomActionButtonProps, FabProps{}

export const ActionButton = ({
    title,
    children,
    handleFabClick,
    ...props
}:ActionButtonProps) => {
    return(<>
        <Fab color="primary" {...props} onClick={handleFabClick}>            
            {children}
            {title}
        </Fab>    
    </>);
};