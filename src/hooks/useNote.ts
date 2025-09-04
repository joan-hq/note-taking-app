import { useState, useEffect, useCallback, type FormEvent } from "react";
import type { Note, Tag, FilterType, PopoverType } from "../types/index";
import { useCustomPopover } from "../hooks/useCustomPopover";
import type { CustomPopoverState } from "../hooks/useCustomPopover";
import {
  notes as initialNotesData,
  tags as initialTagsData,
  notes,
} from "../data/note";
import {
  findAndModifyNote,
  removeTagById,
  removeTagFromNotesByTagId,
  findNoteById,
  updateNoteByNoteId,
} from "../helpers/noteHelpers";
import { Anchor } from "@mui/icons-material";

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

  handleExistNoteTitleOnChange: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
  handleNewTagSave: (newTag: Tag) => void;
  handleTagsChangeFromNote: (
    event: React.ChangeEvent<HTMLElement>,
    newTags: Tag[]
  ) => void;
  handleTagDeleteFromNote: (tagId: string) => void;
  handleContentOnChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const useNote = (): useNoteProps => {
  const [allTags, setAllTags] = useState<Tag[]>(initialTagsData);
  const [selectedTagId, setSelectedTagId] = useState<string>("");
  const [allNotes, setAllNotes] = useState<Note[]>(initialNotesData);
  const [filterType, setFilterType] = useState<FilterType>("all");
  const [selectedNoteId, setSelectedNoteId] = useState<string | null>(null);

  useEffect(() => {}, [allNotes, allTags]);

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

  /**
   * For Tag management
   * @param tagId a tag need to be deleted
   */
  const handleTagDelete = (tagId: string) => {
    setAllTags(removeTagById(tagId, allTags));
    setAllNotes(removeTagFromNotesByTagId(tagId, allNotes));
  };

  /* START EXIST NOTE DETAILS EDIT PROCESSING */
  const handleExistNoteTitleOnChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newTitle = event.target.value;
    if (selectedNoteId) {
      setAllNotes((prevNotes) =>
        updateNoteByNoteId(prevNotes, selectedNoteId, (note) => ({
          ...note,
          title: newTitle,
        }))
      );
    }
  };

  /**
   * For exist note tags edit, add a new tag to the note
   * @param newTag
   */

  const handleNewTagSave = (newTag: Tag) => {
    setAllTags((prevTags) => {
      return [...prevTags, newTag];
    });

    if (selectedNoteId) {
      setAllNotes((prevNotes) =>
        updateNoteByNoteId(prevNotes, selectedNoteId, (note) => ({
          ...note,
          tags: [...note.tags, newTag.id],
        }))
      );
    }
  };

  const handleTagsChangeFromNote = (
    event: React.ChangeEvent<HTMLElement>,
    newTags: Tag[]
  ) => {
    if (!selectedNoteId) return;
    const newTagId = newTags.map((newTag) => newTag.id);
    setAllNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === selectedNoteId ? { ...note, tags: newTagId } : note
      )
    );
    console.log("Note", selectedNoteId, "tags updated:", newTags);
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

    // need change to call save note in function handleNoteSave
    setAllNotes(newAllNotes);
  };

  const handleContentOnChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!selectedNoteId) {
      return;
    }

    const newContent = event.target.value;
    setAllNotes((prevNotes) =>
      updateNoteByNoteId(prevNotes, selectedNoteId, (note) => ({
        ...note,
        content: newContent,
      }))
    );
  };
  /* END EXIST NOTE DETAILS EDIT PROCESSING */

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
    handleTagsChangeFromNote,
    handleTagDeleteFromNote,
    handleContentOnChange,
  };
};
