import { Box } from "@mui/material";
import { useState } from "react";

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
import { useDialog } from "../hooks/useDialog";

import type { Tag } from "../types/index";
import { findTagById } from "../helpers/noteHelpers";

interface TagManagementProps {
  allTags: Tag[];
  onTagDeleted: (tagId: string) => void;
}

const TagManagement = ({ allTags, onTagDeleted }: TagManagementProps) => {
  const { open, showDialog, hideDialog } = useDialog();
  const [tagIdToDelete, setTagIdToDelete] = useState<string>("");
  const tagToDelete = findTagById(tagIdToDelete, allTags);

  const handleDeleteTagDialog = (tagId: string) => {
    setTagIdToDelete(tagId);
    showDialog;
  };

  const handleDeleteConfirm = () => {
    onTagDeleted(tagIdToDelete);
    hideDialog;
    setTagIdToDelete("");
  };

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
                onDelete={() => handleDeleteTagDialog(tag.id)}
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
          <DialogTitle id="alert-dialog-title">
            {`Do you want to delete Tag - ${tagToDelete?.label}`}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {`If this tag - ${tagToDelete?.label} - deleted. All notes will be effect.`}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={hideDialog}>Cancel</Button>
            <Button onClick={handleDeleteConfirm} autoFocus>
              Yes
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </>
  );
};

export default TagManagement;
