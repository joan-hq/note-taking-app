import { useEffect, useState, useMemo, useCallback } from "react";
import {Note} from '@/features/notes/types/noteType';
import { NoteService } from "@/features/notes/api/noteServices";
import { filter } from "lodash";

/**
 * 1. load all note
 * 2. actions
 *  2.1 create new notes
 *  2.2 update title, content, tags, status
 *  2.3 delete
 *  2.4 sort by edit, or name
 *  2.5 filter by searchquery or tag
 * 
 * 
 */

export const useNotes = () => {
   const [notes, setNotes] = useState<Note[]>([]);
   const [errorMessage, setErrorMessage] = useState<string | null>(null);
   const [status, setStatus] = useState<'loading' | 'success' | 'error' | 'idle'>('idle');

   const [searchQuery,setSearchQuery] = useState("");
   const [filterTagId, setFilterTagId] = useState<string | null>(null);
   const [filterStatus, setFilterStatus] = useState<'all' | 'archived' | 'trashed'>('all')
   const [sortBy, setSortBy] = useState<'date' | 'name'>('date');

   const fetchNotes = useCallback(async () => {
      setStatus('loading');

      try {
         const data = await NoteService.getAll();
         setNotes(data);
         setStatus('success')
      } catch (error) {
         setStatus('error');
            const message = error instanceof Error ? error.message : 'Fail to fetch tags';
            setErrorMessage(message);
      };
   }, [])

   useEffect(() => {

      let isMounted = true;

      const loadData = async () => {
         await fetchNotes();
         if(!isMounted) return;
      };
     loadData();

      return () => {
         isMounted = false; 
      }

   }, [fetchNotes]);


   const createNote = useCallback(async ()=>{
      try{
         const newNote = await NoteService.create();
         setNotes((prev => [newNote, ...prev]))
      }catch(error){
         const message = error instanceof Error ? error.message : "Create failed";
         setErrorMessage(message);
      };
   }, []);

   const updateNote = useCallback(async (id: string, changes: Partial<Note>) : Promise<void> => {
      const previousNotes = [...notes];
      setNotes(prev => prev.map(note => note.id === id ? {...note, ...changes} :  note));

      try{
         await NoteService.update(id,changes);
      }catch(error){
         setNotes(previousNotes);
         const message = error instanceof Error ? error.message : "Update failed";
         setErrorMessage(message)
      };
   }, [notes]);

   const deleteNote = useCallback(async (id: string) => {
      const previousNotes = [...notes];
      setNotes(prev => prev.filter(n => n.id !== id));
      
      try {
         await NoteService.delete(id);
      } catch (error) {
         setNotes(previousNotes);
         const message = error instanceof Error ? error.message : "Delete failed";
         setErrorMessage(message)
  
      }
   }, [notes]);

   const filteredAndSortedNotes = useMemo(()=>{
   
      let result = notes.filter(note => {
         if(filterStatus === 'all') return note.status === 'active';
         return note.status === filterStatus
      })

      if(searchQuery){
         result = result.filter( note => note.title.toLowerCase().includes(searchQuery.toLowerCase()) 
         || note.content.toLowerCase().includes(searchQuery.toLowerCase()) );
      }

      if(filterTagId){
         result = result.filter( note => note.tags.includes(filterTagId));
      };

      return result.sort((a,b) => {
         if(sortBy === 'name') return a.title.localeCompare(b.title);
         const dateA = a.lastEdit ? new Date(a.lastEdit).getTime() : 0;
         const dateB = b.lastEdit ? new Date(b.lastEdit).getTime() : 0;
         return dateB - dateA;
      })
     
   },[notes, searchQuery,filterTagId,sortBy,filterStatus]);
   
   const countsNote = useMemo(() => {
      return {
         all: notes.filter(note=> note.status === 'active').length,
         archived: notes.filter(note=> note.status === 'archived').length,
         trashed: notes.filter(note=> note.status === 'trashed').length,
      }
   }, [notes])


   return {
      notes: filteredAndSortedNotes,
      isLoading: status === 'loading',
      error: errorMessage,
      setSearchQuery,
      setFilterTagId,
      filterStatus,
      setFilterStatus,
      countsNote,
      setSortBy,
      createNote,
      updateNote,
      deleteNote,
      refresh: fetchNotes,
   }

};

