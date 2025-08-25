import { tags } from "../../data/note";
import type { Tag, Note } from "../../types";
import NoteCard from "../NoteCard/index";
import { findNoteTagsByIds } from "../../helpers/tagHelpers";

interface NoteBrifeViewProps {
  notes: Note[];
  onNoteCardClick: (id: string) => void;
}

const NoteBrifeView = ({ notes, onNoteCardClick }: NoteBrifeViewProps) => {
  return (
    <>
      {notes.map((note) => {
        return (
          <NoteCard
            key={note.id}
            title={note.title}
            lastedit={note.lastEdit}
            tags={findNoteTagsByIds(note.tags, tags)}
            noteStatus={note.archive}
            onNoteCardClick={() => onNoteCardClick(note.id)}
          />
        );
      })}
    </>
  );
};
export default NoteBrifeView;
