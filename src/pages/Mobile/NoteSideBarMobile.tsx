import React from "react";
import NoteStatusFilter from "../../components/NoteActions/StatusFilter";
import TagManagement from "../TagManagement";
import { useNoteContext } from "../../contexts/NoteProvider";
import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
// import { styled } from "@mui/material/styles";
import { useState, useEffect, useCallback } from "react";

import * as styledModule from "styled-components";
const styled = styledModule.default || styledModule;

import IconButton from "@mui/material/IconButton";

const drawerWidth = 150;

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
  handleDrawerClose?: (event: React.MouseEvent<HTMLElement>) => void;
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
  } = useNoteContext();

  // 💡 NEW STATE: Track if a filter was just clicked
  const [filterClicked, setFilterClicked] = useState(false);

  // 💡 NEW EFFECT: Close the drawer ONLY AFTER a filter has been clicked
  useEffect(() => {
    if (filterClicked && handleDrawerClose) {
      // Small timeout to ensure the state update from useNote is processed
      const timer = setTimeout(() => {
        // The event object is irrelevant here, as it's a forced close
        handleDrawerClose({} as React.MouseEvent<HTMLElement>);
        setFilterClicked(false); // Reset the flag
      }, 0); // Use setTimeout(..., 0) to push the action to the end of the event queue
      return () => clearTimeout(timer);
    }
  }, [filterClicked, handleDrawerClose]);

  const handleAllClick = (event: React.MouseEvent<HTMLElement>) => {
    console.log("````clciked all button`````");
    handleShowAllNote(event);
    // 💡 SET THE FLAG INSTEAD OF CLOSING IMMEDIATELY
    setFilterClicked(true);
  };

  const handleArchivedClick = (event: React.MouseEvent<HTMLElement>) => {
    console.log("````clciked archived button`````");

    handleShowArchivedNote(event);
    // 💡 SET THE FLAG INSTEAD OF CLOSING IMMEDIATELY
    setFilterClicked(true);
  };

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
          handleShowAllNote={handleAllClick}
          handleShowArchivedNote={handleArchivedClick}
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
