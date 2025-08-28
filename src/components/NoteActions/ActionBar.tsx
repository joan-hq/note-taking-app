import Button from "@mui/material/Button";
import ArchiveOutlinedIcon from "@mui/icons-material/ArchiveOutlined";
import UnarchiveOutlinedIcon from "@mui/icons-material/UnarchiveOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import type { FilterType } from "../../types/index";
import Tooltip from "@mui/material/Tooltip";
import CustomPopover from "../CustomePopover";
import { useCustomPopover } from "../../hooks/useCustomPopover";
import { handleAsyncAction, findNoteById } from "../../helpers/noteHelpers";
import { ACTION_MESSAGES } from "../../constants/messages";
import type { Note } from "../../types/index";

interface ActionBarProps {
  allNotes: Note[];
  selectedNoteId: string;
  filterType: FilterType;
  handleArchiveNote: (noteId: string) => Promise<boolean>;
  handleUnrchiveNote: (noteId: string) => Promise<boolean>;
  handleDeleteNote: (noteId: string) => Promise<boolean>;
}
const ActionBar = ({
  allNotes,
  selectedNoteId,
  filterType,
  handleDeleteNote,
  handleArchiveNote,
  handleUnrchiveNote,
}: ActionBarProps) => {
  const popoverManager = useCustomPopover();
  const selectedNote = findNoteById(selectedNoteId, allNotes);

  return (
    <>
      {filterType === "archived" || selectedNote?.isArchive === true ? (
        <Tooltip title="Unarchive Note" arrow>
          <Button
            startIcon={<UnarchiveOutlinedIcon />}
            onClick={(event) =>
              handleAsyncAction(
                handleUnrchiveNote,
                selectedNoteId,
                event,
                popoverManager,
                ACTION_MESSAGES.UNARCHIVE
              )
            }
          >
            Unarchive
          </Button>
        </Tooltip>
      ) : (
        <Button
          title="Archive Note"
          startIcon={<ArchiveOutlinedIcon />}
          onClick={(event) =>
            handleAsyncAction(
              handleArchiveNote,
              selectedNoteId,
              event,
              popoverManager,
              ACTION_MESSAGES.ARCHIVE
            )
          }
        >
          Archive
        </Button>
      )}

      <Tooltip title="Delete">
        <Button
          startIcon={<DeleteOutlineOutlinedIcon />}
          onClick={(event) =>
            handleAsyncAction(
              handleDeleteNote,
              selectedNoteId,
              event,
              popoverManager,
              ACTION_MESSAGES.DELETE
            )
          }
        >
          Delete
        </Button>
      </Tooltip>

      <CustomPopover
        open={popoverManager.open}
        message={popoverManager.message}
        type={popoverManager.type}
        anchorEl={popoverManager.anchorEl}
        onClose={popoverManager.hidePopover}
      />
    </>
  );
};
export default ActionBar;
