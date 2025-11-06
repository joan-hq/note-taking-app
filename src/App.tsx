import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { NoteProvider } from "./contexts/NoteProvider";
import NoteLayout from "./pages/NoteLayout";

function App() {
  return (
    <NoteProvider>
      <Router>
        <Routes>
          <Route path="/*" element={<NoteLayout />} />
          <Route path="/note/:noteId" element={<NoteLayout />} />
        </Routes>
      </Router>
    </NoteProvider>
  );
}

export default App;
