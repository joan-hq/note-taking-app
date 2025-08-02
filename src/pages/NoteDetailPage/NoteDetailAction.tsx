import Button from "@mui/material/Button";

interface NoteActionProps {
  handleSave: () => void;
  handleCancel: () => void;
}
const NoteAction = ({ handleSave, handleCancel }: NoteActionProps) => {
  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleSave}>
        Save
      </Button>
      <Button variant="outlined" color="primary" onClick={handleCancel}>
        Cancel
      </Button>
    </div>
  );
};
export default NoteAction;
