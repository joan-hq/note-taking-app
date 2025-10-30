import { Box } from "@mui/material";

import Button from "@mui/material/Button";
import FolderZipOutlinedIcon from "@mui/icons-material/FolderZipOutlined";
import type { FilterType } from "../../types/index";
import FolderCopyOutlinedIcon from "@mui/icons-material/FolderCopyOutlined";
import { useNoteContext } from "../../contexts/NoteProvider";

const NoteStatusFilter = () => {
  const { filters } = useNoteContext();
  const itemBaseStyle = "flex items-center gap-3 p-2 cursor-pointer";
  const activeStyle =
    "border-l-4 border-s-primary-color text-primary-color font-semibold";
  const inactiveStyle = "text-gray-700 hover:bg-gray-100";

  return (
    <Box className="flex flex-col gap-2 w-full">
      <Box
        onClick={filters.handleShowAllNote}
        className={`
          ${itemBaseStyle}
          ${filters.filterType === "all" ? activeStyle : inactiveStyle}
        `}
      >
        <FolderCopyOutlinedIcon
          className={`
            !text-xl 
            ${
              filters.filterType === "all"
                ? "text-primary-color"
                : "text-gray-500"
            }
          `}
        />
        <span className="text-sm">All Notes</span>
      </Box>
      <Box
        onClick={filters.handleShowArchivedNote}
        className={`
          ${itemBaseStyle}
          ${filters.filterType === "archived" ? activeStyle : inactiveStyle}
        `}
      >
        <FolderZipOutlinedIcon
          className={`
            !text-xl
            ${
              filters.filterType === "archived"
                ? "text-primary-color"
                : "text-gray-500"
            }
          `}
        />
        <span className="text-sm">Archived Notes</span>
      </Box>
    </Box>
  );
};

export default NoteStatusFilter;
