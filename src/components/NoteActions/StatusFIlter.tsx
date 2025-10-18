import { Box } from "@mui/material";

import Button from "@mui/material/Button";
import ArchiveOutlinedIcon from "@mui/icons-material/ArchiveOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";
import type { FilterType } from "../../types/index";
import styled from "styled-components";

interface NoteStatusFilterProps {
  filterType: FilterType;
  handleShowAllNote: (event: React.MouseEvent<HTMLElement>) => void;
  handleShowArchivedNote: (event: React.MouseEvent<HTMLElement>) => void;
}

const StyledButton = styled(Button)`
  // && {
  //   background-color: var(--color-brand-primary);
  // }
`;

const NoteStatusFilter = ({
  filterType,
  handleShowAllNote,
  handleShowArchivedNote,
}: NoteStatusFilterProps) => {
  return (
    <Box className="flex flex-col space-y-2 w-48 justify-start">
      <StyledButton
        title="All Notes"
        fullWidth
        startIcon={<HomeOutlinedIcon />}
        endIcon={<KeyboardArrowRightOutlinedIcon />}
        onClick={handleShowAllNote}
        variant={filterType === "all" ? "contained" : "text"}
        sx={{
          textTransform: "none",
          ...(filterType === "all" && {
            backgroundColor: "var(--color-brand-primary)",
            color: "white",
            "&:hover": {
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
      </StyledButton>
      <StyledButton
        title="Archived Notes"
        fullWidth
        startIcon={<ArchiveOutlinedIcon />}
        endIcon={<KeyboardArrowRightOutlinedIcon />}
        onClick={handleShowArchivedNote}
        variant={filterType === "archived" ? "contained" : "text"}
        sx={{
          textTransform: "none",
          ...(filterType === "archived" && {
            backgroundColor: "var(--color-brand-primary)",
            color: "white",
            "&:hover": {
              backgroundColor: "var(--color-primary-hover)",
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
      </StyledButton>
    </Box>
  );
};

export default NoteStatusFilter;
