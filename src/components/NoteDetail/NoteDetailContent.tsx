import { TextField, Box } from "@mui/material";

interface NoteDetailContentProps {
  noteValue: string;
  handleContentOnChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const NoteDetailContent = ({
  noteValue,
  handleContentOnChange,
}: NoteDetailContentProps) => {
  return (
    <Box>
      <TextField
        variant="standard"
        placeholder="Enter your  note here..."
        multiline
        value={noteValue}
        onChange={handleContentOnChange}
      />
    </Box>
  );
};

export default NoteDetailContent;
