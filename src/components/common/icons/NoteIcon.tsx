import React from "react";

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
}

export const NoteIcon: React.FC<IconProps> = ({ className, ...props }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 200 200"
      fill="none"
      className={className}
      {...props}
    >

      <path
        d="M112 140 Q140 140 140 112 L140 58 Q140 30 112 30 L58 30 Q30 30 30 58 L30 112 Q30 140 58 140 L78 140 L86 158 Z"
        fill="none"
        stroke="#1E3A8A"
        strokeWidth="6"
      />
      {/* Pen */}
      <g transform="translate(85,85) rotate(45)">
        {/* Cap */}
        <rect x="-6" y="-36" width="12" height="14" rx="3" fill="#1E3A8A" />
        {/* Body */}
        <rect x="-6" y="-22" width="12" height="36" rx="2" fill="#1E3A8A" />
        {/* Tip */}
        <polygon points="-6,14 6,14 0,26" fill="#1E3A8A" />
        {/* Nib */}
        <circle cx="0" cy="26" r="2" fill="#1E3A8A" />
      </g>
    </svg>
  );
};