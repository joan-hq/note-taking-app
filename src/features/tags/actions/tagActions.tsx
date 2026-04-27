'use server';
import { TagService } from '../api/tagServices';
import { Tag } from '../types/tagType';

export const getAllTagsAction = async (): Promise<Tag[]> => {
     try {
        console.log('getAllTagsAction called');     
        const result = await TagService.getAll();
        console.log('getAllTagsAction result', result);  
        return result;
    } catch (error) {
        console.log('getAllTagsAction error:', error);   
        throw error;
    }
}

export const createTagAction = async (label: string, tags: Tag[], color?: string): Promise<Tag> => {
    return await TagService.create(label, tags, color);
}

export const updateTagAction = async (id: string, tags: Tag[], changes: Partial<Tag>): Promise<void> => {
    return await TagService.update(id, tags, changes);
}

export const deleteTagAction = async (id: string): Promise<void> => {
    return await TagService.delete(id);
}