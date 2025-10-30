import { Typography, Box } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import NoteCardTags from "./NoteCardTags";
import type { Tag } from "../../types/index";
import { useNoteContext } from "../../contexts/NoteProvider";

interface NoteCardContentProp {
  lastedit: string;
  tags: Tag[];
}

const NoteCardContent = ({ lastedit, tags }: NoteCardContentProp) => {
  const { tags: tagManager } = useNoteContext();
  return (
    <>
      <NoteCardTags tags={tags} activeTagId={tagManager.selectedTagId} />
      <Box
        sx={{
          p: 2,
          pt: 0,
          color: "text.secondary",
          display: "flex",
          alignItems: "center",
        }}
      >
        <AccessTimeIcon sx={{ fontSize: "1rem", mr: 0.5 }} />{" "}
        <Typography variant="body2">{lastedit}</Typography>
      </Box>
    </>
  );
};

export default NoteCardContent;
