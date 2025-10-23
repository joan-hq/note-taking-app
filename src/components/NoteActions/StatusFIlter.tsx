import { Box } from "@mui/material";

import Button from "@mui/material/Button";
import FolderZipOutlinedIcon from "@mui/icons-material/FolderZipOutlined";
import type { FilterType } from "../../types/index";
import FolderCopyOutlinedIcon from "@mui/icons-material/FolderCopyOutlined";

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
  const itemBaseStyle = "flex items-center gap-3 p-2 cursor-pointer";
  const activeStyle =
    "border-l-4 border-s-primary-color text-primary-color font-semibold";
  const inactiveStyle = "text-gray-700 hover:bg-gray-100";

  return (
    <Box className="flex flex-col gap-2 w-full">
      <Box
        onClick={handleShowAllNote}
        className={`
          ${itemBaseStyle}
          ${filterType === "all" ? activeStyle : inactiveStyle}
        `}
      >
        <FolderCopyOutlinedIcon
          className={`
            !text-xl 
            ${filterType === "all" ? "text-primary-color" : "text-gray-500"}
          `}
        />
        <span className="text-sm">All Notes</span>
      </Box>
      <Box
        onClick={handleShowArchivedNote}
        className={`
          ${itemBaseStyle}
          ${filterType === "archived" ? activeStyle : inactiveStyle}
        `}
      >
        <FolderZipOutlinedIcon
          className={`
            !text-xl
            ${
              filterType === "archived" ? "text-primary-color" : "text-gray-500"
            }
          `}
        />
        <span className="text-sm">Archived Notes</span>
      </Box>
    </Box>
  );
};

export default NoteStatusFilter;
