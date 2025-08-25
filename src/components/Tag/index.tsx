import { Box } from "@mui/material";
import Chip from "@mui/material/Chip";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";
import type { Tag } from "../../types/index";
import AddIcon from "@mui/icons-material/Add";
import { useDialog } from "../../hooks/useDialog";

import TagSelector from "./TagSelector";
import AddNewTagDialog from "./AddNewTagDialog";

interface TagsFieldProps {
  options: Tag[];
  newTagValue: string;
  handleNewTagSave: () => void;
  handleNewTagOnChange: () => void;
}
const TagsField = ({
  options,
  newTagValue,
  handleNewTagSave,
  handleNewTagOnChange,
}: TagsFieldProps) => {
  const { open, showDialog, hideDialog } = useDialog();
  return (
    <>
      <Box>
        <Chip
          label="tag"
          variant="outlined"
          icon={<LocalOfferOutlinedIcon />}
        />
        <TagSelector options={options} />
        <Chip
          label="add new tag"
          onClick={showDialog}
          icon={<AddIcon />}
          variant="outlined"
          color="primary"
        />
        <AddNewTagDialog
          open={open}
          newTagValue={newTagValue}
          handleNewTagSave={handleNewTagSave}
          handleNewTagOnChange={handleNewTagOnChange}
          hideDialog={hideDialog}
        />
      </Box>
    </>
  );
};

export default TagsField;
