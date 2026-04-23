import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Box } from '@mui/material';
import SortOutlinedIcon from '@mui/icons-material/SortOutlined';
import { useNoteContext } from '../context/noteContext';
import { useState } from 'react';


export const NoteSortButton = () => {

const {setSortBy} = useNoteContext();

const [anchorEl, setAnchorEl] =useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenuOnOff = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null);
  }

  const handleSort = (type: 'name' | 'date') => {
    setSortBy(type);
    handleClose();
  };

    return(<>
        <Box>
            <IconButton onClick={handleMenuOnOff}>
                <SortOutlinedIcon/>
            </IconButton>
            <Menu open={open} anchorEl={anchorEl} onClose={handleClose}>
                <MenuItem onClick={() => handleSort('name')}>
                    Sort By Name
                </MenuItem>
                <MenuItem onClick={() => handleSort('date')}>
                    Sort By Edit Time
                </MenuItem>
            </Menu>
        </Box>
    </>);
};


