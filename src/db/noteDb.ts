import { db } from './index';
import { notes } from './schema';
import { eq } from 'drizzle-orm';
import { Note } from '@/types';


export const NoteDb = {
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
        const{createdAt,...validChanges} = data;
        const updatedData: any = {...validChanges}

        updatedData.lastEdit = new Date();

        return await db
                    .update(notes)
                    .set(updatedData)
                    .where(eq(notes.id,id));
    },

    permanentlyDelete: async(id: string) => {
        return await db.delete(notes).where(eq(notes.id,id));
    }
};