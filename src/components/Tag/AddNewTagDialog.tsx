// src/components/AddNewTagDialog.tsx

import CustomDialog from "../CustomDialog"; // <-- 1. 导入我们新的可重用组件
import React from "react";

// 2. 你的 props 接口保持不变
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
  // 3. 把你的规则文本定义在这里
  const rules =
    "To create new tag, please follow below rules. Tag cannot be all " +
    "spaces. Tag must be at least 3 characters long. Tag cannot be longer " +
    "than 20 characters.";

  // 4. 渲染 CustomDialog 并“连接”你的 props
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
