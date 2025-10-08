import type { Tag, Note } from "../types/index";
import { useCustomPopover } from "../hooks/useCustomPopover";
import type { CustomPopoverState } from "../hooks/useCustomPopover";
import { TAG_VALIDATION_MESSAGES } from "../constants/messages";
import { v4 as uuidv4 } from "uuid";

export const findTagById = (tagId: string, allTags: Tag[]) => {
  return allTags.find((tag) => tag.id === tagId);
};

// This findNoteTagsByIds function according a Tag Id string [],
// to find the label of each Id ,and return type is Tag[]
export const findTagsByIds = (noteTagIds: string[], allTags: Tag[]) => {
  const foundTags = noteTagIds.map((tagId) =>
    allTags.find((tag) => tag.id === tagId)
  );

  return foundTags.filter(
    (foundTag): foundTag is Tag => foundTag !== undefined
  );
};

export const getTagLabelsByIds = (
  noteTagIds: string[],
  allTags: Tag[]
): string[] => {
  // First, find the Tag objects that match the noteTagIds.
  const foundTags = noteTagIds
    .map((tagId) => allTags.find((tag) => tag.id === tagId))
    .filter((foundTag): foundTag is Tag => foundTag !== undefined);

  // Then, map the found Tag objects to their labels (names).
  return foundTags.map((tag) => tag.label);
};

export const removeTagById = (tagId: string, allTags: Tag[]): Tag[] => {
  return allTags.filter((tag) => tag.id !== tagId);
};

export const findNoteById = (noteId: string, allNotes: Note[]) => {
  return allNotes.find((note) => note.id === noteId);
};

export const newTagValidation = (
  tag: string,
  allTags: Tag[]
): string | null => {
  const cleanTag = tag.trim();

  if (!cleanTag) {
    return TAG_VALIDATION_MESSAGES.WHITESPACE;
  }

  if (cleanTag.length < 3) {
    return TAG_VALIDATION_MESSAGES.MIN_LENGTH;
  }

  if (cleanTag.length > 20) {
    return TAG_VALIDATION_MESSAGES.MAX_LENGTH;
  }

  if (allTags.some((tag) => tag.label === cleanTag)) {
    return TAG_VALIDATION_MESSAGES.ALREADY_EXIST;
  }

  return null;
};

export const getTagIdsBySearchQuery = (searchQuery: string, allTags: Tag[]) => {
  const lowerCaseSearchQuery = searchQuery.toLocaleLowerCase();
  return allTags
    .filter((tag) =>
      tag.label.toLocaleLowerCase().includes(lowerCaseSearchQuery)
    )
    .map((tag) => tag.id);
};

export const filterNotesByQuery = (
  searchQuery: string,
  allNotes: Note[],
  allTags: Tag[]
) => {
  const lowerCaseSearchQuery = searchQuery.toLocaleLowerCase();

  const machedTagIds = getTagIdsBySearchQuery(lowerCaseSearchQuery, allTags);

  return allNotes.filter((note) => {
    const titleMatch = note.title
      .toLocaleLowerCase()
      .includes(lowerCaseSearchQuery);
    const contentMatch = note.content
      .toLocaleLowerCase()
      .includes(lowerCaseSearchQuery);
    const tagsMatch = note.tags.some((tagId) => machedTagIds.includes(tagId));
    return titleMatch || contentMatch || tagsMatch;
  });
};

export const timeFormat = () => {
  const timeString = new Date().toISOString();
  const datePart = timeString.split("T")[0];
  const timePart = timeString.split("T")[1].slice(0, 8);
  const editTime = `${datePart} ${timePart}`;
  return editTime;
};

/**
 * For function createNewNote, to create a new note
 * @param Partial<Note>: expect an object,
 * and the object is valid of the Note.It don't have to contain all properties of a Note.
 * @returns n new note
 */
export const createNewNote = (changes: Partial<Note>): Note => {
  const newId = uuidv4();

  const editTime = timeFormat();
  const newNote = {
    id: newId,
    title: "New Note",
    content: "",
    tags: [],
    isArchive: false,
    lastEdit: editTime,
    ...changes,
  };

  return newNote;
};

/**
 * For function isEmptyNote
 * @param note a note object, to check if the note is a empty note
 * @returns return boolean
 */

export const isEmptyNote = (note: Note) => {
  return (
    note.title === "New Note" &&
    note.content.trim() === "" &&
    note.tags.length === 0
  );
};

