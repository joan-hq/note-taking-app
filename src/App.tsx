//import "./App.css";
import Grid from "@mui/material/Grid";

import NoteDetail from "./pages/NoteDetail";
import NoteList from "./pages/NoteList";
import NoteLayout from "./pages/NoteLayout";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<NoteLayout />} />
          {/* <Route path="/note/:noteId" element={<NoteDetail />} /> */}
        </Routes>
      </Router>
    </>
  );
}

export default App;
