import { Box, Grid } from "@mui/material";

import NoteDetailHeader from "../components/NoteDetail/NoteDetailHeader";
import NoteDetailContent from "../components/NoteDetail/NoteDetailContent";
import NoteDetailAction from "../components/NoteDetail/NoteDetailAction";
import type { Tag, Note } from "../types/index";
import { tags } from "../data/note";
import {
  findTagsByIds,
  findNoteById,
  createNewNote,
} from "../helpers/noteHelpers";
import { useNoteContext } from "../contexts/NoteProvider";

const NoteDetail = () => {
  const { notes, tags, editors } = useNoteContext();
  const noteToDisplay = notes.selectedNoteId
    ? findNoteById(notes.selectedNoteId, notes.allNotes) ?? null
    : null;

  if (!noteToDisplay) {
    return <Box sx={{ p: 4, textAlign: "center" }}>Note not found.</Box>;
  }

  const noteTags = findTagsByIds(noteToDisplay.tags, tags.allTags);
  console.log("NoteDetail-noteToDisplay-title", noteToDisplay.title);
  console.log("NoteDetail-noteToDisplay-noteTags", noteTags);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 5 }}>
      <NoteDetailHeader
        key={noteToDisplay.id}
        title={noteToDisplay.title}
        handleTitleOnChange={editors.handleTitleOnChange}
        options={tags.allTags}
        noteTags={noteTags}
        handleTagsChangeFromNote={editors.handleTagsChangeFromNote}
        handleTagDeleteFromNote={editors.handleTagDeleteFromNote}
        handleNewTagSave={editors.handleNewTagSave}
        time={noteToDisplay.lastEdit}
      />

      <NoteDetailContent
        noteValue={noteToDisplay.content}
        handleContentOnChange={editors.handleContentOnChange}
      />
    </Box>
  );
};

export default NoteDetail;
