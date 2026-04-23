import { ListItem, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import { ReactNode } from "react";

interface FilterProps {
    selected: boolean;
    icon?: ReactNode;
    action: ReactNode;
    title: string;
    handleFilter:()=>void;

};

export const Filter = ({selected,icon,action,title,handleFilter}: FilterProps) => {
    return(<>
        <ListItem>
            <ListItemButton selected={selected} onClick={handleFilter}>
                {icon && <ListItemIcon>{icon}</ListItemIcon>}
                <ListItemText primary={title} />
                {action}
            </ListItemButton>
        </ListItem>
    </>);
};