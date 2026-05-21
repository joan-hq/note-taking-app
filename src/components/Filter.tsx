// import { ListItem, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
// import { ReactNode } from "react";

// interface FilterProps {
//     selected: boolean;
//     icon?: ReactNode;
//     action: ReactNode;
//     title: string;
//     handleFilter:()=>void;

// };

// export const Filter = ({selected,icon,action,title,handleFilter}: FilterProps) => {
//     return(<>
//         <ListItem>
//             <ListItemButton selected={selected} onClick={handleFilter}>
//                 {icon && <ListItemIcon>{icon}</ListItemIcon>}
//                 <ListItemText primary={title} />
//                 {action}
//             </ListItemButton>
//         </ListItem>
//     </>);
// };

import { ReactNode } from "react";

interface FilterProps {
    selected: boolean;
    icon?: ReactNode;
    action: ReactNode;
    title: string;
    handleFilter: () => void;
}

export const Filter = ({ selected, icon, action, title, handleFilter }: FilterProps) => {
    return (
        <button
            onClick={handleFilter}
            className={`filter-btn ${selected ? 'filter-btn-active' : ''}`}
        >
            {icon && <span className="w-4 h-4 flex items-center justify-center">{icon}</span>}
            <span className="flex-1 text-left">{title}</span>
            <span className="text-xs text-[--color-text-muted]">{action}</span>
        </button>
    );
};