import { db } from './index';
import { tags } from './schema';
import { eq } from 'drizzle-orm';
import { Tag } from '@/types';


export const TagDb = {

    getAll: async ():Promise<Tag[]> => {
        return await db.select().from(tags);
    },

    insert: async(newTag: Tag) => {
        return await db.insert(tags).values(newTag);
    },

    delete: async(id: string) => {
        return await db.delete(tags).where(eq(tags.id,id));
    },

    update: async(id: string, changes: Partial<Tag>) => {
        return await db.update(tags).set(changes).where(eq(tags.id,id))
    },

}