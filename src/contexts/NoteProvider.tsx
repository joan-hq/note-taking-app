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
  filterNotesByQuery,
} from "../helpers/noteHelpers";
import type { Note, Tag, FilterType } from "../types/index";
import {
  notes as initialNotesData,
  tags as initialTagsData,
} from "../data/note";

interface NoteFilterProps {
  noteFilterTitle: string;
  filterType: FilterType;
  handleShowAllNote: (event: React.MouseEvent<HTMLElement>) => void;
  handleShowArchivedNote: (event: React.MouseEvent<HTMLElement>) => void;
}

interface TagManagementProps {
  allTags: Tag[];
  selectedTagId: string | null;
  handleTagClick: (tagId: string) => void;
  handleTagDelete: (tagId: string) => void;
  handleClearTagFilter: () => void;
}

interface NoteManagerProps {
  allNotes: Note[];
  selectedNoteId: string | null;
  handleNewNoteClick: (event: React.MouseEvent<HTMLElement>) => void;
  handleNoteCardClick: (noteId: string | null) => void;
  handleArchiveNote: (noteId: string) => Promise<boolean>;
  handleUnrchiveNote: (noteId: string) => Promise<boolean>;
  handleDeleteNote: (noteId: string) => Promise<boolean>;
}

interface NoteEditorsProps {
  handleTitleOnChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleContentOnChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleNewTagSave: (newTag: Tag) => void;
  handleTagsChangeFromNote: (
    event: React.ChangeEvent<HTMLElement>,
    newTags: Tag[]
  ) => void;
  handleTagDeleteFromNote: (tagId: string) => void;
}

interface NoteSearchProps {
  searchQuery: string;
  filteredNotes: Note[];
  handleSearchOnChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleClearSearch: () => void;
}

interface NoteContextValue {
  filters: NoteFilterProps;
  tags: TagManagementProps;
  notes: NoteManagerProps;
  editors: NoteEditorsProps;
  search: NoteSearchProps;
}

const NoteContext = createContext<NoteContextValue | null>(null);

interface NoteProviderProps {
  children: React.ReactNode;
}

export const NoteProvider = ({ children }: NoteProviderProps) => {
  const [allTags, setAllTags] = useState<Tag[]>(initialTagsData);
  const [selectedTagId, setSelectedTagId] = useState<string | null>(null);
  const [allNotes, setAllNotes] = useState<Note[]>(initialNotesData);
  const [filterType, setFilterType] = useState<FilterType>("all");
  const [selectedNoteId, setSelectedNoteId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");

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

  /**handle filters */
  const noteFilterTitle = useMemo(() => {
    if (filterType === "all") {
      return "All Notes";
    } else if (filterType === "archived") {
      return "Archived Note";
    }
    return "";
  }, [filterType]);

  const handleShowAllNote = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      setFilterType("all");
    },
    []
  );

  const handleShowArchivedNote = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      if (filterType !== "archived") {
        setFilterType("archived");
      }
    },
    [filterType]
  );

  /**handle tags */

  const handleTagClick = useCallback((tagId: string) => {
    console.log("tagId", tagId);
    setSelectedTagId((prevId) => (prevId === tagId ? null : tagId));
  }, []);

  const handleClearTagFilter = useCallback(() => {
    setSelectedTagId(null);
  }, []);

  const handleTagDelete = useCallback((tagId: string) => {
    setAllTags(removeTagById(tagId, allTags));
    setAllNotes(removeTagFromNotesByTagId(tagId, allNotes));
  }, []);

  /**handle notes */
  const handleNewNoteClick = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      const newNote = createNewNote({});
      setAllNotes((prevNotes) => [newNote, ...prevNotes]);
      setSelectedNoteId(newNote.id);
      setSelectedTagId(null);
    },
    []
  );

  const handleNoteCardClick = useCallback((noteId: string | null) => {
    setSelectedNoteId(noteId);
    setSelectedTagId(null);
  }, []);

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

  /**handle editors */
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

  /**handle search */
  const handleSearchOnChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchQuery(event.target.value);
    },
    []
  );

  const handleClearSearch = useCallback(() => {
    setSearchQuery("");
  }, []);

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

  const value: NoteContextValue = useMemo(
    () => ({
      filters: {
        noteFilterTitle,
        filterType,
        handleShowAllNote,
        handleShowArchivedNote,
      },
      tags: {
        allTags,
        selectedTagId,
        handleTagClick,
        handleTagDelete,
        handleClearTagFilter,
      },
      notes: {
        allNotes,
        selectedNoteId,
        handleNewNoteClick,
        handleNoteCardClick,
        handleArchiveNote,
        handleUnrchiveNote,
        handleDeleteNote,
      },
      editors: {
        handleTitleOnChange,
        handleContentOnChange,
        handleNewTagSave,
        handleTagsChangeFromNote,
        handleTagDeleteFromNote,
      },
      search: {
        searchQuery,
        filteredNotes,
        handleSearchOnChange,
        handleClearSearch,
      },
    }),
    [
      noteFilterTitle,
      filterType,
      allTags,
      selectedTagId,
      allNotes,
      selectedNoteId,
      searchQuery,
      filteredNotes,

      handleShowAllNote,
      handleShowArchivedNote,
      handleTagClick,
      handleTagDelete,
      handleClearTagFilter,
      handleNewNoteClick,
      handleNoteCardClick,
      handleArchiveNote,
      handleUnrchiveNote,
      handleDeleteNote,
      handleTitleOnChange,
      handleContentOnChange,
      handleNewTagSave,
      handleTagsChangeFromNote,
      handleTagDeleteFromNote,
      handleSearchOnChange,
      handleClearSearch,
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
