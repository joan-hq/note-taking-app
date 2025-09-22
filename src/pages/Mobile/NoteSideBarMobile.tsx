import NoteStatusFilter from "../../components/NoteActions/StatusFilter";
import TagManagement from "../TagManagement";
import { useNote } from "../../hooks/useNote";
import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { styled, useTheme } from "@mui/material/styles";

import IconButton from "@mui/material/IconButton";

const drawerWidth = 50;

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

interface NoteSideBarMobileProps {
  open: boolean;
  handleDrawerClose: (event: React.MouseEvent<HTMLElement>) => void;
}

const NoteSideBarMobile = ({
  open,
  handleDrawerClose,
}: NoteSideBarMobileProps) => {
  const {
    allTags,
    filterType,
    selectedTagId,
    handleShowAllNote,
    handleShowArchivedNote,
    handleTagDelete,
    handleTagClick,
    handleClearTagFilter,
  } = useNote();
  return (
    <>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </DrawerHeader>

        <Divider />

        <NoteStatusFilter
          filterType={filterType}
          handleShowAllNote={handleShowAllNote}
          handleShowArchivedNote={handleShowArchivedNote}
        />
        <Divider />

        <TagManagement
          allTags={allTags}
          onTagDeleted={handleTagDelete}
          selectedTagId={selectedTagId}
          handleTagClick={handleTagClick}
          handleClearTagFilter={handleClearTagFilter}
        />
      </Drawer>
    </>
  );
};

export default NoteSideBarMobile;
