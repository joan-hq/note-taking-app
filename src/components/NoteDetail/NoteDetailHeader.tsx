import { Box } from "@mui/material";
import TextField from "@mui/material/TextField";
import Chip from "@mui/material/Chip";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

import TagsField from "../Tag/index";
import type { Tag } from "../../types/index";

interface NoteDetailHeaderProps {
  // title:
  title: string;
  handleTitleOnChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  // tag:
  options: Tag[];
  noteTags?: Tag[];
  handleTagsChangeFromNote: (
    event: React.ChangeEvent<HTMLElement>,
    newTags: Tag[]
  ) => void;
  handleTagDeleteFromNote: (tagId: string) => void;

  handleNewTagSave: (newTag: Tag) => void;

  // time:
  time: string;
}
const NoteDetailHeader = ({
  title,
  handleTitleOnChange,
  options,
  noteTags,
  handleTagsChangeFromNote,
  handleTagDeleteFromNote,
  handleNewTagSave,
  time,
}: //time,
NoteDetailHeaderProps) => {
  console.log("NoteDetailHeader-title", title);
  console.log("NoteDetailHeader-options", options);
  console.log("NoteDetailHeader-noteTags", noteTags);
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
      <TextField
        variant="standard"
        placeholder="Enter your  title here..."
        fullWidth
        multiline={false}
        value={title}
        onChange={handleTitleOnChange}
        InputProps={{
          disableUnderline: true,
          sx: {
            fontSize: "32px",
          },
        }}
      />
      <TagsField
        options={options}
        noteTags={noteTags}
        onChange={handleTagsChangeFromNote}
        onDelete={handleTagDeleteFromNote}
        onTagSaved={handleNewTagSave}
      />
      <Box>
        <Chip label="Edit" variant="outlined" icon={<AccessTimeIcon />} />
        &nbsp;&nbsp;
        <TextField
          variant="standard"
          value={time}
          InputProps={{ disableUnderline: true }}
        />
      </Box>
    </Box>
  );
};
export default NoteDetailHeader;
