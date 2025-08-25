import CardHeader from "@mui/material/CardHeader";
import { Archive as ArchiveIcon } from "@mui/icons-material";

interface NoteCardHeaderProps {
  title: string;
  noteStatus: boolean;
}

const NoteCardHeader = ({ title, noteStatus }: NoteCardHeaderProps) => {
  return (
    <CardHeader
      title={title}
      action={
        noteStatus ? (
          <ArchiveIcon
            color="disabled"
            fontSize="small"
            sx={{ mr: 1, mt: 1 }}
          />
        ) : null
      }
    />
  );
};
export default NoteCardHeader;
