import TextField from "@mui/material/TextField";

interface MyTextFieldProps {
  id: string;
  label: "" | string;
  placeholder: "" | string;
  variant: "filled" | "outlined" | "standard";
}

const MyTextField = ({ id, label, placeholder, variant }: MyTextFieldProps) => {
  return (
    <view>
      <TextField
        id={id}
        label={label}
        placeholder={placeholder}
        variant={variant}
      />
      ;
    </view>
  );
};

export default MyTextField;
