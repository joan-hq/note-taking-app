import React from "react";
import { Box } from "@mui/material";
import { useState, useMemo } from "react";

import type { Note } from "../types/index";

import type { FilterType } from "../types/index";
import NewNoteButton from "../components/NoteActions/NewNoteButton";
import SearchBar from "../components/NoteActions/SearchBar";
import NoteBrifeView from "../components/NoteBrifeView/index";
import NoteFilterResultsTitle from "../components/NoteFilterResultsTitle";
import { filterNotesByQuery } from "../helpers/noteHelpers";

interface NoteListProps {
  filterType: FilterType;
  handleNewNoteClick: () => void;

  allNotes: Note[];
  handleNoteCardClick: (noteId: string) => void;

  selectedNoteId: string | null;
}

const NoteList = ({
  filterType,
  handleNewNoteClick,

  allNotes,
  handleNoteCardClick,

  selectedNoteId,
}: NoteListProps) => {
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleSearchOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const filteredNotes = useMemo(() => {
    const filteredNoteByType = allNotes.filter((note) => {
      if (filterType === "archived") {
        return note.isArchive;
      }
      return true;
    });
    if (!searchQuery) {
      return filteredNoteByType;
    }

    return filterNotesByQuery(searchQuery, filteredNoteByType);
  }, [setSearchQuery, filterType, allNotes]);

  let noteFilterTitle = "";
  if (filterType === "all") {
    noteFilterTitle = "All Notes";
  } else if (filterType === "archived") {
    noteFilterTitle = "Archived Note";
  }

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
          <NoteFilterResultsTitle title={noteFilterTitle} />
          <NewNoteButton handleNewNoteClick={handleNewNoteClick} />
          <SearchBar
            title={searchQuery}
            handleSearchOnChange={handleSearchOnChange}
          />
        </Box>

        <NoteBrifeView
          selectedNoteId={selectedNoteId}
          notes={filteredNotes}
          handleNoteCardClick={handleNoteCardClick}
        />
      </Box>
    </>
  );
};

export default NoteList;
