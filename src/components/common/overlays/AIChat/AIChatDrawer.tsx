'use client';

import { useAIChat } from '@/components/common/overlays/AIChat/useAIChat';

interface AIChatDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  noteContent: string;
}

export const AIChatDrawer = ({ isOpen, onClose, noteContent }: AIChatDrawerProps) => {

  const { messages, input, setInput, loading, handleSend } = useAIChat({ noteContent });

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed', right: 0, top: 0, width: '400px', height: '100vh',
      background: '#fff', boxShadow: '-4px 0 20px rgba(0,0,0,0.1)', zIndex: 1000,
      display: 'flex', flexDirection: 'column', padding: '20px', color: '#000', fontFamily: 'sans-serif'
    }}>
      {/* header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>
        <h3 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '6px' }}>🤖 DashNote AI Assistant</h3>
        <button onClick={onClose} style={{ cursor: 'pointer', background: 'none', border: 'none', fontSize: '18px', color: '#666' }}>✕</button>
      </div>

      {/* content */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '10px 0' }}>
        {messages.length === 0 && (
          <p style={{ color: '#999', fontSize: '14px', lineHeight: '1.5', padding: '10px' }}>
            Hay, How can I help you:<br />
            ✨ Summarize?<br />
            💡 Brainstorm?<br />
          </p>
        )}
        {messages.map(m => (
          <div key={m.id} style={{ margin: '12px 0', textAlign: m.role === 'user' ? 'right' : 'left' }}>
            <span style={{
              display: 'inline-block',
              background: m.role === 'user' ? '#eaeaea' : '#f5f5f5',
              padding: '8px 12px',
              borderRadius: '8px',
              maxWidth: '85%',
              fontSize: '14px',
              textAlign: 'left',
              wordBreak: 'break-word'
            }}>
              {m.content}
            </span>
          </div>
        ))}
        {loading && <p style={{ color: '#888', fontSize: '13px', fontStyle: 'italic', paddingLeft: '5px' }}>Gemini 正在组织语言...</p>}
      </div>

      {/* footer */}
      <div style={{ display: 'flex', gap: '8px', paddingTop: '10px', borderTop: '1px solid #eee' }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') handleSend(); }}
          placeholder="Ask Something..."
          disabled={loading}
          style={{ flex: 1, padding: '12px', borderRadius: '6px', border: '1px solid #ccc', background: '#fff', color: '#000', fontSize: '14px' }}
        />
        <button
          onClick={handleSend}
          disabled={loading}
          style={{ padding: '0 18px', background: '#000', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', opacity: loading ? 0.6 : 1 }}
        >
          Send
        </button>
      </div>
    </div>
  );
}