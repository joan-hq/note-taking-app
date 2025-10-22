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
import CustomButton from "../CustomButton";

interface ActionBarProps {
  allNotes: Note[];
  selectedNoteId: string | null;
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
  const selectedNote = selectedNoteId
    ? findNoteById(selectedNoteId, allNotes)
    : null;

  return (
    <>
      {filterType === "archived" || selectedNote?.isArchive === true ? (
        <Tooltip title="Unarchive Note" arrow>
          <CustomButton
            startIcon={
              <UnarchiveOutlinedIcon className="text-primary-color !w-10 !h-10" />
            }
            onClick={(event) =>
              handleAsyncAction(
                handleUnrchiveNote,
                selectedNoteId as string,
                event,
                popoverManager,
                ACTION_MESSAGES.UNARCHIVE
              )
            }
          >
            {/* Unarchive */}
          </CustomButton>
        </Tooltip>
      ) : (
        <Tooltip title="Archive Note">
          <CustomButton
            startIcon={
              <ArchiveOutlinedIcon className="text-primary-color !w-10 !h-10 " />
            }
            onClick={(event) =>
              handleAsyncAction(
                handleArchiveNote,
                selectedNoteId as string,
                event,
                popoverManager,
                ACTION_MESSAGES.ARCHIVE
              )
            }
          >
            {/* Archive */}
          </CustomButton>
        </Tooltip>
      )}

      <Tooltip title="Delete">
        <CustomButton
          startIcon={
            <DeleteOutlineOutlinedIcon className="text-primary-color !w-10 !h-10" />
          }
          onClick={(event) =>
            handleAsyncAction(
              handleDeleteNote,
              selectedNoteId as string,
              event,
              popoverManager,
              ACTION_MESSAGES.DELETE
            )
          }
        >
          {/* Delete */}
        </CustomButton>
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
