import { Box } from "@mui/material";
import { useState, useEffect } from "react";

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
import { findTagById, handleAsyncAction } from "../helpers/noteHelpers";
import CustomPopover from "../components/CustomePopover";
import { useCustomPopover } from "../hooks/useCustomPopover";
import { TAG_ACTION_MESSAGE } from "../constants/messages";

interface TagManagementProps {
  allTags: Tag[];
  onTagDeleted: (tagId: string) => void;
  selectedTagId: string | null;
  handleTagClick: (tagId: string) => void;
  handleClearTagFilter: () => void;
}

const TagManagement = ({
  allTags,
  onTagDeleted,
  selectedTagId,
  handleTagClick,
  handleClearTagFilter,
}: TagManagementProps) => {
  const { open, showDialog, hideDialog } = useDialog();
  const popoverManage = useCustomPopover();
  const [tagToDelete, setTagToDelete] = useState<Tag | null>(null);

  const handleDeleteTagDialog = (tagId: string) => {
    const foundTag = findTagById(tagId, allTags);
    if (foundTag) {
      setTagToDelete(foundTag);
    }
    showDialog();
  };

  const handleDeleteConfirm = async (tagId: string): Promise<boolean> => {
    onTagDeleted(tagId);
    hideDialog();
    return true;
  };

  const handleDialogExited = () => {
    setTagToDelete(null);
  };

  return (
    <>
      <Box>
        <p style={{ fontWeight: "bold", marginBottom: "8px" }}>Tags</p>
        {selectedTagId && (
          <Button onClick={handleClearTagFilter} size="small" sx={{ mb: 1 }}>
            Clear Filter
          </Button>
        )}

        <Grid container spacing={0}>
          {allTags.map((tag) => (
            <Grid key={tag.id}>
              <Chip
                label={tag.label}
                icon={<LocalOfferOutlinedIcon />}
                onClick={() => handleTagClick(tag.id)}
                onDelete={() => handleDeleteTagDialog(tag.id)}
                deleteIcon={<DeleteForeverIcon />}
                variant={selectedTagId === tag.id ? "filled" : "outlined"}
              />
            </Grid>
          ))}
        </Grid>

        <Dialog
          open={open}
          onClose={hideDialog}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          TransitionProps={{ onExited: handleDialogExited }}
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
            <Button
              onClick={(event) =>
                handleAsyncAction(
                  handleDeleteConfirm,
                  tagToDelete?.id || "",
                  event,
                  popoverManage,
                  TAG_ACTION_MESSAGE.DELETE
                )
              }
              autoFocus
            >
              Yes
            </Button>
          </DialogActions>
        </Dialog>

        <CustomPopover
          open={popoverManage.open}
          type={popoverManage.type}
          message={popoverManage.message}
          anchorEl={popoverManage.anchorEl}
          onClose={popoverManage.hidePopover}
        />
      </Box>
    </>
  );
};

export default TagManagement;
