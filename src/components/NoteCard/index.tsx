import CardActionArea from "@mui/material/CardActionArea";
import Card from "@mui/material/Card";

import NoteCardHeader from "./NoteCardHeader";
import NoteCardContent from "./NoteCardContent";
import type { Tag } from "../../types/index";

interface NoteCardProps {
  title: string;
  lastedit: string;
  tags: Tag[];
  noteStatus: boolean;
  onNoteCardClick: (id: string) => void;
}

const NoteCard = ({
  title,
  tags,
  lastedit,
  noteStatus,
  onNoteCardClick,
}: NoteCardProps) => {
  console.log("title", title);
  return (
    <>
      <CardActionArea onClick={() => onNoteCardClick}>
        <Card>
          <NoteCardHeader title={title} noteStatus={noteStatus} />
          <NoteCardContent tags={tags} lastedit={lastedit} />
        </Card>
      </CardActionArea>
    </>
  );
};
export default NoteCard;
