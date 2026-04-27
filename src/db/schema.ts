import { pgTable, uuid, text, timestamp, primaryKey,pgEnum } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const noteStatusEnum = pgEnum("note_status", ["active", "archived", "trashed"]);

export const notes = pgTable("notes", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: text("title").notNull().default(''),
  content: text("content").notNull().default(''),
  status: noteStatusEnum("status").default("active").notNull(),
  createdAt: timestamp("create_at").defaultNow().notNull(),
  lastEdit: timestamp("last_edit").defaultNow().notNull(),
 
});

export const tags = pgTable("tags", {
  id: uuid("id").primaryKey().defaultRandom(),
  label: text("label").notNull().unique(), 
  color: text("color").default("#cbd5e1"),
});

export const noteTags = pgTable("note_tags", {
  noteId: uuid("note_id")
    .notNull()
    .references(() => notes.id, { onDelete: "cascade" }), 
  tagId: uuid("tag_id")
    .notNull()
    .references(() => tags.id, { onDelete: "cascade" }), 
}, (table) => [
  // combined primarykey
  primaryKey({ columns: [table.noteId, table.tagId] }),
]);

