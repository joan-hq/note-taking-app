import CardActionArea from "@mui/material/CardActionArea";
import Card from "@mui/material/Card";

import NoteCardHeader from "./NoteCardHeader";
import NoteCardContent from "./NoteCardContent";
import type { Tag } from "../../types/index";

interface NoteCardProps {
  id: string;
  title: string;
  lastedit: string;
  tags: Tag[];
  noteStatus: boolean;
  onNoteCardClick: (noteId: string) => void;
  isSelected: boolean;
}

const NoteCard = ({
  id,
  title,
  tags,
  lastedit,
  noteStatus,
  onNoteCardClick,
  isSelected,
}: NoteCardProps) => {
  return (
    <>
      <CardActionArea onClick={() => onNoteCardClick(id)}>
        <Card
          sx={{
            border: isSelected ? "2px solid" : "1px solid",
            borderColor: isSelected ? "primary.main" : "divider",
            boxShadow: isSelected ? 4 : 1,
            transition: "all 0.2s ease-in-out",
          }}
        >
          <NoteCardHeader title={title} noteStatus={noteStatus} />
          <NoteCardContent tags={tags} lastedit={lastedit} />
        </Card>
      </CardActionArea>
    </>
  );
};
export default NoteCard;
