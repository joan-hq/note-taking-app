import { Box } from "@mui/material";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import NoteDetailHeader from "../components/NoteDetail/NoteDetailHeader";
import NoteDetailContent from "../components/NoteDetail/NoteDetailContent";
import { findTagsByIds, findNoteById } from "../helpers/noteHelpers";
import { useNoteContext } from "../contexts/NoteProvider";
import { formatNoteDate } from "../utils/formateDate";

const NoteViewer = () => {
  const { notes, tags, editors } = useNoteContext();

  const { noteId: noteIdFromParams } = useParams<{ noteId: string }>();

  const noteIdFromContext = notes.selectedNoteId;

  const displayNoteId = noteIdFromParams ?? noteIdFromContext;

  const noteToDisplay = displayNoteId
    ? findNoteById(displayNoteId, notes.allNotes)
    : null;

  useEffect(() => {
    if (noteIdFromParams && noteIdFromParams !== notes.selectedNoteId) {
      notes.handleNoteCardClick(noteIdFromParams);
    }
  }, [noteIdFromParams, notes.selectedNoteId, notes.handleNoteCardClick]);

  if (!noteToDisplay) {
    if (!noteIdFromParams) {
      return (
        <Box sx={{ p: 4, textAlign: "center", color: "text.secondary" }}>
          Select a note to view, or create a new one.
        </Box>
      );
    }

    return <Box sx={{ p: 4, textAlign: "center" }}>Note not found.</Box>;
  }

  const noteTags = findTagsByIds(noteToDisplay.tags, tags.allTags);
  const formattedTime = formatNoteDate(noteToDisplay.lastEdit);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 5 }}>
      <NoteDetailHeader
        key={`${noteToDisplay.id}-header`}
        title={noteToDisplay.title}
        handleTitleOnChange={editors.handleTitleOnChange}
        options={tags.allTags}
        noteTags={noteTags}
        handleTagsChangeFromNote={editors.handleTagsChangeFromNote}
        handleTagDeleteFromNote={editors.handleTagDeleteFromNote}
        handleNewTagSave={editors.handleNewTagSave}
        time={formattedTime}
      />

      <NoteDetailContent
        key={`${noteToDisplay.id}-content`}
        noteValue={noteToDisplay.content}
        handleContentOnChange={editors.handleContentOnChange}
      />
    </Box>
  );
};

export default NoteViewer;
