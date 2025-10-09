//import "./App.css";

import NoteIndex from "./pages/NoteIndex";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { NoteProvider } from "./contexts/NoteProvider";

function App() {
  return (
    <NoteProvider>
      <Router>
        <Routes>
          <Route path="/*" element={<NoteIndex />} />
        </Routes>
      </Router>
    </NoteProvider>
  );
}

export default App;
