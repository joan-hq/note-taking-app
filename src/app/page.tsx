'use client'; // 因为我们要从 Context 拿数据，所以它是客户端组件

import { Box, Typography, Container } from '@mui/material';

export default function HomePage() {

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
              
      {/*  Sidebar */}
      <Box sx={{ width: 240, borderRight: '1px solid #eee', p: 2 }}>
        <Typography variant="h6">side bar
        </Typography>
      </Box>

      {/* main content */}
      <Container sx={{ py: 4 }}>
        <Typography variant="h4" sx={{ mb: 2, fontWeight: 'bold', color: 'text.primary' }}>
          my Note
        </Typography>
        <Typography color="text.secondary">        
          Note
        </Typography>     
      </Container>
    </Box>
  );
}