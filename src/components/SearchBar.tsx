import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from "@mui/icons-material/Close";
import { useState, CSSProperties } from 'react';

interface SearchBarProps {
    placeholder: string;
    handleSearchBar: (value: string) => void;
    handleClearSearch: () => void;
    className?: string;
    inputClassName?: string;
    containerStyle?: CSSProperties;
}

export const SearchBar = ({ placeholder, handleSearchBar, handleClearSearch, className, inputClassName, containerStyle }: SearchBarProps) => {
    const [inputValue, setInputValue] = useState('');
    const [focused, setFocused] = useState(false);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setInputValue(value);
        handleSearchBar(value);
    };

    const handleClear = () => {
        setInputValue('');
        handleClearSearch();
    };

    return (
        <div
            className={className}
            style={{
                ...containerStyle,
                borderColor: focused ? 'var(--primary)' : containerStyle?.borderColor ?? 'var(--border)',
            }}
        >
            <SearchIcon style={{ fontSize: 16, color: 'var(--text-secondary)' }} />
            <input
                value={inputValue}
                onChange={handleChange}
                placeholder={placeholder}
                className={inputClassName}
                style={{ color: 'var(--text-primary)' }}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
            />
            {inputValue && (
                <CloseIcon
                    onClick={handleClear}
                    style={{ fontSize: 16, cursor: 'pointer', color: 'var(--text-secondary)' }}
                />
            )}
        </div>
    );
};
