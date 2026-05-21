import { NoteCard } from "./NoteCard";
import { useNoteContext } from "../context/noteContext";
import { findManyObjectsByIds } from "@/utils/array";
import { Stack, Typography, Box } from "@mui/material";

export const NoteList = () => {
    const { notes, tags, isLoading, selectNote, selectedNoteId, filterTagId } = useNoteContext();
    console.log("notes", notes);
    if (isLoading) return <Typography sx={{ p: 2 }}>Loading...</Typography>;
    if (notes.length === 0) return (
        <Box sx={{ p: 2, textAlign: 'center', color: 'text.disabled' }}>
            <Typography variant="body2">No notes here</Typography>
        </Box>
    );

    return (<>
        <Stack spacing={2} sx={{ p: 2 }}>
            {notes.map(
                (note) => {
                    const displayTags = findManyObjectsByIds(note.tags, tags);
                    const isAi = note.type === "ai_summary";
                    const finalTags = isAi
                        ? [
                            { id: "ai-sync-tag", label: "AI Sync", color: "#d06262" },
                            ...displayTags
                        ]
                        : displayTags;
                    return (
                        <NoteCard

                            key={note.id}
                            title={isAi ? `🤖 ${note.date || ''} | ${note.title}` : note.title}
                            tags={finalTags}
                            tagDisplayLimit={3}
                            isArchived={note.status === 'archived'}
                            lastEdit={new Date(note.lastEdit).toLocaleDateString()}
                            handleNoteCardClick={() => selectNote(note.id)}
                            selectedTagId={filterTagId}
                            isSelected={note.id === selectedNoteId || (!!filterTagId && note.tags.includes(filterTagId))}
                        />
                    );
                }
            )}
        </Stack>
    </>);
};
