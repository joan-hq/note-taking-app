import { Box } from "@mui/material";

import Button from "@mui/material/Button";
import ArchiveOutlinedIcon from "@mui/icons-material/ArchiveOutlined";
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
    <Box className="flex flex-col space-y-2 w-48 justify-start">
      <Button
        title="All Notes"
        fullWidth
        startIcon={<HomeOutlinedIcon />}
        endIcon={<KeyboardArrowRightOutlinedIcon />}
        onClick={handleShowAllNote}
        variant={filterType === "all" ? "contained" : "text"}
        sx={{
          justifyContent: "start",
          textTransform: "none",
          ...(filterType === "all" && {
            backgroundColor: "var(--color-brand-primary)",
            color: "white",
            "&:hover": {
              backgroundColor: "var(--color-primary-hover)",
            },
            "&:focus": {
              backgroundColor: "var(--color-primary-hover)",
            },
          }),
          ...(filterType !== "all" && {
            color: "var(--color-brand-primary)",
          }),
        }}
        className="w-full justify-start"
      >
        All Notes
      </Button>
      <Button
        title="Archived Notes"
        fullWidth
        startIcon={<ArchiveOutlinedIcon />}
        endIcon={<KeyboardArrowRightOutlinedIcon />}
        onClick={handleShowArchivedNote}
        variant={filterType === "archived" ? "contained" : "text"}
        sx={{
          justifyContent: "start",
          textTransform: "none",
          ...(filterType === "archived" && {
            backgroundColor: "var(--color-brand-primary)",
            color: "white",
            "&:hover": {
              backgroundColor: "var(--color-brand-primary)",
            },
            "&:focus": {
              backgroundColor: "var(--color-primary-hover)",
            },
          }),
          ...(filterType !== "archived" && {
            color: "var(--color-brand-primary)",
          }),
        }}
        className="w-full justify-start"
      >
        Archived Notes
      </Button>
    </Box>
  );
};

export default NoteStatusFilter;
