import { Box } from "@mui/material";
import ReuseTitle from "../components/ReuseTitle";
import SearchBar from "../components/NoteActions/SearchBar";
import NoteBrifeView from "../components/NoteBrifeView/index";
import NoteViewer from "./NoteViewer";
import ActionBar from "../components/NoteActions/ActionBar";
import NoteLogo from "./NoteLogo";
import NewNoteButton from "../components/NoteActions/NewNoteButton";
import TagManagement from "./TagManagement";
import { useNoteContext } from "../contexts/NoteProvider";
import NoteStatusFilter from "../components/NoteActions/StatusFilter";

const DesktopView = () => {
  const { filters } = useNoteContext();

  return (
    <Box className="grid h-screen grid-cols-[280px_400px_1fr] gap-4 p-4">
      <Box className="flex flex-col h-full p-4 border-r bg-gray-50 border-gray-200">
        <div className="flex flex-col gap-5">
          <div className="flex justify-center">
            <NoteLogo className="flex items-center gap-2 text-primary-color text-3xl font-semibold" />
          </div>
          <NewNoteButton className="w-full" />
          <NoteStatusFilter />
        </div>
        <hr className="my-5 border-gray-200" />
        <TagManagement />
      </Box>

      <Box className="bg-white border-r border-gray-200 p-1">
        <ReuseTitle
          title={filters.noteFilterTitle}
          className="!text-2xl text-primary-color font-semibold"
        />
        <Box className="my-2">
          <SearchBar className="!rounded-full" />
        </Box>
        <Box className={`overflow-y-scroll h-[calc(100vh-8rem)]`}>
          <NoteBrifeView />
        </Box>
      </Box>

      <Box className="bg-white border-r border-gray-200 p-1">
        <NoteViewer />
        <ActionBar className="absolute top-2 right-2 mx-11" />
      </Box>
    </Box>
  );
};

export default DesktopView;
