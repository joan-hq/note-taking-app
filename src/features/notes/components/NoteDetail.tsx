import { Note } from "../types/noteType";
import { NoteTagDisplay } from "./NoteTagDisplay";
import { Box,Stack,Divider,Typography,TextField} from "@mui/material";
import AccessTimeIcon from '@mui/icons-material/AccessTime';

import { useNoteContext } from "../context/noteContext";
import { findManyObjectsByIds } from "@/utils/array";
interface NoteDetailProps {
    title: string,
    onTitleChange: (title: string) =>void,
    content: string,
    onContentChange: (content: string) => void,
    lastEdit: string,

};

const Header = ({title,onTitleChange} : Pick<NoteDetailProps, 'title' | 'onTitleChange'>) => {
    return (
        <>
        <TextField 
            value={title}
            onChange={(e) => onTitleChange(e.target.value)}
            placeholder="Untitled Note"/>
        </>
    );
};

const LastEditInfo = ({lastEdit} : Pick<NoteDetailProps, 'lastEdit'>) => {
    const formattedDate = new Date(lastEdit).toLocaleString('en', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });

    return (<>
    <AccessTimeIcon/>
    <Typography>lastEdit {formattedDate}</Typography>
    </>);
};


const Content = ({content,onContentChange} : Pick<NoteDetailProps, 'content' | 'onContentChange'>) => {
    return(
        <>
        <TextField 
            value={content}
            onChange={(e) => onContentChange(e.target.value)}
            placeholder="Start...."/>
        </>
    );
};


export const NoteDetail = () => {

    const {notes,tags,updateNote,selectedNoteId,createTagAndAttachToNote} = useNoteContext();
    const currentNote = notes.find(n => n.id === selectedNoteId);
    console.log('note Detail - notes',notes)
    console.log('note Detail - currentNote',currentNote)


    if (!selectedNoteId || !currentNote) {
        return (
            <Box 
                sx={{ 
                    display: 'flex', 
                    flexDirection: 'column',
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    height: '100%',
                    color: 'text.disabled',
                    gap: 2
                }}
            >
                <Box sx={{ fontSize: '3rem' }}>📝</Box>
                <Typography variant="h6">No note selected yet</Typography>
                <Typography variant="body2">
                    Select a note from the list on the left to view its details.
                </Typography>
            </Box>
        );
    }

    return (<>
    <Box sx={{ p: 3 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                <Header title={currentNote.title} onTitleChange={(newTitle) => updateNote(currentNote.id, {title: newTitle})}/>
            </Stack>

            <Stack spacing={1} sx={{ mt: 1, mb: 3 }}>
                <LastEditInfo lastEdit={currentNote.lastEdit} />
                
                <NoteTagDisplay 
                    allTags={tags} 
                    linkedTags={findManyObjectsByIds(currentNote.tags, tags)}
                    handleLinkedTag={(newTags) => {
                        const ids = newTags.map(t => t.id);
                    updateNote(currentNote.id, { tags: ids });
                    }}
                    handleConfirm={(newTagName) => {createTagAndAttachToNote(currentNote.id, newTagName)

                    }}
                    
                />
            </Stack>

            <Divider />

             <Content 
                content={currentNote.content} 
                onContentChange={(newContent) => updateNote(currentNote.id, { content: newContent })}
            />
    </Box>
  
       
    </>);
};