export interface Tag {
  id: string;
  label: string;
}

export interface Note {
  id: string;
  title: string;
  tags: string[];
  lastEdit: string;
  content: string;
  isArchive: boolean;
}

export type FilterType = "all" | "archived";

export type PopoverType = "error" | "success" | "warning" | "info";
