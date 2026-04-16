import { createContext,ReactNode,useContext } from "react";
import { useNotes } from "@/hooks/useNotes";

type NoteContextType = ReturnType<typeof useNotes>;
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
    const noteData = useNotes();
    return (
        <NoteContext.Provider value={noteData}>
        {children}
        </NoteContext.Provider>
    );
};
