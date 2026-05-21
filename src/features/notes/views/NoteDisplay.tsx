import { NoteDetail } from '@/features/notes/components/NoteDetail';
import { ActionBar } from '@/features/notes/components/ActionBar';
import { useNoteContext } from "../context/noteContext";
import { useState } from 'react';
import { AIChatDrawer } from '@/components/common/overlays/AIChat/AIChatDrawer';



export const NoteDisplay = () => {
    const { selectedNote } = useNoteContext();
    const [isAiOpen, setIsAiOpen] = useState(false);

    return (
        <div className="relative h-screen overflow-hidden">
            <div className="absolute top-4 right-4 z-10">
                <ActionBar />
            </div>
            <div className="h-full overflow-y-auto">
                <NoteDetail />
            </div>

            {selectedNote && (<>

                <div className="absolute bottom-6 right-6">
                    <button
                        onClick={() => setIsAiOpen(true)}
                        className="flex items-center gap-2 px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-sm font-semibold shadow-sm transition-all active:scale-95"
                    >
                        <span>✨</span> AI Assistant
                    </button>
                </div>


                <AIChatDrawer
                    isOpen={isAiOpen}
                    onClose={() => setIsAiOpen(false)}
                    noteContent={selectedNote.content || ""}
                />
            </>)}
        </div>
    );
}