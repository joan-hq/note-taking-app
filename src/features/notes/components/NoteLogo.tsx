'use client';
import { NoteIcon } from '@/components/common/icons/NoteIcon';


export const NoteLogo = () => {
  return (
    <div className="flex items-center gap-2">
      <NoteIcon style={{
        width: 36,
        height: 36,
        fontWeight: 900,
        color: 'var(--color-brand-primary)',
        display: 'block'
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
