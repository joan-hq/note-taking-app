import { Box, Grid, Paper, styled } from "@mui/material";
import TagManagement from "./TagManagement";
import NoteStatusFilter from "../components/NoteActions/StatusFilter";
import NoteFilterResultsTitle from "../components/NoteFilterResultsTitle";

import NoteList from "./NoteList"; // 中间栏
import NoteDetail from "./NoteDetail"; // 右栏
import ActionBar from "../components/NoteActions/ActionBar"; // 右栏，只包含 archive 和 delete

import { useNote } from "../hooks/useNote";

interface NoteLayoutProps {}

const StyledPaper = styled(Paper)(({ theme }) => ({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  padding: theme.spacing(2),
}));

const NoteLayout = () => {
  //   const [selectedNote, setSelectedNote] = useState<string | null>(null);

  const {
    noteFilterTitle,
    handleShowAllNote,
    handleShowArchivedNote,

    allTags,
    handleTagDelete,
    selectedTagId,
    handleTagClick,
    handleClearTagFilter,

    allNotes,
    filterType,
    handleNewNoteClick,
    handleNoteCardClick,

    selectedNoteId,
    handleArchiveNote,
    handleUnrchiveNote,
    handleDeleteNote,

    handleTitleOnChange,
    handleNewTagSave,
    handleTagsChangeFromNote,
    handleTagDeleteFromNote,
    handleContentOnChange,
  } = useNote();

  return (
    <Box className="flex-grow p-4 h-screen overflow-hidden">
      <Grid container spacing={4} className="h-full">
        {/* left: filter and Tag management */}
        <Grid item xs={12} sm={3} md={2}>
          <NoteStatusFilter
            filterType={filterType}
            handleShowAllNote={handleShowAllNote}
            handleShowArchivedNote={handleShowArchivedNote}
          />
          <Box className="flex-grow overflow-y-auto min-h-0">
            <TagManagement
              allTags={allTags}
              onTagDeleted={handleTagDelete}
              selectedTagId={selectedTagId}
              handleTagClick={handleTagClick}
              handleClearTagFilter={handleClearTagFilter}
            />
          </Box>
        </Grid>

        {/* middle: brife view and action */}
        <Grid item xs={12} sm={9} md={4} className="flex flex-col h-full">
          <NoteFilterResultsTitle title={noteFilterTitle} />

          <Box className="flex-grow overflow-y-auto min-h-0">
            <NoteList
              selectedNoteId={selectedNoteId}
              allNotes={allNotes}
              filterType={filterType}
              handleNewNoteClick={handleNewNoteClick}
              handleNoteCardClick={handleNoteCardClick}
              allTags={allTags}
              selectedTagId={selectedTagId}
            />
          </Box>
        </Grid>

        {/* right: note details and action button */}
        <Grid item xs={12} md={6} className="relative flex flex-col h-full">
          {/* archive and delete button */}

          <Box className="flex-grow overflow-y-auto pt-16">
            <NoteDetail
              allNotes={allNotes}
              allTags={allTags}
              selectedNoteId={selectedNoteId}
              handleTagsChangeFromNote={handleTagsChangeFromNote}
              handleTagDeleteFromNote={handleTagDeleteFromNote}
              handleTitleOnChange={handleTitleOnChange}
              handleNewTagSave={handleNewTagSave}
              handleContentOnChange={handleContentOnChange}
            />
          </Box>

          <Box className="absolute top-2 right-2 z-10 p-2">
            <ActionBar
              allNotes={allNotes}
              filterType={filterType}
              selectedNoteId={selectedNoteId}
              handleArchiveNote={handleArchiveNote}
              handleUnrchiveNote={handleUnrchiveNote}
              handleDeleteNote={handleDeleteNote}
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default NoteLayout;
