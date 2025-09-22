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
    padding: theme.spacing(1, 2),
    borderRadius: 50,
    "&:hover": {
      backgroundColor: "#115293",
    },
  }));
  return (
    <>
      <MyStyledButton
        variant="contained"
        startIcon={<AddIcon sx={{ fontSize: "5rem" }} />}
        onClick={handleNewNoteClick}
        sx={{ border: "none" }}
      ></MyStyledButton>
    </>
  );
};

export default NewNoteButton;
