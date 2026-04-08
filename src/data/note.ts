import type { Note, Tag, NoteStatus } from "../types/index";


export const tags: Tag[] = [
  { id: "project-note-app", label: "Project: Note App" },
  { id: "react", label: "React" },
  { id: "typescript", label: "TypeScript" },
  { id: "ideas", label: "Ideas" },
  { id: "urgent", label: "Urgent" },
  { id: "parenting", label: "Parenting" },
  { id: "shopping-list", label: "Shopping List" },
  { id: "recipes", label: "Recipes" },
  { id: "work", label: "Work" },
  { id: "travel", label: "Travel" },
];

export const MOCK_NOTES: Note[] = [
  {
    id: "note-uuid-001",
    title: "React Context API 移动端适配 Bug",
    tags: ["tag-uuid-react", "tag-uuid-urgent"], // 使用 UUID 格式的标签 ID
    content: "在移动端浏览器下，NoteProvider 的 useEffect 监听 URL 变化失效。需要检查依赖项数组是否包含了正确的 router 对象。",
    createdAt: "2025-11-06T10:00:00.000Z",
    lastEdit: "2025-11-06T14:30:00.000Z",
    status: 'active' as NoteStatus,
  },
  {
    id: "note-uuid-002",
    title: "本周超市采购清单",
    tags: ["tag-uuid-life"],
    content: "牛奶、鸡蛋、给孩子们买的红富士苹果、深度烘焙咖啡豆。",
    createdAt: "2025-11-05T08:00:00.000Z",
    lastEdit: "2025-11-05T09:15:00.000Z",
    status: 'active' as NoteStatus,
  },
  {
    id: "note-uuid-003",
    title: "DashNote 功能演进计划",
    tags: ["tag-uuid-project", "tag-uuid-ideas"],
    content: "1. 完善 Markdown 渲染逻辑；\n2. 接入 Neon 数据库实现持久化；\n3. 优化多对多标签匹配算法；\n4. 准备 5 月份的求职简历。",
    createdAt: "2025-10-22T09:00:00.000Z",
    lastEdit: "2025-10-22T11:00:00.000Z",
    status: 'active' as NoteStatus,
  },
  {
    id: "note-uuid-004",
    title: "已归档：2025 旧项目服务器凭证",
    tags: ["tag-uuid-work"],
    content: "服务器 IP: 192.168.1.100\n管理员账号: admin\n密码: 已加密存储在 Vault 中。",
    createdAt: "2025-09-10T10:00:00.000Z",
    lastEdit: "2025-09-15T10:00:00.000Z",
    status: 'archived' as NoteStatus,
  },
  {
    id: "note-uuid-005",
    title: "待删除的草稿内容",
    tags: [],
    content: "这是一条测试垃圾箱逻辑的笔记。点击恢复按钮应该可以回到 active 状态。",
    createdAt: "2025-11-06T12:00:00.000Z",
    lastEdit: "2025-11-06T13:00:00.000Z",
    status: 'trashed' as NoteStatus,
  },
  {
    id: "note-uuid-006",
    title: "全栈开发面试准备笔记",
    tags: ["tag-uuid-work", "tag-uuid-urgent"],
    content: "重点复习: React 渲染性能优化、Drizzle ORM 多表查询逻辑、TypeScript 泛型使用场景。",
    createdAt: "2026-03-20T15:00:00.000Z",
    lastEdit: "2026-03-21T09:00:00.000Z",
    status: 'active' as NoteStatus,
  }
];
