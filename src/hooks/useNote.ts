import { useState, useEffect, useCallback } from "react";
import type { Note, Tag, FilterType, PopoverType } from "../types/index";
import {
  notes as initialNotesData,
  tags as initialTagsData,
  notes,
} from "../data/note";
import {
  findAndModifyNote,
  removeTagById,
  removeTagFromNotesByTagId,
} from "../helpers/noteHelpers";

interface useNoteProps {
  handleShowAllNote: () => void;
  handleShowArchivedNote: () => void;

  allTags: Tag[];
  selectedTagId: string;
  handleTagDelete: (tagId: string) => void;

  allNotes: Note[];
  filterType: FilterType;
  handleNewNoteClick: () => void;
  handleNoteCardClick: (noteId: string) => void;

  selectedNoteId: string;
  handleArchiveNote: (noteId: string) => Promise<boolean>;
  handleUnrchiveNote: (noteId: string) => Promise<boolean>;
  handleDeleteNote: (noteId: string) => Promise<boolean>;

  handleExistNoteTitleOnChange: () => void;
  handleNewTagSave: () => void;
  handleContentOnChange: () => void;
  handleNoteEditSave: () => void;
  handleNoteEditCancel: () => void;
}

export const useNote = (): useNoteProps => {
  const [allTags, setAllTags] = useState<Tag[]>(initialTagsData);
  const [selectedTagId, setSelectedTagId] = useState<string>("");
  const [allNotes, setAllNotes] = useState<Note[]>(initialNotesData);
  const [filterType, setFilterType] = useState<FilterType>("all");
  const [selectedNoteId, setSelectedNoteId] = useState<string | null>(null);

  const handleShowAllNote = useCallback(() => {
    setFilterType("all");
  }, []);

  const handleShowArchivedNote = useCallback(() => {
    setFilterType("archived");
  }, []);

  const handleNewNoteClick = () => {
    return console.log("handleNewNoteClick");
  };
  const handleNoteCardClick = (nodeId: string) => {
    return setSelectedNoteId(nodeId);
  };

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
  const handleTagDelete = (tagId: string) => {
    setAllTags(removeTagById(tagId, allTags));
    setAllNotes(removeTagFromNotesByTagId(tagId, allNotes));
    return console.log("handleTagDelete");
  };

  const handleExistNoteTitleOnChange = () => {
    return console.log("handleExistNoteTitleOnChange");
  };
  const handleNewTagSave = () => {
    return console.log("handleNewTagSave");
  };
  const handleContentOnChange = () => {
    return console.log("handleContentOnChange");
  };
  const handleNoteEditSave = () => {
    return console.log("handleNoteEditSave");
  };
  const handleNoteEditCancel = () => {
    return console.log("handleNoteEditCancel");
  };

  return {
    handleShowAllNote,
    handleShowArchivedNote,
    allTags,
    handleTagDelete,

    allNotes,
    filterType,
    handleNewNoteClick,
    handleNoteCardClick,

    selectedNoteId,
    handleArchiveNote,
    handleUnrchiveNote,
    handleDeleteNote,

    handleExistNoteTitleOnChange,
    handleNewTagSave,
    handleContentOnChange,
    handleNoteEditSave,
    handleNoteEditCancel,
  };
};
