import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContentText from "@mui/material/DialogContentText";

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
          <DialogTitle>Create New Tag</DialogTitle>
          <DialogContentText>
            To create new tag, please follew below rouls. Tag cannot be all
            spaces. Tag must be at least 3 characters long. Tag cannot be longer
            than 20 characters.
          </DialogContentText>
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
              sx={{
                "& .MuiInput-underline:before": {
                  borderBottomColor: "var(--color-brand-primary)",
                },
                "& .MuiInput-underline:after": {
                  borderBottomColor: "var(--color-brand-primary)",
                },
              }}
            />
          </form>
        </DialogContent>

        <DialogActions>
          <Button
            onClick={hideDialog}
            sx={{ color: "var(--color-brand-primary)" }}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            form="addnewtag-form"
            sx={{
              backgroundColor: "var(--color-brand-primary)",
              color: "white",
            }}
          >
            save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AddNewTagDialog;
