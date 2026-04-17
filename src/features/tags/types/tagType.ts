export interface Tag {
  readonly id: string;
  label: string;
  color?: string | null
}

export type TagUpdatePayload = Partial <Omit<Tag, 'id' >>;