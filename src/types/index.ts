export interface Tag {
  id: string;
  label: string;
}

export interface Note {
  id: string;
  title: string;
  tags: string[];
  lastEdit: string; // <-- Standardized to 'lastEdit' (uppercase 'E')
  content: string;
  isArchive: boolean; // Assuming it's always present, not optional, based on usage
}

export type FilterType = "all" | "archived";

export type PopoverType = "error" | "success" | "warning" | "info";
