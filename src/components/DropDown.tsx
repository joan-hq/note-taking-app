import { ReactNode, useState, useRef, useEffect } from 'react';

interface DropDownItem {
    label: string;
    icon?: ReactNode;
    onClick: () => void;
}

interface DropDownProps {
    trigger: (onClick: (e: React.MouseEvent<HTMLElement>) => void) => React.ReactNode;
    items: DropDownItem[];
    header?: ReactNode;
    menuItemClassName?: string;
}

export const DropDown = ({ trigger, items, header, menuItemClassName }: DropDownProps) => {
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="relative" ref={ref}>
            {trigger((e) => setOpen(prev => !prev))}
            {open && (
                <div
                    className="absolute right-0 mt-1 min-w-[160px] rounded-xl shadow-lg z-50 py-1 border border-gray-100"
                    style={{ background: 'var(--surface)' }}
                >
                    {header}
                    {items.map((item) => (
                        <button
                            key={item.label}
                            onClick={() => { item.onClick(); setOpen(false); }}
                            className={`w-full flex items-center gap-2 px-4 py-2 text-sm text-left transition-colors cursor-pointer border-none bg-transparent ${menuItemClassName ?? ''}`}
                            style={{ color: 'var(--text-primary)' }}
                            onMouseEnter={e => (e.currentTarget.style.background = 'var(--ghost-hover)')}
                            onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                        >
                            {item.icon && <span>{item.icon}</span>}
                            {item.label}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};