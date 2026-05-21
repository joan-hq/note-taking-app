'use client';

import { useState } from 'react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

export default function AbsoluteFailsafeChat() {
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

    // 1. 先把用户的消息塞进聊天框渲染出来
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      // 2. 用最朴实无华的 fetch POST 请求轰炸后端
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...messages, userMessage] }),
      });

      const data = await res.json();
      
      // 🟢 兼容与防御：准备抓取文本
      let replyContent = '';

      if (data && typeof data === 'object') {
        // 优先读取我们上面后端给的 { text: '...' }，同时兼容其他变体
        replyContent = data.text || data.content || (data.text?.text) || '';
      } else if (Array.isArray(data) && data.length > 0) {
        replyContent = data[0].content || data[0].text || '';
      } else if (typeof data === 'string') {
        replyContent = data;
      }

      if (replyContent) {
        // 3. 成功抓到文本，追加到面板中
        setMessages(prev => [...prev, {
          id: 'assistant-' + Date.now(),
          role: 'assistant',
          content: replyContent
        }]);
      } else {
        // 🛠️ 防御警报：如果结构实在诡异，直接打印原生 JSON 字符串到屏幕上强行破案
        console.error("未能识别的结构，当前完整 data 为:", data);
        setMessages(prev => [...prev, {
          id: 'assistant-err-' + Date.now(),
          role: 'assistant',
          content: `⚠️ 未能从返回体中解析出文本，后端原始数据为: ${JSON.stringify(data)}`
        }]);
      }
    } catch (err: any) {
      console.error("请求失败:", err);
      setMessages(prev => [...prev, {
        id: 'assistant-catch-' + Date.now(),
        role: 'assistant',
        content: `❌ 网络或请求发生断开: ${err.message || 'Unknown Error'}`
      }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '40px', maxWidth: '600px', margin: '0 auto', fontFamily: 'sans-serif', background: '#fff', color: '#000' }}>
      <h2 style={{ borderBottom: '2px solid #000', paddingBottom: '10px' }}>🛡️ DashNote AI 铁壁防御面板</h2>
      
      {/* 聊天消息展示区域 */}
      <div style={{ border: '1px solid #000', minHeight: '300px', maxHeight: '400px', overflowY: 'auto', padding: '20px', marginBottom: '20px', borderRadius: '4px' }}>
        {messages.length === 0 && <p style={{ color: '#999' }}>零玄学通道已就绪，请输入“hi”测试连通性...</p>}
        {messages.map(m => (
          <div key={m.id} style={{ margin: '15px 0', textAlign: m.role === 'user' ? 'right' : 'left' }}>
            <strong>{m.role === 'user' ? '我: ' : 'Gemini: '}</strong>
            <span style={{ display: 'inline-block', background: m.role === 'user' ? '#eaeaea' : '#f5f5f5', padding: '8px 12px', borderRadius: '4px', maxWidth: '80%', textAlign: 'left' }}>
              {m.content}
            </span>
          </div>
        ))}
        {loading && <p style={{ color: '#666', fontStyle: 'italic' }}>🤖 Gemini 正在组织语言中...</p>}
      </div>

      {/* 输入与按键操作区域 */}
      <div style={{ display: 'flex', gap: '10px' }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') handleSend(); }}
          placeholder="向 Gemini 提问..."
          disabled={loading}
          style={{ flex: 1, padding: '12px', borderRadius: '4px', border: '2px solid #000', background: '#fff', color: '#000' }}
        />
        <button 
          onClick={handleSend} 
          disabled={loading}
          style={{ padding: '12px 24px', cursor: 'pointer', background: '#000', color: '#fff', border: 'none', borderRadius: '4px', fontWeight: 'bold', opacity: loading ? 0.5 : 1 }}
        >
          {loading ? '思考中...' : '发送'}
        </button>
      </div>
    </div>
  );
}