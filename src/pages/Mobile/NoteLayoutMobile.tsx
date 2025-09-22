import MenuIcon from "@mui/icons-material/Menu";
import NoteFilterResultsTitle from "../../components/NoteFilterResultsTitle";
import NoteBrifeView from "../../components/NoteBrifeView/index";
import { useNote } from "../../hooks/useNote";
import NoteSideBarMobile from "./NoteSideBarMobile";
import NewNoteButton from "../../components/NoteActions/NewNoteButton";
import SearchBar from "../../components/NoteActions/SearchBar";
import { Box } from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import { styled, useTheme } from "@mui/material/styles";
import { filterNotesByQuery } from "../../helpers/noteHelpers";

import IconButton from "@mui/material/IconButton";
import MuiAppBar from "@mui/material/AppBar";
import { useState, useEffect, useMemo } from "react";

const drawerWidth = 200;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  variants: [
    {
      props: ({ open }) => open,
      style: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(["margin", "width"], {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
    },
  ],
}));

interface NoteLayoutMobileProps {}

const NoteLayoutMobile = () => {
  const {
    noteFilterTitle,
    selectedNoteId,
    selectedTagId,
    allNotes,
    allTags,
    filterType,
    handleNewNoteClick,
    handleNoteCardClick,
  } = useNote();

  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    console.log("The new value of 'open' is:", open);
  }, [open, noteFilterTitle]);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  console.log("MobileLayout-filterType", filterType);
  console.log("MobileLayout-noteFilterTitle", noteFilterTitle);

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const handleSearchOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log("Search query entered:", event.target.value);
    setSearchQuery(event.target.value);
  };

  const handleSearchIconClick = () => {
    setIsSearchOpen(true);
  };

  const handleBlur = () => {
    setIsSearchOpen(false);
  };
  const filteredNotes = useMemo(() => {
    const filteredNoteByType = allNotes.filter((note) => {
      if (filterType === "archived") {
        return note.isArchive;
      }
      return true;
    });

    console.log("Current searchQuery:", searchQuery);
    console.log("Notes before search filter:", filteredNoteByType);

    const filteredBySearch = searchQuery
      ? filterNotesByQuery(searchQuery, filteredNoteByType, allTags)
      : filteredNoteByType;

    const filteredByTag = selectedTagId
      ? filteredBySearch.filter((note) => note.tags.includes(selectedTagId))
      : filteredBySearch;

    return filteredByTag;
  }, [searchQuery, filterType, allNotes, selectedTagId, allTags]);

  return (
    <>
      <Box display="block">
        <AppBar>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              //   sx={[
              //     {
              //       mr: 2,
              //     },
              //     open && { display: "none" },
              //   ]}
            >
              <MenuIcon />
            </IconButton>
            <NoteFilterResultsTitle title={noteFilterTitle} />
          </Toolbar>
        </AppBar>
      </Box>

      <NewNoteButton handleNewNoteClick={handleNewNoteClick} />
      <SearchBar
        searchQuery={searchQuery}
        handleSearchOnChange={handleSearchOnChange}
        isOpen={isSearchOpen}
        handleBlur={handleBlur}
        handleSearchIconClick={handleSearchIconClick}
      />

      <NoteBrifeView
        selectedNoteId={selectedNoteId}
        notes={filteredNotes}
        handleNoteCardClick={handleNoteCardClick}
        allTags={allTags}
      />

      <NoteSideBarMobile open={open} handleDrawerClose={handleDrawerClose} />
    </>
  );
};

export default NoteLayoutMobile;
