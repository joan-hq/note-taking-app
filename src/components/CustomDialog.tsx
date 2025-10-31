import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Divider,
  DialogContentText,
} from "@mui/material";
import React from "react";

interface CustomDialogProps {
  open: boolean;
  title: string;
  value: string;
  placeholder: string;
  rulesText?: string;
  onClose: () => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const CustomDialog = ({
  open,
  title,
  value,
  placeholder,
  rulesText,
  onClose,
  onSubmit,
  onChange,
}: CustomDialogProps) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          borderRadius: 4,
          p: 1,
          width: "100%",
          minWidth: "400px",
        },
      }}
    >
      <DialogTitle sx={{ fontSize: "1.25rem", fontWeight: 600, p: 2 }}>
        {title}
      </DialogTitle>

      <DialogContent sx={{ p: 2, pt: 0 }}>
        <form onSubmit={onSubmit} id="custom-dialog-form">
          {rulesText && (
            <DialogContentText color="text.secondary" sx={{ mb: 2 }}>
              {rulesText}
            </DialogContentText>
          )}

          <TextField
            autoFocus
            fullWidth
            variant="outlined"
            margin="dense"
            placeholder={placeholder}
            onChange={onChange}
            value={value}
          />
        </form>
      </DialogContent>

      <Divider sx={{ mx: 2 }} />

      <DialogActions sx={{ p: 2, justifyContent: "flex-end" }}>
        <Button
          onClick={onClose}
          variant="text"
          color="inherit"
          sx={{ color: "text.secondary" }}
        >
          Cancel
        </Button>
        <Button type="submit" variant="contained" form="custom-dialog-form">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CustomDialog;
