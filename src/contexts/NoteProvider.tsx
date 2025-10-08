import React, {
  createContext,
  useContext,
  useState,
  useMemo,
  useEffect,
  useCallback,
} from "react";

import {
  findAndModifyNote,
  removeTagById,
  removeTagFromNotesByTagId,
  findNoteById,
  handleNoteStateChanges,
  createNewNote,
  isEmptyNote,
  timeFormat,
} from "../helpers/noteHelpers";
import {
  notes as initialNotesData,
  tags as initialTagsData,
} from "../data/note";
import type { Note, Tag, FilterType } from "../types/index";

interface NoteContextValue {
  noteFilterTitle: string;
  handleShowAllNote: (event: React.MouseEvent<HTMLElement>) => void;
  handleShowArchivedNote: (event: React.MouseEvent<HTMLElement>) => void;

  allTags: Tag[];
  handleTagDelete: (tagId: string) => void;
  selectedTagId: string | null;
  handleTagClick: (tagId: string) => void;
  handleClearTagFilter: () => void;

  allNotes: Note[];
  filterType: FilterType;
  handleNewNoteClick: (event: React.MouseEvent<HTMLElement>) => void;
  handleNoteCardClick: (noteId: string) => void;

  selectedNoteId: string | null;
  handleArchiveNote: (noteId: string) => Promise<boolean>;
  handleUnrchiveNote: (noteId: string) => Promise<boolean>;
  handleDeleteNote: (noteId: string) => Promise<boolean>;

  handleTitleOnChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleNewTagSave: (newTag: Tag) => void;
  handleTagsChangeFromNote: (
    event: React.ChangeEvent<HTMLElement>,
    newTags: Tag[]
  ) => void;
  handleTagDeleteFromNote: (tagId: string) => void;
  handleContentOnChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const NoteContext = createContext<NoteContextValue | null>(null);

interface NoteProviderProps {
  children: React.ReactNode;
}

export const NoteProvider = ({ children }: NoteProviderProps) => {
  console.log("***************used Note Provide*****************");
  const [allTags, setAllTags] = useState<Tag[]>(initialTagsData);
  const [selectedTagId, setSelectedTagId] = useState<string | null>(null);
  const [allNotes, setAllNotes] = useState<Note[]>(initialNotesData);
  const [filterType, setFilterType] = useState<FilterType>("all");
  const [selectedNoteId, setSelectedNoteId] = useState<string | null>(null);
  useEffect(() => {
    console.log("The value of the filterType:", filterType);
  }, [filterType]);

  const noteFilterTitle = useMemo(() => {
    console.log(
      "Note Provider - USEMEMO RE-RUNNING. Current filterType:",
      filterType
    );

    if (filterType === "all") {
      return "All Notes";
    } else if (filterType === "archived") {
      return "Archived Note";
    }
    return "";
  }, [filterType]);

  const handleShowAllNote = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      setFilterType("all");
    },
    []
  );

  const handleShowArchivedNote = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      setFilterType("archived");
    },
    []
  );

  console.log("useNote - noteFilterTitlenoteFilterTitle + ", noteFilterTitle);

  const handleTagClick = useCallback((tagId: string) => {
    console.log("tagId", tagId);
    setSelectedTagId((prevId) => (prevId === tagId ? null : tagId));
  }, []);

  const handleClearTagFilter = useCallback(() => {
    setSelectedTagId(null);
  }, []);

  /**
   * For Tag management
   * @param tagId a tag need to be deleted
   */
  const handleTagDelete = useCallback(
    (tagId: string) => {
      setAllTags(removeTagById(tagId, allTags));
      setAllNotes(removeTagFromNotesByTagId(tagId, allNotes));
    },
    [allTags, allNotes]
  );

  const handleNewNoteClick = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      const newNote = createNewNote({});
      setAllNotes((prevNotes) => [newNote, ...prevNotes]);
      setSelectedNoteId(newNote.id);
      //setSearchQuery("");
      setSelectedTagId(null);
      // setFilterType("all");
    },
    []
  );

  const handleNoteCardClick = useCallback((noteId: string) => {
    console.log("handleNoteCardClick-noteId", noteId);
    setSelectedNoteId(noteId);
    setSelectedTagId(null);
  }, []);

  useEffect(() => {
    if (selectedNoteId) {
      const prevNote = allNotes.find((note) => note.id !== selectedNoteId);
      if (prevNote && isEmptyNote(prevNote)) {
        setAllNotes((prevNotes) =>
          prevNotes.filter((note) => note.id !== prevNote.id)
        );
      }
    }
  }, [selectedNoteId, allNotes]);

  /* START ACTION BAR PROCESSING */

  const handleArchiveNote = useCallback(
    async (noteId: string): Promise<boolean> => {
      try {
        if (!noteId) return false;
        await new Promise((resolve) => setTimeout(resolve, 500));
        const updatedNotes = findAndModifyNote(noteId, allNotes, {
          isArchive: true,
        });
        setAllNotes(updatedNotes);
        return true;
      } catch (error) {
        console.error("Failed to archive note:", error);
        return false;
      }
    },
    [allNotes]
  );
  const handleUnrchiveNote = useCallback(
    async (noteId: string): Promise<boolean> => {
      try {
        if (!noteId) return false;
        await new Promise((resolve) => setTimeout(resolve, 500));
        const updatedNotes = findAndModifyNote(noteId, allNotes, {
          isArchive: false,
        });
        setAllNotes(updatedNotes);
        return true;
      } catch (error) {
        console.error("Failed to unarchive note:", error);
        return false;
      }
    },
    [allNotes]
  );

  const handleDeleteNote = useCallback(
    async (noteId: string): Promise<boolean> => {
      console.log("****to Delete Note Function*******");
      try {
        console.log("noteId", noteId);
        if (!noteId) return false;
        await new Promise((resolve) => setTimeout(resolve, 500));

        const updatedNotes = allNotes.filter((note) => note.id !== noteId);
        setAllNotes(updatedNotes);
        setSelectedNoteId(null);
        return true;
      } catch (error) {
        console.error("Failed to delete note:", error);
        return false;
      }
    },
    [allNotes]
  );

  /* END ACTION BAR PROCESSING */

  /* START EXIST NOTE DETAILS EDIT PROCESSING */
  const handleTitleOnChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const newTitle = event.target.value;
      console.log("handleTitleOnChange", newTitle);
      const { updatedNotes, newSelectedNoteId } = handleNoteStateChanges(
        allNotes,
        selectedNoteId,
        { title: newTitle, lastEdit: timeFormat() }
      );
      setAllNotes(updatedNotes);
      setSelectedNoteId(newSelectedNoteId);
    },
    [allNotes, selectedNoteId]
  );

  /**
   * For add a new tag to the note
   * @param newTag
   */

  const handleNewTagSave = useCallback(
    (newTag: Tag) => {
      setAllTags((prevTags) => {
        return [...prevTags, newTag];
      });

      const selectedNote = selectedNoteId
        ? findNoteById(selectedNoteId, allNotes)
        : null;
      const selectedNoteTags = selectedNote
        ? [...selectedNote.tags, newTag.id]
        : [newTag.id];

      const { updatedNotes, newSelectedNoteId } = handleNoteStateChanges(
        allNotes,
        selectedNoteId,
        { tags: selectedNoteTags }
      );

      setAllNotes(updatedNotes);
      setSelectedNoteId(newSelectedNoteId);
    },
    [allNotes, selectedNoteId]
  );

  const handleTagsChangeFromNote = useCallback(
    (event: React.ChangeEvent<HTMLElement>, newTags: Tag[]) => {
      const newTagIds = newTags.map((newTag) => newTag.id);
      const { updatedNotes, newSelectedNoteId } = handleNoteStateChanges(
        allNotes,
        selectedNoteId,
        { tags: newTagIds, lastEdit: timeFormat() }
      );

      setAllNotes(updatedNotes);
      setSelectedNoteId(newSelectedNoteId);
    },
    [allNotes, selectedNoteId]
  );

  const handleTagDeleteFromNote = useCallback(
    (tagId: string) => {
      if (!selectedNoteId) return;

      const selectedNote = findNoteById(selectedNoteId, allNotes);
      if (!selectedNote) return;

      const newTags = selectedNote.tags.filter((id) => id !== tagId);
      const updatedNote = { ...selectedNote, tags: newTags };
      const newAllNotes = allNotes.map((note) =>
        note.id === updatedNote.id ? updatedNote : note
      );
      setAllNotes(newAllNotes);
    },
    [allNotes, selectedNoteId]
  );

  const handleContentOnChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const newContent = event.target.value;
      const { updatedNotes, newSelectedNoteId } = handleNoteStateChanges(
        allNotes,
        selectedNoteId,
        { content: newContent, lastEdit: timeFormat() }
      );
      setAllNotes(updatedNotes);
      setSelectedNoteId(newSelectedNoteId);
    },
    [allNotes, selectedNoteId]
  );
  /* END EXIST NOTE DETAILS EDIT PROCESSING */

  const value: NoteContextValue = useMemo(
    () => ({
      noteFilterTitle,
      handleShowAllNote,
      handleShowArchivedNote,
      allTags,
      handleTagDelete,
      selectedTagId,
      handleTagClick,
      handleClearTagFilter,

      allNotes,
      filterType,
      handleNewNoteClick,
      handleNoteCardClick,

      selectedNoteId,
      handleArchiveNote,
      handleUnrchiveNote,
      handleDeleteNote,

      handleTitleOnChange,
      handleNewTagSave,
      handleTagsChangeFromNote,
      handleTagDeleteFromNote,
      handleContentOnChange,
    }),
    [
      noteFilterTitle,
      allTags,
      selectedTagId,
      allNotes,
      filterType,
      selectedNoteId,

      handleTagDelete,
      handleArchiveNote,
      handleUnrchiveNote,
      handleDeleteNote,
      handleTitleOnChange,
      handleNewTagSave,
      handleTagsChangeFromNote,
      handleTagDeleteFromNote,
      handleContentOnChange,
    ]
  );

  return <NoteContext.Provider value={value}>{children}</NoteContext.Provider>;
};

export const useNoteContext = () => {
  const context = useContext(NoteContext);
  if (context === null) {
    throw new Error("useNote must be used within a NoteProvider");
  }
  return context;
};
