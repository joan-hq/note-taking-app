import { useState, useEffect } from "react";
import type { Note, Tag, FilterType } from "../types";
import { notes as initialNotesData } from "../data/note"; // Importing the notes data
import { tags as initialTagsData } from "../data/note";
import type { PopoverType } from "../types/index";
import * as error from "../utils/errors";

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

  handleSearchOnChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleNoteSearch: (
    event:
      | React.MouseEvent<HTMLButtonElement>
      | React.FormEvent<HTMLFormElement>
  ) => void;
  searchQueryInput?: string;

  customPopoverOpen: boolean;
  popoverMessage: string;
  popoverAnchorEl: HTMLElement | null;
  handlePopoverClose: () => void;
  popoverType: PopoverType;
}

export const useNoteList = (): useNoteListReturn => {
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [notes, setNotes] = useState<Note[]>(initialNotesData);
  const [filterType, setFilterType] = useState<FilterType>("all");
  const [allTags, setAllTags] = useState(initialTagsData);

  const [searchQueryInput, setSearchQueryInput] = useState("");

  const [customPopoverOpen, setCustomPopoverOpen] = useState<boolean>(false);
  const [popoverMessage, setPopoverMessage] = useState<string>("");
  const [popoverType, setPopoverType] = useState<PopoverType>("error");
  const [popoverAnchorEl, setPopoverAnchorEl] = useState<HTMLElement | null>(
    null
  );

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

  const handleSearchOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQueryInput(event.target.value);
    console.log("search bar event", event.target.value);
  };

  const handleNoteSearch = (
    event:
      | React.MouseEvent<HTMLButtonElement>
      | React.FormEvent<HTMLFormElement>
  ) => {
    if (searchQueryInput.length !== 0 && !searchQueryInput.trim()) {
      setCustomPopoverOpen(true);
      setPopoverType("error");
      setPopoverAnchorEl(event.currentTarget);
      setPopoverMessage(error.SEARCH_WHITESPACE_ERROR_MESSAGE);
      return;
    } else {
      const filtedNotesBySearch = notes.filter((notes) => {
        const lowercaseSearchQueryInput = searchQueryInput.toLocaleLowerCase();
        const titleMatch = notes.title
          .toLowerCase()
          .includes(lowercaseSearchQueryInput);
        const contentMatch = notes.content
          .toLowerCase()
          .includes(lowercaseSearchQueryInput);
        // const tagMatch = notes.tags.some((tag) => {
        //   allTags.filter((allTag) => allTag === tag);
        // });
      });
    }
  };

  const handlePopoverClose = () => {
    setCustomPopoverOpen(false);
  };

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
    handleSearchOnChange,
    handleNoteSearch,
    popoverType,
    customPopoverOpen,
    popoverMessage,
    popoverAnchorEl,
    handlePopoverClose,
  };
};
