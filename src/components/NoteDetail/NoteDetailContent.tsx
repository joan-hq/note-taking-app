import { Box } from "@mui/material";
import "quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import "./NoteDetailContent.css";

interface NoteDetailContentProps {
  noteValue: string;
  handleContentOnChange: (value: string) => void;
}

const NoteDetailContent = ({
  noteValue,
  handleContentOnChange,
}: NoteDetailContentProps) => {
  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
      ["clean"],
    ],
  };

  return (
    <Box>
      <ReactQuill
        theme="snow"
        value={noteValue}
        onChange={handleContentOnChange}
        modules={modules}
        placeholder="Enter your rich note content here..."
        style={{ minHeight: "250px", marginBottom: "1rem" }}
      />
    </Box>
  );
};
export default NoteDetailContent;
