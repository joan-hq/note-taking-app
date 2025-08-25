import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import { useDialog } from "../../hooks/useDialog";

interface AddNewTagDialogProps {
  newTagValue: string;
  open: boolean;
  handleNewTagSave: () => void;
  handleNewTagOnChange: () => void;
  hideDialog: () => void;
}
const AddNewTagDialog = ({
  newTagValue,
  open,
  hideDialog,
  handleNewTagSave,
  handleNewTagOnChange,
}: AddNewTagDialogProps) => {
  return (
    <>
      <Dialog open={open} onClose={hideDialog}>
        <DialogContent>
          <form onSubmit={handleNewTagSave} id="addnewtag-form">
            <TextField
              autoFocus
              //required
              fullWidth
              variant="standard"
              margin="dense"
              placeholder="Enter a new tag"
              onChange={handleNewTagOnChange}
              value={newTagValue}
            />
          </form>
        </DialogContent>

        <DialogActions>
          <Button onClick={hideDialog}>Cancel</Button>
          <Button type="submit" form="addnewtag-form">
            save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AddNewTagDialog;
