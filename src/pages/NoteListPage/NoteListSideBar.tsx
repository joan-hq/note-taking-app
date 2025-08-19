import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import MyCustomButton from "../../components/CustomButton";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";
import ArchiveOutlinedIcon from "@mui/icons-material/ArchiveOutlined";
import Chip from "@mui/material/Chip";
import type { Tag } from "../../types/index";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
interface NoteListSidebarProps {
  handleShowAllNote: () => void;
  handleShowArchivedNote: () => void;
  handleShowActiveNote: () => void;
  currentPageFilter: "all" | "active" | "archived";
  allTags: Tag[];
  handleTagDelete: (
    tagId: string,
    event: React.SyntheticEvent<HTMLElement>
  ) => void;

  open: boolean;
  handleTagDeleteClose: () => void;
  tagValue: string;
  //tagId: string;
  handleTagsDelete: (
    tagId: string,
    event: SyntheticEvent<HTMLElement, Event>
  ) => void;

  handleDeleteTagDialog: (
    tagId: string,
    event: SyntheticEvent<HTMLElement, Event>
  ) => void;
}
const NoteListSidebar = ({
  handleShowAllNote,
  handleShowArchivedNote,
  handleShowActiveNote,
  currentPageFilter,
  allTags,
  handleTagDelete,
  handleDeleteTagDialog,

  open,
  handleTagDeleteClose,
  tagValue,
  tagId,
}: //handleTagsDelete,
NoteListSidebarProps) => {
  return (
    <div>
      <div>
        <MyCustomButton
          title="All Notes"
          disabled={false}
          startIcon={<HomeOutlinedIcon />}
          endIcon={<KeyboardArrowRightOutlinedIcon />}
          variant={currentPageFilter === "all" ? "contained" : "outlined"}
          onClick={handleShowAllNote}
          fullWidth={true}
        />
      </div>
      <div>
        <MyCustomButton
          title="Active Notes"
          disabled={false}
          startIcon={<HomeOutlinedIcon />}
          endIcon={<KeyboardArrowRightOutlinedIcon />}
          variant={currentPageFilter === "active" ? "contained" : "outlined"}
          onClick={handleShowActiveNote}
          fullWidth={true}
        />
      </div>
      <div>
        <MyCustomButton
          title="Archived Notes"
          disabled={false}
          startIcon={<ArchiveOutlinedIcon />}
          endIcon={<KeyboardArrowRightOutlinedIcon />}
          variant={currentPageFilter === "archived" ? "contained" : "outlined"}
          onClick={handleShowArchivedNote}
          fullWidth={true}
        />
      </div>
      <Box>
        <p style={{ fontWeight: "bold", marginBottom: "8px" }}>Tags</p>
        <Grid container spacing={1}>
          {allTags.map((tag) => (
            <Grid key={tag.id}>
              <Chip
                label={tag.label}
                icon={<LocalOfferOutlinedIcon />}
                //onClick={handleDeleteTagDialog}
                //onDelete={(event) => handleTagDelete(tag.id, event)}
                onDelete={(event) => handleDeleteTagDialog(tag.id, event)}
                deleteIcon={<DeleteForeverIcon />}
                variant="outlined"
              />
            </Grid>
          ))}
        </Grid>

        <Dialog
          open={open}
          onClose={handleTagDeleteClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id={tagId}>
            {`Do you want to delete Tag - ${tagValue}`}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              If this tag - {tagValue} - deleted. All notes will be effect.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleTagDeleteClose}>Cancel</Button>
            <Button
              onClick={(event) => handleTagDelete(tagId, event)}
              autoFocus
            >
              Yes
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </div>
  );
};

export default NoteListSidebar;
