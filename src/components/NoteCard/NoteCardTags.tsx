import { CardContent } from "@mui/material";
import Chip from "@mui/material/Chip";
import type { Tag } from "../../types/index";

interface NoteCardTagsProps {
  tags: Tag[];
}
const NoteCardTags = ({ tags }: NoteCardTagsProps) => {
  return (
    <CardContent>
      {tags && tags.length > 0 ? (
        tags.map((tag) => <Chip label={tag.label} key={tag.id} />)
      ) : (
        <Chip label={"no tags......"} variant="outlined" />
      )}
    </CardContent>
  );
};

export default NoteCardTags;
