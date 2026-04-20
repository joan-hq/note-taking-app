import Chip from '@mui/material/Chip';

interface TagUnitProps {
    tagName: string;
    onUnlink: (tagName:string) => void;
};

export const UnlinkableTagUnit = ({tagName,onUnlink}:TagUnitProps) => {

    return(
        <>
            <Chip label={tagName} onDelete={() => onUnlink(tagName)}/>
        </>
    );
};
