import Button from "@mui/material/Button";
import ArchiveOutlinedIcon from "@mui/icons-material/ArchiveOutlined";
import UnarchiveIcon from "@mui/icons-material/Unarchive";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";

import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";

import type { FilterType } from "../../types/index";

interface NoteStatusFilterProps {
  //   filterType: FilterType;
  handleShowAllNote: (event: React.MouseEvent<HTMLElement>) => void;
  handleShowArchivedNote: (event: React.MouseEvent<HTMLElement>) => void;
}

const NoteStatusFilter = ({
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
      >
        All Notes
      </Button>
      <Button
        title="Archived Notes"
        startIcon={<ArchiveOutlinedIcon />}
        endIcon={<KeyboardArrowRightOutlinedIcon />}
        onClick={handleShowArchivedNote}
      >
        Archived Notes
      </Button>
    </>
  );
};

export default NoteStatusFilter;
