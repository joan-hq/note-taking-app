import { createContext,ReactNode,useCallback,useContext } from "react";
import { useNotes } from "@/features/notes/hooks/useNotes";
import { useTagContext } from "@/features/tags/context/tagContext"; 
import { deleteTagAction } from "@/features/tags/actions/tagActions";
import { updateNoteAction } from "../actions/noteActions";

interface NoteContextType extends ReturnType<typeof useNotes>{
    tags: ReturnType<typeof useTagContext>['tags'];
    deleteTag: (tagId: string) => Promise<void>;
    createTagAndAttachToNote: (noteId: string, label: string) => Promise<void>;
};
//create NoteContext
const NoteContext = createContext<NoteContextType | undefined>(undefined);

//check if NoteContext is undefined,if yes, throw error
export const useNoteContext = () => {
    const context = useContext(NoteContext);
    if(!context){
        throw new Error("use useNoteContext inside NoteProvider")
    }
    return context;
};

// use NoteContext
export const NoteProvider = ({children}: {children: ReactNode}) => {
    const noteMethods = useNotes();

    const {notes,setNotes} = noteMethods;

    const {tags,setTags,addTag} = useTagContext();

    const deleteTagAndCleanupNotes = useCallback(async (tagId:string)=>{
        const preTags = [...tags];
        const preNotes = [...notes];

        setTags(prevTags => prevTags.filter(tag => tag.id !== tagId))
        setNotes(prevvNotes => prevvNotes.map(note => ({
            ...note,
            tags: note.tags.filter(id => id !== tagId)
        })))

        try{
            await deleteTagAction(tagId);
        }catch(error){
            setTags(preTags);
            setNotes(preNotes);
        }
    },[tags,notes,setTags,setNotes]);

    const createTagAndAttachToNote = useCallback(async (noteId: string, label: string) => {
    try {
        const newTag = await addTag(label); 
        
        if (newTag && newTag.id) {
            setNotes(prevNotes => prevNotes.map(note => {
                if (note.id === noteId) {
                    const hasTag = note.tags.includes(newTag.id);
                    return {
                        ...note,
                        tags: hasTag ? note.tags : [...note.tags, newTag.id]
                    };
                }
                return note;
            }));
        }
    } catch (error) {
        console.error("创建并关联标签失败:", error);
    }
}, [addTag, setNotes]);



    return (
        <NoteContext.Provider value={{ 
        ...noteMethods,
        tags,
        deleteTag:deleteTagAndCleanupNotes,
        createTagAndAttachToNote,
        }}>
        {children}
        </NoteContext.Provider>
    );
};
