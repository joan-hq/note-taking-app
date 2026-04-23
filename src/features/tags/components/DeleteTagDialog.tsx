import { JDialog } from "@/components/common/overlays/Dialog/JDialog";
import { useJDialog } from "@/components/common/overlays/Dialog/useJDialog";
import { IconButton,DialogContent } from "@mui/material";
import { ReactNode } from 'react';


interface DeleteTagDialog {
    children: ReactNode;
    handleConfirm: () => void;
    tagName: string
};

export const DeleteTagDialog = ({handleConfirm,tagName,children}:DeleteTagDialog) => {
    const{open, showDialog, hideDialog} = useJDialog();

    return(<>
        <IconButton onClick={showDialog}>{children}</IconButton> 
        <JDialog 
            open={open}
            onCancel={hideDialog}
            title="Delete tag"
            confirmBtnColor="primary"
            confirmText="Delete"
            onConfirm={handleConfirm}
        >
         <DialogContent> Delete this tag will delete all related tags {tagName}</DialogContent>
        </JDialog>    
    </>);
};