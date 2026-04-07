import {Tag,Note} from '@/types/index';
import { v4 as uuidv4 } from 'uuid';
import {
    removeById,
    updateById
} from '@/utils/array';
import { isEmptyString } from '@/utils/string';
import { TAG_VALIDATION_MESSAGES } from '@/constants/messages';


export const TagService = {
    validation: (
        label: string,
        allTags: Tag[],
        editingTagId? : string,

    ): {isValid: boolean; error?: string } => {
        const trimmedLabel = label.trim();

        if(isEmptyString(trimmedLabel)){
            return {
                isValid:false, error: TAG_VALIDATION_MESSAGES.EMPTY
            }
        }

        if(trimmedLabel.length > 20){
            return {
                isValid:false, error: TAG_VALIDATION_MESSAGES.TOO_LONG
            }
        }

        if(trimmedLabel.length < 3){
            return {
                isValid:false, error: TAG_VALIDATION_MESSAGES.TOO_SHORT
            }
        }

        const isDuplicate = allTags.some(tag => 
            tag.id !== editingTagId && 
            tag.label.toLowerCase() === trimmedLabel.toLowerCase()
            );

        if (isDuplicate) {
            return { isValid: false, error: TAG_VALIDATION_MESSAGES.DUPLICATE };
        }

        return { isValid: true };
    },
    

    exists: (label:string, allTags: Tag[]):boolean => {
        const searchlabel = label.toLowerCase().trim();
        return allTags.some(tag => tag.label.toLowerCase() === searchlabel);
    },

    create: (label: string, color: string = "#3b82f6"):Tag => ({
        id: uuidv4(),
        label: label.trim(),
        color: color
    }),

    update: (tagId: string, allTags: Tag[], changes: Partial<Tag>): Tag[] => {
        return updateById(allTags, tagId, changes);
    },


    delete: (
        tagId: string,
        allTags: Tag[],
        allNotes: Note[],
        updateNote: (newNotes: Note[]) => void

    ): Tag[] => {
        const newTags = removeById( allTags, tagId);

        const cleanNotes = allNotes.map(note => {
            if (!note.tags.includes(tagId)) return note; 
            
            return {
                ...note,
                tags: note.tags.filter(id => id !== tagId)
            };
        })

        updateNote(cleanNotes);
        return newTags;
    },

};


