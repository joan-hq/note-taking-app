import { Box, Grid, Paper, styled } from "@mui/material";
import TagManagement from "./TagManagement";
import NoteFilterResultsTitle from "../components/NoteFilterResultsTitle";
import NoteStatusFilter from "../components/NoteActions/StatusFilter";
import NoteList from "./NoteList"; // 中间栏
import NoteDetail from "./NoteDetail"; // 右栏
import ActionBar from "../components/NoteActions/ActionBar"; // 右栏，只包含 archive 和 delete

import { useNote } from "../hooks/useNote";
import { useDialog } from "../hooks/useDialog";

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
    handleShowAllNote,
    handleShowArchivedNote,

    allTags,
    handleTagDelete,

    allNotes,
    filterType,
    handleNewNoteClick,
    handleNoteCardClick,

    selectedNoteId,
    handleArchiveNote,
    handleUnrchiveNote,
    handleDeleteNote,

    handleExistNoteTitleOnChange,
    handleNewTagSave,
    handleTagsChangeFromNote,
    handleTagDeleteFromNote,
    handleContentOnChange,
  } = useNote();

  return (
    <Box sx={{ flexGrow: 1, p: 2, height: "100vh", overflow: "hidden" }}>
      <Grid container spacing={2} sx={{ height: "100%" }}>
        {/* left: filter and Tag management */}
        <Grid
          item
          xs={12}
          sm={4}
          md={2}
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          <StyledPaper>
            <NoteStatusFilter
              filterType={filterType}
              handleShowAllNote={handleShowAllNote}
              handleShowArchivedNote={handleShowArchivedNote}
            />
            <TagManagement allTags={allTags} onTagDeleted={handleTagDelete} />
          </StyledPaper>
        </Grid>

        {/* middle: brife view and action */}
        <Grid item xs={12} sm={8} md={4}>
          <StyledPaper>
            <NoteList
              selectedNoteId={selectedNoteId}
              allNotes={allNotes}
              filterType={filterType}
              handleNewNoteClick={handleNewNoteClick}
              handleNoteCardClick={handleNoteCardClick}
              allTags={allTags}
            />
          </StyledPaper>
        </Grid>

        {/* 右栏: 详情和操作按钮 */}
        <Grid item xs={12} md={6}>
          <StyledPaper>
            {/* right archive and delete button */}
            <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
              <ActionBar
                allNotes={allNotes}
                filterType={filterType}
                selectedNoteId={selectedNoteId}
                handleArchiveNote={handleArchiveNote}
                handleUnrchiveNote={handleUnrchiveNote}
                handleDeleteNote={handleDeleteNote}
              />
            </Box>

            {/* note details */}
            <Box sx={{ flexGrow: 1, overflowY: "auto" }}>
              <NoteDetail
                allNotes={allNotes}
                allTags={allTags}
                selectedNoteId={selectedNoteId}
                handleTagsChangeFromNote={handleTagsChangeFromNote}
                handleTagDeleteFromNote={handleTagDeleteFromNote}
                handleExistNoteTitleOnChange={handleExistNoteTitleOnChange}
                handleNewTagSave={handleNewTagSave}
                handleContentOnChange={handleContentOnChange}
              />
            </Box>
          </StyledPaper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default NoteLayout;
