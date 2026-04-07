import type { Note, Tag } from "../types/index";

export const tags: Tag[] = [
  { id: "project-note-app", label: "Project: Note App" },
  { id: "react", label: "React" },
  { id: "typescript", label: "TypeScript" },
  { id: "ideas", label: "Ideas" },
  { id: "urgent", label: "Urgent" },
  { id: "parenting", label: "Parenting" },
  { id: "shopping-list", label: "Shopping List" },
  { id: "recipes", label: "Recipes" },
  { id: "work", label: "Work" },
  { id: "travel", label: "Travel" },
];

export const notes: Note[] = [
  {
    id: "1",
    title: "React Context API Bug",
    tags: ["project-note-app", "react", "typescript", "urgent"],
    lastEdit: "2025-11-06T14:30:00.000Z",
    content:
      "The <strong>NoteProvider</strong> isn't updating the view on mobile when the URL changes. The `useEffect` hook in `NoteLayout.tsx` isn't firing correctly. Need to check dependencies.",
    isArchive: false,
  },
  {
    id: "2",
    title: "Groceries for this week",
    tags: ["shopping-list", "parenting"],
    lastEdit: "2025-11-05T09:15:00.000Z",
    content:
      "<ul><li>Milk</li><li>Eggs</li><li>Apples (for the kids)</li><li>Coffee</li></ul>",
    isArchive: false,
  },
  {
    id: "3",
    title: "Chicken Noodle Soup Recipe",
    tags: ["recipes"],
    lastEdit: "2025-10-30T18:00:00.000Z",
    content:
      "<h2>Ingredients:</h2><p>Onion, Celery, Carrots, Chicken breast, Egg noodles...</p><p>Remember to buy chicken broth!</p>",
    isArchive: false,
  },
  {
    id: "4",
    title: "App Feature Ideas",
    tags: ["project-note-app", "ideas"],
    lastEdit: "2025-10-22T11:00:00.000Z",
    content:
      "1. Add Markdown support.\n2. Implement a rich text editor (Quill/Tiptap).\n3. Add tag-based filtering.\n4. Mobile-responsive layout.",
    isArchive: false,
  },
  {
    id: "5",
    title: "Archived: Old Project Credentials",
    tags: ["work"],
    lastEdit: "2025-09-15T10:00:00.000Z",
    content: "Login: admin@oldproject.com\nPass: **********",
    isArchive: true,
  },
  {
    id: "6",
    title: "Lake Tahoe Trip Planning",
    tags: ["travel", "parenting"],
    lastEdit: "2025-11-03T14:20:00.000Z",
    content:
      "Remember to pack snow clothes for the boys. Check if the cabin has a high chair.",
    isArchive: false,
  },
  {
    id: "7",
    title: "Empty Note",
    tags: [],
    lastEdit: "2025-11-06T13:00:00.000Z",
    content: "",
    isArchive: false,
  },
];
