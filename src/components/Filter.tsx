'use client';

import { ReactNode } from "react";

interface FilterProps {
    selected: boolean;
    icon?: ReactNode;
    action: ReactNode;
    title: string;
    handleFilter: () => void;
    className?: string;
}

export const Filter = ({ selected, icon, action, title, handleFilter, className }: FilterProps) => {
    return (
        <button
            onClick={handleFilter}
            className={`filter-btn ${selected ? 'filter-btn-active' : ''}`}
        >
            {icon && <span>{icon}</span>}
            <span>{title}</span>
            <span>{action}</span>
        </button>
    );
};