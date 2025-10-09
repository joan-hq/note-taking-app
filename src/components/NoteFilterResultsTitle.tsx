import { Typography } from "@mui/material";

interface NoteFilterResultsTitleProps {
  title: string;
  className?: string;
}

const NoteFilterResultsTitle = ({
  title,
  className,
}: NoteFilterResultsTitleProps) => {
  console.log("title", title);

  return (
    <Typography
      className={className}
      sx={{
        fontSize: "1.5rem",
        fontWeight: 700,
      }}
    >
      {title}
    </Typography>
  );
};

export default NoteFilterResultsTitle;
