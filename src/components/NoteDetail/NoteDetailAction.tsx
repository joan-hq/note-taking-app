import Button from "@mui/material/Button";

interface NoteDetailActionProps {
  handleNoteEditSave: (
    event:
      | React.MouseEvent<HTMLButtonElement>
      | React.FormEvent<HTMLFormElement>
  ) => void;
  handleNoteEditCancel: () => void;
}
const NoteDetailAction = ({
  handleNoteEditSave,
  handleNoteEditCancel,
}: NoteDetailActionProps) => {
  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleNoteEditSave}>
        Save
      </Button>
      <Button variant="outlined" color="primary" onClick={handleNoteEditCancel}>
        Cancel
      </Button>
    </div>
  );
};
export default NoteDetailAction;
