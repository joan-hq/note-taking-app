import { useEffect, useState, useMemo } from "react";
import {Note,Tag, FilterType} from '../types';
import { NoteService } from "@/services/noteServices";

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

};