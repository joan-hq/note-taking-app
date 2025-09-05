import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";

interface NewNoteButtonProps {
  handleNewNoteClick: (event: React.MouseEvent<HTMLElement>) => void;
}

const NewNoteButton = ({ handleNewNoteClick }: NewNoteButtonProps) => {
  return (
    <>
      <Button
        variant="outlined"
        startIcon={<AddIcon />}
        onClick={handleNewNoteClick}
      ></Button>
    </>
  );
};

export default NewNoteButton;
