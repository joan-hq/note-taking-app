import { ReactElement } from "react";

interface ReuseTitleProps {
  title: string;
  className?: string;
  icon?: ReactElement;
}

const ReuseTitle = ({ title, icon, className }: ReuseTitleProps) => {
  return (
    <div className={className}>
      {icon}
      <span>{title}</span>
    </div>
  );
};

export default ReuseTitle;
