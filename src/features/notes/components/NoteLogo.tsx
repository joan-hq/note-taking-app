'use client';
import { NoteIcon } from '@/components/common/icons/NoteIcon';


export const NoteLogo = () => {
  return (
    <div className="flex items-center gap-2">
      <NoteIcon style={{ width: 28, height: 28, color: '#0d9488' }} />
      <span style={{ fontSize: '20px', fontWeight: 700, color: '#0d9488' }}>DashNote</span>
    </div>
  );
};
