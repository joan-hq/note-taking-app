import * as React from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import MyChip from "../components/Chip";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";

interface MyTagProps {
  options?: string[];
  value: string;
  handleOnChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  selectedTags: string[];
  onTagsChange: (newTags: string[]) => void;
}

const MyTag = ({
  options = [],
  value,
  handleOnChange,
  selectedTags = [],
  onTagsChange,
}: MyTagProps) => {
  return (
    <Box
      component="section"
      sx={{ display: "flex", alignItems: "center", gap: 1 }}
    >
      <FormControl variant="standard" fullWidth>
        <Stack sx={{ display: "row", alignItems: "centerß" }}>
          <MyChip
            label="tag"
            variant="outlined"
            icon={<LocalOfferOutlinedIcon />}
          />
          <Autocomplete
            multiple
            size="medium"
            options={options}
            freeSolo
            value={selectedTags as string[]}
            inputValue={value}
            onInputChange={(event, newInputValue, reason) => {
              if (reason === "input") {
                if (handleOnChange) {
                  handleOnChange({
                    target: { value: newInputValue },
                  } as React.ChangeEvent<HTMLInputElement>);
                }
              }
            }}
            onChange={(event, newTags, reason) => {
              if (
                reason === "createOption" &&
                value.trim() !== "" &&
                !newTags.includes(value.trim())
              ) {
                onTagsChange([...newTags, value.trim()]);
              } else if (reason !== "createOption") {
                onTagsChange(newTags as string[]);
              }

              //clear the input value after a tag is added/selected

              if (reason === "createOption" || reason === "selectOption") {
                if (handleOnChange) {
                  handleOnChange({
                    target: { value: "" },
                  } as React.ChangeEvent<HTMLInputElement>);
                }
              }
              // onTagsChange(newTags as string[]);
            }}
            renderValue={(tagValue, getTagProps) =>
              tagValue.map((option, index) => (
                <Chip label={option} {...getTagProps({ index })} />
              ))
            }
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                placeholder="Add Tags"
                margin="normal"
                inputProps={{
                  ...params.inputProps,
                  // Important: use `event.key` for reliable key detection
                  onKeyDown: (event) => {
                    const typedValue = params.inputProps.value; // Get the current value from inputProps
                    if (
                      event.key === "Enter" &&
                      typeof typedValue === "string" &&
                      typedValue.trim() !== ""
                    ) {
                      event.preventDefault(); // Prevent default form submission

                      const trimmedTag = typedValue.trim();
                      // Only add if it's not already in selectedTags to prevent duplicates
                      if (!selectedTags.includes(trimmedTag)) {
                        onTagsChange([...selectedTags, trimmedTag]);
                      }

                      // Clear the input field after adding the tag
                      if (handleOnChange) {
                        handleOnChange({
                          target: { value: "" },
                        } as React.ChangeEvent<HTMLInputElement>);
                      }
                    }
                  },
                }}
              />
            )}
          />
        </Stack>
      </FormControl>
    </Box>
  );
};

export default MyTag;
