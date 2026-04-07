const TAG_LENGTH_LIMITS = {
  MIN: 3,
  MAX: 20
};

export const TAG_VALIDATION_MESSAGES = {
  EMPTY: "Tag name cannot be empty.",
  DUPLICATE: "This tag already exists.",
  TOO_SHORT: `Tag must be at least ${TAG_LENGTH_LIMITS.MIN} characters long.`,
  TOO_LONG: `Tag cannot exceed ${TAG_LENGTH_LIMITS.MAX} characters.`,
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
} as const;

export const TAG_ACTION_MESSAGE = {
  DELETE: {
    loadingMessage: "Tag Deleting...",
    successMessage: "Tag Delete Successful!",
    errorMessage: "Tag Delete Failed.",
  },
} as const;
