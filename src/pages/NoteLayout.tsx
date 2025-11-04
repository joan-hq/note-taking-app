import { useState } from "react";
import { Box, useMediaQuery, useTheme, Drawer } from "@mui/material";

import LeftSide from "./LeftSide";
import DesktopView from "./DesktopView";
import MobileView from "./MobileView";

const NoteLayout = () => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("lg"));
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);

  const handleShowSideBar = () => {
    setMobileOpen(true);
  };
  const handleHideSideBar = () => {
    setMobileOpen(false);
  };

  return (
    <Box className="h-screen p-4">
      {isDesktop ? (
        <DesktopView />
      ) : (
        <MobileView onShowSideBar={handleShowSideBar} />
      )}

      {!isDesktop && (
        <Drawer
          anchor="left"
          open={mobileOpen}
          onClose={handleHideSideBar}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            "& .MuiDrawer-paper": { boxSizing: "border-box", width: 280 },
          }}
        >
          <LeftSide />
        </Drawer>
      )}
    </Box>
  );
};

export default NoteLayout;
