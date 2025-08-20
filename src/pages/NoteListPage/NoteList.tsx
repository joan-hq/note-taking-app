import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import NoteListSidebar from "./NoteListSideBar";
import NoteListContent from "./NoteListContent";
//import { useNoteList } from "../../hooks/useNoteList";
import CustomPopover from "../../components/CustomPopover";
import type { PopoverType } from "../types/index";
import type { Note, Tag, FilterType } from "../types";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import NoteDetail from "../NoteDetailPage/NoteDetail";
import CustomButton from "../../components/CustomButton";
import UnarchiveIcon from "@mui/icons-material/Unarchive";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import ArchiveOutlinedIcon from "@mui/icons-material/ArchiveOutlined";
import MySearchAppBarProps from "../../components/SearchBar";

interface NoteListProps {
  selectedNote?: Note | null;
  notes: Note[];
  filterType: FilterType;
  allTags: Tag[];
  handleShowAllNote: () => void;
  handleShowArchivedNote: () => void;
  handleShowActiveNote: () => void;
  handleNewNote: () => void;
  handleArchive: () => void;
  handleUnarchive: () => void;
  handleDelete: () => void;
  handleNoteClick: (noteId: string) => void;
  handleNoteSave: (noteData: Note) => void;
  handleTagAdd: (newTag: Tag) => void;

  handleSearchOnChange: (event: React.ChangeEvent<HTMLInputElement>) => void;

  searchQueryInput?: string;
  handleTagDelete: (
    tagId: string,
    event: React.SyntheticEvent<HTMLElement>
  ) => void;
  customPopoverOpen: boolean;
  popoverMessage: string;
  popoverAnchorEl: HTMLElement | null;
  //   handlePopoverClose: () => void;
  popoverType: PopoverType;

  open: boolean;
  handleTagDeleteClose: () => void;
  tagValue: string;
  handleTagsDelete: () => void;
  handleDeleteTagDialog: (
    tagId: string,
    event: React.SyntheticEvent<HTMLElement>
  ) => void;

  tagIdToDelete: string | null;
}

const NoteList = (props: NoteListProps) => {
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
    handleTagAdd,
    allTags,

    handleSearchOnChange,
    handleTagDelete,

    popoverType,
    customPopoverOpen,
    popoverMessage,
    popoverAnchorEl,
    // handlePopoverClose,

    open,
    handleTagDeleteClose,
    tagValue,
    // handleTagsDelete,
    handleDeleteTagDialog,
  } = props;

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  console.log("notelist,", selectedNote);

  return (
    <Box>
      <Grid container spacing={0}>
        <Grid item xs={12} md={2} lg={2}>
          <NoteListSidebar
            handleShowAllNote={handleShowAllNote}
            handleShowArchivedNote={handleShowArchivedNote}
            handleShowActiveNote={handleShowActiveNote}
            currentPageFilter={filterType}
            allTags={allTags}
            handleTagDelete={handleTagDelete}
            open={open}
            handleTagDeleteClose={handleTagDeleteClose}
            tagValue={tagValue}
            handleTagsDelete={handleTagDelete}
            handleDeleteTagDialog={handleDeleteTagDialog}
          />
        </Grid>
        <Grid item xs={12} md={10} lg={10}>
          {/* Use item prop for Grid children */}
          <MySearchAppBarProps
            title={
              filterType === "all"
                ? "All Notes"
                : filterType === "archived"
                ? "Archived Notes"
                : "Active Notes"
            }
            handleSearchOnChange={handleSearchOnChange}
          />
        </Grid>
        {isMobile ? (
          <Grid item xs={12} md={8} lg={8}>
            <NoteListContent
              // handleTagAdd={handleTagAdd}
              allTags={allTags}
              handleNewNote={handleNewNote}
              handleArchive={handleArchive}
              handleDelete={handleDelete}
              handleNoteClick={handleNoteClick}
              notes={notes}
              selectedNote={selectedNote}
              //handleNoteSave={handleNoteSave}
              filterType={filterType}
              handleUnrchive={handleUnarchive}
              handleSearchOnChange={handleSearchOnChange}
            />
          </Grid>
        ) : (
          <>
            <Grid item xs={12} md={4} lg={4}>
              <NoteListContent
                // handleTagAdd={handleTagAdd}
                allTags={allTags}
                handleNewNote={handleNewNote}
                handleArchive={handleArchive}
                handleDelete={handleDelete}
                handleNoteClick={handleNoteClick}
                notes={notes}
                selectedNote={selectedNote}
                //handleNoteSave={handleNoteSave}
                filterType={filterType}
                handleUnrchive={handleUnarchive}
                handleSearchOnChange={handleSearchOnChange}
              />
            </Grid>

            {selectedNote && ( // Only render if a note is selected
              <Grid item xs={12} md={4} lg={4}>
                <NoteDetail
                  selectedNote={selectedNote}
                  onNoteSave={props.handleNoteSave}
                  onTagAdd={props.handleTagAdd}
                  availableTags={props.allTags}
                  allNote={notes}
                  key={selectedNote.id}
                />
              </Grid>
            )}
          </>
        )}

        <Grid item xs={12} md={2} lg={2}>
          {filterType === "archived" ? (
            <CustomButton
              title="Unarchive Note"
              startIcon={<UnarchiveIcon />}
              onClick={handleUnarchive}
            />
          ) : (
            <CustomButton
              title="Archive Note"
              startIcon={<ArchiveOutlinedIcon />}
              onClick={handleArchive}
            />
          )}

          <CustomButton
            title="delete Note"
            startIcon={<DeleteOutlineOutlinedIcon />}
            onClick={handleDelete}
          />
        </Grid>

        <CustomPopover
          popoverType={popoverType}
          customPopoverOpen={customPopoverOpen}
          popoverMessage={popoverMessage}
          anchorEl={popoverAnchorEl}
          //handlePopoverClose={handlePopoverClose}
        />
      </Grid>
    </Box>
  );
};

export default NoteList;
