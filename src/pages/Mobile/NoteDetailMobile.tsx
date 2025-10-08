import { Box } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";

import NoteDetailHeader from "../../components/NoteDetail/NoteDetailHeader";
import NoteDetailContent from "../../components/NoteDetail/NoteDetailContent";
import NoteActionBarMobile from "./NoteActionBarMobile";
import { useNoteContext } from "../../contexts/NoteProvider";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useState } from "react";
import { Popover } from "@mui/material";

import type { Note } from "../../types/index";
import {
  findTagsByIds,
  findNoteById,
  createNewNote,
} from "../../helpers/noteHelpers";

const NoteDetailMobile = () => {
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
  const { id: urlNoteId } = useParams();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | SVGSVGElement | null>(
    null
  );

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

  const handleBackToMobileLayout = () => {
    return navigate("/note");
  };

  const handleShowActionBar = (event: React.MouseEvent<SVGSVGElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleHideActionBar = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  console.log("****TO Note Note Detail + selectedNoteId", noteIdToDisplay);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 5 }}>
      <ChevronLeftIcon className=" " onClick={handleBackToMobileLayout} />
      <MoreHorizIcon
        className="fixed top-6 right-6"
        onClick={handleShowActionBar}
      />
      <div>
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
      </div>

      {open && (
        <div>
          <Popover
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={open}
            onClick={handleHideActionBar}
          >
            <Box>
              <NoteActionBarMobile selectedNoteId={noteIdToDisplay} />
            </Box>
          </Popover>
        </div>
      )}
    </Box>
  );
};

export default NoteDetailMobile;
