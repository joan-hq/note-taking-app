'use client';
import { NoteIcon } from '@/components/common/icons/NoteIcon';


export const NoteLogo = () => {
  return (
    <div className="flex items-center gap-2">
      <NoteIcon style={{
        width: 50,
        height: 50,
        fontWeight: 1200,
      }} />

      <span style={{
        fontSize: '28px',
        fontWeight: 700,
        color: 'var(--color-brand-primary)',
        lineHeight: 1
      }}>DashNote</span>
    </div>
  );
};
