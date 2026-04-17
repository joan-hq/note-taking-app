export type NoteStatus = 'active' | 'archived' | 'trashed';

export interface Note {
  readonly id: string;
  title: string;
  tags: string[];
  content: string;
  createdAt: string;
  lastEdit: string;
  status: NoteStatus;
}

export type FilterType = NoteStatus | "all";

export type NoteUpdatePayload = Partial <Omit<Note, 'id' | 'createdAt'>>;