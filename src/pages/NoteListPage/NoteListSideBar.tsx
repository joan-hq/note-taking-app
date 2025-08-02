import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import MyCustomButton from "../../components/Button";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";
import ArchiveOutlinedIcon from "@mui/icons-material/ArchiveOutlined";

import {
  notes as initialNotesData,
  tags as initialTagsData,
} from "../../data/note"; // Importing the notes data

interface NoteListSidebarProps {
  handleShowAllNote: () => void;
  handleShowArchivedNote: () => void;
  handleShowActiveNote: () => void;
  currentPageFilter: "all" | "active" | "archived";
}
const NoteListSidebar = ({
  handleShowAllNote,
  handleShowArchivedNote,
  handleShowActiveNote,
  currentPageFilter,
}: NoteListSidebarProps) => {
  return (
    <div>
      <div>
        <MyCustomButton
          title="All Notes"
          disabled={false}
          startIcon={<HomeOutlinedIcon />}
          endIcon={<KeyboardArrowRightOutlinedIcon />}
          variant={currentPageFilter === "all" ? "contained" : "outlined"}
          onClick={handleShowAllNote}
          fullWidth={true}
        />
      </div>
      <div>
        <MyCustomButton
          title="Active Notes"
          disabled={false}
          startIcon={<HomeOutlinedIcon />}
          endIcon={<KeyboardArrowRightOutlinedIcon />}
          variant={currentPageFilter === "active" ? "contained" : "outlined"}
          onClick={handleShowActiveNote}
          fullWidth={true}
        />
      </div>
      <div>
        <MyCustomButton
          title="Archived Notes"
          disabled={false}
          startIcon={<ArchiveOutlinedIcon />}
          endIcon={<KeyboardArrowRightOutlinedIcon />}
          variant={currentPageFilter === "archived" ? "contained" : "outlined"}
          onClick={handleShowArchivedNote}
          fullWidth={true}
        />
      </div>
      <Box>
        <p style={{ fontWeight: "bold", marginBottom: "8px" }}>Tags</p>
        <Grid container spacing={1}>
          {initialTagsData.map((tag) => (
            <Grid key={tag.id}>
              <MyCustomButton
                title={tag.label}
                disabled={false}
                startIcon={<LocalOfferOutlinedIcon />}
                variant="outlined"
                fullWidth={true}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </div>
  );
};

export default NoteListSidebar;
