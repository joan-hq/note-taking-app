import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Box } from '@mui/material';
import SortOutlinedIcon from '@mui/icons-material/SortOutlined';
import { useNoteContext } from '../context/noteContext';
import { useState } from 'react';
import { DropDown } from '@/components/DropDown';


export const NoteSortButton = () => {

const {setSortBy} = useNoteContext();

    return(<>
        <DropDown trigger={(onClick) => (
            <IconButton onClick={onClick}>
                <SortOutlinedIcon />
            </IconButton>
        )}
        items = {[
            { label: 'Sort by name', onClick: () => setSortBy('name') },
            { label: 'Sort by edit time', onClick: () => setSortBy('date') },
        ]}
        
        />
    </>);
};


