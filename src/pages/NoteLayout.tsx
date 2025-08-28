import { Box, Grid } from "@mui/material";
import TagManagement from "./TagManagement";
import NoteFilterResultsTitle from "../components/NoteFilterResultsTitle";
import NoteStatusFilter from "../components/NoteActions/StatusFilter";
import NoteList from "./NoteList"; // 中间栏
import NoteDetail from "./NoteDetail"; // 右栏
import ActionBar from "../components/NoteActions/ActionBar"; // 右栏，只包含 archive 和 delete

import { useNote } from "../hooks/useNote";
import { useDialog } from "../hooks/useDialog";

interface NoteLayoutProps {}

const NoteLayout = () => {
  //   const [selectedNote, setSelectedNote] = useState<string | null>(null);
  const { open, showDialog, hideDialog } = useDialog();

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
    handleContentOnChange,
    handleNoteEditSave,
    handleNoteEditCancel,
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
          <NoteStatusFilter
            handleShowAllNote={handleShowAllNote}
            handleShowArchivedNote={handleShowArchivedNote}
          />
          <TagManagement allTags={allTags} onTagDeleted={handleTagDelete} />
        </Grid>

        {/* middle: brife view and action */}
        <Grid item xs={12} sm={8} md={4}>
          <NoteList
            allNotes={allNotes}
            filterType={filterType}
            handleNewNoteClick={handleNewNoteClick}
            handleNoteCardClick={handleNoteCardClick}
          />
        </Grid>

        {/* 右栏: 详情和操作按钮 */}
        <Grid item xs={12} md={6}>
          <Box
            sx={{ display: "flex", flexDirection: "column", height: "100%" }}
          >
            {/* right archive and delete button */}
            <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
              <ActionBar
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
                handleExistNoteTitleOnChange={handleExistNoteTitleOnChange}
                handleNewTagSave={handleNewTagSave}
                handleContentOnChange={handleContentOnChange}
                handleNoteEditSave={handleNoteEditSave}
                handleNoteEditCancel={handleNoteEditCancel}
              />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default NoteLayout;
