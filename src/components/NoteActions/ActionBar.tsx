import Button from "@mui/material/Button";
import ArchiveOutlinedIcon from "@mui/icons-material/ArchiveOutlined";
import UnarchiveIcon from "@mui/icons-material/Unarchive";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import type { FilterType } from "../../types/index";
import Tooltip from "@mui/material/Tooltip";

interface ActionBarProps {
  selectedNoteId: string;
  filterType: FilterType;
  handleArchiveNote: (noteId: string) => void;
  handleUnrchiveNote: (noteId: string) => void;
  handleDeleteNote: (noteId: string) => void;
}
const ActionBar = ({
  selectedNoteId,
  filterType,
  handleDeleteNote,
  handleArchiveNote,
  handleUnrchiveNote,
}: ActionBarProps) => {
  return (
    <>
      {filterType === "archived" ? (
        <Tooltip title="Unarchive Note" arrow>
          <Button
            startIcon={<UnarchiveIcon />}
            onClick={() => handleUnrchiveNote(selectedNoteId)}
          ></Button>
        </Tooltip>
      ) : (
        <Button
          title="Archive Note"
          startIcon={<ArchiveOutlinedIcon />}
          onClick={() => handleArchiveNote(selectedNoteId)}
        ></Button>
      )}

      <Tooltip title="Delete">
        <Button
          startIcon={<DeleteOutlineOutlinedIcon />}
          onClick={() => handleDeleteNote(selectedNoteId)}
        ></Button>
      </Tooltip>
    </>
  );
};
export default ActionBar;
