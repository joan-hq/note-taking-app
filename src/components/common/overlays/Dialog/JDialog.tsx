import{Button,
    Dialog,
    DialogActions,
    DialogContent,
DialogTitle} from '@mui/material';
import { ReactNode } from 'react';

interface JDialogProps {
    open: boolean,
    title:string,
    children: ReactNode,
    confirmText?: string,
    confirmBtnColor?: 'primary',
    onCancel: ()=>void,
    onConfirm: ()=>void,
};

export const JDialog = ({open,title,children,confirmText,confirmBtnColor,onCancel,onConfirm}: JDialogProps) => {
    return (
        <Dialog open={open}>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                {children}
                </DialogContent>
            <DialogActions>
                <Button onClick={onCancel}>Cancel</Button>
                <Button onClick={onConfirm} color={confirmBtnColor}>{confirmText}</Button>
            </DialogActions>
        </Dialog>
    );    
};