/**
 * For function findAndModifyNote
 * @param noteId: The note need to be modified.
 * @param allNotes: The array of the notes
 * @param updates: An object containing the properties need to be updated
 * @returns A new array with formath Note[] with the modified note
 */
export const findAndModifyNote = (
  noteId: string,
  allNotes: Note[],
  updates: Partial<Note>
): Note[] => {
  return allNotes.map((note) => {
    if (note.id === noteId) {
      return { ...note, ...updates };
    }
    return note;
  });
};

export const removeTagFromNotesByTagId = (
  tagId: string,
  allNotes: Note[]
): Note[] => {
  return allNotes.map((note) => {
    const updatedTags = note.tags.filter((id) => id !== tagId);
    return { ...note, tags: updatedTags };
  });
};

interface ActionMessageConfig {
  loadingMessage: string;
  successMessage: string;
  errorMessage: string;
}

export const handleAsyncAction = async (
  action: (id: string) => Promise<boolean>,
  id: string,
  event: React.MouseEvent<HTMLElement>,
  popoverManager: ReturnType<typeof useCustomPopover>,
  messageConfig: ActionMessageConfig
) => {
  const { showPopover } = popoverManager;
  const { loadingMessage, successMessage, errorMessage } = messageConfig;
  const anchorElReference = event.currentTarget;

  // show loading popover
  const loadingPopoverState: CustomPopoverState = {
    message: loadingMessage,
    type: "info",
    anchorEl: anchorElReference,
  };
  showPopover(loadingPopoverState);

  // wait the action to complete
  try {
    const isSuccess = await action(id);
    if (isSuccess) {
      const successState: CustomPopoverState = {
        message: successMessage,
        type: "success",
        anchorEl: anchorElReference,
      };
      showPopover(successState);
    } else {
      const errorState: CustomPopoverState = {
        message: errorMessage,
        type: "error",
        anchorEl: anchorElReference,
      };
      showPopover(errorState);
    }
  } catch (error) {
    const otherErrorMessage =
      error instanceof Error ? error.message : "An unknown error occurred.";
    const otherErrorState: CustomPopoverState = {
      message: otherErrorMessage,
      type: "error",
      anchorEl: anchorElReference,
    };
    showPopover(otherErrorState);
  }
};

/**
 * For function handleNoteStateChanges to handle all note detail changes if there is a note selected
 * to create a new note if there is no note selected.
 * @param prevNotes the array of all note.
 * @param selectedNoteId the selected note id to indecate which note have changes.
 * @param changes: some changes from the note.
 * @returns updatedNotes which is Note[], newSelectedNoteId string or null.
 */
export const handleNoteStateChanges = (
  prevNotes: Note[],
  selectedNoteId: string | null,
  changes: Partial<Note>
): { updatedNotes: Note[]; newSelectedNoteId: string | null } => {
  if (selectedNoteId) {
    const noteIndex = prevNotes.findIndex((note) => note.id === selectedNoteId);
    if (noteIndex !== -1) {
      const updatedNote = {
        ...prevNotes[noteIndex],
        ...changes,
      };

      const updatedNotes = [
        ...prevNotes.slice(0, noteIndex),
        updatedNote,
        ...prevNotes.slice(noteIndex + 1),
      ];

      return { updatedNotes, newSelectedNoteId: selectedNoteId };
    } else {
      return { updatedNotes: prevNotes, newSelectedNoteId: selectedNoteId };
    }
  } else {
    const newNote = createNewNote(changes);
    const updatedNotes = [...prevNotes, newNote];
    return { updatedNotes, newSelectedNoteId: newNote.id };
  }
};

/**
 * For function updateNoteByNoteId
 * @param prevNote the array of all notes
 * @param noteId  the note id which need to be updated
 * @param updateNoteDetails a function and accept one param, note object,
 * for update the modified note
 * @returns return the array of all notes
 */

export const updateNoteByNoteId = (
  prevNotes: Note[],
  noteId: string,

  /* This updateNoteDetails is a function to update the note object */
  updateNoteDetails: (note: Note) => Note
): Note[] => {
  const noteIndex = prevNotes.findIndex((note) => note.id === noteId);

  if (noteIndex !== -1) {
    const updatedNote = updateNoteDetails(prevNotes[noteIndex]);

    return [
      ...prevNotes.slice(0, noteIndex),
      updatedNote,
      ...prevNotes.slice(noteIndex + 1),
    ];
  }

  return prevNotes;
};
