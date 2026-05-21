import { Filter } from "@/components/Filter";
import FolderCopyOutlinedIcon from '@mui/icons-material/FolderCopyOutlined';
import DriveFileMoveRtlOutlinedIcon from '@mui/icons-material/DriveFileMoveRtlOutlined';
import FolderDeleteOutlinedIcon from '@mui/icons-material/FolderDeleteOutlined';
import { Typography } from "@mui/material";
import { useNoteContext } from "../context/noteContext";

export const NoteStatusFilter = () => {
    
    const {filterStatus, setFilterStatus,countsNote,selectNote} = useNoteContext();

    const filterOptions = [
        {type: 'all', title: 'All Notes', icon:<FolderCopyOutlinedIcon/> },
        {type:'archived',title: 'Archived Notes', icon: <DriveFileMoveRtlOutlinedIcon />},
        {type:'trashed',title: 'Spam Notes', icon: <FolderDeleteOutlinedIcon />},        
    ] as const;
    
    return(<>
        {filterOptions.map((opt) => (
            <Filter 
            key={opt.type}
            title={opt.title}
            icon={opt.icon}
            selected={filterStatus === opt.type}
            handleFilter={()=>{setFilterStatus(opt.type); selectNote(null)}}
            action={<Typography>{countsNote[opt.type] || 0}</Typography>} />
            
        ))} 
    </>);
};