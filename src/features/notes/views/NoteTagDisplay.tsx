import { UnlinkableTagUnit } from "@/features/tags/views/UnlinkableTagUnit";
import { AddNewTagDialog } from "@/features/tags/views/AddNewTagDialog";
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';


import {Tag} from '@/features/tags/types/tagType'

interface NoteTagDisplayProps {
    tags: Tag[];
    handleConfirm: (tagName: string)=>void;
};

export const NoteTagDisplay = ({tags,handleConfirm}:NoteTagDisplayProps ) => {
    return(<>
   
       {/* {tags?.map((tag)=> (<UnlinkableTagUnit key={tag.id} tagName={tag.label} onUnlink={() => {
            console.log('connect to data base')
        }}/>))} */}

        <Stack>
            <Autocomplete 
            multiple
            fullWidth
            options = {tags}
            getOptionLabel = {(option) => option.label}
            renderInput={(params) => (
                <TextField
                    {...params}
                    placeholder="Please choose your tag..."
                    variant="standard"
                    sx={{
                    "& .MuiInput-underline:after": {
                        borderBottomColor: "var(--color-brand-primary)",
                    },
                    }}
                />
            )}
            />
        </Stack>

        <AddNewTagDialog handleConfirm={handleConfirm}/>

    </>);
};