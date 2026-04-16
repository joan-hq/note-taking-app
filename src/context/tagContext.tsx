import { createContext,ReactNode,useContext } from "react";
import { useTags } from "@/hooks/useTags";

type TagContextType = ReturnType<typeof useTags>;

const TagContext = createContext<TagContextType | undefined>(undefined);

export const useTagContext = () => {
    const context = useContext(TagContext);
    if(!context) {
        throw new Error ("TagContext is undefined ")
    } 

    return context;
};

export const TagProvider = ({children} : {children: ReactNode}) => {
    const data = useTags();

    return (
        <TagContext.Provider value={data}>
        {children}
        </TagContext.Provider>
    );
};