export type NoteStatus = 'active' | 'archived' | 'trashed';

export interface Note {
  readonly id: string;
  userId: string;
  title: string;
  tags: string[];
  content: string;
  createdAt: string;
  lastEdit: string;
  status: NoteStatus;
  type?: "manual" | "ai_summary";
  date?: string;
}

export type FilterType = NoteStatus | "all";

export type NoteUpdatePayload = Partial <Omit<Note, 'id' | 'createdAt'>>;