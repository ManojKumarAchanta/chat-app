import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const socket = io('https://chat-server-7llu.onrender.com');

function App() {
    const [room, setRoom] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        socket.on('message', (msg) => {
            setMessages((prevMessages) => [...prevMessages, msg]);
        });

        return () => {
            socket.off('message');
        };
    }, []);

    const joinRoom = () => {
        if (room) {
            socket.emit('joinRoom', room);
        }
    };

    const sendMessage = (e) => {
        e.preventDefault();
        if (message) {
            socket.emit('chatMessage', { room, message });
            setMessage('');
        }
    };

    return (
        <div className="chat-container">
  <h1 className="chat-title">Chat Room</h1>
  <div className="room-input-container">
    <input
      type="text"
      placeholder="Room"
      value={room}
      onChange={(e) => setRoom(e.target.value)}
      className="room-input"
    />
    <button onClick={joinRoom} className="join-room-btn">Join Room</button>
  </div>
  <div className="messages-container">
    <h2 className="messages-title">Messages</h2>
    <ul className="messages-list">
      {messages.map((msg, index) => (
        <li key={index} className="message-item">{msg.message}</li>
      ))}
    </ul>
  </div>
  <form onSubmit={sendMessage} className="message-form">
    <input
      type="text"
      placeholder="Type a message"
      value={message}
      onChange={(e) => setMessage(e.target.value)}
      className="message-input"
    />
    <button type="submit" className="send-btn">Send</button>
  </form>
</div>


    );
}

export default App;