import { NoteCard } from "./NoteCard";
import { useNoteContext } from "../context/noteContext";
import { findManyObjectsByIds } from "@/utils/array";
import { Stack, Typography } from "@mui/material";

export const NoteList = () => {
    const {notes,tags,isLoading,setSelectedNoteId} = useNoteContext();
    console.log("notes",notes);
    if (isLoading) return <Typography sx={{ p: 2 }}>Loading...</Typography>;
   

    return(<>
        <Stack spacing={2} sx={{ p: 2 }}>
            {notes.map(
                    (note) => {
                        const displayTags = findManyObjectsByIds(note.tags,tags);
                        return(
                            <NoteCard 
                            key={note.id} 
                            title={note.title}
                            tags={displayTags}
                            tagDisplayLimit={3}
                            isArchived={note.status === 'archived'}
                            lastEdit={new Date(note.lastEdit).toLocaleDateString()}
                            handleNoteCardClick={() => setSelectedNoteId(note.id)}
                            />
                        );
                    }
            )}
        </Stack> 
    </>);
};
