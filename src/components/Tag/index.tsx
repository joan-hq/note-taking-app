import { Box } from "@mui/material";
import Chip from "@mui/material/Chip";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";
import type { Tag } from "../../types/index";
import AddIcon from "@mui/icons-material/Add";
import { useDialog } from "../../hooks/useDialog";
import { useState } from "react";

import TagSelector from "./TagSelector";
import AddNewTagDialog from "./AddNewTagDialog";
import CustomPopover from "../CustomePopover";
import { useCustomPopover } from "../../hooks/useCustomPopover";
import type { CustomPopoverState } from "../../hooks/useCustomPopover";
import { newTagValidation } from "../../helpers/noteHelpers";
import { v4 as uuidv4 } from "uuid";
import CustomButton from "../CustomButton";
import styled from "styled-components";
const StyledCustomButton = styled(CustomButton)`
  && {
    background-color: var(--color-brand-primary);
  }
`;

interface TagsFieldProps {
  options: Tag[];
  onChange: (event: any, newTags: Tag[]) => void;
  onDelete: (tagId: string) => void;

  noteTags?: Tag[];
  onTagSaved: (newTag: Tag) => void;
}
const TagsField = ({
  options,
  noteTags,
  onChange,
  onDelete,
  onTagSaved,
}: TagsFieldProps) => {
  const { open, showDialog, hideDialog } = useDialog();
  const [newTagInputValue, setNewTagInputValue] = useState("");
  const popoverManager = useCustomPopover();

  const handleNewTagInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTagInputValue(event.target.value);
  };

  const handleNewTagSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const errorMessage = newTagValidation(newTagInputValue, options);
    if (errorMessage) {
      const loadingPopoverState: CustomPopoverState = {
        message: errorMessage,
        type: "error",
        anchorEl: event.currentTarget as HTMLElement,
      };
      popoverManager.showPopover(loadingPopoverState);
      return;
    }
    const newTag = { id: uuidv4(), label: newTagInputValue };
    popoverManager.hidePopover();
    onTagSaved(newTag);
    setNewTagInputValue("");
    hideDialog();
  };

  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Chip
          variant="outlined"
          icon={<LocalOfferOutlinedIcon className="!text-primary-color" />}
          sx={{ border: "none" }}
        />
        <TagSelector
          options={options}
          value={noteTags}
          onChange={onChange}
          onDelete={onDelete}
        />
        <StyledCustomButton
          onClick={showDialog}
          startIcon={<AddIcon className="!text-white" />}
          className="!min-w-0"
        ></StyledCustomButton>

        <AddNewTagDialog
          open={open}
          newTagInputValue={newTagInputValue}
          handleNewTagInput={handleNewTagInput}
          handleNewTagSubmit={handleNewTagSubmit}
          hideDialog={hideDialog}
        />
        <CustomPopover
          open={popoverManager.open}
          message={popoverManager.message}
          type={popoverManager.type}
          anchorEl={popoverManager.anchorEl}
          onClose={popoverManager.hidePopover}
        />
      </Box>
    </>
  );
};

export default TagsField;
