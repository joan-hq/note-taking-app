import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { tags as initialTagsData } from "../data/note";
import type { Note, Tag, PopoverType } from "../types/index";
import type { AutocompleteChangeReason } from "@mui/material/useAutocomplete";
import * as error from "../utils/errors";
import { notes as notesInitialData } from "../data/note";

export interface useNoteFormProps {
  noteId: string;
  titleInput: string;
  tagInput: string;
  availableTags: Tag[];
  selectedTags: string[];
  time: string;
  noteInput: string;
  handleSelectedTagsChange: (newTags: string[]) => void;
  handleTitleOnChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleNoteOnChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSave: (
    event:
      | React.MouseEvent<HTMLButtonElement>
      | React.FormEvent<HTMLFormElement>
  ) => void;
  handleCancel: () => void;
  onNoteSave: (note: Note) => void;

  //***start tag params and function */
  addTagDialogs: boolean;
  newTagValue: string;
  handleTagSelectionOnChange: (
    event: React.SyntheticEvent,
    value: Tag[],
    reason: AutocompleteChangeReason
  ) => void;
  handleAddTagDialogsOpen: () => void;
  handleAddTagDialogsClose: () => void;
  handleNewTagOnChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleNewTagSave: (event: React.FormEvent<HTMLFormElement>) => void;
  //***end tag params and function */

  //***start ErrorPopover */
  customPopoverOpen: boolean;
  popoverMessage: string;
  popoverAnchorEl: HTMLElement | null;
  popoverType: PopoverType;
  handlePopoverClose: () => void;
  //***End ErrorPopover */
}

export const useNoteForm = (
  selectedNote: Note | null,
  onNoteSave: (note: Note) => void
): useNoteFormProps => {
  const [noteId, setNoteId] = useState(() => uuidv4());
  const [titleInput, setTitleInput] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [availableTags, setAvailableTags] = useState<Tag[]>(initialTagsData);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [time, setTime] = useState("");
  const [noteInput, setNoteInput] = useState("");
  //const [newNote, setNewNote] = useState<Note[]>(notesInitialData);

  //***start tag params and function */
  const [addTagDialogs, setaddTagDialogs] = useState<boolean>(false);
  const [newTagValue, setnewTagValue] = useState<string>("");

  //***ErrorPopover */
  const [customPopoverOpen, setCustomPopoverOpen] = useState<boolean>(false);
  const [popoverMessage, setPopoverMessage] = useState<string>("");
  const [popoverType, setPopoverType] = useState<PopoverType>("error");
  const [popoverAnchorEl, setPopoverAnchorEl] = useState<HTMLElement | null>(
    null
  );

  const handleAddTagDialogsOpen = () => {
    console.log();
    setaddTagDialogs(true);
  };
  const handleAddTagDialogsClose = () => {
    setaddTagDialogs(false);
  };

  const handleTagSelectionOnChange = (
    event: React.SyntheticEvent,
    selectedTagValue: Tag[],
    reason: AutocompleteChangeReason
  ) => {
    event.preventDefault();
    const newSelectedTagLabel = selectedTagValue.map((tag) => tag.label);
    setSelectedTags(newSelectedTagLabel);
    console.log("selectedTags", selectedTags);
  };

  useEffect(() => {
    console.log("selectedTags (updated via useEffect):", selectedTags);
    // You can also perform other actions here, like making an API call.
  }, [selectedTags]);

  const handleNewTagOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setnewTagValue(event.target.value);
    console.log("newTag", newTagValue);
  };

  const handleNewTagSave = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newCleanTag = newTagValue.trim();
    const newCleanTagLength = newCleanTag.length;

    if (newCleanTagLength === 0) {
      setCustomPopoverOpen(true);
      setPopoverType("error");
      setPopoverAnchorEl(event.currentTarget);

      setPopoverMessage(error.WHITESPACE_ERROR_MESSAGE);
    } else {
      if (newCleanTagLength < 3) {
        setCustomPopoverOpen(true);
        setPopoverType("error");
        setPopoverAnchorEl(event.currentTarget);

        setPopoverMessage(error.TAG_MIN_LENGTH_ERROR);
      }
      if (newCleanTagLength > 20) {
        setCustomPopoverOpen(true);
        setPopoverType("error");
        setPopoverAnchorEl(event.currentTarget);
        setPopoverMessage(error.TAG_MAX_LENGTH_ERROR);
      }
    }
    //check if the new tag alreat exit
    const tagAlreadyExists = availableTags.some(
      (tag) => tag.label === newCleanTag
    );
    console.log("tagAlreadyExists", tagAlreadyExists);
    if (tagAlreadyExists) {
      setCustomPopoverOpen(true);
      setPopoverType("error");
      setPopoverAnchorEl(event.currentTarget);
      setPopoverMessage(error.TAG_ALREADY_EXISTS_MESSAGE);
    }

    if (!tagAlreadyExists && newCleanTagLength >= 3 && newCleanTagLength < 20) {
      const newTagData = { id: uuidv4(), label: newCleanTag };
      setAvailableTags((prevTags) => [...prevTags, newTagData]);
      setCustomPopoverOpen(true);
      setPopoverType("success");
      setPopoverAnchorEl(event.currentTarget);
      setPopoverMessage("Added New Tag");
      console.log("updated available Tags", availableTags);
      setnewTagValue("");
      setaddTagDialogs(false);
      setnewTagValue("");
    }
  };
  //***end tag params and function */

  const handlePopoverClose = () => {
    setCustomPopoverOpen(false);
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

  const handleSave = (
    event:
      | React.MouseEvent<HTMLButtonElement>
      | React.FormEvent<HTMLFormElement>
  ) => {
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
    //show note create successfully
    setCustomPopoverOpen(true);
    setPopoverType("success");
    setPopoverAnchorEl(event.currentTarget);
    setPopoverMessage("Note saved successfully!");
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
    handleSelectedTagsChange,
    handleTitleOnChange,
    handleNoteOnChange,
    handleSave,
    handleCancel,

    addTagDialogs,
    newTagValue,
    handleTagSelectionOnChange,
    handleAddTagDialogsOpen,
    handleAddTagDialogsClose,
    handleNewTagOnChange,
    handleNewTagSave,

    //***Start ErrorPopover */
    customPopoverOpen,
    popoverMessage,
    popoverAnchorEl,
    popoverType,
    handlePopoverClose,
    //***End ErrorPopover */
  };
};
