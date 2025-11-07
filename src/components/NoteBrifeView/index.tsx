import NoteCard from "../NoteCard/index";
import { findTagsByIds } from "../../helpers/noteHelpers";
import { useNoteContext } from "../../contexts/NoteProvider";

const NoteBrifeView = () => {
  const { tags, notes, search } = useNoteContext();

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
            isSelected={note.id === notes.selectedNoteId}
          />
        );
      })}
    </>
  );
};
export default NoteBrifeView;
