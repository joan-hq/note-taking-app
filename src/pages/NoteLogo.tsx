import TypoNoteIcon from "../icons/TypoNoteLogo";
import ReuseTitle from "../components/ReuseTitle";

interface NoteLogo {
  className?: string;
}

const NoteLogo = ({ className }: NoteLogo) => {
  return (
    <ReuseTitle
      title="DashNote"
      icon={
        <TypoNoteIcon className="w-11 h-11 text-primary-color stroke-[4]" />
      }
      className={className}
    />
  );
};

export default NoteLogo;
