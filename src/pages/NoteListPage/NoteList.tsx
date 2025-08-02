import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import NoteListSidebar from "./NoteListSideBar";
import NoteListContent from "./NoteListContent";
import { useNoteList } from "../../hooks/useNoteList";

const NoteList = () => {
  const {
    selectedNote,
    notes,
    filterType,
    handleShowAllNote,
    handleShowArchivedNote,
    handleShowActiveNote,
    handleNewNote,
    handleArchive,
    handleUnarchive,
    handleDelete,
    handleNoteClick,
    handleNoteSave,
  } = useNoteList();

  return (
    <Box>
      <Grid container spacing={0}>
        <Grid size={{ xs: 12, md: 2, lg: 2 }}>
          <NoteListSidebar
            handleShowAllNote={handleShowAllNote}
            handleShowArchivedNote={handleShowArchivedNote}
            handleShowActiveNote={handleShowActiveNote}
            currentPageFilter={filterType}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 10, lg: 10 }}>
          <NoteListContent
            handleNewNote={handleNewNote}
            handleArchive={handleArchive}
            handleDelete={handleDelete}
            handleNoteClick={handleNoteClick}
            notes={notes}
            selectedNote={selectedNote}
            handleNoteSave={handleNoteSave}
            filterType={filterType}
            handleUnrchive={handleUnarchive}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default NoteList;
