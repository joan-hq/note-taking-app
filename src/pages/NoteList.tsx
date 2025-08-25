import NoteBrifeView from "../components/NoteBrifeView";

import { notes as Notes, tags } from "../data/note";
import ActionBar from "../components/NoteActions/ActionBar";
import type { FilterType } from "../types/index";

import type { Note } from "../types";

const handleNoteCardClick = () => {
  return window.alert("card clicked");
};

interface NoteListProps {
  filterType: FilterType;

  handleArchiveNote: () => void;
  handleUnrchiveNote: () => void;
  handleDeleteNote: () => void;
}

const NoteList = ({
  handleArchiveNote,
  handleUnrchiveNote,
  handleDeleteNote,
  filterType,
}: NoteListProps) => {
  return (
    <>
      <NoteBrifeView notes={Notes} onNoteCardClick={handleNoteCardClick} />
      <ActionBar
        filterType={filterType}
        handleArchiveNote={handleArchiveNote}
        handleUnrchiveNote={handleUnrchiveNote}
        handleDeleteNote={handleDeleteNote}
      />
    </>
  );
};

export default NoteList;
