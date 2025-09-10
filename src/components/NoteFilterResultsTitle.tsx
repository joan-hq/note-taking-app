import { Typography } from "@mui/material";

interface NoteFilterResultsTitleProps {
  title: string;
}

const NoteFilterResultsTitle = ({ title }: NoteFilterResultsTitleProps) => {
  return (
    <Typography variant="h4" component="h2" className="text-red-600">
      {title}
    </Typography>
  );
};

export default NoteFilterResultsTitle;
