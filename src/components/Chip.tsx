import React from "react";
import Chip from "@mui/material/Chip";

interface MyChipProps {
  label: string;
  variant: "filled" | "outlined";
  color?:
    | "default"
    | "primary"
    | "secondary"
    | "error"
    | "info"
    | "success"
    | "warning"
    | "default";

  icon?: React.ReactElement;
  onClick?: () => void;
}

export default function MyChip({
  label,
  variant,
  icon,
  color,
  onClick,
}: MyChipProps) {
  return (
    <div>
      <Chip
        label={label}
        variant={variant}
        color={color}
        icon={icon}
        onClick={onClick}
      ></Chip>
    </div>
  );
}
