import { Box } from "@mui/material";

import Grid from "@mui/material/Grid";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";
import Chip from "@mui/material/Chip";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import type { Tag } from "../types/index";

interface TagManagementProps {
  allTags: Tag[];
  open: boolean;
  hideDialog: () => void;
  handleDeleteTagDialog: (
    tagId: string,
    event: React.SyntheticEvent<HTMLElement>
  ) => void;

  tagValue: string;
  handleTagDelete: (
    tagId: string,
    event: React.SyntheticEvent<HTMLElement>
  ) => void;

  tagId: string;
}

const TagManagement = ({
  allTags,
  open,
  hideDialog,
  handleDeleteTagDialog,
  tagValue,
  handleTagDelete,
  tagId,
}: TagManagementProps) => {
  return (
    <>
      <Box>
        <p style={{ fontWeight: "bold", marginBottom: "8px" }}>Tags</p>
        <Grid container spacing={0}>
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
          onClose={hideDialog}
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
            <Button onClick={hideDialog}>Cancel</Button>
            <Button
              onClick={(event) => handleTagDelete(tagId, event)}
              autoFocus
            >
              Yes
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </>
  );
};

export default TagManagement;
