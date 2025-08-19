import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import type { Note, Tag } from "../../types/index"; // Importing the Note type
import NoteHeader from "./NoteDetailHead";
import NoteBody from "./NoteDetailBody";
import NoteAction from "./NoteDetailAction";
import { useNoteForm } from "../../hooks/useNoteFrom";
import { useParams } from "react-router-dom";

interface NoteDetailProps {
  selectedNote: Note | null;
  onNoteSave: (note: Note) => void;
  onTagAdd: (newTag: Tag) => void;
  availableTags: Tag[];
  //allNote: Note[];
}
const NoteDetail = ({
  // allNote,
  selectedNote,
  onNoteSave,
  onTagAdd,
  availableTags,
}: NoteDetailProps) => {
  // const { eachNoteId } = useParams();
  // const selectedNote = allNote.find((note) => note.id === eachNoteId) || null;

  const {
    noteId,
    titleInput,
    //tagInput,

    //availableTags,
    selectedTags,
    time,
    noteInput,

    handleTitleOnChange,
    handleNoteOnChange,
    handleSave,
    handleCancel,
    //****start tag params and function
    addTagDialogs,
    newTagValue,
    handleTagSelectionOnChange,
    handleAddTagDialogsOpen,
    handleAddTagDialogsClose,
    handleNewTagOnChange,
    handleNewTagSave,
    handleSelectedTagsChange,
    //****end tag params and function

    //***start ErrorPopover */
    customPopoverOpen,
    popoverMessage,
    popoverAnchorEl,
    popoverType,
    handlePopoverClose,
    //***end ErrorPopover */
  } = useNoteForm(selectedNote, onNoteSave, onTagAdd, availableTags);
  // if (!selectedNote && eachNoteId) {
  //   return <h1>Note Not Found</h1>;
  // }

  return (
    <Box
      id={noteId}
      sx={{
        flexGrow: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        width: "100vw",
      }}
    >
      <Grid
        container
        spacing={2}
        sx={{
          // maxWidth: "800px", // Optional: Limit the maximum width of your note content
          width: "100%", // Ensures the Grid takes available width within the Box
          padding: "0px 20px", // Add some internal padding to the grid
          // boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", // Optional: Add a subtle shadow
          // borderRadius: "8px", // Optional: Rounded corners
          // backgroundColor: "white", // Optional: Background for the note container
        }}
      >
        {/* Note Header */}
        {/* <Grid item xs={12} md={12} lg={12}> */}
        <Grid size={{ xs: 12, md: 12, lg: 12 }}>
          <NoteHeader
            options={availableTags}
            value={titleInput}
            handleTitleOnChange={handleTitleOnChange}
            title={titleInput}
            time={time}
            addTagDialogs={addTagDialogs}
            selectedTags={selectedTags}
            newTagValue={newTagValue}
            handleTagSelectionOnChange={handleTagSelectionOnChange}
            handleSelectedTagsChange={handleSelectedTagsChange}
            handleAddTagDialogsOpen={handleAddTagDialogsOpen}
            handleAddTagDialogsClose={handleAddTagDialogsClose}
            handleNewTagOnChange={handleNewTagOnChange}
            handleNewTagSave={handleNewTagSave}
            //start ErrorPopover
            customPopoverOpen={customPopoverOpen}
            popoverMessage={popoverMessage}
            popoverAnchorEl={popoverAnchorEl}
            popoverType={popoverType}
            handlePopoverClose={handlePopoverClose}
            //End ErrorPopover

            //selectedTags={selectedTags}
            //onTagsChange={handleSelectedTagsChange}
          />
        </Grid>

        {/* Note Body */}
        <Grid
          sx={{ minHeight: "800px", height: "100%" }}
          size={{ xs: 12, md: 12, lg: 12 }}
        >
          <NoteBody
            handleNoteOnChange={handleNoteOnChange}
            notevalue={noteInput}
          />
        </Grid>

        {/* Note Action */}
        <Grid size={{ xs: 12, md: 12, lg: 12 }}>
          <NoteAction handleSave={handleSave} handleCancel={handleCancel} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default NoteDetail;
