import CardActionArea from "@mui/material/CardActionArea";
import Card from "@mui/material/Card";

import NoteCardHeader from "./NoteCardHeader";
import NoteCardContent from "./NoteCardContent";
import type { Tag } from "../../types/index";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Link } from "react-router-dom";

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
  const isDesktop = useMediaQuery("(min-width:900px)");
  const noteLink = `/note/${id}`;

  const actionProps = isDesktop
    ? { onClick: () => onNoteCardClick(id) }
    : { component: Link, to: noteLink };

  return (
    <>
      <Card
        sx={{
          border: isSelected ? "2px solid" : "1px solid",
          borderColor: isSelected ? "var(--color-brand-primary)" : "divider",
          boxShadow: isSelected ? 4 : 1,
          transition: "all 0.2s ease-in-out",
          borderRadius: "15px",
        }}
        className="border-b shadow-non"
      >
        <CardActionArea {...actionProps}>
          <div>
            <NoteCardHeader title={title} noteStatus={noteStatus} />
            <NoteCardContent tags={tags} lastedit={lastedit} />
          </div>
        </CardActionArea>
      </Card>
    </>
  );
};
export default NoteCard;
