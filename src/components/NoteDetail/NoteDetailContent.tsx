import { Box } from "@mui/material";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

interface NoteDetailContentProps {
  noteValue: string;
  handleContentOnChange: (content: string) => void;
}

const NoteDetailContent = ({
  noteValue,
  handleContentOnChange,
}: NoteDetailContentProps) => {
  return (
    <Box id="note-content">
      <ReactQuill
        theme="snow"
        placeholder="Enter your note here..."
        value={noteValue}
        onChange={handleContentOnChange}
        modules={{
          toolbar: [
            ["bold", "italic", "underline", "strike"],
            ["blockquote", "code-block"],
            [{ list: "ordered" }, { list: "bullet" }],
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            [{ color: [] }, { background: [] }],
            ["link", "image"],
            ["clean"],
          ],
        }}
      />
    </Box>
  );
};

export default NoteDetailContent;
