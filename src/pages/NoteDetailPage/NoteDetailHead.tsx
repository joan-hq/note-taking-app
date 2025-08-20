import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Chip from "@mui/material/Chip";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

import Tags from "../../components/Tags";
import type { AutocompleteChangeReason } from "@mui/material/useAutocomplete";
import type { Tag, PopoverType } from "../../types/index";

interface NoteHeaderProps {
  options: Tag[];
  addTagDialogs: boolean;
  selectedTags: string[];
  newTagValue: string;
  handleTagSelectionOnChange: (
    event: React.SyntheticEvent,
    value: Tag[],
    reason: AutocompleteChangeReason
  ) => void;
  handleSelectedTagsChange: (value: string[]) => void;
  handleAddTagDialogsOpen: () => void;
  handleAddTagDialogsClose: () => void;
  handleNewTagOnChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleNewTagSave: (event: React.FormEvent<HTMLFormElement>) => void;
  //**** end tag params and functions

  //***start ErrorPopover */
  customPopoverOpen: boolean;
  popoverMessage: string;
  popoverAnchorEl: HTMLElement | null;
  popoverType: PopoverType;
  handlePopoverClose: () => void;
  //***End ErrorPopover */

  handleTitleOnChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  title: string | null;
  time: string;
}
const NoteHeader = ({
  options,
  addTagDialogs,
  selectedTags,
  newTagValue,
  handleTagSelectionOnChange,
  handleAddTagDialogsOpen,
  handleAddTagDialogsClose,
  handleNewTagSave,
  handleNewTagOnChange,
  handleSelectedTagsChange,

  // start error popover
  customPopoverOpen,
  popoverMessage,
  popoverAnchorEl,
  popoverType,
  handlePopoverClose,
  //***end ErrorPopover */

  handleTitleOnChange,
  title,
  time,
}: NoteHeaderProps) => {
  console.log("*****Note Detail Head", selectedTags);
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
          <Tags
            options={options}
            addTagDialogs={addTagDialogs}
            selectedTags={selectedTags}
            newTagValue={newTagValue}
            handleTagSelectionOnChange={handleTagSelectionOnChange}
            onTagsChange={handleSelectedTagsChange}
            handleAddTagDialogsOpen={handleAddTagDialogsOpen}
            handleAddTagDialogsClose={handleAddTagDialogsClose}
            handleNewTagSave={handleNewTagSave}
            handleNewTagOnChange={handleNewTagOnChange}
            customPopoverOpen={customPopoverOpen}
            popoverMessage={popoverMessage}
            popoverAnchorEl={popoverAnchorEl}
            popoverType={popoverType}
            handlePopoverClose={handlePopoverClose}
          />
        </Grid>
        {/* <Grid size={{ xs: 12, md: 12, lg: 12 }}>
          <Tags options={tagsData} />
        </Grid> */}
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
