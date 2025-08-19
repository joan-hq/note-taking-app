import Button from "@mui/material/Button";

interface CustomButtonProps {
  title: string;
  disabled?: boolean;
  onClick?: (buttonTitle: string) => void;
  startIcon?: React.ReactElement;
  endIcon?: React.ReactElement;
  variant?: "contained" | "outlined" | "text";
  size?: "small" | "Medium" | "large";
  fullWidth?: boolean;
}

function CustomButton({
  title,
  onClick,
  disabled,
  startIcon,
  variant,
  endIcon,
  fullWidth,
}: CustomButtonProps) {
  const handleClick = () => {
    if (onClick) {
      onClick(title);
    }
  };

  return (
    <view>
      <Button
        title={title}
        onClick={handleClick}
        disabled={disabled}
        startIcon={startIcon}
        variant={variant}
        endIcon={endIcon}
        fullWidth={fullWidth}
      >
        {title}
      </Button>
    </view>
  );
}

export default CustomButton;
