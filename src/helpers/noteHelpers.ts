import type { Tag, Note } from "../types/index";

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

export const findTagById = (tagId: string, allTags: Tag[]) => {
  return allTags.find((tag) => tag.id === tagId);
};

export const filterNotesByQuery = (searchQuery: string, allNotes: Note[]) => {
  return allNotes.filter((note) =>
    note.title.toLocaleLowerCase().includes(searchQuery.toLocaleLowerCase())
  );
};

export const findNoteById = (noteId: string, allNotes: Note[]) => {
  return allNotes.find((note) => note.id === noteId);
};
