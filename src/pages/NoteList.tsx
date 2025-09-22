import React from "react";
import { Box } from "@mui/material";
import { useState, useMemo } from "react";

import type { Tag, Note } from "../types/index";

import type { FilterType } from "../types/index";
import NewNoteButton from "../components/NoteActions/NewNoteButton";
import SearchBar from "../components/NoteActions/SearchBar";
import NoteBrifeView from "../components/NoteBrifeView/index";
import { filterNotesByQuery } from "../helpers/noteHelpers";

interface NoteListProps {
  filterType: FilterType;
  handleNewNoteClick: (event: React.MouseEvent<HTMLElement>) => void;

  allNotes: Note[];
  handleNoteCardClick: (noteId: string) => void;
  allTags: Tag[];

  selectedTagId: string | null;
  selectedNoteId: string | null;
}

const NoteList = ({
  filterType,
  handleNewNoteClick,

  allNotes,
  handleNoteCardClick,
  allTags,

  selectedTagId,
  selectedNoteId,
}: NoteListProps) => {
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
      <Box sx={{ height: "100%", overflowY: "auto" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <NewNoteButton handleNewNoteClick={handleNewNoteClick} />
          <SearchBar
            searchQuery={searchQuery}
            handleSearchOnChange={handleSearchOnChange}
            isOpen={isSearchOpen}
            handleBlur={handleBlur}
            handleSearchIconClick={handleSearchIconClick}
          />
        </Box>

        <NoteBrifeView
          selectedNoteId={selectedNoteId}
          notes={filteredNotes}
          handleNoteCardClick={handleNoteCardClick}
          allTags={allTags}
        />
      </Box>
    </>
  );
};

export default NoteList;
