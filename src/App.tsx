import { useState } from "react";
//import "./App.css";
import NoteList from "./pages/NoteListPage/NoteList";
import NoteDetail from "./pages/NoteDetailPage/NoteDetail";
import { useNoteList } from "./hooks/useNoteList";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  const noteListProps = useNoteList();

  // Now, you can access the notes property from the returned object
  const { notes, selectedNote, handleNoteSave, handleTagAdd, allTags } =
    noteListProps;

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<NoteList {...noteListProps} />} />
          <Route
            path="/note/:noteID"
            element={
              <NoteDetail
                allNote={noteListProps.notes}
                selectedNote={selectedNote}
                onNoteSave={noteListProps.handleNoteSave}
                onTagAdd={noteListProps.handleTagAdd}
                availableTags={noteListProps.allTags}
              />
            }
          />
          <Route path="*" element={<h1>404 Not Found</h1>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
