import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import { styled } from "@mui/material/styles";

interface NewNoteButtonProps {
  handleNewNoteClick: (event: React.MouseEvent<HTMLElement>) => void;
}

const NewNoteButton = ({ handleNewNoteClick }: NewNoteButtonProps) => {
  const MyStyledButton = styled(Button)(({ theme }) => ({
    backgroundColor: "#1976d2",
    color: "white",
    padding: theme.spacing(1, 3),
    borderRadius: 20,
    "&:hover": {
      backgroundColor: "#115293",
    },
  }));
  return (
    <>
      <MyStyledButton
        variant="contained"
        startIcon={<AddIcon sx={{ fontSize: "3rem" }} />}
        onClick={handleNewNoteClick}
        sx={{ border: "none" }}
      >
        Add
      </MyStyledButton>
    </>
  );
};

export default NewNoteButton;
