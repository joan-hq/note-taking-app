'use client';
import { AddNewTagDialog } from "@/features/tags/components/AddNewTagDialog";
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';


import { Tag } from '@/features/tags/types/tagType'

interface NoteTagDisplayProps {
    allTags: Tag[],
    linkedTags: Tag[],
    handleConfirm: (value: string) => void,
    handleLinkedTag: (value: Tag[]) => void,
};

export const NoteTagDisplay = ({ allTags, linkedTags, handleConfirm, handleLinkedTag }: NoteTagDisplayProps) => {
    return (<div className="flex items-center gap-2">
        <LocalOfferOutlinedIcon />
        <div className="flex-1">
            <Autocomplete
                multiple
                fullWidth
                options={allTags}
                getOptionLabel={(option) => typeof option === 'string' ? option : option.label || ""}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                value={linkedTags}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        placeholder="Please choose your tag..."
                        variant="standard"
                        sx={{
                            "& .MuiInput-underline:before": {
                                borderBottomColor: "var(--border)",
                            },
                            "& .MuiInput-underline:after": {
                                borderBottomColor: "var(--primary)",
                            },
                            "& .MuiInputBase-input": {
                                fontSize: '0.875rem',
                                color: 'var(--text-primary)',
                            },
                            "& .MuiInputBase-input::placeholder": {
                                color: 'var(--text-secondary)',
                                opacity: 1,
                            },
                        }}
                    />
                )}
                slotProps={{
                    chip: {
                        size: 'small',
                        sx: {
                            background: 'var(--secondary)',
                            color: 'var(--primary)',
                            borderRadius: '9999px',
                            fontSize: '0.75rem',
                            '& .MuiChip-deleteIcon': {
                                color: 'var(--primary)',
                                '&:hover': {
                                    color: 'var(--primary-hover)',
                                },
                            },
                        },
                    },
                }}
                onChange={(event, changedValue) => handleLinkedTag(changedValue)}
            />
        </div>
        <AddNewTagDialog handleConfirm={handleConfirm} />
    </div>);
};
