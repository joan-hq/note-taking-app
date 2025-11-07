import Box from "@mui/material/Box";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import { useNoteContext } from "../../contexts/NoteProvider";

interface SearchBarProps {
  className?: string;
}

const SearchBar = ({ className }: SearchBarProps) => {
  const { search, filters } = useNoteContext();

  let searchBarPlaceHolder;
  if (filters.filterType === "all") {
    searchBarPlaceHolder = `Search in all notes...`;
  } else if (filters.filterType === "archived") {
    searchBarPlaceHolder = `Search in archived notes...`;
  }

  console.log("filterType", filters.filterType);

  const safeQuery = search.searchQuery || "";
  const hasSearchQuery = safeQuery.trim().length > 0;

  const textFieldStyles = {
    "& .MuiOutlinedInput-root .MuiOutlinedInput-input": {
      padding: "10px 8px",
    },

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
        key={filters.filterType}
        fullWidth
        variant="outlined"
        placeholder={searchBarPlaceHolder}
        value={search.searchQuery}
        onChange={search.handleSearchOnChange}
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
                onClick={search.handleClearSearch}
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
