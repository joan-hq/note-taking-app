import { Box, Grid } from "@mui/material";

import NoteDetailHeader from "../components/NoteDetail/NoteDetailHeader";
import NoteDetailContent from "../components/NoteDetail/NoteDetailContent";
import NoteDetailAction from "../components/NoteDetail/NoteDetailAction";
import type { Tag, Note } from "../types/index";
import { tags } from "../data/note";
import {
  findTagsByIds,
  getTagLabelsByIds,
  findNoteById,
} from "../helpers/noteHelpers";

interface NoteDetailProps {
  selectedNoteId: string;
  allNotes: Note[];
  allTags: Tag[];

  //**Header Params */
  // title:

  handleExistNoteTitleOnChange: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;

  handleTagsChangeFromNote: (
    event: React.ChangeEvent<HTMLElement>,
    newTags: Tag[]
  ) => void;
  handleNewTagSave: (newTag: Tag) => void;

  //**Content Params*/
  handleContentOnChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleTagDeleteFromNote: (tagId: string) => void;

  //**Action Params */
  handleNoteEditSave: (
    event:
      | React.MouseEvent<HTMLButtonElement>
      | React.FormEvent<HTMLFormElement>
  ) => void;
  handleNoteEditCancel: () => void;
}

const NoteDetail = ({
  selectedNoteId,
  allNotes,
  allTags,

  //**Header Params */
  handleExistNoteTitleOnChange,
  //options,
  // noteTags,
  handleTagsChangeFromNote,
  handleTagDeleteFromNote,
  handleNewTagSave,

  //**Content Params*/

  handleContentOnChange,
  //**Action Params */
  handleNoteEditSave,
  handleNoteEditCancel,
}: NoteDetailProps) => {
  const selectedNote = findNoteById(selectedNoteId, allNotes);
  if (!selectedNote) {
    return <Box sx={{ p: 4, textAlign: "center" }}>Note not found.</Box>;
  }
  const existNoteTagLabels = getTagLabelsByIds(selectedNote.tags, tags);
  // console.log("existNoteTagLabels", existNoteTagLabels);
  const noteTags = findTagsByIds(selectedNote.tags, allTags);

  return (
    <>
      <NoteDetailHeader
        title={selectedNote.title}
        handleTitleOnChange={handleExistNoteTitleOnChange}
        options={allTags}
        noteTags={noteTags}
        handleTagsChangeFromNote={handleTagsChangeFromNote}
        handleTagDeleteFromNote={handleTagDeleteFromNote}
        handleNewTagSave={handleNewTagSave}
        time={selectedNote.lastEdit}
      />

      <NoteDetailContent
        noteValue={selectedNote.content}
        handleContentOnChange={handleContentOnChange}
      />
      <NoteDetailAction
        handleNoteEditSave={handleNoteEditSave}
        handleNoteEditCancel={handleNoteEditCancel}
      />
    </>
  );
};

export default NoteDetail;
