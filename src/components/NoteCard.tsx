import React from "react";
// import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import MyCustomButton from "../components/Button";
import MyChip from "../components/Chip";
import MyTextField from "../components/TextField";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import MyTag from "../components/Tag";

const currentDate: Date = new Date();
const formattedDate: string = currentDate.toLocaleDateString();

interface MyNoteCardHeaderProps {
  title: string;
}

interface MyNoteCardProps {
  title: string;
  tags?: string;
  note: string;
  multiline?: boolean;
  onClick?: () => void;
}

const MyNoteCardHeader = ({ title }: MyNoteCardHeaderProps) => {
  const handleAddTag = () => {
    window.alert("you clicked cancle add tage button");
  };

  return (
    <Grid size={{ xs: 12, md: 12, lg: 12 }}>
      <TextField title={title} variant="standard" multiline={true} fullWidth />
      <div>
        <MyTag />
      </div>

      <div>
        <MyChip
          label="Last edit"
          variant="outlined"
          icon={<AccessTimeOutlinedIcon />}
          //onClick={handleAddTag}
          color="default"
        />
        <p>{formattedDate}</p>
      </div>
    </Grid>
  );
};

const MyNoteCard = ({ title, note }: MyNoteCardProps) => {
  const handleSave = () => {
    window.alert("you clicked save noet button");
  };

  const handleCancle = () => {
    window.alert("you clicked cancle noet button");
  };

  return (
    <Card>
      <MyNoteCardHeader title={title} />

      <CardContent>
        <Grid container>
          <TextField
            slotProps={{ htmlInput: { "data-testid": "…" } }}
            variant="standard"
            multiline={true}
            fullWidth
            value={note}
          />
        </Grid>
      </CardContent>
      <CardActions>
        <MyCustomButton title="Save" disabled={false} onClick={handleSave} />
        <MyCustomButton
          title="Cancel"
          disabled={false}
          onClick={handleCancle}
        />
      </CardActions>
    </Card>
  );
};

export default MyNoteCard;
