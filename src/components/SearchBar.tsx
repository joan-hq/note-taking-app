import TextField from '@mui/material/TextField';

import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from "@mui/icons-material/Close";
import { InputAdornment } from '@mui/material';
import { useState } from 'react';


interface SearchBarProps {
    placeholder:string;
    handleSearchBar: (value:string)=>void;
    handleClearSearch:() => void;
};

export const SearchBar = ({placeholder,handleSearchBar,handleClearSearch}:SearchBarProps)=> {
    const[inputValue,setInputValue] = useState('');
 
    const handleChange = (event:React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value
        setInputValue(value);
        handleSearchBar(value);
    }
    
    const handleClear = () => {
        setInputValue('');
        handleClearSearch();
    }

    return(<>
        <TextField 
        placeholder={placeholder}
        variant='outlined'
        slotProps={{
            input: {
                startAdornment: <InputAdornment position='start'><SearchIcon/></InputAdornment>,
                endAdornment:inputValue &&  <InputAdornment position='end' onClick={handleClear}><CloseIcon/></InputAdornment>
            }
        }}
        onChange={handleChange}
        value={inputValue}  
        />
    </>);
};