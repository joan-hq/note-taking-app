import { useState } from "react";

export const useJDialog = () => {
    const [open, setOpen] = useState<boolean>(false);

    const showDialog = () => { setOpen(true)};

    const hideDialog = () => {setOpen(false)};

    return {
        open,showDialog,hideDialog
    };
};