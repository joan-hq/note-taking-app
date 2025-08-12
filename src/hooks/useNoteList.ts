import { useState, useEffect } from "react";
import type { Note, Tag, FilterType } from "../types";
import { notes as initialNotesData } from "../data/note"; // Importing the notes data
import { tags as initialTagsData } from "../data/note";
export interface useNoteListReturn {
  selectedNote: Note | null;
  notes: Note[];
  filterType: FilterType;
  allTags: Tag[];
  handleShowAllNote: () => void;
  handleShowArchivedNote: () => void;
  handleShowActiveNote: () => void;
  handleNewNote: () => void;
  handleArchive: () => void;
  handleUnarchive: () => void;
  handleDelete: () => void;
  handleNoteClick: (noteId: string) => void;
  handleNoteSave: (noteData: Note) => void;
  handleTagAdd: (newTag: Tag) => void;
}

export const useNoteList = (): useNoteListReturn => {
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [notes, setNotes] = useState<Note[]>(initialNotesData);
  const [filterType, setFilterType] = useState<FilterType>("all");
  const [allTags, setAllTags] = useState(initialTagsData);

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
      if (!selectedNote.archive) {
        alert(`Arrchiving note: ${selectedNote.title}`);

        selectedNote.archive = true;
      } else {
        alert(`${selectedNote.title}` + " already archived");
      }

      // update the archving note status in the note data
      setSelectedNote(selectedNote);
      setSelectedNote(null);
    } else {
      alert("Please select a note to archive");
    }
  };

  const handleUnarchive = () => {
    if (selectedNote) {
      if (selectedNote.archive) {
        alert(`Unrrchiving note: ${selectedNote.title}`);

        selectedNote.archive = false;
      }
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

    //setSelectedNote(null); // Update selected note after saving
    console.log("Note saved:", noteData);
    console.log("selected Note", selectedNote);
  };

  const handleTagAdd = (newTag: Tag) => {
    // Save the new tag to your persistent state/database
    setAllTags((prevTags: Tag[]) => [...prevTags, newTag]);
  };

  useEffect(() => {}, [selectedNote]);

  return {
    selectedNote,
    notes,
    filterType,
    handleShowAllNote,
    handleShowArchivedNote,
    handleShowActiveNote,
    handleNewNote,
    handleArchive,
    handleUnarchive,
    handleDelete,
    handleNoteClick,
    handleNoteSave,
    handleTagAdd,
    allTags,
  };
};
