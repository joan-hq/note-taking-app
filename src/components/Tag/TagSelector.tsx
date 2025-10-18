import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Chip from "@mui/material/Chip";

import type { Tag } from "../../types/index";

interface TagSelectorProps {
  options: Tag[];
  value?: Tag[];
  onChange: (event: any, newTags: Tag[]) => void;
  onDelete: (tagId: string) => void;
}

const TagSelector = ({
  options,
  value,
  onChange,
  onDelete,
}: TagSelectorProps) => {
  console.log("Tag Selector-options", options);
  console.log("Tag Selector-value", value);
  return (
    <>
      <Autocomplete
        multiple
        fullWidth
        options={options}
        getOptionLabel={(option) => option.label}
        value={value}
        onChange={onChange}
        renderTags={(value, getTagProps) =>
          value.map((eachTagValue: Tag, index) => (
            <Chip
              label={eachTagValue.label}
              {...getTagProps({ index })}
              onDelete={() => onDelete(eachTagValue.id)}
            />
          ))
        }
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder="Please choose your tag..."
            variant="standard"
            sx={{
              "& .MuiInput-underline:after": {
                borderBottomColor: "var(--color-brand-primary)",
              },

              // "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
              //   {
              //     borderColor: "",
              //   },
            }}
          />
        )}
      />
    </>
  );
};

export default TagSelector;
