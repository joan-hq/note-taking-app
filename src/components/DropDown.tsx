import { Menu, MenuItem, ListItemIcon } from "@mui/material";
import { ReactNode,useState } from 'react';


interface DropDownItem {
    label: string,
    icon?:ReactNode,
    onClick: ()=>void;

};

interface DropDownProps {
     trigger: (
                onClick: (e: React.MouseEvent<HTMLElement>) => void
              ) => React.ReactNode;
   items: DropDownItem[];
   header?: ReactNode;
};


export const DropDown = ({trigger, items, header}:DropDownProps) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const handleOpen = (e: React.MouseEvent<HTMLElement>) => setAnchorEl(e.currentTarget);
    const handleClose = () => setAnchorEl(null);

    return (
        <>
            {trigger(handleOpen)}
            <Menu 
                open={Boolean(anchorEl)} 
                anchorEl={anchorEl} 
                onClose={handleClose}
            >
                {header}
                {items.map((item)=> 
                    <MenuItem 
                        key={item.label} 
                        onClick={() => {item.onClick(); handleClose();}}
                    >
                        {item.icon && <ListItemIcon>{item.icon}</ListItemIcon>}
                        {item.label}
                    </MenuItem>
                )}
            </Menu>
        </>
    );

};