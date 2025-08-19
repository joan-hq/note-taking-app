import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import MyCustomButton from "../../components/Button";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";
import ArchiveOutlinedIcon from "@mui/icons-material/ArchiveOutlined";
import Chip from "@mui/material/Chip";
import type { Tag } from "../../types/index";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
interface NoteListSidebarProps {
  handleShowAllNote: () => void;
  handleShowArchivedNote: () => void;
  handleShowActiveNote: () => void;
  currentPageFilter: "all" | "active" | "archived";
  allTags: Tag[];
  handleTagDelete: (
    tagId: string,
    event: React.SyntheticEvent<HTMLElement>
  ) => void;
}
const NoteListSidebar = ({
  handleShowAllNote,
  handleShowArchivedNote,
  handleShowActiveNote,
  currentPageFilter,
  allTags,
  handleTagDelete,
}: NoteListSidebarProps) => {
  // const handleTagDelete = () => {
  //   console.log("hanle tag delete");
  // };
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
          {allTags.map((tag) => (
            <Grid key={tag.id}>
              <Chip
                label={tag.label}
                icon={<LocalOfferOutlinedIcon />}
                onDelete={() => handleTagDelete(tag.id)}
                deleteIcon={<DeleteForeverIcon />}
                variant="outlined"
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </div>
  );
};

export default NoteListSidebar;
