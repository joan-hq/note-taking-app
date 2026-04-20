'use client'; // 因为我们要从 Context 拿数据，所以它是客户端组件

import { Box, Typography, Container } from '@mui/material';
// import { useNoteContext } from '@/contexts/NoteProvider';
// import LeftSide from "@/components/LeftSide";
import { AddNewTagDialog } from '@/features/tags/views/AddNewTagDialog'; 
import { DeleteTagDialog } from '@/features/tags/views/DeleteTagDialog'; 
import { useState } from 'react';
import { DeleteableTagUnit } from '@/features/tags/views/DeleteableTagUnit';
import { UnlinkableTagUnit } from '@/features/tags/views/UnlinkableTagUnit';
import { TagManagement } from '@/features/tags/views/TagManagement';
import {tags} from '@/data/note'
import {NoteTagDisplay} from '@/features/notes/views/NoteTagDisplay';

export default function HomePage() {
 // const { notes } = useNoteContext();

 const handleConfirm = (tagName: string) => {
  alert(tagName);
 };


 const handleUnlinkTag = (tagName: string) => {
  alert("handleUnselected" + tagName);
 };
  const handleConfirm1 = () => {
  console.log("handleclick");
  alert('clicked this button');
 };
 
 const handleListItemBtnClick = () => {
  alert('clicked list btn');
 };
 const purple = "#6200ea";
 const white = 'green';
 const yellow = 'yellow'
 const [tagName, setTagName] = useState("tag");

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
        {/* <Button onClick={() => alert("原生按钮测试成功")}>hhh</Button> */}
        <AddNewTagDialog handleConfirm={handleConfirm}/>
        <DeleteableTagUnit handleConfirm={handleConfirm1} tagName='gagag'></DeleteableTagUnit>
        <UnlinkableTagUnit tagName='5566' onUnlink={handleUnlinkTag}/>
        <TagManagement tags={tags}/>
        <NoteTagDisplay tags={tags} handleConfirm={handleConfirm}/>
      </Container>
    </Box>
  );
}