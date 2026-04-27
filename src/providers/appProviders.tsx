'use client';                        

import { NoteProvider } from "@/features/notes/context/noteContext";
import { TagProvider } from "@/features/tags/context/tagContext";

export const AppProviders = ({ children }: { children: React.ReactNode }) => {
    return (
        <TagProvider>
            <NoteProvider>
                {children}
            </NoteProvider>
        </TagProvider>
    );
};