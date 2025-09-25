import React from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import NoteLayout from "./NoteLayout";
import NoteLayoutMobile from "./Mobile/NoteLayoutMobile";
import { useNote } from "../hooks/useNote";
import { useState, useCallback } from "react";
import type { useNoteProps } from "../hooks/useNote";

const NoteIndex = () => {
  const isDesktop = useMediaQuery("(min-width:900px)");

  return <>{isDesktop ? <NoteLayout /> : <NoteLayoutMobile />}</>;
};

export default NoteIndex;
