'use client';
import { useAuth } from '@/context/AuthContext';
import { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';

interface Collaborator {
    id: string;
    name: string;
}

interface ChatMessage {
    id: string;
    sender: Collaborator;
    receiver: Collaborator;
    content: string;
}

interface ChatBoxProps {
    senderId: string;
    receiverId: Collaborator;
}

const socket = io(process.env.NEXT_PUBLIC_API_URL!, {
    autoConnect: false,
});

export default function ChatBox({ senderId, receiverId }: ChatBoxProps) {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [newMessage, setNewMessage] = useState('');
    const messagesEndRef = useRef<HTMLDivElement | null>(null);
    const {token} = useAuth()

    // Conexión con token
    useEffect(() => {
        if (token) {
            socket.io.opts.extraHeaders = {
                Authorization: `Bearer ${token}`,
            };
            socket.connect();
        }

        return () => {
            socket.disconnect();
        };
    }, []);

    // Escuchar nuevos mensajes
    useEffect(() => {
        const handler = (msg: ChatMessage) => {
            if (
                (msg.sender.id === receiverId.id && msg.receiver.id === senderId) ||
                (msg.sender.id === senderId && msg.receiver.id === receiverId.id)
            ) {
                setMessages((prev) => [...prev, msg]);
            }
        };

        socket.on('receiveMessage', handler);
        return () => {
            socket.off('receiveMessage', handler);
        };
    }, [receiverId, senderId]);

    // Escuchar historial
    useEffect(() => {
        const handler = (msgs: ChatMessage[]) => setMessages(msgs);
        socket.on('messageHistory', handler);
        return () => {
            socket.off('messageHistory', handler);
        };
    }, []);

    // Obtener historial al seleccionar receptor
    useEffect(() => {
        if (receiverId) {
            socket.emit('getMessages', {
                sender: senderId,
                receiver: receiverId.id,
            });
        }
    }, [receiverId, senderId]);

    const sendMessage = () => {
        if (!newMessage.trim()) return;
        socket.emit('sendMessage', {
            receiveId: receiverId.id,
            content: newMessage,
        });
        setNewMessage('');
    };

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    return (
        <div className="flex flex-col h-full">
            <div className="flex-1 p-2 overflow-y-auto">
                {messages.map((msg) => (
                    <div
                        key={msg.id}
                        className={`mb-2 ${msg.sender.id === senderId ? 'text-right' : 'text-left'}`}
                    >
                        <div
                            className={`inline-block px-3 py-2 rounded-lg ${
                                msg.sender.id === senderId ? 'bg-custom-grisClarito' : 'bg-custom-GrisOscuro rustic:bg-custom-marronClarito'
                            }`}
                        >
                            <strong>{msg.sender.id === senderId ? 'Tú' : msg.sender.name}</strong>: {msg.content}
                        </div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            <div className="p-2 border-t flex gap-2">
                <input
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                    className="flex-1 border rounded px-2 py-1 dark:text-gray-900"
                    placeholder="Escribe un mensaje..."
                />
                <button
                    onClick={sendMessage}
                    className="bg-custom-GrisOscuro text-custom-casiNegro rustic:bg-custom-marronClarito px-3 rounded hover:bg-custom-grisClarito"
                >
                    ➤
                </button>
            </div>
        </div>
    );
}
