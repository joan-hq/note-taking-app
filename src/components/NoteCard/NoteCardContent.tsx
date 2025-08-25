import { Typography, Box } from "@mui/material";

import NoteCardTags from "./NoteCardTags";
import type { Tag } from "../../types/index";

interface NoteCardContentProp {
  lastedit: string;
  tags: Tag[];
}

const NoteCardContent = ({ lastedit, tags }: NoteCardContentProp) => {
  return (
    <>
      <NoteCardTags tags={tags} />
      <Box sx={{ p: 2, pt: 0, color: "text.secondary" }}>
        <Typography variant="body2">{lastedit}</Typography>
      </Box>
    </>
  );
};

export default NoteCardContent;
