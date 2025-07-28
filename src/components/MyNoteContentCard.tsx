import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActionArea from "@mui/material/CardActionArea";
import MyCustomButton from "../components/Button";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";

import Chip from "@mui/material/Chip";
import MyTag from "../components/Tag";

interface MyNoteContentCardProps {
  id: number;
  title: string;
  tags?: string[];
  lastedit: string;
  handleNoteClick: () => void;
}

const MyNoteContentCard = ({
  title,
  tags,
  lastedit,
  handleNoteClick,
}: MyNoteContentCardProps) => {
  // const handleTagButtonClick = (buttonTitle: string) => {
  //   alert(`You clicked the "${buttonTitle}" button!`);
  // };
  return (
    <view>
      <CardActionArea onClick={handleNoteClick}>
        <Card variant="outlined">
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
