//import { useState } from "react";
//import "./App.css";
import NoteList from "./pages/NoteListPage/NoteList";
//import NoteDetail from "./pages/NoteDetailPage/NoteDetail";
import Tags from "./components/Tags";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<NoteList />} />
          <Route path="/tags" element={<Tags />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
