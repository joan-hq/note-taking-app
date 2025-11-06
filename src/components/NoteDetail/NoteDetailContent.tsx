import { Box } from "@mui/material";
import "quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import "./NoteDetailContent.css";
import { useEffect, useRef } from "react";

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

  const isInitializing = useRef(true);
  useEffect(() => {
    isInitializing.current = true;
    const timer = setTimeout(() => {
      isInitializing.current = false;
    }, 100);

    return () => clearTimeout(timer);
  }, [noteValue]);

  const handleQuillChange = (value: string) => {
    if (isInitializing.current) {
      return;
    }
    handleContentOnChange(value);
  };

  return (
    <Box>
      <ReactQuill
        theme="snow"
        value={noteValue}
        onChange={handleQuillChange}
        modules={modules}
        placeholder="Enter your rich note content here..."
        style={{ minHeight: "250px", marginBottom: "1rem" }}
      />
    </Box>
  );
};
export default NoteDetailContent;
