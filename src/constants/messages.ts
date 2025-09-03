export const TAG_VALIDATION_MESSAGES = {
  WHITESPACE: "Tag cannot be all spaces.",
  ALREADY_EXIST: "This tag already exists.",
  MIN_LENGTH: "Tag must be at least 3 characters long.",
  MAX_LENGTH: "Tag cannot be longer than 20 characters.",
};

export const SEARCH_WHITESPACE_ERROR_MESSAGE =
  "Search query cannot be all spaces.";

export const ACTION_MESSAGES = {
  UNARCHIVE: {
    loadingMessage: "Unarchiving...",
    successMessage: "Unarchive Successful!",
    errorMessage: "Unarchive Failed. Please select a note.",
  },
  ARCHIVE: {
    loadingMessage: "Archiving...",
    successMessage: "Archive Successful!",
    errorMessage: "Archive Failed. Please select a note.",
  },
  DELETE: {
    loadingMessage: "Deleting...",
    successMessage: "Delete Successful!",
    errorMessage: "Delete Failed. Please select a note.",
  },
};

export const TAG_ACTION_MESSAGE = {
  DELETE: {
    loadingMessage: "Tag Deleting...",
    successMessage: "Tag Delete Successful!",
    errorMessage: "Tag Delete Failed.",
  },
};
