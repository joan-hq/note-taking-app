//import { useState } from "react";
//import "./App.css";
import NoteList from "./pages/NoteListPage/NoteList";
import NoteDetail from "./pages/NoteDetailPage/NoteDetail";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<NoteList />} />
          <Route path="/detail" element={<NoteDetail />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
