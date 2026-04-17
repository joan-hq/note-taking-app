'use client';

import { Button, IconButton, ButtonProps } from '@mui/material';

type ButtonShape = 'pill' | 'circle' | 'icon';

interface customButtonProps {
    title?: string;
    shape?: ButtonShape;
    isLoading?: boolean;
    customEventTracker?: string;
};

interface JButtonProps extends ButtonProps, customButtonProps{}

const shapeStyles = {
    pill: {borderRadius: '20px', textTransform: 'none', px: 3},
    circle: {borderRadius: '50%', width: 48, height: 48, minWidth: 0},
    icon: {padding: 1}
};

export const JButton = ({
    title,
    shape='pill',
    children,
    sx,
    ...props
} : JButtonProps) => {
    const variantSx = shapeStyles[shape];
    const finalSx = {...sx,...variantSx};

    if(shape === 'circle' || shape === 'icon'){

        const { variant, ...iconButtonProps } = props;
        return( <IconButton {...iconButtonProps} sx={finalSx}  >
            {children || title}
            </IconButton>)
    }

    return (
         <Button {...props} sx={finalSx} >
            { children || title}            
        </Button>
    );  
};