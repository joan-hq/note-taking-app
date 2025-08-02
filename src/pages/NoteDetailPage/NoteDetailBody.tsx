import TextField from "@mui/material/TextField";

interface NoteBodyProps {
  notevalue: string;
  handleNoteOnChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
const NoteBody = ({ notevalue, handleNoteOnChange }: NoteBodyProps) => {
  return (
    <div>
      <TextField
        variant="standard"
        slotProps={{
          input: {
            disableUnderline: true,
          },
        }}
        placeholder="Enter your  note here..."
        fullWidth
        multiline
        onChange={handleNoteOnChange}
        value={notevalue}
      />
    </div>
  );
};
export default NoteBody;
