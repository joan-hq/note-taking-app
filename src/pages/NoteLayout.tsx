import { Box, Grid } from "@mui/material";
import TagManagement from "./TagManagement";
import NoteStatusFilter from "../components/NoteActions/StatusFilter";
// import LogoIcon from "../assets/TypoNoteLogo.svg?react";
import ReuseTitle from "../components/ReuseTitle";

import NoteDetail from "./NoteDetail";
import ActionBar from "../components/NoteActions/ActionBar";

import NewNoteButton from "../components/NoteActions/NewNoteButton";
import SearchBar from "../components/NoteActions/SearchBar";
import NoteBrifeView from "../components/NoteBrifeView/index";
import { useNote } from "../hooks/useNote";

const NoteLayout = () => {
  const {
    noteFilterTitle,
    handleShowAllNote,
    handleShowArchivedNote,
    handleSearchOnChange,
    handleClearSearch,
    filteredNotes,
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
    <Box className="grid h-screen grid-cols-[280px_340px_1fr] gap-4 p-4">
      {/* Left */}
      <Box className="flex flex-col h-full p-4 border-r bg-gray-50 border-gray-200">
        <div className="flex flex-col gap-5">
          <ReuseTitle
            title="TypoNote"
            className="flex items-center gap-2 text-brand-primary text-2xl font-semibold"
          />
          <NewNoteButton
            handleNewNoteClick={handleNewNoteClick}
            className="w-full"
          />
          <NoteStatusFilter
            filterType={filterType}
            handleShowAllNote={handleShowAllNote}
            handleShowArchivedNote={handleShowArchivedNote}
          />
        </div>
        <hr className="my-5 border-gray-200" />
        <TagManagement
          allTags={allTags}
          onTagDeleted={handleTagDelete}
          selectedTagId={selectedTagId}
          handleTagClick={handleTagClick}
          handleClearTagFilter={handleClearTagFilter}
        />
      </Box>

      {/* Middle */}
      <Box className="bg-white border-r border-gray-200 p-1">
        <ReuseTitle
          title={noteFilterTitle}
          className="!text-4xl text-primary-color"
        />

        <SearchBar
          key={filterType}
          handleClearSearch={handleClearSearch}
          searchQuery={searchQuery}
          handleSearchOnChange={handleSearchOnChange}
          className="!rounded-full"
        />

        <NoteBrifeView
          selectedNoteId={selectedNoteId}
          notes={filteredNotes}
          handleNoteCardClick={handleNoteCardClick}
          allTags={allTags}
        />
      </Box>

      {/* Right */}
      <Box className="bg-white border-r border-gray-200 p-1">
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

        <ActionBar
          allNotes={allNotes}
          filterType={filterType}
          selectedNoteId={selectedNoteId}
          handleArchiveNote={handleArchiveNote}
          handleUnrchiveNote={handleUnrchiveNote}
          handleDeleteNote={handleDeleteNote}
        />
      </Box>
    </Box>
  );
};

export default NoteLayout;
