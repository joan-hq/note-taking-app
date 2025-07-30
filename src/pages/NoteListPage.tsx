//import * as React from "react";
//import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
//import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import ArchiveOutlinedIcon from "@mui/icons-material/ArchiveOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import MyCustomButton from "../components/Button";
import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";
import MySearchAppBarProps from "../components/SearchBar";
import MyNoteContentCard from "../components/MyNoteContentCard";
//import MyNoteCard from "../components/NoteCard";
import AddIcon from "@mui/icons-material/Add";
import NoteDetail from "../pages/NoteDetailPage";

import { useState } from "react";
import type { Note, FilterType } from "../types/index";
import {
  notes as initialNotesData,
  tags as initialTagsData,
} from "../data/note"; // Importing the notes data

// New Component for the Left Sidebar

interface NoteListSidebarProps {
  handleShowAllNote: () => void;
  handleShowArchivedNote: () => void;
  handleShowActiveNote: () => void;
  currentPageFilter: "all" | "active" | "archived";
}
const NoteListSidebar = ({
  handleShowAllNote,
  handleShowArchivedNote,
  handleShowActiveNote,
  currentPageFilter,
}: NoteListSidebarProps) => {
  return (
    <div>
      <div>
        <MyCustomButton
          title="All Notes"
          disabled={false}
          startIcon={<HomeOutlinedIcon />}
          endIcon={<KeyboardArrowRightOutlinedIcon />}
          variant={currentPageFilter === "all" ? "contained" : "outlined"}
          onClick={handleShowAllNote}
          fullWidth={true}
        />
      </div>
      <div>
        <MyCustomButton
          title="Active Notes"
          disabled={false}
          startIcon={<HomeOutlinedIcon />}
          endIcon={<KeyboardArrowRightOutlinedIcon />}
          variant={currentPageFilter === "active" ? "contained" : "outlined"}
          onClick={handleShowActiveNote}
          fullWidth={true}
        />
      </div>
      <div>
        <MyCustomButton
          title="Archived Notes"
          disabled={false}
          startIcon={<ArchiveOutlinedIcon />}
          endIcon={<KeyboardArrowRightOutlinedIcon />}
          variant={currentPageFilter === "archived" ? "contained" : "outlined"}
          onClick={handleShowArchivedNote}
          fullWidth={true}
        />
      </div>
      <Box>
        <p style={{ fontWeight: "bold", marginBottom: "8px" }}>Tags</p>
        <Grid container spacing={1}>
          {initialTagsData.map((tag) => (
            <Grid key={tag.id}>
              <MyCustomButton
                title={tag.label}
                disabled={false}
                startIcon={<LocalOfferOutlinedIcon />}
                variant="outlined"
                fullWidth={true}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </div>
  );
};

interface NoteListContentProps {
  handleNewNote: () => void;
  handleArchive: () => void;
  handleDelete: () => void;
  handleNoteClick: (noteId: string) => void;
  notes: Note[];
  selectedNote: Note | null;
  handleNoteSave: (noteData: Note) => void;
  filterType: "all" | "active" | "archived";
}

const NoteListContent = ({
  handleNewNote,
  handleArchive,
  handleDelete,
  handleNoteClick,
  handleNoteSave,
  notes,
  selectedNote,
  filterType,
}: NoteListContentProps) => {
  const filteredNotes = notes.filter((note) => {
    if (filterType === "all") {
      return true; // Show all notes
    } else if (filterType === "active") {
      return !note.archive; // Show non-archived notes
    } else if (filterType === "archived") {
      return note.archive; // Show only archived notes
    }
    return true; // Fallback, though ideally all cases are covered
  });

  return (
    <Grid container spacing={0}>
      <Grid size={{ xs: 12, md: 12, lg: 12 }}>
        {/* Use item prop for Grid children */}
        <MySearchAppBarProps
          title={
            filterType === "all"
              ? "All Notes"
              : filterType === "archived"
              ? "Archived Notes"
              : "Active Notes"
          }
        />
      </Grid>

      <Grid size={{ xs: 12, md: 3, lg: 3 }}>
        <MyCustomButton
          title="Create New Note"
          variant="contained"
          startIcon={<AddIcon />}
          size="large"
          onClick={handleNewNote}
          fullWidth={true}
        />

        {filteredNotes.length === 0 ? (
          <Box
            sx={{ mt: 2, p: 2, textAlign: "center", color: "text.secondary" }}
          >
            {filterType === "archived"
              ? "NO archived Note yet."
              : "NO Note display yet"}
          </Box>
        ) : (
          filteredNotes.map((note) => (
            <MyNoteContentCard
              key={note.id}
              id={note.id}
              title={note.title}
              tags={note.tags}
              lastedit={note.lastEdit}
              onCardClick={() => handleNoteClick(note.id)}
            />
          ))
        )}
      </Grid>
      <Grid size={{ xs: 12, md: 7, lg: 7 }}>
        <NoteDetail
          selectedNote={selectedNote}
          onNoteSave={handleNoteSave}
          key={selectedNote ? selectedNote.id : "new-note"}
        />
      </Grid>

      <Grid size={{ xs: 12, md: 2, lg: 2 }}>
        <MyCustomButton
          title="Archive Note"
          startIcon={<ArchiveOutlinedIcon />}
          onClick={handleArchive}
        />
        <MyCustomButton
          title="delete Note"
          startIcon={<DeleteOutlineOutlinedIcon />}
          onClick={handleDelete}
        />
      </Grid>
    </Grid>
  );
};

const NoteList = () => {
  //const navigate = useNavigate();
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [notes, setNotes] = useState<Note[]>(initialNotesData);
  const [filterType, setFilterType] = useState<FilterType>("all");

  //const [tags, setTags] = useState(initialTagsData); // ToDo: ahndle tags state

  const handleShowAllNote = () => {
    setFilterType("all");
    setSelectedNote(null);
  };

  const handleShowArchivedNote = () => {
    setFilterType("archived");
    setSelectedNote(null);
  };

  const handleShowActiveNote = () => {
    setFilterType("active");
    setSelectedNote(null);
  };

  const handleNewNote = () => {
    setSelectedNote(null); // Clear selected note for new note creation
  };

  const handleArchive = () => {
    if (selectedNote) {
      alert(`Arrchiving note: ${selectedNote.title}`);

      selectedNote.archive = true;

      // update the archving note status in the note data
      setSelectedNote(selectedNote);
      setSelectedNote(null);
    } else {
      alert("Please select a note to archive");
    }
  };

  const handleDelete = () => {
    if (selectedNote) {
      alert(`Deleting note: ${selectedNote.title}`);
      setNotes(notes.filter((note) => note.id !== selectedNote.id));
    } else {
      alert("Please select a note to delete");
    }
  };

  const handleNoteClick = (noteId: string) => {
    console.log("handleNoteClick", noteId);
    const clickedNote = notes.find((note) => note.id === noteId);
    console.log("clickedNote", clickedNote);

    if (clickedNote) {
      setSelectedNote(clickedNote);
    } else {
      console.warn(`Note with ID ${noteId} not found in the list.`);
      setSelectedNote(null); // Clear selection if note not found
    }
  };

  const handleNoteSave = (noteData: Note) => {
    setNotes((prevNotes) => {
      const existingNoteIndex = prevNotes.findIndex(
        (note) => note.id === noteData.id
      );

      let updatedNotesArray: Note[];
      if (existingNoteIndex !== -1) {
        // Update existing note
        updatedNotesArray = [...prevNotes];
        updatedNotesArray[existingNoteIndex] = noteData;
        console.log("updatedNotesArray", updatedNotesArray);
      } else {
        // Add new note
        updatedNotesArray = [...prevNotes, noteData];
      }

      return updatedNotesArray;
    });

    setSelectedNote(null); // Update selected note after saving
    console.log("Note saved:", noteData);

    alert("Note saved successfully!");
  };

  return (
    <Box>
      <Grid container spacing={0}>
        <Grid size={{ xs: 12, md: 2, lg: 2 }}>
          <NoteListSidebar
            handleShowAllNote={handleShowAllNote}
            handleShowArchivedNote={handleShowArchivedNote}
            handleShowActiveNote={handleShowActiveNote}
            currentPageFilter={filterType}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 10, lg: 10 }}>
          <NoteListContent
            handleNewNote={handleNewNote}
            handleArchive={handleArchive}
            handleDelete={handleDelete}
            handleNoteClick={handleNoteClick}
            notes={notes}
            selectedNote={selectedNote}
            handleNoteSave={handleNoteSave}
            filterType={filterType}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default NoteList;
