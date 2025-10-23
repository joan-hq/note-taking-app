import ArchiveOutlinedIcon from "@mui/icons-material/ArchiveOutlined";
import UnarchiveOutlinedIcon from "@mui/icons-material/UnarchiveOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import type { FilterType } from "../../types/index";
import CustomPopover from "../CustomePopover";
import { useCustomPopover } from "../../hooks/useCustomPopover";
import { handleAsyncAction, findNoteById } from "../../helpers/noteHelpers";
import { ACTION_MESSAGES } from "../../constants/messages";
import type { Note } from "../../types/index";
import Button from "@mui/material/Button";
import styled from "styled-components";

interface ActionBarProps {
  allNotes: Note[];
  selectedNoteId: string | null;
  filterType: FilterType;
  handleArchiveNote: (noteId: string) => Promise<boolean>;
  handleUnrchiveNote: (noteId: string) => Promise<boolean>;
  handleDeleteNote: (noteId: string) => Promise<boolean>;
  className?: string;
}

const StyledButton = styled(Button)`
  && {
    color: #4b5563;
  }
`;
const ActionBar = ({
  allNotes,
  selectedNoteId,
  filterType,
  handleDeleteNote,
  handleArchiveNote,
  handleUnrchiveNote,
  className,
}: ActionBarProps) => {
  const iconStyle = "text-gray-700";
  const popoverManager = useCustomPopover();
  const selectedNote = selectedNoteId
    ? findNoteById(selectedNoteId, allNotes)
    : null;

  return (
    <div className={className}>
      {filterType === "archived" || selectedNote?.isArchive === true ? (
        <StyledButton
          startIcon={<UnarchiveOutlinedIcon className={iconStyle} />}
          onClick={(event) =>
            handleAsyncAction(
              handleUnrchiveNote,
              selectedNoteId as string,
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
          startIcon={<ArchiveOutlinedIcon className={iconStyle} />}
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
        </StyledButton>
      )}
      <StyledButton
        startIcon={<DeleteForeverOutlinedIcon className={iconStyle} />}
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
