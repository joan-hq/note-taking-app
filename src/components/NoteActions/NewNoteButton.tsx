import AddIcon from "@mui/icons-material/Add";
import CustomButton from "../CustomButton";
import styled from "styled-components";

interface NewNoteButtonProps {
  handleNewNoteClick: (event: React.MouseEvent<HTMLElement>) => void;
  className?: string;
}

const StyledCustomButton = styled(CustomButton)`
  && {
    background-color: var(--color-brand-primary);
  }
`;

const NewNoteButton = ({
  className,
  handleNewNoteClick,
}: NewNoteButtonProps) => {
  return (
    <>
      <StyledCustomButton
        startIcon={<AddIcon className="text-white !text-3xl" />}
        onClick={handleNewNoteClick}
        className={className}
      ></StyledCustomButton>
    </>
  );
};

export default NewNoteButton;
