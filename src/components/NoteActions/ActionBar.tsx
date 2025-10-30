import ArchiveOutlinedIcon from "@mui/icons-material/ArchiveOutlined";
import UnarchiveOutlinedIcon from "@mui/icons-material/UnarchiveOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import CustomPopover from "../CustomePopover";
import { useCustomPopover } from "../../hooks/useCustomPopover";
import { handleAsyncAction, findNoteById } from "../../helpers/noteHelpers";
import { ACTION_MESSAGES } from "../../constants/messages";
import Button from "@mui/material/Button";
import styled from "styled-components";
import { useNoteContext } from "../../contexts/NoteProvider";

interface ActionBarProps {
  className?: string;
}

const StyledButton = styled(Button)`
  && {
    color: #4b5563;
    font-size: 0.9rem;
  }
`;
const ActionBar = ({ className }: ActionBarProps) => {
  const { filters, notes } = useNoteContext();
  const iconStyle = "text-gray-700";
  const popoverManager = useCustomPopover();
  const selectedNote = notes.selectedNoteId
    ? findNoteById(notes.selectedNoteId, notes.allNotes)
    : null;

  return (
    <div className={className}>
      {filters.filterType === "archived" || selectedNote?.isArchive === true ? (
        <StyledButton
          size="medium"
          startIcon={<UnarchiveOutlinedIcon className={iconStyle} />}
          onClick={(event) =>
            handleAsyncAction(
              notes.handleUnrchiveNote,
              notes.selectedNoteId as string,
              event,
              popoverManager,
              ACTION_MESSAGES.UNARCHIVE
            )
          }
          sx={{ textTransform: "none", color: "grey-700" }}
        >
          Unarchive
        </StyledButton>
      ) : (
        <StyledButton
          size="medium"
          startIcon={<ArchiveOutlinedIcon className={iconStyle} />}
          onClick={(event) =>
            handleAsyncAction(
              notes.handleArchiveNote,
              notes.selectedNoteId as string,
              event,
              popoverManager,
              ACTION_MESSAGES.ARCHIVE
            )
          }
          sx={{ textTransform: "none" }}
        >
          Archive
        </StyledButton>
      )}
      <StyledButton
        size="medium"
        startIcon={<DeleteForeverOutlinedIcon className={iconStyle} />}
        onClick={(event) =>
          handleAsyncAction(
            notes.handleDeleteNote,
            notes.selectedNoteId as string,
            event,
            popoverManager,
            ACTION_MESSAGES.DELETE
          )
        }
        sx={{ textTransform: "none" }}
      >
        Delete
      </StyledButton>
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
