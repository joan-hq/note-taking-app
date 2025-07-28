import Button from "@mui/material/Button";

interface MyCustomButtonProps {
  title: string;
  disabled?: boolean;
  onClick?: (buttonTitle: string) => void;
  startIcon?: React.ReactElement;
  endIcon?: React.ReactElement;
  variant?: "contained" | "outlined" | "text";
  size?: "small" | "Medium" | "large";
}

function MyCustomButton({
  title,
  onClick,
  disabled,
  startIcon,
  variant,
  endIcon,
}: MyCustomButtonProps) {
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
      >
        {title}
      </Button>
    </view>
  );
}

export default MyCustomButton;
