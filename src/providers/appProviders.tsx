'use client';                        
import { SessionProvider } from "next-auth/react";

import { NoteProvider } from "@/features/notes/context/noteContext";
import { TagProvider } from "@/features/tags/context/tagContext";

export const AppProviders = ({ children }: { children: React.ReactNode }) => {
    return (
    <SessionProvider>
            <TagProvider>
                <NoteProvider>
                    {children}
                </NoteProvider>
            </TagProvider>
    </SessionProvider>
    );
};