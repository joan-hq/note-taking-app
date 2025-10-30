import { useState } from "react";
import {
  Box,
  useMediaQuery,
  useTheme,
  Drawer,
  IconButton,
} from "@mui/material";

import TagManagement from "./TagManagement";
import NoteStatusFilter from "../components/NoteActions/StatusFilter";
import ReuseTitle from "../components/ReuseTitle";
import NoteLogo from "./NoteLogo";
import NoteDetail from "./NoteDetail";
import ActionBar from "../components/NoteActions/ActionBar";
import NewNoteButton from "../components/NoteActions/NewNoteButton";
import SearchBar from "../components/NoteActions/SearchBar";
import NoteBrifeView from "../components/NoteBrifeView/index";
import { useNoteContext } from "../contexts/NoteProvider";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
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
