'use client';

import dynamic from 'next/dynamic';

// 🟢 用 dynamic 强行关闭该组件的服务器端预渲染（SSR），彻底免疫任何 Hydration 错误！
const ChatViewWithoutSSR = dynamic(
  () => import('./chat-view'),
  { ssr: false }
);

export default function ChatTestPage() {
  return <ChatViewWithoutSSR />;
}