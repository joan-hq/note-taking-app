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

interface NoteDetailProps {
  selectedNoteId: string | null;
  allNotes: Note[];
  allTags: Tag[];

  //**Header Params */
  handleTitleOnChange: (event: React.ChangeEvent<HTMLInputElement>) => void;

  handleTagsChangeFromNote: (
    event: React.ChangeEvent<HTMLElement>,
    newTags: Tag[]
  ) => void;
  handleNewTagSave: (newTag: Tag) => void;

  //**Content Params*/
  handleContentOnChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleTagDeleteFromNote: (tagId: string) => void;
}

const NoteDetail = ({
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
}: NoteDetailProps) => {
  let noteToDisplay: Note | null = null;

  if (selectedNoteId) {
    noteToDisplay = findNoteById(selectedNoteId, allNotes) ?? null;
  } else {
    noteToDisplay = createNewNote({});
  }

  if (!noteToDisplay) {
    return <Box sx={{ p: 4, textAlign: "center" }}>Note not found.</Box>;
  }

  const noteTags = findTagsByIds(noteToDisplay.tags, allTags);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 5 }}>
      <NoteDetailHeader
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

export default NoteDetail;
