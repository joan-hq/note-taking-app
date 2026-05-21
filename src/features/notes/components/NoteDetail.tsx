import { useState } from "react";
import { NoteTagDisplay } from "./NoteTagDisplay";
import { Divider, Typography } from "@mui/material";
import AccessTimeIcon from '@mui/icons-material/AccessTime';

import { useNoteContext } from "../context/noteContext";
import { findManyObjectsByIds } from "@/utils/array";


interface NoteDetailProps {
    title: string,
    onTitleChange: (title: string) => void,
    content: string,
    onContentChange: (content: string) => void,
    lastEdit: string,

};

const Header = ({ title, onTitleChange }: Pick<NoteDetailProps, 'title' | 'onTitleChange'>) => {
    return (
        <input
            value={title}
            onChange={(e) => onTitleChange(e.target.value)}
            placeholder="Untitled Note"
            className="w-full text-2xl font-semibold outline-none bg-transparent 
            text-[--color-text-primary] placeholder:text-[--color-text-muted]"
        />
    );
};


const LastEditInfo = ({ lastEdit }: Pick<NoteDetailProps, 'lastEdit'>) => {
    const formattedDate = new Date(lastEdit).toLocaleString('en', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });

    return (
        <div className="flex items-center gap-1 text-xs text-[--color-text-muted]">
            <AccessTimeIcon sx={{ fontSize: 12 }} />
            <span>{formattedDate}</span>
        </div>
    );
};


const Content = ({ content, onContentChange }: Pick<NoteDetailProps, 'content' | 'onContentChange'>) => {
    return (
        <textarea
            value={content}
            onChange={(e) => onContentChange(e.target.value)}
            placeholder="Start writing..."
            className="w-full min-h-96 outline-none bg-transparent 
            text-[--color-text-primary] placeholder:text-[--color-text-muted] resize-none 
            text-sm leading-relaxed"
        />
    );
};


export const NoteDetail = () => {

    const { tags, updateNote, selectedNote, createTagAndAttachToNote } = useNoteContext();

    const [isAiOpen, setIsAiOpen] = useState(false);


    if (!selectedNote) {
        return (
            <div className="flex flex-col items-center justify-center 
             h-full text-[--color-text-muted] gap-2">
                <span className="text-5xl">📝</span>
                <Typography variant="h6">No note selected yet</Typography>
                <Typography variant="body2">Select a note from the list on the left to view its details.</Typography>
            </div>
        );
    }

    return (
        <div className="relative p-6 flex flex-col gap-3 h-full">
            <Header
                title={selectedNote.title}
                onTitleChange={(newTitle) => updateNote(selectedNote.id, { title: newTitle })}

            />
            <LastEditInfo lastEdit={selectedNote.lastEdit} />
            <NoteTagDisplay
                allTags={tags}
                linkedTags={findManyObjectsByIds(selectedNote.tags, tags)}
                handleLinkedTag={(newTags) => updateNote(selectedNote.id, { tags: newTags.map(t => t.id) })}
                handleConfirm={(newTagName) => createTagAndAttachToNote(selectedNote.id, newTagName)}
            />
            <Divider />
            <Content
                content={selectedNote.content}
                onContentChange={(newContent) => updateNote(selectedNote.id, { content: newContent })}
            />

        </div>
    );
};