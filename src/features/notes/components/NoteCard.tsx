import { Box, Card, CardHeader, CardActionArea, Typography, Chip } from '@mui/material';
import { Tag } from '@/features/tags/types/tagType';
import { Archive as ArchiveIcon, AccessTime as AccessTimeIcon } from "@mui/icons-material";


interface NoteCardProps {
    title: string,
    tags: Tag[],
    lastEdit: string,
    isArchived: boolean,
    isSelected: boolean,
    selectedTagId?: string | null,
    handleNoteCardClick: () => void,
    tagDisplayLimit: number,
};

export const NoteCard = ({ title, tags, tagDisplayLimit, lastEdit, isArchived, isSelected, selectedTagId, handleNoteCardClick }: NoteCardProps) => {
    const tagsToShow = tags.slice(0, tagDisplayLimit);
    const tagsHide = tags.length - tagDisplayLimit;

    return (
        <div
            onClick={handleNoteCardClick}
            className="px-4 py-3 cursor-pointer border-b border-gray-100 transition-colors"
            style={{
                backgroundColor: isSelected ? '#f0fdfa' : '',
                borderLeft: isSelected ? '2px solid #0d9488' : '',
            }}
        >
            <div className="flex items-center justify-between mb-1">
                <span className="font-medium text-[--color-text-primary] truncate">{title}</span>
                {isArchived && <ArchiveIcon fontSize="small" className="text-[--color-text-muted]" />}
            </div>

            {tags.length > 0 && (
                <div className="flex gap-1 flex-wrap mb-2">
                    {tagsToShow.map((tag) => (
                        <Chip key={tag.id} label={tag.label} size="small"
                            sx={tag.id === selectedTagId ? {
                                bgcolor: '#1e40af',
                                color: 'white',
                                '& .MuiChip-label': { color: 'white' }
                            } : {}} />
                    ))}
                    {tagsHide > 0 && (
                        <span className="text-xs text-[--color-text-muted]">+{tagsHide}</span>
                    )}
                </div>
            )}

            <div className="flex items-center gap-1 text-xs text-[--color-text-muted]">
                <AccessTimeIcon sx={{ fontSize: 12 }} />
                <span>{lastEdit}</span>
            </div>
        </div>
    );
};