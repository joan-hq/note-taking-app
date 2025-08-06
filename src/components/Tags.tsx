import * as React from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";
import MyChip from "../components/Chip";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import type { AutocompleteChangeReason } from "@mui/material/useAutocomplete";
import type { Tag, PopoverType } from "../types/index";
import CustomPopover from "./customPopover";

interface TagsProps {
  options: Tag[];
  addTagDialogs: boolean;
  newTagValue: string;
  handleTagSelectionOnChange: (
    event: React.SyntheticEvent,
    value: Tag[],
    reason: AutocompleteChangeReason
  ) => void;
  handleAddTagDialogsOpen: () => void;
  handleAddTagDialogsClose: () => void;
  handleNewTagOnChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleNewTagSave: (event: React.FormEvent<HTMLFormElement>) => void;
  customPopoverOpen: boolean;
  popoverMessage: string;
  popoverAnchorEl: HTMLElement | null;
  popoverType: PopoverType;
  handlePopoverClose: () => void;
}

const Tags = ({
  options,
  addTagDialogs,
  newTagValue,
  handleTagSelectionOnChange,
  handleAddTagDialogsOpen,
  handleAddTagDialogsClose,
  handleNewTagOnChange,
  handleNewTagSave,
  customPopoverOpen,
  popoverMessage,
  popoverAnchorEl,
  popoverType,
  handlePopoverClose,
}: TagsProps) => {
  return (
    <Box
      component="section"
      sx={{ display: "flex", alignItems: "center", gap: 1, width: "300px" }}
    >
      <MyChip
        label="tag"
        variant="outlined"
        icon={<LocalOfferOutlinedIcon />}
      />
      <Autocomplete
        multiple
        id="tags"
        fullWidth
        options={options}
        getOptionLabel={(option) => option.label}
        onChange={handleTagSelectionOnChange}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder="choose your tag"
            variant="standard"
            disabled
          />
        )}
      />
      <Chip
        label="add new tag"
        onClick={handleAddTagDialogsOpen}
        icon={<AddIcon />}
        variant="outlined"
        color="primary"
      />

      <Dialog open={addTagDialogs} onClose={handleAddTagDialogsClose}>
        <DialogContent>
          <form onSubmit={handleNewTagSave} id="addnewtag-form">
            <TextField
              autoFocus
              //required
              fullWidth
              variant="standard"
              margin="dense"
              placeholder="Enter a new tag"
              onChange={handleNewTagOnChange}
              value={newTagValue}
            />
          </form>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleAddTagDialogsClose}>Cancel</Button>
          <Button type="submit" form="addnewtag-form">
            save
          </Button>
        </DialogActions>
      </Dialog>

      <CustomPopover
        popoverType={popoverType}
        customPopoverOpen={customPopoverOpen}
        popoverMessage={popoverMessage}
        anchorEl={popoverAnchorEl}
        handlePopoverClose={handlePopoverClose}
      />
    </Box>
  );
};

export default Tags;
