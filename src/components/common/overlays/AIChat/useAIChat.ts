'use client';

import { useState } from 'react';

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

interface UseAIChatOptions {
  noteContent: string;
}

export function useAIChat({ noteContent }: UseAIChatOptions) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMessage: Message = {
      id: 'user-' + Date.now(),
      role: 'user',
      content: input,
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          messages: updatedMessages,
          noteContext: noteContent // 将当前实时的笔记内容喂给 AI
        }),
      });

      const data = await res.json();
      let replyContent = '';

      if (data && typeof data === 'object') {
        replyContent = data.text || data.content || (data.text?.text) || '';
      }

      if (replyContent) {
        setMessages(prev => [...prev, {
          id: 'assistant-' + Date.now(),
          role: 'assistant',
          content: replyContent
        }]);
      } else {
        setMessages(prev => [...prev, {
          id: 'assistant-err-' + Date.now(),
          role: 'assistant',
          content: `⚠️ 未能解析文本，后端返回: ${JSON.stringify(data)}`
        }]);
      }
    } catch (error:any) {
      console.error("AI 请求失败:", error);
      setMessages(prev => [...prev, {
        id: 'assistant-catch-' + Date.now(),
        role: 'assistant',
        content: `❌ 网络连接失败: ${error.message || 'Unknown Error'}`
      }]);
    } finally {
      setLoading(false);
    }
  };

  const clearChat = () => setMessages([]);

  return {
    messages,
    input,
    setInput,
    loading,
    handleSend,
    clearChat
  };
}