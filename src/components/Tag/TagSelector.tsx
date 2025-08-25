import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import type { Tag } from "../../types/index";

interface TagSelectorProps {
  options: Tag[];
}

const TagSelector = ({ options }: TagSelectorProps) => {
  return (
    <>
      <Autocomplete
        multiple
        options={options}
        getOptionLabel={(option) => option.label}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder="Chhoose your tag"
            variant="standard"
          />
        )}
      />
    </>
  );
};

export default TagSelector;
