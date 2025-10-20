import { Box } from "@mui/material";
import { useState, useRef } from "react";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
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
import TagsPopover from "../components/TagsPopover";

interface TagManagementProps {
  allTags: Tag[];
  onTagDeleted: (tagId: string) => void;
  selectedTagId: string | null;
  handleTagClick: (tagId: string) => void;
  handleClearTagFilter: () => void;
}
const MAX_VISIBLE_TAGS = 6;

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

  const [isTagsPopoverOpen, setIsTagsPopoverOpen] = useState(false);
  const moreButtonRef = useRef<HTMLButtonElement>(null);
  const handleToggleTagsPopover = () => {
    setIsTagsPopoverOpen((prev) => !prev);
  };

  const handleCloseTagsPopover = () => {
    setIsTagsPopoverOpen(false);
  };

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

  const visibleTags = allTags.slice(0, MAX_VISIBLE_TAGS);
  const hiddenTags = allTags.slice(MAX_VISIBLE_TAGS);
  const moreCount = hiddenTags.length;
  let finalVisibleTags = [...visibleTags];

  if (selectedTagId && !visibleTags.some((tag) => tag.id === selectedTagId)) {
    const selectedTag = allTags.find((tag) => tag.id === selectedTagId);
    if (selectedTag) {
      finalVisibleTags = [
        selectedTag,
        ...visibleTags.filter((tag) => tag.id !== selectedTagId),
      ];

      finalVisibleTags = finalVisibleTags.slice(0, MAX_VISIBLE_TAGS);
    }
  }

  return (
    <>
      <Box>
        <p style={{ fontWeight: "bold", marginBottom: "8px" }}>Tags</p>
        {selectedTagId && (
          <Button
            startIcon={<ClearOutlinedIcon />}
            variant="contained"
            onClick={handleClearTagFilter}
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

        <Box className="flex flex-wrap gap-1 border-b border-gray-200 pb-2 mb-2">
          {finalVisibleTags.map((tag) => (
            <Chip
              key={tag.id}
              label={tag.label}
              icon={<LocalOfferOutlinedIcon className="!w-4 !h-4" />}
              onClick={() => handleTagClick(tag.id)}
              onDelete={() => handleDeleteTagDialog(tag.id)}
              deleteIcon={<ClearOutlinedIcon />}
              variant={selectedTagId === tag.id ? "filled" : "outlined"}
              sx={{
                "& .MuiChip-deleteIcon": {
                  visibility: "hidden",
                  fontSize: "1.0rem !important",
                },
                "&:hover .MuiChip-deleteIcon": { visibility: "visible" },
                "&:hover": { opacity: 0.9 },
              }}
              className={`
                    !text-sm !font-medium !rounded-full !m-0
                    ${
                      selectedTagId === tag.id
                        ? "!bg-primary-color !text-white hover:!bg-primary-hover"
                        : "!bg-gray-100 !text-gray-700 hover:!bg-gray-200 border-none"
                    }
                `}
            />
          ))}

          {moreCount > 0 && (
            <Button
              ref={moreButtonRef}
              onClick={handleToggleTagsPopover}
              size="small"
              className="!mt-1 !text-sm !font-semibold !text-gray-500 hover:!text-gray-700 !p-1"
            >
              + {moreCount} More Tags
            </Button>
          )}
        </Box>

        <TagsPopover
          allTags={allTags}
          selectedTagId={selectedTagId}
          handleTagClick={handleTagClick}
          handleDeleteTagDialog={handleDeleteTagDialog}
          onClose={handleCloseTagsPopover}
          anchorEl={moreButtonRef.current}
          open={isTagsPopoverOpen}
        />

        <Dialog
          open={open}
          onClose={hideDialog}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          TransitionProps={{ onExited: handleDialogExited }}
        >
          <DialogTitle id="alert-dialog-title">
            {`Delete Tag - "${tagToDelete?.label}"`}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {`Deleting tag "${tagToDelete?.label}" will remove it from all associated notes. This action cannot be undone.`}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={hideDialog}
              sx={{ color: "var(--color-brand-primary)" }}
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
              sx={{
                backgroundColor: "var(--color-warning-color)",
                color: "white",
                "&:hover": {
                  backgroundColor: "var(--color-warning-color)",
                },
                "&:focus": {
                  backgroundColor: "var(--color-warning-color)",
                },
              }}
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
      </Box>
    </>
  );
};

export default TagManagement;
