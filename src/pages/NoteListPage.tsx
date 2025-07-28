//import * as React from "react";
//import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
//import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import ArchiveOutlinedIcon from "@mui/icons-material/ArchiveOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import MyCustomButton from "../components/Button";
import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";
import MySearchAppBarProps from "../components/SearchBar";
import MyNoteContentCard from "../components/MyNoteContentCard";
//import MyNoteCard from "../components/NoteCard";
import AddIcon from "@mui/icons-material/Add";
import NoteDetail from "../pages/NoteDetailPage";
import { useNavigate } from "react-router-dom";

const tags = [
  { id: 1, label: "dev" },
  { id: 2, label: "travel" },
  { id: 3, label: "study" },
  { id: 4, label: "food" },
];

const notes = [
  {
    id: 1,
    title: "The First Note",
    tags: ["dev", "food", "code"],
    lastedit: "26 Jun 2025",
    archive: false,
  },
  {
    id: 2,
    title: "The second Note",
    tags: ["food", "location", "test"],
    lastedit: "26 March 2025",
    archive: true,
  },
];

// New Component for the Left Sidebar
const NoteListSidebar = () => {
  const showAllNote = () => {
    window.alert("showAllNote");
  };

  const showArchivedNote = () => {
    window.alert("showArchivedNote");
  };

  return (
    <div>
      <div>
        <MyCustomButton
          title="All Notes"
          disabled={false}
          startIcon={<HomeOutlinedIcon />}
          endIcon={<KeyboardArrowRightOutlinedIcon />}
          variant="outlined"
          onClick={showAllNote}
        />
      </div>
      <div>
        <MyCustomButton
          title="Archived Notes"
          disabled={false}
          startIcon={<ArchiveOutlinedIcon />}
          endIcon={<KeyboardArrowRightOutlinedIcon />}
          variant="outlined"
          onClick={showArchivedNote}
        />
      </div>
      <div>
        Tag
        <div>
          {tags.map((tag) => (
            <MyCustomButton
              title={tag.label}
              disabled={false}
              startIcon={<LocalOfferOutlinedIcon />}
              variant="text"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

// New Component for the Middle Content Area
interface NoteListContentProps {
  handleNewNote: () => void;
  handleArchive: () => void;
  handleDelete: () => void;
  handleNoteClick: () => void;
}

const NoteListContent = ({
  handleNewNote,
  handleArchive,
  handleDelete,
  handleNoteClick,
}: NoteListContentProps) => {
  return (
    <Grid container spacing={0}>
      <Grid size={{ xs: 12, md: 12, lg: 12 }}>
        {/* Use item prop for Grid children */}
        <MySearchAppBarProps title="All Notes" />
      </Grid>

      <Grid size={{ xs: 12, md: 3, lg: 3 }}>
        <MyCustomButton
          title="Create New Note"
          variant="contained"
          startIcon={<AddIcon />}
          size="large"
          onClick={handleNewNote}
        />

        {notes.map((note) => {
          if (!note.archive) {
            console.log("note.archive", note.archive);
            return (
              <MyNoteContentCard
                id={note.id}
                title={note.title}
                tags={note.tags}
                lastedit={note.lastedit}
                handleNoteClick={handleNoteClick}
              />
            );
          }
          return null;
        })}
      </Grid>
      <Grid size={{ xs: 12, md: 7, lg: 7 }}>
        {/* <MyNoteCard title="first note" tags="rev" note="123" /> */}
        <NoteDetail initialTitleInput="" />
      </Grid>

      <Grid size={{ xs: 12, md: 2, lg: 2 }}>
        <MyCustomButton
          title="Archive Note"
          startIcon={<ArchiveOutlinedIcon />}
          onClick={handleArchive}
        />
        <MyCustomButton
          title="delete Note"
          startIcon={<DeleteOutlineOutlinedIcon />}
          onClick={handleDelete}
        />
      </Grid>
    </Grid>
  );
};

const NoteList = () => {
  const navigate = useNavigate();
  const handleNewNote = () => {
    navigate("/detail");
  };

  const handleArchive = () => {
    // change notearchive status according to note id
  };

  const handleDelete = () => {
    // delete whole note according to the note id
  };

  const handleNoteClick = () => {
    //click this will load the note
  };

  return (
    <Box>
      <Grid container spacing={0}>
        <Grid size={{ xs: 12, md: 2, lg: 2 }}>
          <NoteListSidebar />
        </Grid>

        <Grid size={{ xs: 12, md: 10, lg: 10 }}>
          <NoteListContent
            handleNewNote={handleNewNote}
            handleArchive={handleArchive}
            handleDelete={handleDelete}
            handleNoteClick={handleNoteClick}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default NoteList;
