import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import MyTag from "../components/Tag";

import { useState } from "react";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import Chip from "@mui/material/Chip"; // Needed for renderTags
import { v4 as uuidv4 } from "uuid";

//import { useId } from "react";

// a Note Json: {id: number,
//                title: string,
//                tags: string array ["dev", "food", "react"],
//                lastEdit: Datetime,
//                content: string,
//                archive: boolean}

//***Start Note Header ***/
interface NoteHeaderProps {
  handleSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
  handleTagOnChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleTitleOnChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  options: readonly string[];
  title: string;
  time: string;
  selectedTags: string[];
  onTagsChange: (newTags: string[]) => void;
}
const NoteHeader = ({
  handleSubmit,
  value,
  options = [],
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
            handleSubmit={handleSubmit}
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
              },
            }}
            value={time}
          />
        </Grid>
      </Grid>
    </Box>
  );
};
//***End Note Header ***/

//***Start Note Body ***/
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
//***End Note Body ***/

//***Start Note Action ***/
interface NoteActionProps {
  handleSave: () => void;
  handleCancel: () => void;
}
const NoteAction = ({ handleSave, handleCancel }: NoteActionProps) => {
  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleSave}>
        Save
      </Button>
      <Button variant="outlined" color="primary" onClick={handleCancel}>
        Cancel
      </Button>
    </div>
  );
};
//***End Note Action ***/

interface NoteDetailProps {
  initialTitleInput: string | null;
}
const NoteDetail = ({ initialTitleInput }: NoteDetailProps) => {
  const [noteId, setNoteId] = useState(() => uuidv4());

  const [titleInput, setTitleInput] = useState(initialTitleInput);

  const [tagInput, setTagInput] = useState("");
  const [availableTags, setAvailableTags] = useState<readonly string[]>([
    "dev",
    "react",
    "test",
  ]);

  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const [time, setTime] = useState("");

  const handleSubmitNewTage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!tagInput.trim()) return;
    if (!availableTags.includes(tagInput.trim())) {
      setAvailableTags((prevTags) => [...prevTags, tagInput.trim()]);
    }
    console.log("availableTags", availableTags);
    setTagInput("");
  };

  const handleTagOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTagInput(e.target.value);
    console.log("tagInput", tagInput);
  };

  const handleSelectedTagsChange = (newTags: string[]) => {
    setSelectedTags(newTags);
    console.log("selectdtags", selectedTags);

    //update availableTags if a new tag was truly added
    const newlyAddedTags = newTags.filter(
      (tag) => !availableTags.includes(tag)
    );
    if (newlyAddedTags.length > 0) {
      setAvailableTags((prevTags) => [...prevTags, ...newlyAddedTags]);
    }
  };

  const handleTitleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitleInput(e.target.value);
    console.log("titleInput", titleInput);
  };

  // ** Start Note Body Function
  const [noteInput, setNoteInput] = useState("");

  const handleNoteOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNoteInput(e.target.value);
    console.log("noteInput", noteInput);
  };

  const handleSave = () => {
    if (!titleInput.trim() || !noteInput.trim()) return;
    const noteData = {
      id: noteId,
      title: titleInput,
      tags: selectedTags,
      lastEdit: new Date().toLocaleString(),
      content: noteInput,
      archive: false,
    };

    console.log("newNote", noteData);
    setTime(new Date().toLocaleString());
  };

  const handleCancel = () => {};

  return (
    <Box
      id={noteId}
      sx={{
        flexGrow: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        width: "100vw",
      }}
    >
      <Grid
        container
        spacing={2}
        sx={{
          // maxWidth: "800px", // Optional: Limit the maximum width of your note content
          width: "100%", // Ensures the Grid takes available width within the Box
          padding: "0px 20px", // Add some internal padding to the grid
          // boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", // Optional: Add a subtle shadow
          // borderRadius: "8px", // Optional: Rounded corners
          // backgroundColor: "white", // Optional: Background for the note container
        }}
      >
        {/* Note Header */}
        {/* <Grid item xs={12} md={12} lg={12}> */}
        <Grid size={{ xs: 12, md: 12, lg: 12 }}>
          <NoteHeader
            options={availableTags}
            handleSubmit={handleSubmitNewTage}
            value={tagInput}
            handleTagOnChange={handleTagOnChange}
            handleTitleOnChange={handleTitleOnChange}
            title={titleInput}
            time={time}
            selectedTags={selectedTags}
            onTagsChange={handleSelectedTagsChange}
          />
        </Grid>

        {/* Note Body */}
        <Grid
          sx={{ minHeight: "800px", height: "100%" }}
          size={{ xs: 12, md: 12, lg: 12 }}
        >
          <NoteBody
            handleNoteOnChange={handleNoteOnChange}
            notevalue={noteInput}
          />
        </Grid>

        {/* Note Action */}
        <Grid size={{ xs: 12, md: 12, lg: 12 }}>
          <NoteAction handleSave={handleSave} handleCancel={handleCancel} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default NoteDetail;
