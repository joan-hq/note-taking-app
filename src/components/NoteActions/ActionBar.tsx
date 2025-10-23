import DriveFileMoveRtlOutlinedIcon from "@mui/icons-material/DriveFileMoveRtlOutlined";
import DriveFileMoveOutlinedIcon from "@mui/icons-material/DriveFileMoveOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import type { FilterType } from "../../types/index";
import CustomPopover from "../CustomePopover";
import { useCustomPopover } from "../../hooks/useCustomPopover";
import { handleAsyncAction, findNoteById } from "../../helpers/noteHelpers";
import { ACTION_MESSAGES } from "../../constants/messages";
import type { Note } from "../../types/index";
import Button from "@mui/material/Button";

interface ActionBarProps {
  allNotes: Note[];
  selectedNoteId: string | null;
  filterType: FilterType;
  handleArchiveNote: (noteId: string) => Promise<boolean>;
  handleUnrchiveNote: (noteId: string) => Promise<boolean>;
  handleDeleteNote: (noteId: string) => Promise<boolean>;
  className?: string;
}
const ActionBar = ({
  allNotes,
  selectedNoteId,
  filterType,
  handleDeleteNote,
  handleArchiveNote,
  handleUnrchiveNote,
  className,
}: ActionBarProps) => {
  const popoverManager = useCustomPopover();
  const selectedNote = selectedNoteId
    ? findNoteById(selectedNoteId, allNotes)
    : null;

  return (
    <div className={className}>
      {filterType === "archived" || selectedNote?.isArchive === true ? (
        <Button
          startIcon={<DriveFileMoveRtlOutlinedIcon />}
          onClick={(event) =>
            handleAsyncAction(
              handleUnrchiveNote,
              selectedNoteId as string,
              event,
              popoverManager,
              ACTION_MESSAGES.UNARCHIVE
            )
          }
          sx={{ textTransform: "none" }}
        >
          Unarchive
        </Button>
      ) : (
        <Button
          startIcon={<DriveFileMoveOutlinedIcon />}
          onClick={(event) =>
            handleAsyncAction(
              handleArchiveNote,
              selectedNoteId as string,
              event,
              popoverManager,
              ACTION_MESSAGES.ARCHIVE
            )
          }
          sx={{ textTransform: "none" }}
        >
          Archive
        </Button>
      )}
      <Button
        startIcon={<DeleteForeverOutlinedIcon />}
        onClick={(event) =>
          handleAsyncAction(
            handleDeleteNote,
            selectedNoteId as string,
            event,
            popoverManager,
            ACTION_MESSAGES.DELETE
          )
        }
        sx={{ textTransform: "none" }}
      >
        Delete
      </Button>
      <CustomPopover
        open={popoverManager.open}
        message={popoverManager.message}
        type={popoverManager.type}
        anchorEl={popoverManager.anchorEl}
        onClose={popoverManager.hidePopover}
      />
    </div>
  );
};
export default ActionBar;
