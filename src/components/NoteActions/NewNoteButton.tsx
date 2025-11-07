import AddIcon from "@mui/icons-material/Add";
import styled from "styled-components";
import Button from "@mui/material/Button";
import Fab from "@mui/material/Fab";
import { useNoteContext } from "../../contexts/NoteProvider";
import { useNavigate } from "react-router-dom";

interface NewNoteButtonProps {
  className?: string;
  isFab?: boolean;
}

const StyledFab = styled(Fab)`
  && {
    background-color: var(--color-brand-primary);
    color: white;

    &:hover {
      background-color: var(--color-primary-hover);
      box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
    }
  }
`;

const StyledButton = styled(Button)`
  && {
    background-color: var(--color-brand-primary);
    color: white;

    border-radius: 9999px;
    padding-top: 10px;
    padding-bottom: 10px;

    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

    &:hover {
      background-color: var(--color-primary-hover);
      box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
    }
  }
`;

const NewNoteButton = ({ className, isFab }: NewNoteButtonProps) => {
  const { notes } = useNoteContext();
  const navigate = useNavigate();

  const handleCreateAndNavigate = () => {
    const newNoteId = notes.handleNewNoteClick();
    navigate(`/note/${newNoteId}`);
  };

  if (isFab) {
    return (
      <StyledFab
        aria-label="add"
        className={className}
        // onClick={notes.handleNewNoteClick}
        onClick={handleCreateAndNavigate}
      >
        <AddIcon />
      </StyledFab>
    );
  }
  return (
    <>
      <StyledButton
        startIcon={<AddIcon className="text-white !text-xl" />}
        // onClick={notes.handleNewNoteClick}
        onClick={handleCreateAndNavigate}
        className={className}
        sx={{ textTransform: "none" }}
        fullWidth
      >
        New Note
      </StyledButton>
    </>
  );
};

export default NewNoteButton;
