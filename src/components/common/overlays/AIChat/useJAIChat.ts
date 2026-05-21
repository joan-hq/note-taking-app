'use client'

import { useState } from "react";

export const useJAIChat = () => {
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([]);
    const handleSend = async () => {
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                messages: updateedMessages,
                noteContext: noteContent
            })
        })
    };

    return{
        input,
        setInput,
        handleSend
    };
};