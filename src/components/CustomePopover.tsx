import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import type { PopoverType } from "../types/index";

interface CustomPopoverProps {
  open: boolean;
  type: PopoverType;
  message: string;
  anchorEl: HTMLElement | null;
  onClose: () => void;
}

const getBackgroundColor = (type: PopoverType): string => {
  switch (type) {
    case "success":
      return "#4caf50";
    case "error":
      return "#f44336";
    case "warning":
      return "#ff9800";
    case "info":
      return "#2196f3";
    default:
      return "#fafafa";
  }
};

const getTextColor = (type: PopoverType): string => {
  switch (type) {
    case "success":
      return "#000000";
    case "error":
      return "#000000";
    case "warning":
      return "#000000";
    case "info":
      return "#000000";
    default:
      return "#000000";
  }
};

const CustomPopover = ({
  open,
  type,
  message,
  anchorEl,
  onClose,
}: CustomPopoverProps) => {
  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
    >
      <div
        style={{
          backgroundColor: getBackgroundColor(type),
          color: getTextColor(type),
          padding: "10px 15px",
          borderRadius: "4px",
        }}
      >
        <Typography sx={{ p: 1, color: "white" }}>{message}</Typography>
      </div>
    </Popover>
  );
};

export default CustomPopover;
