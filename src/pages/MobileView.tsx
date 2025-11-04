import { Box, IconButton } from "@mui/material";
import ReuseTitle from "../components/ReuseTitle";
import SearchBar from "../components/NoteActions/SearchBar";
import NoteBrifeView from "../components/NoteBrifeView/index";
import NoteViewer from "./NoteViewer";
import ActionBar from "../components/NoteActions/ActionBar";
import NewNoteButton from "../components/NoteActions/NewNoteButton";
import { useNoteContext } from "../contexts/NoteProvider";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

interface MobileViewProps {
  onShowSideBar: () => void;
}

const MobileView = ({ onShowSideBar }: MobileViewProps) => {
  const { filters, notes } = useNoteContext();
  return (
    <Box className="p-2 rounded-lg flex flex-col h-full relative">
      {notes.selectedNoteId ? (
        <Box className="bg-white p-2 rounded-lg h-full relative">
          <Box className="flex items-center justify-between">
            <IconButton
              onClick={() => notes.handleNoteCardClick(null)}
              className="absolute top-2 left-2 z-10"
            >
              <ArrowBackIosNewIcon />
            </IconButton>
            <ActionBar className="!absolute top2 right-2 z-10" />
          </Box>
          <NoteViewer />
        </Box>
      ) : (
        <Box className="p-2 rounded-lg flex flex-col h-full relative">
          <Box className="flex items-center justify-between">
            <IconButton onClick={onShowSideBar}>
              <MoreHorizIcon />
            </IconButton>
            <ReuseTitle
              title={filters.noteFilterTitle}
              className="!text-2xl text-primary-color font-semibold"
            />
            <Box sx={{ width: 48 }} />
          </Box>
          <Box className="my-2">
            <SearchBar className="!rounded-full" />
          </Box>
          <Box className={`overflow-y-scroll h-[calc(100vh-8rem)]`}>
            <NoteBrifeView />
          </Box>
          <NewNoteButton isFab={true} className="!absolute bottom-6 right-6" />
        </Box>
      )}
    </Box>
  );
};

export default MobileView;
