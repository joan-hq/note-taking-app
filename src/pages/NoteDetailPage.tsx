import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import MyTag from "../components/Tag";

import { useState, useEffect } from "react";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import Chip from "@mui/material/Chip"; // Needed for renderTags
import { v4 as uuidv4 } from "uuid";
import { tags as initialTagsData } from "../data/note"; // Importing the tags data
import type { Note, Tag } from "../types/index"; // Importing the Note type

//***Start Note Header ***/
interface NoteHeaderProps {
  handleSubmit?: (event: React.KeyboardEvent<HTMLFormElement>) => void;
  handleTagOnChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleTitleOnChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  options: readonly string[];
  title: string | null;
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
  selectedNote: Note | null;
  onNoteSave: (note: Note) => void;
}
const NoteDetail = ({ selectedNote, onNoteSave }: NoteDetailProps) => {
  const [noteId, setNoteId] = useState(() => uuidv4());

  const [titleInput, setTitleInput] = useState("");

  const [tagInput, setTagInput] = useState("");
  const [availableTags, setAvailableTags] =
    useState<readonly Tag[]>(initialTagsData);

  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const [time, setTime] = useState("");
  const [noteInput, setNoteInput] = useState("");

  const handleSubmitNewTage = (event: React.KeyboardEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedTag = tagInput.trim();
    if (!trimmedTag) return;

    // FIX: Check if the tag (by label) already exists in availableTags
    const tagExists = availableTags.some((tag) => tag.label === trimmedTag);

    if (!tagExists) {
      const newTag: Tag = { id: uuidv4(), label: trimmedTag }; // Create a new Tag object
      setAvailableTags((prevTags) => [...prevTags, newTag]); // Correctly add the Tag object
    }

    // Add the new tag's label to selectedTags if not already there
    if (!selectedTags.includes(trimmedTag)) {
      setSelectedTags((prevSelected) => [...prevSelected, trimmedTag]);
    }
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
    const currentAvailableTags = new Set(availableTags.map((tag) => tag.label));
    const newlyAddedTags: Tag[] = [];

    newTags.forEach((tag) => {
      if (!currentAvailableTags.has(tag)) {
        newlyAddedTags.push({ id: uuidv4(), label: tagInput });
      }
    });

    if (newlyAddedTags.length > 0) {
      setAvailableTags((prevTags) => [...prevTags, ...newlyAddedTags]);
    }

    console.log("available tags", availableTags);
  };

  const handleTitleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitleInput(e.target.value);
    console.log("titleInput", titleInput);
  };

  useEffect(() => {
    // If a note is selected, populate the fields with its data
    if (selectedNote) {
      setNoteId(selectedNote.id);
      setTitleInput(selectedNote.title);
      setSelectedTags(selectedNote.tags || []);
      setTime(selectedNote.lastEdit);
      setNoteInput(selectedNote.content);

      const existingTags = new Set(availableTags.map((tag) => tag.label));
      const newTagsAdded: Tag[] = [];

      selectedNote.tags?.forEach((tag) => {
        if (!existingTags.has(tag.trim())) {
          newTagsAdded.push({ id: uuidv4(), label: tag });
        }
      });

      if (newTagsAdded.length > 0) {
        setAvailableTags((prevTags) => [...prevTags, ...newTagsAdded]);
      }
    } else {
      //if no note is selected, reset the fields
      setNoteId(uuidv4());
      setTitleInput("");
      setSelectedTags([]);
      setTime(new Date().toLocaleString());
      setNoteInput("");
    }
  }, [selectedNote, availableTags]);

  // ** Start Note Body Function

  const handleNoteOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNoteInput(e.target.value);
    console.log("noteInput", noteInput);
  };

  const handleSave = () => {
    if (!titleInput.trim() || !noteInput.trim()) {
      alert("Title and content cannot be empty");
      return;
    }
    const noteData = {
      id: noteId,
      title: titleInput,
      tags: selectedTags,
      lastEdit: new Date().toLocaleString(),
      content: noteInput,
      archive: selectedNote ? selectedNote.archive : false,
    };
    setTime(noteData.lastEdit);

    //for save note
    onNoteSave(noteData);
  };

  const handleCancel = () => {
    console.log("Cancel clicked");
    if (selectedNote) {
      setTitleInput(selectedNote.title);
      setSelectedTags(selectedNote.tags || []);
      setTime(selectedNote.lastEdit);
      setNoteInput(selectedNote.content);
    } else {
      // Reset to initial state for new note
      setNoteId(uuidv4());
      setTitleInput("");
      setSelectedTags([]);
      setTime(new Date().toLocaleString());
      setNoteInput("");
    }
  };

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
            options={availableTags.map((tag) => tag.label)}
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
