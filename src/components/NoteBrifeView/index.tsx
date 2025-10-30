import NoteCard from "../NoteCard/index";
import { findTagsByIds } from "../../helpers/noteHelpers";
import { useNoteContext } from "../../contexts/NoteProvider";
import { useNavigate } from "react-router-dom";

const NoteBrifeView = () => {
  const { tags, notes, search } = useNoteContext();
  const navigate = useNavigate();

  const onNoteCardClick = (noteId: string) => {
    notes.handleNoteCardClick(noteId);
    navigate(`/note/${noteId}`);
  };
  const sortedNote = [...search.filteredNotes].sort((a, b) => {
    return new Date(b.lastEdit).getTime() - new Date(a.lastEdit).getTime();
  });
  return (
    <>
      {sortedNote.map((note) => {
        return (
          <NoteCard
            id={note.id}
            key={note.id}
            title={note.title}
            lastedit={note.lastEdit}
            tags={findTagsByIds(note.tags, tags.allTags)}
            noteStatus={note.isArchive}
            onNoteCardClick={() => onNoteCardClick(note.id)}
            isSelected={note.id === notes.selectedNoteId}
          />
        );
      })}
    </>
  );
};
export default NoteBrifeView;
