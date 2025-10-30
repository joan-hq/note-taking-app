import CardHeader from "@mui/material/CardHeader";
import { Archive as ArchiveIcon } from "@mui/icons-material";

interface NoteCardHeaderProps {
  title: string;
  noteStatus: boolean;
  isSelected: boolean;
}

const NoteCardHeader = ({
  title,
  noteStatus,
  isSelected,
}: NoteCardHeaderProps) => {
  return (
    <CardHeader
      title={title}
      titleTypographyProps={{
        sx: {
          fontWeight: 600,
          color: isSelected ? "primary-color" : "primary-hover",
        },
      }}
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
