import { useState, useEffect } from "react";
import type { Note, Tag, FilterType } from "../types";
import { notes as initialNotesData } from "../data/note"; // Importing the notes data
import { tags as initialTagsData } from "../data/note";
import type { PopoverType } from "../types/index";

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

  searchQueryInput?: string;
  handleTagDelete: (
    tagId: string,
    event: React.SyntheticEvent<HTMLElement>
  ) => void;
  customPopoverOpen: boolean;
  popoverMessage: string;
  popoverAnchorEl: HTMLElement | null;
  //   handlePopoverClose: () => void;
  popoverType: PopoverType;

  open: boolean;
  handleTagDeleteClose: () => void;
  tagValue: string;
  handleTagsDelete: () => void;
  handleDeleteTagDialog: (
    tagId: string,
    event: React.SyntheticEvent<HTMLElement>
  ) => void;

  tagIdToDelete: string | null;
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

  const [open, setOpen] = useState<boolean>(false);
  const [tagValue, setTagValue] = useState<string>("");
  const [tagIdToDelete, setTagIdToDelete] = useState<string | null>(null);

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

  const handleSearchOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchQuary = event.target.value;
    setSearchQueryInput(searchQuary);
    console.log("searchQueryInput", searchQuary);

    if (!searchQuary.trim()) {
      setNotes(initialNotesData);
      // setCustomPopoverOpen(false); // Hide any error popover
    } else {
      const lowercaseSearchQuary = searchQuary.toLocaleLowerCase();
      const filtedSearchNote = notes.filter((note) => {
        const titleMatch = note.title
          .toLocaleLowerCase()
          .includes(lowercaseSearchQuary);
        const contentMatch = note.content
          .toLocaleLowerCase()
          .includes(lowercaseSearchQuary);
        // Now, perform the more complex tag matching.
        const tagsMatch = note.tags.some((tagId) => {
          // Find the tag object by its ID from the main tags array
          const foundTag = allTags.find((tag) => tag.id === tagId);

          return (
            foundTag &&
            foundTag.label.toLowerCase().includes(lowercaseSearchQuary)
          );
        });
        return titleMatch || contentMatch || tagsMatch;
      });

      setNotes(filtedSearchNote);
    }
  };

  useEffect(() => {}, [selectedNote, notes]);
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (customPopoverOpen) {
      if (popoverType === "status") {
        timer = setTimeout(() => {
          setCustomPopoverOpen(false);
        }, 1000);
      }
    }
    return () => {
      clearTimeout(timer);
    };
  }, [customPopoverOpen, popoverType]);

  const handleTagDeleteClose = () => {
    setOpen(false);
    setTagIdToDelete(null);
  };

  const handleTagsDelete = () => {
    console.log("handleTagsDelete");
  };

  const handleDeleteTagDialog = (tagId: string) => {
    const tagToDelete = allTags.find((tag) => tag.id === tagId);
    setOpen(true);
    setTagIdToDelete(tagId);
    if (tagToDelete) {
      setTagValue(tagToDelete.label);
    }
  };

  const handleTagDelete = () => {
    if (!tagIdToDelete) {
      return;
    }
    const tagNeedDelete = allTags.find((tag) => tag.id === tagIdToDelete);
    let tagNeedDeleteLabel;
    if (tagNeedDelete) {
      tagNeedDeleteLabel = tagNeedDelete.label;
    }
    const notesListRemovedTag = notes.map((note) => {
      // The filter method is a cleaner way to remove an item
      const newTags = note.tags.filter((id) => id !== tagIdToDelete);
      return { ...note, tags: newTags };
    });

    setNotes(notesListRemovedTag);
    setAllTags((prevTags) =>
      prevTags.filter((tag) => tag.id !== tagIdToDelete)
    );
    handleTagDeleteClose();
    setCustomPopoverOpen(true);
    setPopoverMessage(
      `Tag - ${tagNeedDeleteLabel} - has been deleted and all associated notes have been updated.`
    );
    setPopoverType("success");
  };

  useEffect(() => {}, [selectedNote, notes]);
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (customPopoverOpen) {
      if (popoverType === "success") {
        timer = setTimeout(() => {
          setCustomPopoverOpen(false);
        }, 1000);
      }
    }
    return () => {
      clearTimeout(timer);
    };
  }, [customPopoverOpen, popoverType]);

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
    handleTagDelete,
    popoverType,
    customPopoverOpen,
    popoverMessage,
    popoverAnchorEl,
    // handlePopoverClose,

    open,
    handleTagDeleteClose,
    tagValue,
    handleTagsDelete,
    handleDeleteTagDialog,
    tagIdToDelete,
  };
};
