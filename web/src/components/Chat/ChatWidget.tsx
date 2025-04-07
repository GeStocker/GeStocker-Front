'use client';

import {  useState } from 'react';
import  ChatBox  from './ChatBox';

interface ChatWidgetProps {
    token: string;
    senderId: string;
    receiverId: { id: string; name: string };
}

export default function ChatWidget({ senderId, receiverId }: ChatWidgetProps) {
    const [open, setOpen] = useState(false);

    return (
        <>
        <button
            onClick={() => setOpen(!open)}
            className="fixed bottom-4 right-4 bg-blue-600 text-white rounded-full p-4 shadow-lg hover:bg-blue-700 z-50"
        >
        CHAT
        </button>

        {open && (
            <div className="fixed bottom-20 right-4 w-96 h-[32rem] bg-white rounded-xl shadow-lg flex flex-col border border-gray-300 overflow-hidden z-50">
                <div className="bg-blue-600 text-white px-4 py-2 flex justify-between items-center">
                    <span>Chat con {receiverId.name}</span>
                    <button onClick={() => setOpen(false)} className="text-white font-bold">X</button>
                </div>
                <div className="flex-1 overflow-hidden">
                    <ChatBox senderId={senderId} receiverId={receiverId} />
                </div>
            </div>
        )}
        </>
    );
}
