import type { Tag, Note } from "../../types";
import NoteCard from "../NoteCard/index";
import { findTagsByIds } from "../../helpers/noteHelpers";

interface NoteBrifeViewProps {
  notes: Note[];
  handleNoteCardClick: (noteId: string) => void;
  selectedNoteId: string | null;
  allTags: Tag[];
}

const NoteBrifeView = ({
  notes,
  handleNoteCardClick,
  selectedNoteId,
  allTags,
}: NoteBrifeViewProps) => {
  return (
    <>
      {notes.map((note) => {
        return (
          <NoteCard
            id={note.id}
            key={note.id}
            title={note.title}
            lastedit={note.lastEdit}
            tags={findTagsByIds(note.tags, allTags)}
            noteStatus={note.isArchive}
            onNoteCardClick={() => handleNoteCardClick(note.id)}
            isSelected={note.id === selectedNoteId}
          />
        );
      })}
    </>
  );
};
export default NoteBrifeView;
