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
    return await NoteService.update(id, changes);
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