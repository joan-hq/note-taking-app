import CustomDialog from "../CustomDialog";
import React from "react";

interface AddNewTagDialogProps {
  newTagInputValue: string;
  open: boolean;
  handleNewTagSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  handleNewTagInput: (event: React.ChangeEvent<HTMLInputElement>) => void;
  hideDialog: () => void;
}

const AddNewTagDialog = ({
  newTagInputValue,
  open,
  hideDialog,
  handleNewTagSubmit,
  handleNewTagInput,
}: AddNewTagDialogProps) => {
  const rules =
    "To create new tag, please follow below rules. Tag cannot be all " +
    "spaces. Tag must be at least 3 characters long. Tag cannot be longer " +
    "than 20 characters.";

  return (
    <CustomDialog
      open={open}
      onClose={hideDialog}
      onSubmit={handleNewTagSubmit}
      onChange={handleNewTagInput}
      value={newTagInputValue}
      title="Create New Tag"
      placeholder="Enter a new tag"
      rulesText={rules}
    />
  );
};

export default AddNewTagDialog;
