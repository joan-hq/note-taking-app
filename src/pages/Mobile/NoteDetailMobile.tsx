import { Box, Grid } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";

import NoteDetailHeader from "../../components/NoteDetail/NoteDetailHeader";
import NoteDetailContent from "../../components/NoteDetail/NoteDetailContent";
import NoteDetailAction from "../../components/NoteDetail/NoteDetailAction";
import { useNoteContext } from "../../contexts/NoteProvider";

import type { Tag, Note } from "../../types/index";
import {
  findTagsByIds,
  findNoteById,
  createNewNote,
} from "../../helpers/noteHelpers";

const NoteDetailMobile = () => {
  const { id: urlNoteId } = useParams();
  const navigate = useNavigate();
  const {
    selectedNoteId,
    allNotes,
    allTags,

    //**Header Params */
    handleTitleOnChange,
    handleTagsChangeFromNote,
    handleTagDeleteFromNote,
    handleNewTagSave,

    //**Content Params*/
    handleContentOnChange,
  } = useNoteContext();

  const noteIdToDisplay = urlNoteId || selectedNoteId;

  let noteToDisplay: Note | null = null;
  console.log("NoteDetail-selectedNoteId", noteIdToDisplay);

  if (noteIdToDisplay) {
    noteToDisplay = findNoteById(noteIdToDisplay, allNotes) ?? null;
  }

  if (!noteToDisplay && noteIdToDisplay) {
    return (
      <Box sx={{ p: 4, textAlign: "center" }}>
        Note not found (ID: {noteIdToDisplay}).
      </Box>
    );
  }

  if (!noteToDisplay && !noteIdToDisplay) {
    noteToDisplay = createNewNote({});
    if (noteToDisplay && noteToDisplay.id) {
      navigate(`/note/${noteToDisplay.id}`, { replace: true });
      return null;
    }
  }

  if (!noteToDisplay) {
    return (
      <Box sx={{ p: 4, textAlign: "center" }}>
        Note cannot be created or found.
      </Box>
    );
  }

  const noteTags = findTagsByIds(noteToDisplay.tags, allTags);
  console.log("NoteDetail-noteToDisplay-title", noteToDisplay.title);
  console.log("NoteDetail-noteToDisplay-noteTags", noteTags);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 5 }}>
      <NoteDetailHeader
        key={noteToDisplay.id}
        title={noteToDisplay.title}
        handleTitleOnChange={handleTitleOnChange}
        options={allTags}
        noteTags={noteTags}
        handleTagsChangeFromNote={handleTagsChangeFromNote}
        handleTagDeleteFromNote={handleTagDeleteFromNote}
        handleNewTagSave={handleNewTagSave}
        time={noteToDisplay.lastEdit}
      />

      <NoteDetailContent
        noteValue={noteToDisplay.content}
        handleContentOnChange={handleContentOnChange}
      />
    </Box>
  );
};

export default NoteDetailMobile;
