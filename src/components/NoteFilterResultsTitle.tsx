import { Typography } from "@mui/material";

interface NoteFilterResultsTitleProps {
  title: string;
  className?: string;
}

const NoteFilterResultsTitle = ({
  title,
  className,
}: NoteFilterResultsTitleProps) => {
  return <Typography className={className}>{title}</Typography>;
};

export default NoteFilterResultsTitle;
