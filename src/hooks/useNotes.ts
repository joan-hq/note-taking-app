import { useEffect, useState } from "react";
import {Note,Tag} from '../types';
import { NoteService } from "@/services/noteServices";

/**
 * 1. need read all note
 * 2. need update note
 *  2.1 update content
 *  2.2 update related tags
 * 3. need delete note
 * 4. self save note
 * 
 */

export const useNotes = () => {
    const [title, setTitle] = useState("");
};