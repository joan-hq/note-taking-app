import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { tags as initialTagsData } from "../data/note";
import type { Note, Tag } from "../types/index";

export interface useNoteFormProps {
  noteId: string;
  titleInput: string;
  tagInput: string;
  availableTags: Tag[];
  selectedTags: string[];
  time: string;
  noteInput: string;
  handleSubmitNewTage: (event: React.KeyboardEvent<HTMLFormElement>) => void;
  handleTagOnChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSelectedTagsChange: (newTags: string[]) => void;
  handleTitleOnChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleNoteOnChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSave: () => void;
  handleCancel: () => void;
}

export const useNoteForm = (selectedNote: Note | null): useNoteFormProps => {
  const [noteId, setNoteId] = useState(() => uuidv4());
  const [titleInput, setTitleInput] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [availableTags, setAvailableTags] = useState<Tag[]>(initialTagsData);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [time, setTime] = useState("");
  const [noteInput, setNoteInput] = useState("");

  const handleSubmitNewTage = (event: React.KeyboardEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedTag = tagInput.trim();
    if (!trimmedTag) return;

    // FIX: Check if the tag (by label) already exists in availableTags
    const tagExists = availableTags.some((tag) => tag.label === trimmedTag);

    if (!tagExists) {
      const newTag: Tag = { id: uuidv4(), label: trimmedTag }; // Create a new Tag object
      setAvailableTags((prevTags) => [...prevTags, newTag]); // Correctly add the Tag object
    }

    // Add the new tag's label to selectedTags if not already there
    if (!selectedTags.includes(trimmedTag)) {
      setSelectedTags((prevSelected) => [...prevSelected, trimmedTag]);
    }
    setTagInput("");
  };

  const handleTagOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTagInput(event.target.value);
    console.log("tagInput", tagInput);
  };

  const handleSelectedTagsChange = (newTags: string[]) => {
    setSelectedTags(newTags);
    console.log("selectdtags", selectedTags);

    //update availableTags if a new tag was truly added
    const currentAvailableTags = new Set(availableTags.map((tag) => tag.label));
    const newlyAddedTags: Tag[] = [];

    newTags.forEach((tag) => {
      if (!currentAvailableTags.has(tag)) {
        newlyAddedTags.push({ id: uuidv4(), label: tagInput });
      }
    });

    if (newlyAddedTags.length > 0) {
      setAvailableTags((prevTags) => [...prevTags, ...newlyAddedTags]);
    }

    console.log("available tags", availableTags);
  };

  const handleTitleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitleInput(event.target.value);
    console.log("titleInput", titleInput);
  };

  useEffect(() => {
    // If a note is selected, populate the fields with its data
    if (selectedNote) {
      setNoteId(selectedNote.id);
      setTitleInput(selectedNote.title);
      setSelectedTags(selectedNote.tags || []);
      setTime(selectedNote.lastEdit);
      setNoteInput(selectedNote.content);

      const existingTags = new Set(availableTags.map((tag) => tag.label));
      const newTagsAdded: Tag[] = [];

      selectedNote.tags?.forEach((tag) => {
        if (!existingTags.has(tag.trim())) {
          newTagsAdded.push({ id: uuidv4(), label: tag });
        }
      });

      if (newTagsAdded.length > 0) {
        setAvailableTags((prevTags) => [...prevTags, ...newTagsAdded]);
      }
    } else {
      //if no note is selected, reset the fields
      setNoteId(uuidv4());
      setTitleInput("");
      setSelectedTags([]);
      setTime(new Date().toLocaleString());
      setNoteInput("");
    }
  }, [selectedNote, availableTags]);

  // ** Start Note Body Function

  const handleNoteOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNoteInput(event.target.value);
    console.log("noteInput", noteInput);
  };

  const handleSave = () => {
    if (!titleInput.trim() || !noteInput.trim()) {
      alert("Title and content cannot be empty");
      return;
    }
    const noteData = {
      id: noteId,
      title: titleInput,
      tags: selectedTags,
      lastEdit: new Date().toLocaleString(),
      content: noteInput,
      archive: selectedNote ? selectedNote.archive : false,
    };
    setTime(noteData.lastEdit);

    //for save note
    onNoteSave(noteData);
  };

  const handleCancel = () => {
    console.log("Cancel clicked");
    if (selectedNote) {
      setTitleInput(selectedNote.title);
      setSelectedTags(selectedNote.tags || []);
      setTime(selectedNote.lastEdit);
      setNoteInput(selectedNote.content);
    } else {
      // Reset to initial state for new note
      setNoteId(uuidv4());
      setTitleInput("");
      setSelectedTags([]);
      setTime(new Date().toLocaleString());
      setNoteInput("");
    }
  };

  return {
    noteId,
    titleInput,
    tagInput,
    availableTags,
    selectedTags,
    time,
    noteInput,
    handleSubmitNewTage,
    handleTagOnChange,
    handleSelectedTagsChange,
    handleTitleOnChange,
    handleNoteOnChange,
    handleSave,
    handleCancel,
  };
};
