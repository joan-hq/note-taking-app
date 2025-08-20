import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import CustomButton from "../../components/CustomButton";
import type { Note, Tag, FilterType } from "../../types/index";
import MySearchAppBarProps from "../../components/SearchBar";
import MyNoteContentCard from "../../components/NoteContentCard";
import ArchiveOutlinedIcon from "@mui/icons-material/ArchiveOutlined";
import UnarchiveIcon from "@mui/icons-material/Unarchive";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

import AddIcon from "@mui/icons-material/Add";
//import { useNavigate } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

//import NoteDetail from "../NoteDetailPage/NoteDetail";

interface NoteListContentProps {
  handleNewNote: () => void;
  handleArchive: () => void;
  handleUnrchive: () => void;
  handleDelete: () => void;
  handleNoteClick: (noteId: string) => void;
  notes: Note[];
  selectedNote: Note | null;
  // handleNoteSave: (noteData: Note) => void;
  // handleTagAdd: (newTag: Tag) => void;
  filterType: FilterType;
  allTags: Tag[];

  handleSearchOnChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const NoteListContent = ({
  handleNewNote,
  handleArchive,
  handleDelete,
  handleNoteClick,
  // handleNoteSave,
  // handleTagAdd,
  handleUnrchive,
  notes,
  selectedNote,
  filterType,
  allTags,
  //allNote,

  handleSearchOnChange,
}: NoteListContentProps) => {
  const filteredNotes = notes.filter((note) => {
    if (filterType === "all") {
      return true; // Show all notes
    } else if (filterType === "active") {
      return !note.archive; // Show non-archived notes
    } else if (filterType === "archived") {
      return note.archive; // Show only archived notes
    }
    return true; // Fallback, though ideally all cases are covered
  });

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleCardClick = (noteId: string) => {
    handleNoteClick(noteId); // Your existing state update handler
    if (isMobile) {
      // For mobile, open a new window
      window.open(`/note/${noteId}`, "_blank");
    }
  };
  return (
    <Grid container spacing={0}>
      <Grid item xs={12} md={3} lg={3}>
        {/* Use item prop for Grid children */}
        {/* <MySearchAppBarProps
          title={
            filterType === "all"
              ? "All Notes"
              : filterType === "archived"
              ? "Archived Notes"
              : "Active Notes"
          }
          handleSearchOnChange={handleSearchOnChange}
        /> */}
      </Grid>

      <Grid item xs={12} md={3} lg={3}>
        <CustomButton
          title="Create New Note"
          variant="contained"
          startIcon={<AddIcon />}
          size="large"
          onClick={handleNewNote}
          fullWidth={true}
        />

        {filteredNotes.length === 0 ? (
          <Box
            sx={{ mt: 2, p: 2, textAlign: "center", color: "text.secondary" }}
          >
            {filterType === "archived"
              ? "NO archived Note yet."
              : "NO Note display yet"}
          </Box>
        ) : (
          filteredNotes.map((note) => (
            <MyNoteContentCard
              key={note.id}
              id={note.id}
              title={note.title}
              tags={note.tags}
              lastedit={note.lastEdit}
              noteStatus={note.archive}
              onCardClick={() => handleCardClick(note.id)}
              allTags={allTags}
              selectedNote={selectedNote}
            />
          ))
        )}
      </Grid>

      {/* <Grid size={{ xs: 12, md: 2, lg: 2 }}>
        {filterType === "archived" ? (
          <CustomButton
            title="Unarchive Note"
            startIcon={<UnarchiveIcon />}
            onClick={handleUnrchive}
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
      </Grid> */}
    </Grid>
  );
};

export default NoteListContent;
