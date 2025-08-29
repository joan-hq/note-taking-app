import Button from "@mui/material/Button";
import ArchiveOutlinedIcon from "@mui/icons-material/ArchiveOutlined";
import UnarchiveIcon from "@mui/icons-material/Unarchive";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";

import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";

import type { FilterType } from "../../types/index";

interface NoteStatusFilterProps {
  filterType: FilterType;
  handleShowAllNote: (event: React.MouseEvent<HTMLElement>) => void;
  handleShowArchivedNote: (event: React.MouseEvent<HTMLElement>) => void;
}

const NoteStatusFilter = ({
  filterType,
  handleShowAllNote,
  handleShowArchivedNote,
}: NoteStatusFilterProps) => {
  return (
    <>
      <Button
        title="All Notes"
        startIcon={<HomeOutlinedIcon />}
        endIcon={<KeyboardArrowRightOutlinedIcon />}
        onClick={handleShowAllNote}
        variant={filterType === "all" ? "contained" : "text"}
      >
        All Notes
      </Button>
      <Button
        title="Archived Notes"
        startIcon={<ArchiveOutlinedIcon />}
        endIcon={<KeyboardArrowRightOutlinedIcon />}
        onClick={handleShowArchivedNote}
        variant={filterType === "archived" ? "contained" : "text"}
      >
        Archived Notes
      </Button>
    </>
  );
};

export default NoteStatusFilter;
