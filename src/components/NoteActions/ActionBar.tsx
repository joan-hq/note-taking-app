import React, { useState } from "react";
import { useNoteContext } from "../../contexts/NoteProvider";
import { findNoteById } from "../../helpers/noteHelpers";
import {
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  ArchiveOutlined as ArchiveIcon,
  DeleteOutlined as DeleteIcon,
  UnarchiveOutlined as UnarchiveIcon,
  MoreVert as MoreVertIcon, 
} from "@mui/icons-material";

interface ActionBarProps {
  className?: string;
}

const ActionBar = ({ className }: ActionBarProps) => {
  const { notes, tags } = useNoteContext();
  const {
    allNotes,
    selectedNoteId,
    handleArchiveNote,
    handleDeleteNote,
    handleUnarchiveNote,
  } = notes;

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  if (!selectedNoteId) return null;

  const selectedNote = findNoteById(selectedNoteId, allNotes);
  if (!selectedNote) return null;

  const { isArchive } = selectedNote;

  const onArchive = () => {
    handleArchiveNote(selectedNoteId);
    handleMenuClose();
  };

  const onUnarchive = () => {
    handleUnarchiveNote(selectedNoteId);
    handleMenuClose();
  };

  const onDelete = () => {
    handleDeleteNote(selectedNoteId);
    handleMenuClose();
  };

  if (isMobile) {
    return (
      <Box className={className}>
        <IconButton onClick={handleMenuClick}>
          <MoreVertIcon />
        </IconButton>
        <Menu anchorEl={anchorEl} open={open} onClose={handleMenuClose}>
          {isArchive ? (
            <MenuItem onClick={onUnarchive}>
              <UnarchiveIcon sx={{ mr: 1 }} />
              Unarchive
            </MenuItem>
          ) : (
            <MenuItem onClick={onArchive}>
              <ArchiveIcon sx={{ mr: 1 }} />
              Archive
            </MenuItem>
          )}
          <MenuItem onClick={onDelete}>
            <DeleteIcon sx={{ mr: 1 }} />
            Delete
          </MenuItem>
        </Menu>
      </Box>
    );
  }

  return (
    <Box sx={{ display: "flex", gap: 1 }}>
      {isArchive ? (
        <Button
          startIcon={<UnarchiveIcon />}
          onClick={onUnarchive}
          color="inherit"
        >
          Unarchive
        </Button>
      ) : (
        <Button startIcon={<ArchiveIcon />} onClick={onArchive} color="inherit">
          Archive
        </Button>
      )}
      <Button startIcon={<DeleteIcon />} onClick={onDelete} color="inherit">
        Delete
      </Button>
    </Box>
  );
};

export default ActionBar;
