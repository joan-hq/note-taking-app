'use client';

import { useEffect } from 'react';
import { useNoteContext } from '@/features/notes/context/noteContext';

export default function DashboardPage() {

  const { selectedNoteId, notes, permanentlyDeleteNote, setSelectedNoteId } = useNoteContext();

  useEffect(() => {
    if (selectedNoteId) {
      const prevNote = notes.find(n => n.id === selectedNoteId);
      if (prevNote && !prevNote.title && !prevNote.content) {
        permanentlyDeleteNote(selectedNoteId);
      }
    }
    setSelectedNoteId(null);
  }, []);

  return (
    <div className="hidden md:flex h-full items-center justify-center text-gray-400 text-sm">
      select or create a note
    </div>
  );
}