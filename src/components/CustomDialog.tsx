import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

interface CustomDialogProps {
  controlDialogOpen: boolean;
  handleDialogClose: () => void;
  handleDialogSubmit: () => void;
  handleDialogOnChange: () => void;
  value: string;
  placeholder: string;
}

const CustomDialog = ({
  controlDialogOpen,
  value,
  placeholder,
  handleDialogClose,
  handleDialogSubmit,
  handleDialogOnChange,
}: CustomDialogProps) => {
  <Dialog open={controlDialogOpen} onClose={handleDialogClose}>
    <DialogContent>
      <form onSubmit={handleDialogSubmit} id="addnewtag-form">
        <TextField
          autoFocus
          fullWidth
          variant="standard"
          margin="dense"
          placeholder={placeholder}
          onChange={handleDialogOnChange}
          value={value}
        />
      </form>
    </DialogContent>

    <DialogActions>
      <Button onClick={handleDialogClose}>Cancel</Button>
      <Button type="submit" form="addnewtag-form">
        save
      </Button>
    </DialogActions>
  </Dialog>;
};

export default CustomDialog;
