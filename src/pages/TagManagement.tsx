import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Collapse,
  Divider,
} from "@mui/material";
import { useState } from "react";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { useDialog } from "../hooks/useDialog";
import type { Tag } from "../types/index";
import { findTagById, handleAsyncAction } from "../helpers/noteHelpers";
import CustomPopover from "../components/CustomePopover";
import { useCustomPopover } from "../hooks/useCustomPopover";
import { TAG_ACTION_MESSAGE } from "../constants/messages";
import { useNoteContext } from "../contexts/NoteProvider";
import WarningAmberOutlinedIcon from "@mui/icons-material/WarningAmberOutlined";

const TagManagement = () => {
  const { tags } = useNoteContext();
  const { open, showDialog, hideDialog } = useDialog();
  const popoverManage = useCustomPopover();
  const [tagToDelete, setTagToDelete] = useState<Tag | null>(null);

  const [isTagsExpanded, setIsTagsExpanded] = useState(true);

  const toggleTagsExpanded = () => {
    setIsTagsExpanded((prev) => !prev);
  };

  const handleDeleteTagDialog = (tagId: string) => {
    const foundTag = findTagById(tagId, tags.allTags);
    if (foundTag) {
      setTagToDelete(foundTag);
    }
    showDialog();
  };
  const handleDeleteConfirm = async (tagId: string): Promise<boolean> => {
    tags.handleTagDelete(tagId);
    hideDialog();
    return true;
  };
  const handleDialogExited = () => {
    setTagToDelete(null);
  };

  return (
    <>
      <Box
        sx={{ display: "flex", flexDirection: "column", flex: 1, minHeight: 0 }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            cursor: "pointer",
          }}
          onClick={toggleTagsExpanded}
        >
          <p style={{ fontWeight: "bold", marginBottom: "8px" }}>Tags</p>
          <IconButton size="small">
            {isTagsExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </IconButton>
        </Box>

        {tags.selectedTagId && (
          <Button
            startIcon={<ClearOutlinedIcon />}
            variant="contained"
            onClick={tags.handleClearTagFilter}
            size="small"
            sx={{
              mb: 1,
              backgroundColor: "var(--color-brand-primary)",
              "&:hover": {
                backgroundColor: "var(--color-primary-hover)",
              },
            }}
          >
            Clear Filter
          </Button>
        )}

        <Collapse in={isTagsExpanded} timeout="auto" unmountOnExit>
          <List
            dense
            sx={{
              width: "100%",
              flex: 1,
              overflowY: "auto",
              maxHeight: "250px",
              pr: 1,
            }}
          >
            {tags.allTags.map((tag) => (
              <ListItem
                key={tag.id}
                disablePadding
                secondaryAction={
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => handleDeleteTagDialog(tag.id)}
                  >
                    <ClearOutlinedIcon
                      fontSize="small"
                      sx={{ color: "grey.500" }}
                    />
                  </IconButton>
                }
              >
                <ListItemButton
                  selected={tag.id === tags.selectedTagId}
                  onClick={() => tags.handleTagClick(tag.id)}
                  sx={{ borderRadius: 2, pr: 5 }}
                >
                  <ListItemIcon>
                    <LocalOfferOutlinedIcon />
                  </ListItemIcon>
                  <ListItemText primary={tag.label} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Collapse>
      </Box>

      <Dialog
        open={open}
        onClose={hideDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        TransitionProps={{ onExited: handleDialogExited }}
        PaperProps={{ sx: { borderRadius: 4, p: 1, minWidth: "400px" } }}
      >
        <DialogTitle id="alert-dialog-title" sx={{ p: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <WarningAmberOutlinedIcon
              color="error"
              sx={{ fontSize: "2.5rem" }}
            />
            <Box sx={{ fontSize: "1.25rem", fontWeight: 600 }}>
              {`Delete Tag - "${tagToDelete?.label}"`}
            </Box>
          </Box>
        </DialogTitle>

        <DialogContent sx={{ p: 2, pt: 1 }}>
          <DialogContentText
            id="alert-dialog-description"
            color="text.secondary"
          >
            {`Deleting tag "${tagToDelete?.label}" will remove it from all associated notes.`}

            <Box
              component="span"
              sx={{
                fontWeight: 600,
                color: "text.primary",
                mt: 1,
                display: "block",
              }}
            >
              This action cannot be undone.
            </Box>
          </DialogContentText>
        </DialogContent>

        <Divider sx={{ mx: 2 }} />

        <DialogActions sx={{ p: 2, justifyContent: "flex-end" }}>
          <Button
            onClick={hideDialog}
            variant="text"
            color="inherit"
            sx={{ color: "text.secondary" }}
          >
            Cancel
          </Button>
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
            variant="contained"
            color="error"
            sx={{ minWidth: "100px" }}
          >
            Confirm
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
    </>
  );
};

export default TagManagement;
