import React, { useState } from 'react';
import { useChatPresenter } from '../presenters/useChatPresenter';

const Chatbot = () => {
  const { messages, sendMessage, loading } = useChatPresenter();
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      sendMessage(input);
      setInput('');
    }
  };

  return (
    <div className="chatbot">
      <div className="messages">
        {messages.map((msg, idx) => (
          <div key={idx} className={`message ${msg.role}`}>
            {msg.content}
          </div>
        ))}
        {loading && <div className="message bot">...</div>}
      </div>

      <form onSubmit={handleSubmit}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Tanyakan sesuatu..."
        />
        <button type="submit">Kirim</button>
      </form>
    </div>
  );
};

export default Chatbot;
