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
}

const NoteCard = ({
  id,
  title,
  tags,
  lastedit,
  noteStatus,
  onNoteCardClick,
}: NoteCardProps) => {
  return (
    <>
      <CardActionArea onClick={() => onNoteCardClick(id)}>
        <Card>
          <NoteCardHeader title={title} noteStatus={noteStatus} />
          <NoteCardContent tags={tags} lastedit={lastedit} />
        </Card>
      </CardActionArea>
    </>
  );
};
export default NoteCard;
