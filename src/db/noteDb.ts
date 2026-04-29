
import { db } from './index';
import { notes, noteTags } from './schema';
import { eq, and, desc} from 'drizzle-orm';
import { Note, NoteStatus } from '@/features/notes/types/noteType';

const mapNoteRows = (noteRows: any[], relation:any[]):Note[] => {
    return noteRows.map(note => ({
        ...note,
        createdAt: note.createdAt.toISOString(),
        lastEdit:note.lastEdit.toISOString(),
        tags: relation.filter(rel => rel.noteId === note.id)
        .map(rel => rel.tagId)
    }) )
};


export const NoteDb = {
    getAll: async(): Promise<Note[]> => {
            const allNotes = await db.select().from(notes).orderBy(desc(notes.lastEdit));
            const allRelatedTags = await db.select().from(noteTags);

            return mapNoteRows(allNotes,allRelatedTags);
    },


    insert: async (newNote: Note) => {
        return await db.insert(notes).values({
            id: newNote.id,
            title: newNote.title,
            content: newNote.content,
            status: newNote.status,
            createdAt: new Date(newNote.createdAt),
            lastEdit: new Date(newNote.lastEdit),
        });
    },

    update: async(id: string, data: Partial<Note>)=> {
        const{createdAt,id: _id, tags, ...validChanges} = data;
        const updatedData: Partial<typeof notes.$inferInsert> = {
            ...validChanges,
            lastEdit: new Date(),
        }
        console.log('DB update called', id, data);

        try{
             await db
                    .update(notes)
                    .set(updatedData)
                    .where(eq(notes.id,id));
            console.log('DB update success');
        }catch(error){
            console.log('DB update error', error);
            throw error;
        }

       
    },

    permanentlyDelete: async(id: string) => {
        return await db.delete(notes).where(eq(notes.id,id));
    },

    getByStatus: async (status: NoteStatus): Promise<Note[]> => {
        const result = await db.select().from(notes).where(eq(notes.status,status));
        const rels = await db.select().from(noteTags);
        return mapNoteRows(result,rels);
    },

    bindTag: async(noteId: string, tagId:string) => {
        return await db.insert(noteTags).values({noteId:noteId, tagId:tagId});
    },
    
    unbindTag: async (noteId: string, tagId: string) => {
        return await db.delete(noteTags)
            .where(
                and(
                    eq(noteTags.noteId, noteId), 
                    eq(noteTags.tagId, tagId)
                )
            );
    },
};