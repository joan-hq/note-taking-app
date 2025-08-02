import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActionArea from "@mui/material/CardActionArea";
import MyCustomButton from "../components/Button";
import ArchiveIcon from "@mui/icons-material/Archive";

interface MyNoteContentCardProps {
  id: string;
  title: string;
  tags?: string[];
  lastedit: string;
  noteStatus: boolean;

  onCardClick: () => void;
}

const MyNoteContentCard = ({
  id,
  title,
  tags,
  lastedit,
  noteStatus,
  onCardClick,
}: MyNoteContentCardProps) => {
  return (
    <view>
      <CardActionArea onClick={onCardClick} id={id}>
        <Card variant="outlined">
          {noteStatus ? (
            <div style={{ display: "flex", justifyContent: "end" }}>
              <ArchiveIcon color="disabled" fontSize="small" />
            </div>
          ) : (
            ""
          )}

          <CardHeader title={title} />
          <CardContent>
            {tags && tags.length > 0 ? (
              tags?.map((tagString) => (
                <MyCustomButton
                  title={tagString}
                  key={tagString}
                  variant="outlined"
                  // onClick={handleTagButtonClick}
                />
              ))
            ) : (
              <div>no tag</div>
            )}
            <div>{lastedit}</div>
          </CardContent>
        </Card>
      </CardActionArea>
    </view>
  );
};

export default MyNoteContentCard;
