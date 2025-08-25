import type { Tag } from "../types/index";

export const findNoteTagsByIds = (noteTagIds: string[], tags: Tag[]) => {
  const foundTags = noteTagIds.map((tagId) =>
    tags.find((tag) => tag.id === tagId)
  );

  return foundTags.filter(
    (foundTag): foundTag is Tag => foundTag !== undefined
  );
};
