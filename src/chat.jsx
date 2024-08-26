import React, { useState, useEffect } from 'react';
import { getDatabase, ref, onValue, push } from 'firebase/database';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import Login from './login'; // Assuming you have a Login component
import './Chat.css'; // Assuming you have a CSS file for styling

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        const db = getDatabase();
        const messagesRef = ref(db, 'messages');

        onValue(messagesRef, (snapshot) => {
          const messageData = snapshot.val();
          if (messageData) {
            const messageList = Object.keys(messageData).map((key) => ({
              ...messageData[key],
              id: key,
            }));
            setMessages(messageList);
          }
        });
      } else {
        setUser(null);
      }
    });
  }, []);

  const handleMessageSubmit = (event) => {
    event.preventDefault();
    const db = getDatabase();
    const messageRef = ref(db, 'messages');
    const message = {
      content: newMessage,
      timestamp: Date.now(),
      author: user.email, // Including the author's email in the message
    };
    push(messageRef, message);
    setNewMessage('');
  };

  if (!user) {
    return <Login />; // Redirect to login if the user is not authenticated
  }

  return (
    <div className="chat-container">
      <h1>Chat App</h1>
      <ul className="message-list">
        {messages.map((message) => (
          <li key={message.id} className="message-item">
            <strong>{message.author}</strong>: {message.content}
          </li>
        ))}
      </ul>
      <form onSubmit={handleMessageSubmit} className="message-form">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
          className="message-input"
        />
        <button type="submit" className="send-button">Send</button>
      </form>
    </div>
  );
};

export default Chat;
