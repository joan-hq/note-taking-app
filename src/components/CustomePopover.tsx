import React from "react";
import { Snackbar, Alert, AlertTitle } from "@mui/material";

type AlertType = "success" | "error" | "warning" | "info";

interface CustomPopoverProps {
  open: boolean;
  type: AlertType | string;
  message: string;
  onClose: () => void;
  anchorEl?: any;
}

const getSeverity = (type: string): AlertType => {
  if (["success", "error", "warning", "info"].includes(type)) {
    return type as AlertType;
  }
  return "success";
};

const getTitle = (type: AlertType): string => {
  switch (type) {
    case "success":
      return "Success";
    case "error":
      return "Error";
    case "warning":
      return "Warning";
    case "info":
      return "Info";
    default:
      return "Notification";
  }
};

const CustomPopover: React.FC<CustomPopoverProps> = ({
  open,
  type,
  message,
  onClose,
}) => {
  const severity = getSeverity(type);
  const title = getTitle(severity);

  return (
    <Snackbar
      open={open}
      autoHideDuration={4000}
      onClose={onClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
    >
      <Alert
        onClose={onClose}
        severity={severity}
        variant="filled"
        sx={{ width: "100%", boxShadow: 6 }}
      >
        <AlertTitle sx={{ fontWeight: 600 }}>{title}</AlertTitle>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default CustomPopover;
