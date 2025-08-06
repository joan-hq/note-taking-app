import * as React from "react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import type { PopoverType } from "../types/index";
import { useTheme } from "@mui/material/styles";

interface CustomPopoverProps {
  customPopoverOpen: boolean;
  popoverMessage: string;
  anchorEl: HTMLElement | null;
  handlePopoverClose: () => void;
  popoverType: PopoverType;
}

const CustomPopover = ({
  customPopoverOpen,
  popoverType,
  popoverMessage,
  anchorEl,
  handlePopoverClose,
}: CustomPopoverProps) => {
  const theme = useTheme();
  let textColor;
  if (popoverType === "error") {
    textColor = theme.palette.error.main;
  } else if (popoverType === "success") {
    textColor = theme.palette.success.main; // <-- Use the success color
  } else {
    textColor = theme.palette.text.primary;
  }
  return (
    <Popover
      open={customPopoverOpen}
      anchorEl={anchorEl}
      onClose={handlePopoverClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
    >
      <Typography sx={{ p: 2, color: textColor }}>{popoverMessage}</Typography>
    </Popover>
  );
};

export default CustomPopover;
