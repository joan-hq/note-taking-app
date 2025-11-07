import FolderZipOutlinedIcon from "@mui/icons-material/FolderZipOutlined";
import FolderCopyOutlinedIcon from "@mui/icons-material/FolderCopyOutlined";
import { useNoteContext } from "../../contexts/NoteProvider";
import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

const NoteStatusFilter = () => {
  const { filters } = useNoteContext();
  const isAllSelected = filters.filterType === "all";
  const isArchivedSelected = filters.filterType === "archived";

  return (
    <List component="nav" dense sx={{ width: "100%" }}>
      <ListItemButton
        selected={isAllSelected}
        onClick={filters.handleShowAllNote}
        sx={{ borderRadius: 2, mb: 0.5 }}
      >
        <ListItemIcon>
          <FolderCopyOutlinedIcon />
        </ListItemIcon>
        <ListItemText primary="All Notes" />
      </ListItemButton>

      <ListItemButton
        selected={isArchivedSelected}
        onClick={filters.handleShowArchivedNote}
        sx={{ borderRadius: 2 }}
      >
        <ListItemIcon>
          <FolderZipOutlinedIcon />
        </ListItemIcon>
        <ListItemText primary="Archived Notes" />
      </ListItemButton>
    </List>
  );
};

export default NoteStatusFilter;
