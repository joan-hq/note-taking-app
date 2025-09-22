import React from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import NoteLayout from "./NoteLayout";
import NoteLayoutMobile from "./Mobile/NoteLayoutMobile";

const NoteIndex = () => {
  //const theme = useTheme;

  const isDesktop = useMediaQuery("(min-width:900px)");

  return <>{isDesktop ? <NoteLayout /> : <NoteLayoutMobile />}</>;
};

export default NoteIndex;
