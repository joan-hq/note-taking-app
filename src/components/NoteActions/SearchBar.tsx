import * as React from "react";
import Box from "@mui/material/Box";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import styled from "styled-components";

interface SearchBarProps {
  searchQuery: string;
  handleSearchOnChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

const StyledTextField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    borderRadius: "15px",
  },
});

const SearchBar = ({
  searchQuery,
  handleSearchOnChange,
  className,
}: SearchBarProps) => {
  return (
    <Box>
      <StyledTextField
        fullWidth
        variant="outlined"
        placeholder="search..."
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
        }}
        sx={{
          "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "var(--color-brand-primary)",
          },
          "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
            {
              borderColor: "var(--color-brand-primary)",
            },
        }}
      />
    </Box>
  );
};

export default SearchBar;
