import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import { useDialog } from "../../hooks/useDialog";

interface AddNewTagDialogProps {
  newTagInputValue: string;
  open: boolean;
  handleNewTagSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  handleNewTagInput: (event: React.ChangeEvent<HTMLInputElement>) => void;
  hideDialog: () => void;
}
const AddNewTagDialog = ({
  newTagInputValue,
  open,
  hideDialog,
  handleNewTagSubmit,
  handleNewTagInput,
}: AddNewTagDialogProps) => {
  return (
    <>
      <Dialog open={open} onClose={hideDialog}>
        <DialogContent>
          <form onSubmit={handleNewTagSubmit} id="addnewtag-form">
            <TextField
              autoFocus
              //required
              fullWidth
              variant="standard"
              margin="dense"
              placeholder="Enter a new tag"
              onChange={handleNewTagInput}
              value={newTagInputValue}
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
