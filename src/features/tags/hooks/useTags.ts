'use client'
import { useMemo, useCallback,useEffect, useState } from "react";
import {Tag} from '@/features/tags/types/tagType';
import { getAllTagsAction,createTagAction, updateTagAction, deleteTagAction} from "../actions/tagActions";

/**
 * 1. load all tags
 * 2. create new tags
 * 3. update new tags
 * 4. delete tags
 */

export const useTags = () => {

 const [tags, setTags] = useState<Tag[]>([]);
 const [status, setStatus] = useState<'loading' | 'success' | 'error' | 'idle'>('idle');
 const [errorMessage, setErrorMessage] = useState<string | null>(null);

     const sortedTags = useMemo(() => { 
        return [...tags].sort((a,b) => a.label.localeCompare(b.label))
    }, [tags]);


    const fetchTags = useCallback(async () => {

        setStatus('loading');

        try{
             console.log('fetchTags called');  
             const data = await getAllTagsAction();
              console.log('fetchTags data', data);
                setTags(data);
                setStatus('success');
        }catch(error){
            console.log('fetchTags error:', error); 
            setStatus('error');
            const message = error instanceof Error ? error.message : 'Fail to fetch tags';
            setErrorMessage(message);
        }
        
    }, []);

    useEffect(()=>{
    
        let isMounted = true; 
        const loadData = async () => {
            if (!isMounted) return;           
            await fetchTags(); 
        };

        loadData();

        return () => {
            isMounted = false; 
        };
    },[fetchTags] );

    const updateTag = useCallback(async (id:string, changes: Partial<Tag>) => {
        try {
            await updateTagAction(id, tags, changes);
            setTags(prev => prev.map(tag => tag.id === id ? {...tag, ...changes} : tag));
        } catch(error) {
            fetchTags();
        };
    }, [tags,fetchTags])

    const addTag = useCallback(async (label: string,color?:string) => {
        setErrorMessage(null);
        try{
            const newTag = await createTagAction(label,tags,color);
            setTags(prev => [...prev, newTag]);
            return newTag
        }catch(error){
            setStatus('error');
            const message = error instanceof Error ? error.message : 'Fail to add tag';
            setErrorMessage(message);
        };
    }, [tags]);

    const deleteTag = useCallback(async (id: string) => {
            const preTags = tags;
            setTags(prevTags => prevTags.filter(t => t.id !== id));
        try{
        
            await deleteTagAction(id);
        }catch(error){
            setTags(preTags);
            setErrorMessage("Delete failed, rolling back...");
        };
    }, [tags])



        return {
            tags: sortedTags,
            isLoading: status === 'loading',
            error: errorMessage,
            clearError: () => setErrorMessage(null),
            refresh: fetchTags,
            addTag,
            setTags,
            updateTag,
            deleteTag,
        }
 };
