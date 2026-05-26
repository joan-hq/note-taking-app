
'use client';
import { useState, useRef, useEffect } from 'react';
import { AddNewTagDialog } from "@/features/tags/components/AddNewTagDialog";
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Tag } from '@/features/tags/types/tagType';

interface NoteTagDisplayProps {
    allTags: Tag[],
    linkedTags: Tag[],
    handleConfirm: (value: string) => void,
    handleLinkedTag: (value: Tag[]) => void,
};

export const NoteTagDisplay = ({ allTags, linkedTags, handleConfirm, handleLinkedTag }: NoteTagDisplayProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        };
        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isOpen]);

    const toggleTag = (tag: Tag) => {
        const isLinked = linkedTags.some(t => t.id === tag.id);
        if (isLinked) {
            handleLinkedTag(linkedTags.filter(t => t.id !== tag.id));
        } else {
            handleLinkedTag([...linkedTags, tag]);
        }
    };

    return (
        <div className="flex flex-col gap-1.5" ref={containerRef}>
            <div className="flex flex-col gap-1.5">

                {/* Tag display row */}
                <div className="flex items-center gap-2">
                    <LocalOfferOutlinedIcon style={{ fontSize: 16, color: 'var(--text-secondary)', flexShrink: 0 }} />

                    {/* Linked tags */}
                    <div className="flex-1 flex flex-wrap gap-1">
                        {linkedTags.length > 0 ? linkedTags.map(tag => (
                            <span
                                key={tag.id}
                                style={{
                                    fontSize: '0.75rem',
                                    padding: '2px 10px',
                                    borderRadius: '9999px',
                                    background: 'var(--secondary)',
                                    color: 'var(--primary)',
                                }}
                            >
                                {tag.label}
                            </span>
                        )) : (
                            <span style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
                                No tags
                            </span>
                        )}
                    </div>

                    {/* Toggle + Add */}
                    <div className="flex items-center gap-1 shrink-0">
                        <button
                            onClick={() => setIsOpen(o => !o)}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                background: 'transparent',
                                border: 'none',
                                cursor: 'pointer',
                                color: 'var(--text-secondary)',
                                padding: '2px',
                                borderRadius: '4px',
                                transition: 'var(--transition)',
                            }}
                            title={isOpen ? 'Close' : 'Edit tags'}
                        >
                            <KeyboardArrowDownIcon
                                style={{
                                    fontSize: 18,
                                    transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                                    transition: 'transform 0.15s ease',
                                }}
                            />
                        </button>
                        <AddNewTagDialog handleConfirm={handleConfirm} />
                    </div>
                </div>

                {/* Collapsible tag picker */}
                {isOpen && (
                    <div
                        style={{
                            background: 'var(--surface)',
                            border: '1px solid var(--border)',
                            borderRadius: 'var(--radius)',
                            padding: '10px 12px',
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: '6px',
                        }}
                    >
                        {allTags.length === 0 ? (
                            <span style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
                                No tags yet
                            </span>
                        ) : allTags.map(tag => {
                            const isSelected = linkedTags.some(t => t.id === tag.id);
                            return (
                                <button
                                    key={tag.id}
                                    onClick={() => toggleTag(tag)}
                                    style={{
                                        fontSize: '0.75rem',
                                        padding: '3px 12px',
                                        borderRadius: '9999px',
                                        border: 'none',
                                        cursor: 'pointer',
                                        transition: 'var(--transition)',
                                        background: isSelected ? 'var(--primary)' : 'var(--ghost-hover)',
                                        color: isSelected ? '#fff' : 'var(--text-secondary)',
                                    }}
                                >
                                    {tag.label}
                                </button>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};
