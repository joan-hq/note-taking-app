import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import MyCustomButton from "../../components/Button";
import type { Note, FilterType } from "../../types/index";
import MySearchAppBarProps from "../../components/SearchBar";
import MyNoteContentCard from "../../components/MyNoteContentCard";
import ArchiveOutlinedIcon from "@mui/icons-material/ArchiveOutlined";
import UnarchiveIcon from "@mui/icons-material/Unarchive";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

import AddIcon from "@mui/icons-material/Add";
import NoteDetail from "../NoteDetailPage/NoteDetail";

interface NoteListContentProps {
  handleNewNote: () => void;
  handleArchive: () => void;
  handleUnrchive: () => void;
  handleDelete: () => void;
  handleNoteClick: (noteId: string) => void;
  notes: Note[];
  selectedNote: Note | null;
  handleNoteSave: (noteData: Note) => void;
  filterType: "all" | "active" | "archived";
}

const NoteListContent = ({
  handleNewNote,
  handleArchive,
  handleDelete,
  handleNoteClick,
  handleNoteSave,
  handleUnrchive,
  notes,
  selectedNote,
  filterType,
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

  return (
    <Grid container spacing={0}>
      <Grid size={{ xs: 12, md: 12, lg: 12 }}>
        {/* Use item prop for Grid children */}
        <MySearchAppBarProps
          title={
            filterType === "all"
              ? "All Notes"
              : filterType === "archived"
              ? "Archived Notes"
              : "Active Notes"
          }
        />
      </Grid>

      <Grid size={{ xs: 12, md: 3, lg: 3 }}>
        <MyCustomButton
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
              onCardClick={() => handleNoteClick(note.id)}
            />
          ))
        )}
      </Grid>
      <Grid size={{ xs: 12, md: 7, lg: 7 }}>
        <NoteDetail
          selectedNote={selectedNote}
          onNoteSave={handleNoteSave}
          key={selectedNote ? selectedNote.id : "new-note"}
        />
      </Grid>

      <Grid size={{ xs: 12, md: 2, lg: 2 }}>
        {filterType === "archived" ? (
          <MyCustomButton
            title="Unarchive Note"
            startIcon={<UnarchiveIcon />}
            onClick={handleUnrchive}
          />
        ) : (
          <MyCustomButton
            title="Archive Note"
            startIcon={<ArchiveOutlinedIcon />}
            onClick={handleArchive}
          />
        )}

        <MyCustomButton
          title="delete Note"
          startIcon={<DeleteOutlineOutlinedIcon />}
          onClick={handleDelete}
        />
      </Grid>
    </Grid>
  );
};

export default NoteListContent;
