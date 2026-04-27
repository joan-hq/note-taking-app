import {Box,Card,CardHeader,CardActionArea,Typography,Chip} from '@mui/material';
import { Tag } from '@/features/tags/types/tagType';
import { Archive as ArchiveIcon, AccessTime as AccessTimeIcon } from "@mui/icons-material";


interface NoteCardProps {
    title:string,
    tags: Tag[],
    lastEdit: string,
    isArchived: boolean,
    handleNoteCardClick: () => void,
    tagDisplayLimit: number,
};

const Header = ({title,isArchived}:Pick<NoteCardProps,'title' | 'isArchived'>) => {
    return(<>
        <CardHeader title={title} action={isArchived && <ArchiveIcon fontSize='small'/>}/>
    </>);
};

const TagDisplay = ({tags,tagDisplayLimit}:Pick<NoteCardProps,'tags' | 'tagDisplayLimit'>) => {
    const tagsToShow = tags.slice(0,tagDisplayLimit);
    const tagshide = tags.length - tagDisplayLimit;


    return(<>
        {tagsToShow.map((tag)=>(<Chip key={tag.id} 
                label={tag.label} 
                size='small'/>
            ))
        }
        {tagshide > 0 && (
            <Typography> + {tagshide}</Typography>
        )}
    </>);
};

const Footer = ({lastEdit}: Pick<NoteCardProps,'lastEdit'>) => {
    return (<>
        <Box>
            <AccessTimeIcon/>
            <Typography>{lastEdit}</Typography>
        </Box>
    </>);
};

export const NoteCard = ({title,tags,tagDisplayLimit,lastEdit,isArchived,handleNoteCardClick}:NoteCardProps) => {
    return (<>
        <Card>
            <CardActionArea onClick={handleNoteCardClick}>
                <Header title={title} isArchived={isArchived}/>
                <TagDisplay tags={tags} tagDisplayLimit={tagDisplayLimit}/>
                <Footer lastEdit={lastEdit}/>                
            </CardActionArea>
        </Card>
    </>);
};