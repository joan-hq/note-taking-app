
//import "./App.css";
import Grid from "@mui/material/Grid";

import NoteDetail from "./pages/NoteDetail";
import NoteList from "./pages/NoteList";
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
