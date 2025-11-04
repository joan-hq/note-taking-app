import { Box, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

import TagsField from "../Tag/index";
import type { Tag } from "../../types/index";

interface NoteDetailHeaderProps {
  title: string;
  handleTitleOnChange: (event: React.ChangeEvent<HTMLInputElement>) => void;

  options: Tag[];
  noteTags?: Tag[];
  handleTagsChangeFromNote: (
    event: React.ChangeEvent<HTMLElement>,
    newTags: Tag[]
  ) => void;
  handleTagDeleteFromNote: (tagId: string) => void;
  handleNewTagSave: (newTag: Tag) => void;

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
}: NoteDetailHeaderProps) => {
  console.log("NoteDetailHeader-title", title);
  console.log("NoteDetailHeader-options", options);
  console.log("NoteDetailHeader-noteTags", noteTags);
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
      <TextField
        variant="standard"
        fullWidth
        multiline={false}
        value={title}
        onChange={handleTitleOnChange}
        InputProps={{
          disableUnderline: true,
          sx: {
            fontSize: "28px",
          },
        }}
      />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          color: "text.secondary",
        }}
      >
        <AccessTimeIcon
          className="!text-primary-color"
          sx={{ fontSize: "1.2rem" }}
        />
        <Typography variant="body1" component="span" sx={{ mt: "3px" }}>
          {time}
        </Typography>
      </Box>
      <Box>
        <TagsField
          options={options}
          noteTags={noteTags}
          onChange={handleTagsChangeFromNote}
          onDelete={handleTagDeleteFromNote}
          onTagSaved={handleNewTagSave}
        />
      </Box>
    </Box>
  );
};
export default NoteDetailHeader;
