import { Box } from "@mui/material";
import Popper from "@mui/material/Popper";
import Paper from "@mui/material/Paper";
import ClickAwayListener from "@mui/material/ClickAwayListener";

import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";
import Chip from "@mui/material/Chip";

import type { Tag } from "../types/index";

interface TagsPopoverProps {
  allTags: Tag[];
  selectedTagId: string | null;
  handleTagClick: (tagId: string) => void;
  handleDeleteTagDialog: (tagId: string) => void;
  onClose: () => void;
  anchorEl: HTMLElement | null;
  open: boolean;
}

const TagsPopover = ({
  allTags,
  selectedTagId,
  handleTagClick,
  handleDeleteTagDialog,
  onClose,
  anchorEl,
  open,
}: TagsPopoverProps) => {
  return (
    <Popper
      open={open}
      anchorEl={anchorEl}
      placement="bottom-start"
      disablePortal={false}
      className="z-50"
    >
      <ClickAwayListener onClickAway={onClose}>
        <Paper className="p-3 shadow-xl rounded-lg border border-gray-100 max-w-xs">
          <h3 className="text-md font-semibold mb-2 border-b pb-1 text-gray-700">
            All Tags
          </h3>
          <Box className="max-h-64 overflow-y-auto flex flex-wrap gap-2">
            {allTags.map((tag) => (
              <Chip
                key={tag.id}
                label={tag.label}
                icon={<LocalOfferOutlinedIcon className="!w-4 !h-4" />}
                onClick={() => handleTagClick(tag.id)}
                onDelete={() => handleDeleteTagDialog(tag.id)}
                deleteIcon={<DeleteForeverIcon />}
                variant={selectedTagId === tag.id ? "filled" : "outlined"}
                // Tailwind styling for better Chip appearance
                className={`
                                    !text-sm !font-medium !rounded-full !m-0
                                    ${
                                      selectedTagId === tag.id
                                        ? "!bg-indigo-600 !text-white hover:!bg-indigo-700"
                                        : "!bg-gray-100 !text-gray-700 hover:!bg-gray-200 border-none"
                                    }
                                `}
              />
            ))}
          </Box>
        </Paper>
      </ClickAwayListener>
    </Popper>
  );
};

export default TagsPopover;
