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
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import type { Note } from "../types/index";
import { notes, tags } from "../data/note"; // Importing the notes data

// New Component for the Left Sidebar
const NoteListSidebar = () => {
  const showAllNote = () => {
    window.alert("showAllNote");
  };

  const showArchivedNote = () => {
    window.alert("showArchivedNote");
  };

  return (
    <div>
      <div>
        <MyCustomButton
          title="All Notes"
          disabled={false}
          startIcon={<HomeOutlinedIcon />}
          endIcon={<KeyboardArrowRightOutlinedIcon />}
          variant="outlined"
          onClick={showAllNote}
          fullWidth={true}
        />
      </div>
      <div>
        <MyCustomButton
          title="Archived Notes"
          disabled={false}
          startIcon={<ArchiveOutlinedIcon />}
          endIcon={<KeyboardArrowRightOutlinedIcon />}
          variant="outlined"
          onClick={showArchivedNote}
          fullWidth={true}
        />
      </div>
      <Box>
        <p style={{ fontWeight: "bold", marginBottom: "8px" }}>Tags</p>
        <Grid container spacing={1}>
          {tags.map((tag) => (
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
}

const NoteListContent = ({
  handleNewNote,
  handleArchive,
  handleDelete,
  handleNoteClick,
  notes,
  selectedNote,
}: NoteListContentProps) => {
  return (
    <Grid container spacing={0}>
      <Grid size={{ xs: 12, md: 12, lg: 12 }}>
        {/* Use item prop for Grid children */}
        <MySearchAppBarProps title="All Notes" />
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

        {notes.map((note) => {
          if (!note.archive) {
            console.log("note.archive", note.archive);
            return (
              <MyNoteContentCard
                key={note.id}
                id={note.id}
                title={note.title}
                tags={note.tags}
                lastedit={note.lastEdit}
                onCardClick={() => handleNoteClick(note.id)}
              />
            );
          }
          return null;
        })}
      </Grid>
      <Grid size={{ xs: 12, md: 7, lg: 7 }}>
        <NoteDetail selectedNote={selectedNote} />
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
  const navigate = useNavigate();
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const handleNewNote = () => {
    setSelectedNote(null); // Clear selected note for new note creation
    navigate("/detail");
  };

  const handleArchive = () => {
    if (selectedNote) {
      alert(`Arrchiving note with ID: ${selectedNote.id}`);
    } else {
      alert("Please select a note to archive");
    }
  };

  const handleDelete = () => {
    if (selectedNote) {
      alert(`Seleting note with ID: ${selectedNote.id}`);
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
      // navigate(`/detail/${noteId}`);
    } else {
      console.warn(`Note with ID ${noteId} not found in the list.`);
      setSelectedNote(null); // Clear selection if note not found
    }
  };

  return (
    <Box>
      <Grid container spacing={0}>
        <Grid size={{ xs: 12, md: 2, lg: 2 }}>
          <NoteListSidebar />
        </Grid>

        <Grid size={{ xs: 12, md: 10, lg: 10 }}>
          <NoteListContent
            handleNewNote={handleNewNote}
            handleArchive={handleArchive}
            handleDelete={handleDelete}
            handleNoteClick={handleNoteClick}
            notes={notes}
            selectedNote={selectedNote}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default NoteList;
