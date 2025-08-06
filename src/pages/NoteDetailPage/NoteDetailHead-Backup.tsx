import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Chip from "@mui/material/Chip";
import MyTag from "../../components/Tag";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

interface NoteHeaderProps {
  handleSubmit?: (event: React.KeyboardEvent<HTMLFormElement>) => void;
  handleTagOnChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleTitleOnChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  options: string[];
  title: string | null;
  time: string;
  selectedTags: string[];
  onTagsChange: (newTags: string[]) => void;
}
const NoteHeader = ({
  value,
  options,
  handleTagOnChange,
  handleTitleOnChange,
  title,
  time,
  selectedTags,
  onTagsChange,
}: NoteHeaderProps) => {
  return (
    <Box>
      <Grid container spacing={1}>
        <Grid size={{ xs: 12, md: 12, lg: 12 }}>
          <TextField
            variant="standard"
            slotProps={{
              input: {
                disableUnderline: true,
              },
            }}
            placeholder="Enter your  title here..."
            fullWidth
            multiline={false}
            value={title}
            onChange={handleTitleOnChange}
          />
          <MyTag
            options={options}
            value={value}
            handleOnChange={handleTagOnChange}
            selectedTags={selectedTags}
            onTagsChange={onTagsChange}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 12, lg: 12 }}>
          <Chip
            label="Last Edit"
            variant="outlined"
            icon={<AccessTimeIcon />}
          />
          <TextField
            variant="standard"
            slotProps={{
              input: {
                disableUnderline: false,
                readOnly: true, // Make the time field read-only
              },
            }}
            value={time}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default NoteHeader;
