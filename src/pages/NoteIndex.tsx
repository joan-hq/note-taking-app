import React from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Routes, Route } from "react-router-dom";
import NoteLayout from "./NoteLayout";
import NoteLayoutMobile from "./Mobile/NoteLayoutMobile";
import NoteDetailMobile from "./Mobile/NoteDetailMobile";
import { useNote } from "../hooks/useNote";

const NoteIndex = () => {
  const isDesktop = useMediaQuery("(min-width:900px)");
  const noteContext = useNote();

  if (isDesktop) {
    return <NoteLayout {...noteContext} />;
  }

  return (
    <Routes>
      <Route path="/" element={<NoteLayoutMobile />} />
      <Route path="/note/:id" element={<NoteDetailMobile />} />
      <Route path="/note" element={<NoteLayoutMobile />} />
    </Routes>
  );
};

export default NoteIndex;
