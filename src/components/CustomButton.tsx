import Button from "@mui/material/Button";
import styled from "styled-components";

interface CustomButtonProps {
  title?: string;
  disabled?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  startIcon?: React.ReactElement;
  endIcon?: React.ReactElement;
  variant?: "contained" | "outlined" | "text";
  size?: "small" | "medium" | "large";
  fullWidth?: boolean;
  className?: string;
}

const StyledButton = styled(Button)`
  && {
    & .MuiButton-startIcon,
    & .MuiButton-endIcon {
      margin: 0 !important;
    }
    border-radius: 50% !important;
    &:hover {
      background-color: var(--color-primary-hover);
    }
  }
`;

const CustomButton = ({
  title,
  onClick,
  disabled,
  startIcon,
  variant,
  endIcon,
  fullWidth,
  className,
}: CustomButtonProps) => {
  return (
    <view>
      <StyledButton
        title={title}
        onClick={onClick}
        disabled={disabled}
        startIcon={startIcon}
        variant={variant}
        endIcon={endIcon}
        fullWidth={fullWidth}
        className={className}
      >
        {title}
      </StyledButton>
    </view>
  );
};

export default CustomButton;
