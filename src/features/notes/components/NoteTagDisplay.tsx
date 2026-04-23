import { UnlinkableTagUnit } from "@/features/tags/views/UnlinkableTagUnit";
import { AddNewTagDialog } from "@/features/tags/components/AddNewTagDialog";
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';


import {Tag} from '@/features/tags/types/tagType'

interface NoteTagDisplayProps {
    allTags: Tag[],
    linkedTags: Tag[],
    handleConfirm: (value: string)=>void,
    handleLinkedTag: (value:Tag[]) =>void,
};

export const NoteTagDisplay = ({allTags,linkedTags,handleConfirm,handleLinkedTag}:NoteTagDisplayProps ) => {
    return(<>
        <LocalOfferOutlinedIcon/>
        <Stack>
            <Autocomplete 
            multiple
            fullWidth
            options = {allTags}
            getOptionLabel = {(option) => typeof option === 'string' ? option : option.label || ""}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            value={linkedTags}
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
            onChange={(event,changedValue)=>{handleLinkedTag(changedValue)}}
            />
        </Stack>
        <AddNewTagDialog handleConfirm={handleConfirm}/>



    </>);
};