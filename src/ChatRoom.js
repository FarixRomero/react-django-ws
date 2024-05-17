import React, { useState, useEffect, useRef } from 'react';

const ChatRoom = () => {
    const [message, setMessage] = useState('');
    const [chatMessages, setChatMessages] = useState([]);
    const webSocket = useRef(null);

    useEffect(() => {
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzE2NDE0NjM5LCJpYXQiOjE3MTU5ODI2MzksImp0aSI6ImRkMDA2ZmU3NzFlYTRkMTY4OTc3MjRiNzc2NzdmMzY2IiwidXNlcl9pZCI6MX0.K7l7D7sX5ZweCut5mgRzQBGyXt4XMPcogGr55XJJghU';

        // Conectar al WebSocket con el token en la URL
        const wsUrl = `ws://localhost:8000/ws/notifications/?token=${token}`;
        webSocket.current = new WebSocket(wsUrl);
        
        webSocket.current.onopen = () => {
            // Envía el token JWT al WebSocket
            webSocket.current.send(JSON.stringify({ token }));
        };

        webSocket.current.onmessage = (e) => {
            const data = JSON.parse(e.data);
            setChatMessages((prevMessages) => [...prevMessages, data.message]);
        };

        webSocket.current.onclose = () => {
            console.log('WebSocket Client Disconnected');
        };

        webSocket.current.onerror = (error) => {
            console.error('WebSocket Error:', error);
        };

        return () => {
            webSocket.current.close();
        };
    }, []);

    const sendMessage = () => {
        if (webSocket.current && webSocket.current.readyState === WebSocket.OPEN) {
            webSocket.current.send(JSON.stringify({
                'message': message
            }));
            setMessage('');
        } else {
            console.error('WebSocket is not open.');
        }
    };

    return (
        <div>
            <h1>Chat Room</h1>
            <div>
                {chatMessages.map((msg, index) => (
                    <p key={index}>{msg}</p>
                ))}
            </div>
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />
            <button onClick={sendMessage}>Send</button>
        </div>
    );
};

export default ChatRoom;
