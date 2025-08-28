import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";

interface NewNoteButtonProps {
  handleNewNoteClick: () => void;
}

const NewNoteButton = ({ handleNewNoteClick }: NewNoteButtonProps) => {
  return (
    <>
      <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={handleNewNoteClick}
      ></Button>
    </>
  );
};

export default NewNoteButton;
