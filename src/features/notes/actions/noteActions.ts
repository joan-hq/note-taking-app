'use server';

import { NoteService } from "../api/noteServices";
import { Note } from "../types/noteType";

export const getAllNotesAction = async () => {
    console.log('getnoteaction',NoteService.getAll());
    return await NoteService.getAll();
}


export const createNoteAction = async (): Promise<Note> => {
    return await NoteService.create();
}

export const updateNoteAction = async (id: string, changes: Partial<Note>) => {
    console.log('updateNoteAction called', id, changes);
    try {
        return await NoteService.update(id, changes);
    } catch(error) {
        console.error('updateNoteAction error:', error); 
        throw error;
    }
}

export const deleteNoteAction = async (id: string) => {
    return await NoteService.delete(id);
}

export const getFilteredNotesAction = async (options: {
    status?: string;
    selectedTagIds?: string[];
    searchQuery?: string;
}) => {
    return await NoteService.getFilteredNote([], options);
}