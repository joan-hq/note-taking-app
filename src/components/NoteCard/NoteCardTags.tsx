import { Box } from "@mui/material";
import Chip from "@mui/material/Chip";
import type { Tag } from "../../types/index";

interface NoteCardTagsProps {
  tags: Tag[];
  activeTagId?: string | null;
}

const TAG_DISPLAY_LIMIT = 3;
const NoteCardTags = ({ tags, activeTagId }: NoteCardTagsProps) => {
  const tagsToShow = tags.slice(0, TAG_DISPLAY_LIMIT);
  const remainingTagsCount = tags.length - tagsToShow.length;
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        gap: 1,
        px: 2,
        pb: 1,
        minHeight: "32px",
      }}
    >
      {tags.length > 0 ? (
        <>
          {tagsToShow.map((tag) => {
            const isSelected = tag.id === activeTagId;
            return (
              <Chip
                label={tag.label}
                key={tag.id}
                size="small"
                sx={{
                  fontWeight: 500,
                  bgcolor: isSelected
                    ? "var(--color-brand-primary)"
                    : "grey.100",
                  color: isSelected ? "white" : "grey.800",
                }}
              />
            );
          })}
          {remainingTagsCount > 0 && (
            <Chip
              label={`+${remainingTagsCount} more`}
              size="small"
              variant="outlined"
            />
          )}
        </>
      ) : (
        <Chip label={"no tags"} variant="outlined" size="small" />
      )}
    </Box>
  );
};

export default NoteCardTags;
