import { Box } from "@mui/material";
import TextField from "@mui/material/TextField";
import Chip from "@mui/material/Chip";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

import TagsField from "../Tag/index";
import type { Tag } from "../../types/index";

interface NoteDetailHeaderProps {
  // title:
  title: string;
  handleTitleOnChange: () => void;
  // tag:
  options: Tag[];
  newTagValue: string;
  handleNewTagSave: () => void;
  handleNewTagOnChange: () => void;
  // time:
  time: string;
}
const NoteDetailHeader = ({
  title,
  handleTitleOnChange,
  options,
  newTagValue,
  handleNewTagSave,
  handleNewTagOnChange,
  time,
}: //time,
NoteDetailHeaderProps) => {
  return (
    <>
      <TextField
        variant="standard"
        placeholder="Enter your  title here..."
        fullWidth
        multiline={false}
        value={title}
        onChange={handleTitleOnChange}
      />
      <TagsField
        options={options}
        newTagValue={newTagValue}
        handleNewTagSave={handleNewTagSave}
        handleNewTagOnChange={handleNewTagOnChange}
      />
      <Box>
        {" "}
        <Chip label="Last Edit" variant="outlined" icon={<AccessTimeIcon />} />
        <TextField variant="standard" value={time} />
      </Box>
    </>
  );
};
export default NoteDetailHeader;
