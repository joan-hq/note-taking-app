import {Note,Tag,FilterType} from '@/types/index';
import { v4 as uuidv4 } from 'uuid';

import {
    removeById,
    updateById
} from '@/utils/array';

import { isEmptyString } from '@/utils/string';

export const NoteService = {

    checkNoteEmpty: (note: Note):boolean => {
        return isEmptyString(note.title) && isEmptyString(note.content);
    },


    create: (): Note=>({
        id: uuidv4(),
        title: "",
        content: "",
        tags: [],
        createdAt: new Date().toISOString(),
        lastEdit: new Date().toDateString(),
        status: 'active'

    }),

    update: (id:string, allNotes:Note[], changes: Partial<Note>):Note[] => {
        
        const updatedFields = {
            ...changes,
            lastEdit: new Date().toISOString(),
        };
        
        return updateById(allNotes,id,updatedFields);
    },


    archive: (id: string, allNotes: Note[]): Note[] => {
        return NoteService.update(id,allNotes, {
            status: 'archived',           
        })
    },

    unarchive: (id: string, allNotes: Note[]): Note[] => {
        return  NoteService.update( id,allNotes, {
            status: 'active',
        })
    },

    delete: (id: string, allNotes: Note[]): Note[] => {
        return NoteService.update( id, allNotes,{
            status: 'trashed',
            lastEdit: new Date().toISOString(), 
        })
    },

    deletePermanently: (id: string, allNotes: Note[]): Note[] => {
        return removeById(allNotes,id);
    },

    restore: (id: string, allNotes: Note[]): Note[] => {
        return updateById(allNotes, id, {
            status: 'active',
            lastEdit: new Date().toDateString(), 
        })
    },


    filterNoteByStatus: (notes: Note[], status: string): Note[] => {
        if(status === 'all') {
            return notes;
        }

        return notes.filter(note => note.status === status)
    },


    getFilteredNote: (
        notes: Note[],
        allTags: Tag[],
        options: {
            status?: FilterType;
            selectedTagIds?: string[];
            searchQuery?: string;
        }
    ): Note[] => {

        const {
            status="active", 
            selectedTagIds=[],
            searchQuery=""} = options;

        const query = searchQuery.toLowerCase().trim();

        let filteredNote  = NoteService.filterNoteByStatus(notes, status);

        if(selectedTagIds.length > 0){
            filteredNote = filteredNote.filter( 
                note =>selectedTagIds.every(id => note.tags.includes(id))
            )
        }

        if(query){
            const getMachedTagIdsFromQuery = allTags.filter(
                tag => tag.label.toLowerCase().includes(query)
            ).map( tag => tag.id)

            filteredNote = filteredNote.filter(
                note => {
                   const contentMatch =  note.content.toLowerCase().includes(query);
                   const titleMatch = note.title.toLowerCase().includes(query); 
                   const tagsMatch = note.tags.some(id => getMachedTagIdsFromQuery.includes(id))

                   return contentMatch || titleMatch || tagsMatch;
                }
            )
        }

        return filteredNote;


    },

    sortNoteByEdit: (notes: Note[]):Note[] => {

        return [...notes].sort((a,b) => new Date(b.lastEdit).getTime() - new Date(a.lastEdit).getTime())
    },

    sortNoteByName: (notes: Note[]): Note[] => {
        return [...notes].sort((a,b) => {
            return a.title.localeCompare(b.title);
        })
    },

    countNotes: (notes: Note[]) => {
        return {
            active: notes.filter(n => n.status === 'active').length,
            archived: notes.filter(n => n.status === 'archived').length,
            trashed: notes.filter(n => n.status === 'trashed').length,
        };
    },


    toggleTag: (note:Note,tagId: string) => {
        const {tags} = note;

        const hasTag = tags.includes(tagId);

        if(hasTag){
            return tags.filter(id => id !== tagId)
        } else {
            return [...tags,tagId]
        }
    },
}


