import type { Note, Tag } from "../types/index";

export const tags: Tag[] = [
  { id: "1", label: "dev" },
  { id: "2", label: "travel" },
  { id: "3", label: "study" },
  { id: "4", label: "food" },
];

export const notes: Note[] = [
  {
    id: "1",
    title: "The First Note",
    tags: ["dev", "food", "code"],
    lastEdit: "26 Jun 2025",
    content: "This is the content of the first note.",
    archive: true,
  },
  {
    id: "2",
    title: "The second Note",
    tags: ["food", "location", "test"],
    lastEdit: "26 March 2025",
    content: "This is the content of the second note.",
    archive: false,
  },
  {
    id: "3",
    title: "The Third Note",
    tags: ["food", "location", "test"],
    lastEdit: "26 March 2025",
    content: "This is the content of the Third note.",
    archive: true,
  },
  {
    id: "4",
    title: "The fourth Note",
    tags: ["food", "location", "test"],
    lastEdit: "12 March 2025",
    content: "This is the content of the fourth note.",
    archive: true,
  },
  {
    id: "5",
    title: "The fifth Note",
    tags: ["food", "location", "test"],
    lastEdit: "14 March 2025",
    content: "This is the content of the fifth note.",
    archive: true,
  },
  {
    id: "6",
    title: "The sixth Note",
    tags: ["food", "location", "test"],
    lastEdit: "15 March 2025",
    content: "This is the content of the sixth note.",
    archive: true,
  },
];
