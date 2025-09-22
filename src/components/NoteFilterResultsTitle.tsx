import { Typography } from "@mui/material";

interface NoteFilterResultsTitleProps {
  title: string;
}

const NoteFilterResultsTitle = ({ title }: NoteFilterResultsTitleProps) => {
  console.log("title", title);
  return (
    <Typography variant="h4" component="h2">
      {title}
    </Typography>
  );
};

export default NoteFilterResultsTitle;
