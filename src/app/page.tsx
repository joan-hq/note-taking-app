'use client'; // 因为我们要从 Context 拿数据，所以它是客户端组件

import { Box, Typography, Container } from '@mui/material';
// import { useNoteContext } from '@/contexts/NoteProvider';
// import LeftSide from "@/components/LeftSide";


export default function HomePage() {
 // const { notes } = useNoteContext();

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      {/* 这里以后放你的 Sidebar */}
      <Box sx={{ width: 240, borderRight: '1px solid #eee', p: 2 }}>
        <Typography variant="h6">我的笔记
        </Typography>
      </Box>

      {/* 这里是主内容区 */}
      <Container sx={{ py: 4 }}>
        <Typography variant="h4" sx={{ mb: 2, fontWeight: 'bold', color: 'text.primary' }}>
          我的笔记
        </Typography>
        <Typography color="text.secondary">
          {/* 目前有 {notes.allNotes.length} 条笔记从 LocalStorage 加载。 */}
          目前有
        </Typography>
      </Container>
    </Box>
  );
}