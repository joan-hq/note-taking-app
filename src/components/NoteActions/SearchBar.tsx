import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import InputBase from "@mui/material/InputBase";
import { IconButton } from "@mui/material";
import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";

interface SearchBarProps {
  searchQuery: string;
  handleSearchOnChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isOpen: boolean;
  handleSearchIconClick: () => void;
  handleBlur: () => void;
}

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  padding: theme.spacing(1, 1, 1, 0),
  width: "100%",
}));

const SearchBar = ({
  searchQuery,
  handleSearchOnChange,
  isOpen,
  handleSearchIconClick,
  handleBlur,
}: SearchBarProps) => {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <IconButton onClick={handleSearchIconClick} size="large" color="primary">
        <SearchIcon />
      </IconButton>
      {isOpen && (
        <StyledInputBase
          placeholder="Search..."
          inputProps={{ "aria-label": "search" }}
          value={searchQuery}
          onChange={handleSearchOnChange}
          onBlur={handleBlur}
          autoFocus
        />
      )}
    </Box>
  );
};

export default SearchBar;
