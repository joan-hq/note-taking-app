'use client';

import { useState, useEffect, ReactNode } from 'react';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import { SideBar } from '@/features/notes/views/SideBar';
import { MiddlerBar } from '@/features/notes/views/MiddleBar';
import { NoteDisplay } from '@/features/notes/views/NoteDisplay';
import { useNoteContext } from '@/features/notes/context/noteContext';
import { ActionButton } from '@/components/common/buttons/ActionButton';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import { DropDown } from '@/components/DropDown';
import { AIChatDrawer } from '@/components/common/overlays/AIChat/AIChatDrawer';

export const ClientOnly = ({ children }: { children: ReactNode }) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  if (!mounted) return null;
  return <>{children}</>;
};

const HomePageContent = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isAiOpen, setIsAiOpen] = useState(false);
  const { selectedNote, selectNote, updateNote, setSelectedNoteId, permanentlyDeleteNote, createNote } = useNoteContext();

  const isArchived = selectedNote?.status === 'archived';
  const isTrashed = selectedNote?.status === 'trashed';

  const mobileNoteActions = isTrashed ? [
    { label: 'Restore', onClick: () => { updateNote(selectedNote!.id, { status: 'active' }); setSelectedNoteId(null); } },
    { label: 'Delete Forever', onClick: () => permanentlyDeleteNote(selectedNote!.id) },
  ] : isArchived ? [
    { label: 'Restore', onClick: () => { updateNote(selectedNote!.id, { status: 'active' }); setSelectedNoteId(null); } },
    { label: 'Move to Trash', onClick: () => { updateNote(selectedNote!.id, { status: 'trashed' }); setSelectedNoteId(null); } },
  ] : [
    { label: 'Archive', onClick: () => { updateNote(selectedNote!.id, { status: 'archived' }); setSelectedNoteId(null); } },
    { label: 'Move to Trash', onClick: () => { updateNote(selectedNote!.id, { status: 'trashed' }); setSelectedNoteId(null); } },
  ];

  return (
    <>
      {/* ===================== DESKTOP ===================== */}
      <div className="hidden md:flex h-screen w-screen overflow-hidden bg-[--color-bg-secondary]">
        <div className="w-60 border-r border-gray-200 bg-[--color-bg-sidebar] flex flex-col h-full">
          <SideBar />
        </div>
        <div className="w-72 border-r border-gray-200 bg-[--color-bg-primary] h-full overflow-hidden">
          <MiddlerBar />
        </div>
        <div className="flex-1 bg-[--color-bg-primary] relative h-full overflow-hidden">
          <NoteDisplay
            isAiOpen={isAiOpen}
            onAiOpen={() => setIsAiOpen(true)}
            onAiClose={() => setIsAiOpen(false)}
          />
        </div>
      </div>

      {/* ===================== MOBILE ===================== */}
      <div className="flex flex-col md:hidden h-screen w-screen overflow-hidden bg-[--color-bg-secondary]">

        {/* Mobile Header */}
        <div
          className="flex items-center justify-between px-4 py-3 border-b border-gray-100 shrink-0"
          style={{ background: 'var(--surface)' }}
        >
          {selectedNote ? (
            <>
              <ActionButton title="Back" handleFabClick={() => selectNote(null)}>
                <ArrowBackOutlinedIcon fontSize="small" />
              </ActionButton>
              <span className="font-semibold text-sm truncate mx-2 flex-1" style={{ color: 'var(--text-primary)' }}>
                {selectedNote.title || 'Untitled'}
              </span>
              <DropDown
                trigger={(onClick) => (
                  <ActionButton title="More" handleFabClick={(e) => onClick(e)}>
                    <MoreVertOutlinedIcon fontSize="small" />
                  </ActionButton>
                )}
                items={mobileNoteActions}
                menuItemClassName="text-sm"
              />
            </>
          ) : (
            <>
              <ActionButton title="Menu" handleFabClick={() => setIsSidebarOpen(true)}>
                <MenuOutlinedIcon fontSize="small" />
              </ActionButton>
              <span className="font-bold text-base" style={{ color: 'var(--primary)' }}>
                DashNote
              </span>
              <button
                onClick={() => createNote()}
                className="btn-primary w-8 h-8 rounded-full text-lg flex items-center justify-center"
              >
                +
              </button>
            </>
          )}
        </div>

        {/* Main content */}
        <div className="flex-1 overflow-hidden relative">
          {selectedNote ? (
            <div className="h-full bg-[--color-bg-primary]">
              {/* NoteDisplay 只负责桌面端 AI，移动端 AI 由下方统一管理 */}
              <NoteDisplay
                isAiOpen={false}
                onAiOpen={() => { }}
                onAiClose={() => { }}
              />
            </div>
          ) : (
            <div className="h-full bg-[--color-bg-primary] overflow-hidden">
              <MiddlerBar />
            </div>
          )}
        </div>

        {/* Mobile AI 浮动按钮 — 始终显示 */}
        <button
          onClick={() => setIsAiOpen(true)}
          className="btn-primary fixed bottom-6 right-6 z-20 rounded-xl shadow-lg active:scale-95"
        >
          <span>✨</span> AI
        </button>

        {/* Mobile AI Drawer — 挂在顶层，不依赖 selectedNote */}
        <AIChatDrawer
          isOpen={isAiOpen}
          onClose={() => setIsAiOpen(false)}
          noteContent={selectedNote?.content ?? ""}
          onCreateNote={(aiTitle, aiContent) => {
            setIsAiOpen(false);
            createNote(aiTitle, aiContent);
          }}
        />

        {/* Sidebar drawer */}
        {isSidebarOpen && (
          <>
            <div
              className="fixed inset-0 bg-black/30 z-[998]"
              onClick={() => setIsSidebarOpen(false)}
            />
            <div
              className="fixed left-0 top-0 h-full w-72 z-[999] flex flex-col border-r border-gray-100 shadow-xl"
              style={{ background: 'var(--surface)' }}
            >
              <SideBar />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default function HomePage() {
  return (
    <ClientOnly>
      <HomePageContent />
    </ClientOnly>
  );
}
