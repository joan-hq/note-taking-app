'use client'; // 因为我们要从 Context 拿数据，所以它是客户端组件

import { Box, Typography, Container } from '@mui/material';
import { SideBar } from '@/features/notes/views/SideBar';
import { MiddlerBar } from '@/features/notes/views/MiddleBar';
import { NoteDetail } from '@/features/notes/components/NoteDetail';
import {NoteDisplay} from '@/features/notes/views/NoteDisplay';


export default function HomePage() {

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
              
       <Container sx={{ flex:1, py: 2 }}>
          <SideBar/>
    </Container>

      <Container sx={{flex:2, py: 2 }}>
        <MiddlerBar/>
     </Container>

      <Container sx={{ flex:5,py: 8 }} >
        <NoteDisplay/>   
      </Container>
    </Box>
  );
}