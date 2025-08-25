import Button from "@mui/material/Button";
import ArchiveOutlinedIcon from "@mui/icons-material/ArchiveOutlined";
import UnarchiveIcon from "@mui/icons-material/Unarchive";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import type { FilterType } from "../../types/index";

interface ActionBarProps {
  filterType: FilterType;
  handleArchiveNote: () => void;
  handleUnrchiveNote: () => void;
  handleDeleteNote: () => void;
}
const ActionBar = ({
  filterType,
  handleDeleteNote,
  handleArchiveNote,
  handleUnrchiveNote,
}: ActionBarProps) => {
  return (
    <>
      {filterType === "archived" ? (
        <Button
          title="Unarchive Note"
          startIcon={<UnarchiveIcon />}
          onClick={handleUnrchiveNote}
        ></Button>
      ) : (
        <Button
          title="Archive Note"
          startIcon={<ArchiveOutlinedIcon />}
          onClick={handleArchiveNote}
        ></Button>
      )}

      <Button
        title="Delete Note"
        startIcon={<DeleteOutlineOutlinedIcon />}
        onClick={handleDeleteNote}
      ></Button>
    </>
  );
};
export default ActionBar;
