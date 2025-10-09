import { Box, Grid, Paper, styled } from "@mui/material";
import TagManagement from "./TagManagement";
import NoteStatusFilter from "../components/NoteActions/StatusFIlter";
import NoteFilterResultsTitle from "../components/NoteFilterResultsTitle";

import NoteDetail from "./NoteDetail";
import ActionBar from "../components/NoteActions/ActionBar";

import NewNoteButton from "../components/NoteActions/NewNoteButton";
import SearchBar from "../components/NoteActions/SearchBar";
import NoteBrifeView from "../components/NoteBrifeView/index";
import { useNote } from "../hooks/useNote";

const NoteLayout = () => {
  //   const [selectedNote, setSelectedNote] = useState<string | null>(null);

  const {
    noteFilterTitle,
    handleShowAllNote,
    handleShowArchivedNote,
    handleSearchOnChange,
    handleSearchIconClick,
    handleBlur,
    filteredNotes,
    isSearchOpen,
    searchQuery,

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
          <Box className="flex flex-col h-full">
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
          </Box>
        </Grid>

        <Grid item xs={12} sm={9} md={4} className="h-full">
          <Box className="flex flex-col h-full">
            <Box className="flex justify-between items-center mb-4">
              <NoteFilterResultsTitle
                title={noteFilterTitle}
                // className="!text-2xl !font-semibold"
              />
              <Box className="flex items-center gap-2">
                <NewNoteButton handleNewNoteClick={handleNewNoteClick} />
                <SearchBar
                  searchQuery={searchQuery}
                  handleSearchOnChange={handleSearchOnChange}
                  isOpen={isSearchOpen}
                  handleBlur={handleBlur}
                  handleSearchIconClick={handleSearchIconClick}
                />
              </Box>
            </Box>

            <Box className="flex-grow overflow-y-auto min-h-0">
              <NoteBrifeView
                selectedNoteId={selectedNoteId}
                notes={filteredNotes}
                handleNoteCardClick={handleNoteCardClick}
                allTags={allTags}
              />
            </Box>
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
