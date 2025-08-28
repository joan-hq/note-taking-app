import { useState, useEffect, type BlockquoteHTMLAttributes } from "react";
import type { Note, Tag, FilterType, PopoverType } from "../types/index";
import {
  notes as initialNotesData,
  tags as initialTagsData,
} from "../data/note";

interface useNoteProps {
  handleShowAllNote: () => void;
  handleShowArchivedNote: () => void;

  allTags: Tag[];
  handleTagDelete: (tagId: string) => void;

  allNotes: Note[];
  filterType: FilterType;
  handleNewNoteClick: () => void;
  handleNoteCardClick: () => void;

  selectedNoteId: string | null;
  handleArchiveNote: (noteId: string) => void;
  handleUnrchiveNote: (noteId: string) => void;
  handleDeleteNote: (noteId: string) => void;

  handleExistNoteTitleOnChange: () => void;
  handleNewTagSave: () => void;
  handleContentOnChange: () => void;
  handleNoteEditSave: () => void;
  handleNoteEditCancel: () => void;
}

export const useNote = (): useNoteProps => {
  const [allTags, setAllTags] = useState<Tag[]>(initialTagsData);
  const [allNotes, setAllNotes] = useState<Note[]>(initialNotesData);
  const [filterType, setFilterType] = useState<FilterType>("all");
  const [selectedNoteId, setSelectedNoteId] = useState<string>("");

  const handleShowAllNote = () => {
    return console.log("handleShowAllNote");
  };

  const handleShowArchivedNote = () => {
    return console.log("handleShowArchivedNote");
  };

  const handleNewNoteClick = () => {
    return console.log("handleNewNoteClick");
  };
  const handleNoteCardClick = () => {
    return console.log("handleNoteCardClick");
  };

  const handleArchiveNote = () => {
    return console.log("handleArchiveNote");
  };
  const handleUnrchiveNote = () => {
    return console.log("handleUnrchiveNote");
  };

  const handleTagDelete = () => {
    return console.log("handleTagDelete");
  };

  const handleDeleteNote = () => {
    return console.log("handleDeleteNote");
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
