import * as React from "react";
import Box from "@mui/material/Box";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import { useNote } from "../../hooks/useNote";

interface SearchBarProps {
  searchQuery: string;
  handleSearchOnChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  handleClearSearch: () => void;
}

const SearchBar = ({
  searchQuery,
  handleSearchOnChange,
  handleClearSearch,
  className,
}: SearchBarProps) => {
  const { filterType } = useNote();

  let searchBarPlaceHolder;
  if (filterType === "all") {
    searchBarPlaceHolder = `Search in all notes...`;
  } else if (filterType === "archived") {
    searchBarPlaceHolder = `Search in archived notes...`;
  }

  console.log("filterType", filterType);

  const safeQuery = searchQuery || "";
  const hasSearchQuery = safeQuery.trim().length > 0;

  const textFieldStyles = {
    "& .MuiOutlinedInput-root": {
      borderRadius: "15px",
    },
    "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "var(--color-brand-primary)",
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "var(--color-brand-primary)",
    },
  };

  return (
    <Box>
      <TextField
        key={filterType}
        fullWidth
        variant="outlined"
        placeholder={searchBarPlaceHolder}
        value={searchQuery}
        onChange={handleSearchOnChange}
        className={className}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <IconButton>
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
          endAdornment: hasSearchQuery && (
            <InputAdornment position="end">
              <IconButton
                size="small"
                onClick={handleClearSearch}
                aria-label="Clear search"
              >
                <CloseIcon fontSize="small" color="action" />
              </IconButton>
            </InputAdornment>
          ),
        }}
        sx={textFieldStyles}
      />
    </Box>
  );
};

export default SearchBar;
