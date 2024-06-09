import React, { useEffect, useState, useRef } from 'react';

const WebSocketComponent = () => {
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const socketRef = useRef(null);

    useEffect(() => {
        socketRef.current = new WebSocket('ws://localhost:8000/ws');

        socketRef.current.onopen = () => {
            console.log('WebSocket connection established');
        };

        socketRef.current.onmessage = (event) => {
            setMessages((prevMessages) => [...prevMessages, event.data]);
        };

        socketRef.current.onclose = () => {
            console.log('WebSocket connection closed');
        };

        return () => {
            socketRef.current.close();
        };
    }, []);

    const sendMessage = () => {
        if (socketRef.current.readyState === WebSocket.OPEN) {
            socketRef.current.send(inputValue);
            setInputValue('');
        }
    };

    return (
        <div>
            <h2>WebSocket Communication</h2>
            <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
            />
            <button onClick={sendMessage}>Send</button>
            <ul>
                {messages.map((message, index) => (
                    <li key={index}>{message}</li>
                ))}
            </ul>
        </div>
    );
};

export default WebSocketComponent;
