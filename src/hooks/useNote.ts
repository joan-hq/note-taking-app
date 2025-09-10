import { useState, useEffect, useCallback, type FormEvent } from "react";
import type { Note, Tag, FilterType, PopoverType } from "../types/index";
import { useCustomPopover } from "../hooks/useCustomPopover";
import type { CustomPopoverState } from "../hooks/useCustomPopover";
import {
  notes as initialNotesData,
  tags as initialTagsData,
} from "../data/note";
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

interface useNoteProps {
  handleShowAllNote: () => void;
  handleShowArchivedNote: () => void;

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
  handleContentOnChange: () => void;
}

export const useNote = (): useNoteProps => {
  const [allTags, setAllTags] = useState<Tag[]>(initialTagsData);
  const [selectedTagId, setSelectedTagId] = useState<string | null>(null);
  const [allNotes, setAllNotes] = useState<Note[]>(initialNotesData);
  const [filterType, setFilterType] = useState<FilterType>("all");
  const [selectedNoteId, setSelectedNoteId] = useState<string | null>(null);

  const handleShowAllNote = useCallback(() => {
    setFilterType("all");
  }, []);

  const handleShowArchivedNote = useCallback(() => {
    setFilterType("archived");
  }, []);

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
  const handleTagDelete = (tagId: string) => {
    setAllTags(removeTagById(tagId, allTags));
    setAllNotes(removeTagFromNotesByTagId(tagId, allNotes));
  };

  const handleNewNoteClick = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      const newNote = createNewNote({});
      setAllNotes((prevNotes) => [newNote, ...prevNotes]);
      setSelectedNoteId(newNote.id);
      setSelectedTagId(null);
    },
    []
  );
  const handleNoteCardClick = useCallback(
    (nodeId: string) => {
      const currentNote = selectedNoteId
        ? findNoteById(selectedNoteId, allNotes)
        : null;

      if (currentNote && isEmptyNote(currentNote)) {
        const updatedNotes = allNotes.filter(
          (note) => note.id !== selectedNoteId
        );
        setAllNotes(updatedNotes);
      }
      setSelectedNoteId(nodeId);
      setSelectedTagId(null);
    },
    [selectedNoteId, allNotes]
  );

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
  const handleTitleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = event.target.value;

    const { updatedNotes, newSelectedNoteId } = handleNoteStateChanges(
      allNotes,
      selectedNoteId,
      { title: newTitle, lastEdit: timeFormat() }
    );
    setAllNotes(updatedNotes);
    setSelectedNoteId(newSelectedNoteId);
  };

  /**
   * For add a new tag to the note
   * @param newTag
   */

  const handleNewTagSave = (newTag: Tag) => {
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
  };

  const handleTagsChangeFromNote = (
    event: React.ChangeEvent<HTMLElement>,
    newTags: Tag[]
  ) => {
    const newTagIds = newTags.map((newTag) => newTag.id);
    const { updatedNotes, newSelectedNoteId } = handleNoteStateChanges(
      allNotes,
      selectedNoteId,
      { tags: newTagIds, lastEdit: timeFormat() }
    );

    setAllNotes(updatedNotes);
    setSelectedNoteId(newSelectedNoteId);
  };

  const handleTagDeleteFromNote = (tagId: string) => {
    if (!selectedNoteId) return;

    const selectedNote = findNoteById(selectedNoteId, allNotes);
    if (!selectedNote) return;

    const newTags = selectedNote.tags.filter((id) => id !== tagId);
    const updatedNote = { ...selectedNote, tags: newTags };
    const newAllNotes = allNotes.map((note) =>
      note.id === updatedNote.id ? updatedNote : note
    );
    setAllNotes(newAllNotes);
  };

  const handleContentOnChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newContent = event.target.value;
    const { updatedNotes, newSelectedNoteId } = handleNoteStateChanges(
      allNotes,
      selectedNoteId,
      { content: newContent, lastEdit: timeFormat() }
    );
    setAllNotes(updatedNotes);
    setSelectedNoteId(newSelectedNoteId);
  };
  /* END EXIST NOTE DETAILS EDIT PROCESSING */

  return {
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
  };
};
