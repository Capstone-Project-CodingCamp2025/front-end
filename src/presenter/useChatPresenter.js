import { useState } from 'react';
import { sendChatMessage } from '../api/chat';

export function useChatPresenter() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async (text) => {
    const newUserMsg = { role: 'user', content: text };
    setMessages(prev => [...prev, newUserMsg]);
    setLoading(true);

    try {
      const response = await sendChatMessage(text, messages);
      const newBotMsg = { role: 'bot', content: response };
      setMessages(prev => [...prev, newBotMsg]);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return { messages, sendMessage, loading };
}
