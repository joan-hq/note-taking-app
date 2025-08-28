import React from "react";
import { Typography } from "@mui/material";

interface NoteFilterResultsTitleProps {
  title: string;
}

const NoteFilterResultsTitle = ({ title }: NoteFilterResultsTitleProps) => {
  return (
    <Typography variant="h4" component="h1">
      {title}
    </Typography>
  );
};

export default NoteFilterResultsTitle;
