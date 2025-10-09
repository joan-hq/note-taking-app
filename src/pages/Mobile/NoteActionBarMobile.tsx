import ActionBar from "../../components/NoteActions/ActionBar";
import { useNoteContext } from "../../contexts/NoteProvider";

interface NoteActionBarMobileProps {
  selectedNoteId: string | null;
}

const NoteActionBarMobile = ({ selectedNoteId }: NoteActionBarMobileProps) => {
  const {
    allNotes,
    filterType,
    handleDeleteNote,
    handleArchiveNote,
    handleUnrchiveNote,
  } = useNoteContext();
  console.log("****TO Note Action Bar + selectedNoteId", selectedNoteId);
  return (
    <>
      <ActionBar
        allNotes={allNotes}
        filterType={filterType}
        selectedNoteId={selectedNoteId}
        handleArchiveNote={handleArchiveNote}
        handleUnrchiveNote={handleUnrchiveNote}
        handleDeleteNote={handleDeleteNote}
      />
    </>
  );
};

export default NoteActionBarMobile;
