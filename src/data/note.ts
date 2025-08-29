import type { Note, Tag } from "../types/index";

export const tags: Tag[] = [
  { id: "1", label: "dev" },
  { id: "2", label: "travel" },
  { id: "3", label: "study" },
  { id: "4", label: "food" },
  { id: "5", label: "location" },
  { id: "6", label: "test" },
  { id: "7", label: "code" },
];

export const notes: Note[] = [
  {
    id: "1",
    title: "The First Note",
    tags: [],
    lastEdit: "26 Jun 2025",
    content: "This is the content of the first note.",
    isArchive: true,
  },
  {
    id: "2",
    title: "The second Note",
    tags: ["4", "5", "6"],
    lastEdit: "26 March 2025",
    content: "This is the content of the second note.",
    isArchive: false,
  },
  {
    id: "3",
    title: "The Third Note",
    tags: ["3", "2", "4"],
    lastEdit: "26 March 2025",
    content: "This is the content of the Third note.",
    isArchive: true,
  },
  {
    id: "4",
    title: "The fourth Note",
    tags: ["4", "5", "6"],
    lastEdit: "12 March 2025",
    content: "This is the content of the fourth note.",
    isArchive: true,
  },
  {
    id: "5",
    title: "The fifth Note",
    tags: ["4", "2", "3"],
    lastEdit: "14 March 2025",
    content: "This is the content of the fifth note.",
    isArchive: true,
  },
  {
    id: "6",
    title: "The sixth Note",
    tags: ["2", "1", "6"],
    lastEdit: "15 March 2025",
    content: "This is the content of the sixth note.",
    isArchive: true,
  },
];
