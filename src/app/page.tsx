'use client';

import { SideBar } from '@/features/notes/views/SideBar';
import { MiddlerBar } from '@/features/notes/views/MiddleBar';

import { NoteDisplay } from '@/features/notes/views/NoteDisplay';


export default function HomePage() {

  return (
    <div className="flex h-screen bg-[--color-bg-secondary]">
      <div className="w-60 border-r border-gray-100 bg-[--color-bg-sidebar] flex flex-col h-screen">
        <SideBar />
      </div>
      <div className="w-72 border-r border-gray-100 bg-[--color-bg-primary] h-screen overflow-hidden">
        <MiddlerBar />
      </div>
      <div className="flex-1 bg-[--color-bg-primary] relative overflow-hidden">
        <NoteDisplay />
      </div>
    </div>
  );
}