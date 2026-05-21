import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from "@mui/icons-material/Close";
import { useState } from 'react';

interface SearchBarProps {
    placeholder: string;
    handleSearchBar: (value: string) => void;
    handleClearSearch: () => void;
    className?: string;
    inputClassName?: string;
}

export const SearchBar = ({ placeholder, handleSearchBar, handleClearSearch, className, inputClassName }: SearchBarProps) => {
    const [inputValue, setInputValue] = useState('');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setInputValue(value);
        handleSearchBar(value);
    }

    const handleClear = () => {
        setInputValue('');
        handleClearSearch();
    }

    return (
        <div className={className}>
            <SearchIcon sx={{ fontSize: 16 }} />
            <input
                value={inputValue}
                onChange={handleChange}
                placeholder={placeholder}
                className={inputClassName}
            />
            {inputValue && (
                <CloseIcon onClick={handleClear} sx={{ fontSize: 16, cursor: 'pointer' }} />
            )}
        </div>
    );
};