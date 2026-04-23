import{NoteIcon} from'@/components/common/icons/NoteIcon';

import Typography from '@mui/material/Typography';

interface NoteLogo {
  className?: string;
}

export const NoteLogo = ({ className }: NoteLogo) => {
  return (
    <>
    <NoteIcon className="w-11 h-11 text-primary-color stroke-[4]" />
    <Typography>DashNote</Typography>
    </>
  );
};
