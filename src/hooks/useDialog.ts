import { useState, useCallback } from "react";

export const useDialog = () => {
  const [open, setOpen] = useState<boolean>(false);

  const showDialog = useCallback(() => {
    setOpen(true);
  }, []);

  const hideDialog = useCallback(() => {
    setOpen(false);
  }, []);

  return { open, showDialog, hideDialog };
};
