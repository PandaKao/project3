import { useState, useEffect, ChangeEvent, KeyboardEvent } from 'react';
import axios from 'axios';
import './Chatbot.css'; // Import the CSS file for styling

interface Message {
    sender: 'user' | 'ai';
    text: string;
}

const Chatbot = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState<string>('');
    const [isOpen, setIsOpen] = useState<boolean>(false);
    useEffect(() => {
        const initialMessage: Message = {
            sender: 'ai',
            text: 'Welcome to the Apocalyptic Store! How can I assist you today?'
        };
        setMessages([initialMessage]);
    }, []);

    const sendMessage = async () => {
        if (input.trim() === '') return;

        const newMessage: Message = { sender: 'user', text: input };
        setMessages([...messages, newMessage]);

        try {
            console.log('Sending message:', input); // Debugging statement
            const response = await axios.post<{ message: string }>('http://localhost:3001/api/chat', { message: input }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log('Server response:', response.data.message); // Debugging statement
            const aiMessage: Message = { sender: 'ai', text: response.data.message };
            setMessages([...messages, newMessage, aiMessage]);
        } catch (error) {
            console.error('Error communicating with AI:', error);
            if (axios.isAxiosError(error)) {
                console.error('Axios error details:', error.response?.data);
            }
        }

        setInput('');
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value);
    };

    const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    };

    const toggleChatWindow = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="chatbot-container">
            <div className={`chatbot-icon ${isOpen ? 'open' : ''}`} onClick={toggleChatWindow}>
            </div>
            {isOpen && (
                <div className="chat-window">
                    <div className="chat-messages">
                        {messages.map((msg, index) => (
                            <div key={index} className={`message ${msg.sender}`}>
                                {msg.text}
                            </div>
                        ))}
                    </div>
                    <input
                        type="text"
                        value={input}
                        onChange={handleInputChange}
                        onKeyPress={handleKeyPress}
                        placeholder="Type a message..."
                    />
                    <button onClick={sendMessage}>Send</button>
                </div>
            )}
        </div>
    );
};

export default Chatbot;