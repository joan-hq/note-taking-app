'use client'

import { useJAIChat } from "./useJAIChat";

interface JAIChatDrawerProps {
    isJOpen: boolean;
    onclose: () => void;
};



export const JAIChatDrawer = ({ onclose, isJOpen }: JAIChatDrawerProps) => {
    const { input, setInput, handleSend } = useJAIChat();

    if (!isJOpen) return null;

    return (
        <div>
            {/* header */}
            <div>
                <h3>Hi, I am a AI assistant</h3>
                <button onClick={onclose}>x</button>
            </div>

            {/* content */}
            <div>
                <p>Hi, I am your AI Assistant</p>
            </div>

            {/* footer */}
            <div>
                <input placeholder="Ask Something..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') handleSend();
                    }}
                />
                <button onClick={handleSend}>Send</button>
            </div>
        </div>
    );
};