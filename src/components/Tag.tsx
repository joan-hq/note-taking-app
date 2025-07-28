import * as React from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import MyChip from "../components/Chip";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";
// import Input from "@mui/material/Input";
// import type { useSubmit } from "react-router-dom";
// import { useState } from "react";

// const tags = ["dev", "react", "text"];

interface MyTagProps {
  options?: readonly string[];
  autoComplete?: boolean;
  handleSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
  value: string;
  handleOnChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  selectedTags: string[];
  onTagsChange: (newTags: string[]) => void;
}

const MyTag = ({
  options = [],
  handleSubmit,
  value,
  handleOnChange,
  autoComplete,
  selectedTags = [],
  onTagsChange,
}: MyTagProps) => {
  return (
    <Box
      component="section"
      sx={{ display: "flex", alignItems: "center", gap: 1 }}
    >
      <form onSubmit={handleSubmit}>
        <FormControl variant="standard" fullWidth>
          <Stack sx={{ display: "row", alignItems: "centerß" }}>
            <MyChip
              label="tag"
              variant="outlined"
              icon={<LocalOfferOutlinedIcon />}
            />
            <Autocomplete
              autoComplete={autoComplete}
              multiple
              size="medium"
              options={options}
              freeSolo
              value={selectedTags as string[]}
              onChange={(event, newTags) => {
                onTagsChange(newTags as string[]);
              }}
              renderValue={(tagValue, getTagProps) =>
                tagValue.map((option, index) => (
                  <Chip label={option} {...getTagProps({ index })} />
                ))
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="standard"
                  placeholder="Type to add tags"
                  value={value} //<-- actural text input value
                  onChange={handleOnChange}
                />
              )}
            />
          </Stack>
        </FormControl>
      </form>
    </Box>
  );
};

export default MyTag;
