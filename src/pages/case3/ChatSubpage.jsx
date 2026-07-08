import { useState } from 'react';

export default function ChatSubpage() {
  const [messages, setMessages] = useState([
    { id: 1, user: 'Manami', content: 'Hello, how can I help you today?', time: '10:23', isMe: false },
    { id: 2, user: 'Me', content: 'Hi, I need help with product setup.', time: '10:24', isMe: true },
    { id: 3, user: 'Manami', content: 'Sure! Which product are you using?', time: '10:25', isMe: false },
    { id: 4, user: 'Me', content: 'The latest model. I am having issues with the settings.', time: '10:26', isMe: true },
    { id: 5, user: 'Manami', content: 'Let me guide you step by step. First, please ensure you are connected to the network...', time: '10:27', isMe: false },
  ]);

  const [inputValue, setInputValue] = useState('');

  const handleSend = () => {
    if (!inputValue.trim()) return;
    const newMessage = {
      id: messages.length + 1,
      user: '我',
      content: inputValue,
      time: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }),
      isMe: true,
    };
    setMessages([...messages, newMessage]);
    setInputValue('');
  };

  return (
    <div className="h-full flex flex-col gap-4 relative">
      <div className="flex items-center gap-4 shrink-0">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-400 to-purple-400 flex items-center justify-center text-white font-bold text-lg shadow-lg">
          M
        </div>
        <div>
          <h2 className="text-lg font-bold text-slate-700">Manami</h2>
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <div className="w-2 h-2 rounded-full bg-green-500" />
            <span>Online</span>
          </div>
        </div>
      </div>

      <div className="flex-1 liquid-glass rounded-2xl p-6 overflow-auto space-y-4 min-h-0">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex gap-3 ${msg.isMe ? 'flex-row-reverse' : ''}`}>
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-white font-semibold text-sm shrink-0 shadow-md ${
              msg.isMe 
                ? 'bg-gradient-to-br from-blue-400 to-cyan-400' 
                : 'bg-gradient-to-br from-pink-400 to-purple-400'
            }`}>
              {msg.isMe ? 'Me' : 'M'}
            </div>
            <div className={`max-w-[70%] ${msg.isMe ? 'items-end' : 'items-start'}`}>
              <div className={`px-4 py-3 rounded-2xl ${msg.isMe 
                ? 'bg-gradient-to-r from-pink-400/80 to-purple-400/80 text-white rounded-br-md' 
                : 'bg-white/50 text-slate-700 rounded-bl-md'
              }`}>
                <p className="text-sm">{msg.content}</p>
              </div>
              <div className={`text-[10px] text-slate-400 mt-1 ${msg.isMe ? 'text-right' : ''}`}>
                {msg.time}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="glass rounded-xl p-3 flex items-center gap-3 shrink-0" style={{ height: '56px' }}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          placeholder="输入消息..."
          className="flex-1 input-glass border-none h-9"
        />
        <button onClick={handleSend} className="glass-button hover:text-pink-700 p-2">
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="22" y1="2" x2="11" y2="13" />
            <polygon points="22 2 15 22 11 13 2 9 22 2" />
          </svg>
        </button>
      </div>
    </div>
  );
}