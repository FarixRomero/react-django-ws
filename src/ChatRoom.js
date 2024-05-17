import React, { useState, useEffect, useRef } from 'react';

const Chat = () => {
    const [message, setMessage] = useState('');
    const [chatMessages, setChatMessages] = useState([]);
    const webSocket = useRef(null);

    useEffect(() => {
        // Conectar al WebSocket
        webSocket.current = new WebSocket('ws://localhost:8000/ws/chat/general/');

        webSocket.current.onopen = () => {
            console.log('WebSocket Client Connected');
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
            <h1>Chat</h1>
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

export default Chat;
