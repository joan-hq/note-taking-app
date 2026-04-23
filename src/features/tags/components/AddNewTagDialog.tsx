
import {IconButton,TextField,DialogContent} from '@mui/material'
import { JDialog } from "@/components/common/overlays/Dialog/JDialog";
import { useJDialog } from "@/components/common/overlays/Dialog/useJDialog";
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { useState } from 'react';

interface AddNewTagDialogProps {
    handleConfirm: (tagName: string) => void;
};

export const AddNewTagDialog = ({handleConfirm}: AddNewTagDialogProps) => {

    const{open,showDialog, hideDialog} = useJDialog();
    const [inputValue,setInputValue] = useState('');

    const onInternalConfirm = () => {
        handleConfirm(inputValue);
        setInputValue('');
        hideDialog();
    };
    
    return(<>
        <IconButton onClick={showDialog}><AddOutlinedIcon/></IconButton>
        <JDialog 
            open={open} 
            title='Create a new tag'
            confirmText='save'
            confirmBtnColor='primary'
            onCancel={() => {
                setInputValue('');
                hideDialog();
            }}
            onConfirm={onInternalConfirm}>
            <DialogContent>more than 3 character, less than 20 character</DialogContent>
            <TextField 
                fullWidth
                value={inputValue} 
                label="add new tag" 
                onChange={(e) => setInputValue(e.target.value)}
            />
        </JDialog>
    </>
    );
};