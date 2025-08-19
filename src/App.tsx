//import { useState } from "react";
//import "./App.css";
import NoteList from "./pages/NoteListPage/NoteList";
//import NoteDetail from "./pages/NoteDetailPage/NoteDetail";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<NoteList />} />
          {/* <Route
            path="/note/:noteID"
            element={<NoteDetail allNote={notes} />}
          /> */}
          {/* <Route path="*" element={<h1>404 Not Found</h1>} /> */}
        </Routes>
      </Router>
    </>
  );
}

export default App;
