import { useEffect, useState } from "react";
import { connectSocket, getSocket } from "@/lib/socket";

interface Message {
    id: string;
    content: string;
    createdAt: string;
    sender: {
        id: string;
        name: string;
    };
    receiver: {
        id: string;
        name: string;
    };
}

export const useChat = (toekn: string, senderId: string, receiverId: string) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [socketReady, setSocketReady] = useState(false);

    useEffect(() => {
        const socket = connectSocket(toekn);

        socket.on('messageHistory', (data: Message[]) => {
            setMessages(data);
        });

        socket.on('receiveMessage', (message: Message) => {
            setMessages(prev => [...prev, message]);
        });

        socket.on('messageSend', (message: Message) => {
            setMessages(prev => [...prev, message]);
        });

        setSocketReady(true);

        return () => {
            socket.disconnect();
        };
    }, []);

    const sendMessage = (content: string) => {
        const socket = getSocket();
        if(socket) {
            socket.emit('sendMessage', {receiverId: receiverId, content});
        }
    };

    const loadMessages = () => {
        const socket = getSocket();
        if(socket) {
            socket.emit('getMessages', {sender: senderId, receiver: receiverId});
        }
    };

    return {
        messages,
        sendMessage,
        loadMessages,
        socketReady
    }
}