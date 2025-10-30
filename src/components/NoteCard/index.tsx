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
        className={`p-4 mb-2 rounded-lg shadow-sm transition-all duration-200 
        ease-in-out border cursor-pointer ${
          isSelected
            ? "border-primary-color bg-cyan-50"
            : "border-gray-200 bg-white"
        }
        hover:shadow-md hover:scale-[1.01]
        ${!isSelected && "hover: bg-cyan-50"}
        
        `}
      >
        <CardActionArea {...actionProps}>
          <div>
            <NoteCardHeader
              title={title}
              noteStatus={noteStatus}
              isSelected={isSelected}
            />
            <NoteCardContent tags={tags} lastedit={lastedit} />
          </div>
        </CardActionArea>
      </Card>
    </>
  );
};
export default NoteCard;
