import type { Tag, Note } from "../types/index";
import { useCustomPopover } from "../hooks/useCustomPopover";
import type { CustomPopoverState } from "../hooks/useCustomPopover";
import { TAG_VALIDATION_MESSAGES } from "../constants/messages";

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

export const filterNotesByQuery = (searchQuery: string, allNotes: Note[]) => {
  return allNotes.filter((note) =>
    note.title.toLocaleLowerCase().includes(searchQuery.toLocaleLowerCase())
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
    // For each note, create a new 'tags' array by filtering out the specified tagId.
    const updatedTags = note.tags.filter((id) => id !== tagId);

    // Return a new note object with the updated tags array.
    // The spread operator (...) ensures the rest of the note's data remains unchanged.
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

  // show loading popover
  const loadingPopoverState: CustomPopoverState = {
    message: loadingMessage,
    type: "info",
    anchorEl: event.currentTarget,
  };
  showPopover(loadingPopoverState);

  // wait the action to complete
  try {
    const isSuccess = await action(id);
    if (isSuccess) {
      const successState: CustomPopoverState = {
        message: successMessage,
        type: "success",
        anchorEl: event.currentTarget,
      };
      showPopover(successState);
    } else {
      const errorState: CustomPopoverState = {
        message: errorMessage,
        type: "error",
        anchorEl: event.currentTarget,
      };
      showPopover(errorState);
    }
  } catch (error) {
    const otherErrorMessage =
      error instanceof Error ? error.message : "An unknown error occurred.";
    const otherErrorState: CustomPopoverState = {
      message: otherErrorMessage,
      type: "error",
      anchorEl: event.currentTarget,
    };
    showPopover(otherErrorState);
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
  prevNote: Note[],
  noteId: string,

  /* This updateNoteDetails is a function to update the note object */
  updateNoteDetails: (note: Note) => Note
): Note[] => {
  const noteIndex = prevNote.findIndex((note) => note.id === noteId);

  if (noteIndex !== -1) {
    const updatedNote = updateNoteDetails(prevNote[noteIndex]);

    return [
      ...prevNote.slice(0, noteIndex),
      updatedNote,
      ...prevNote.slice(noteIndex + 1),
    ];
  }

  return prevNote;
};
