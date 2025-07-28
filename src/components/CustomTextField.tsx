import TextField from "@mui/material/TextField";

interface CustomTextFieldProps {
  id?: string;
  label?: "" | string;
  placeholder?: "" | string;
  variant?: "filled" | "outlined" | "standard";
}

const CustomTextFieldProp = ({
  id,
  label,
  placeholder,
  variant,
}: CustomTextFieldProps) => {
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

export default CustomTextFieldProp;
