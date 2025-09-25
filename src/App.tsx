//import "./App.css";
import Grid from "@mui/material/Grid";

import NoteDetail from "./pages/NoteDetail";
import NoteList from "./pages/NoteList";
import NoteLayout from "./pages/NoteLayout";
import NoteIndex from "./pages/NoteIndex";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { NoteProvider } from "./contexts/NoteProvider";
import { useNote } from "./hooks/useNote";
function App() {
  return (
    <NoteProvider>
      <Router>
        <Routes>
          <Route path="/" element={<NoteIndex />} />
        </Routes>
      </Router>
    </NoteProvider>
  );
}

export default App;
