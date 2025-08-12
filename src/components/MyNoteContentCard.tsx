import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActionArea from "@mui/material/CardActionArea";
import MyCustomButton from "../components/Button";
import ArchiveIcon from "@mui/icons-material/Archive";
import Chip from "@mui/material/Chip";
import type { Tag, Note } from "../types";
import { useTheme } from "@mui/material/styles";

interface MyNoteContentCardProps {
  id: string;
  title: string;
  tags?: string[];
  lastedit: string;
  noteStatus: boolean;

  onCardClick: () => void;
  allTags: Tag[];
  selectedNote: Note | null;
}

const MyNoteContentCard = ({
  id,
  title,
  tags,
  lastedit,
  noteStatus,
  onCardClick,
  allTags,
  selectedNote,
}: MyNoteContentCardProps) => {
  /**according note tags(only id), to filter tags from all Tags */
  const noteTags = tags?.map((eachTag) =>
    allTags.find((tag) => eachTag === tag.id)
  );

  const isSelected = selectedNote && selectedNote.id === id;

  return (
    <view>
      <CardActionArea onClick={onCardClick} id={id}>
        <Card
          variant="outlined"
          sx={{
            border: isSelected ? "2px solid #1976d2" : "1px solid #e0e0e0",
          }}
        >
          {noteStatus ? (
            <div style={{ display: "flex", justifyContent: "end" }}>
              <ArchiveIcon color="disabled" fontSize="small" />
            </div>
          ) : (
            ""
          )}

          <CardHeader title={title} />
          <CardContent>
            {noteTags && noteTags.length > 0 ? (
              noteTags.map((tag) => <Chip label={tag?.label} key={tag?.id} />)
            ) : (
              <Chip label={"no tags......"} variant="outlined" />
            )}
            <div>{lastedit}</div>
          </CardContent>
        </Card>
      </CardActionArea>
    </view>
  );
};

export default MyNoteContentCard;
