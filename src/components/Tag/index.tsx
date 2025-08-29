import { Box } from "@mui/material";
import Chip from "@mui/material/Chip";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";
import type { Tag } from "../../types/index";
import AddIcon from "@mui/icons-material/Add";
import { useDialog } from "../../hooks/useDialog";
import { useState } from "react";

import TagSelector from "./TagSelector";
import AddNewTagDialog from "./AddNewTagDialog";

interface TagsFieldProps {
  options: Tag[];
  onChange: (event: any, newTags: Tag[]) => void;
  onDelete: (tagId: string) => void;

  noteTags?: Tag[];
  onTagSaved: (newTag: string) => void;
}
const TagsField = ({
  options,
  noteTags,
  onChange,
  onDelete,
  onTagSaved,
}: TagsFieldProps) => {
  const { open, showDialog, hideDialog } = useDialog();
  const [newTagInputValue, setNewTagInputValue] = useState("");

  const handleNewTagInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTagInputValue(event.target.value);
  };

  const handleNewTagSubmit = () => {
    onTagSaved(newTagInputValue);
    setNewTagInputValue("");
    hideDialog();
  };

  return (
    <>
      <Box>
        <Chip
          label="tag"
          variant="outlined"
          icon={<LocalOfferOutlinedIcon />}
        />
        <TagSelector
          options={options}
          value={noteTags}
          onChange={onChange}
          onDelete={onDelete}
        />
        <Chip
          label="add new tag"
          onClick={showDialog}
          icon={<AddIcon />}
          variant="outlined"
          color="primary"
        />
        <AddNewTagDialog
          open={open}
          newTagInputValue={newTagInputValue}
          handleNewTagInput={handleNewTagInput}
          handleNewTagSubmit={handleNewTagSubmit}
          hideDialog={hideDialog}
        />
      </Box>
    </>
  );
};

export default TagsField;
