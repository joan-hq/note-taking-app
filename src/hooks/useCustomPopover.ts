import { useState, useCallback } from "react";
import type { PopoverType } from "../types/index";

export interface CustomPopoverState {
  message: string;
  type: PopoverType;
  anchorEl: HTMLElement | null;
}

export const useCustomPopover = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [popoverData, setPopoverData] = useState<CustomPopoverState>({
    message: "",
    type: "info",
    anchorEl: null,
  });

  const showPopover = useCallback((data: CustomPopoverState) => {
    setOpen(true);
    setPopoverData(data);
  }, []);

  const hidePopover = useCallback(() => {
    setOpen(false);
    setPopoverData((prev) => ({ ...prev, anchorEl: null }));
  }, []);

  return {
    open,
    message: popoverData.message,
    type: popoverData.type,
    anchorEl: popoverData.anchorEl,
    showPopover,
    hidePopover,
  };
};
