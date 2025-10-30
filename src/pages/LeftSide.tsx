import { Box } from "@mui/material";
import TagManagement from "./TagManagement";
import NoteStatusFilter from "../components/NoteActions/StatusFilter";
import NewNoteButton from "../components/NoteActions/NewNoteButton";
import NoteLogo from "./NoteLogo";

const LeftSide = () => {
  return (
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
  );
};

export default LeftSide;
