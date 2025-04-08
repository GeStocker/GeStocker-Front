'use client';

import {  useState } from 'react';
import  ChatBox  from './ChatBox';
import CollaboratorSelector from './CollaboratorSelector';

interface Collaborator {
    id: string;
    name: string;
}

interface ChatWidgetProps {
    token: string;
    senderId: string;
    businessId: string;
}

export default function ChatWidget({ token, senderId, }: ChatWidgetProps) {
    const [open, setOpen] = useState(false);
    const [receiverId, setReceiverId] = useState<Collaborator | null>(null);

    return (
        <>
        <button
            onClick={() => setOpen(!open)}
            className="fixed bottom-4 right-4 bg-blue-600 text-white rounded-full p-4 shadow-lg hover:bg-blue-700 z-50"
        >
        CHAT
        </button>

        {open && receiverId &&(
            <div className="fixed bottom-20 right-4 w-96 h-[32rem] bg-white rounded-xl shadow-lg flex flex-col border border-gray-300 overflow-hidden z-50">
                <div className="bg-blue-600 text-white px-4 py-2 flex justify-between items-center">
                    <span>{receiverId ? `Chat con ${receiverId.name}` : 'Selecciona un colaborador'}</span>
                    <button onClick={() => {setReceiverId(null); setOpen(false)}} className="text-white font-bold">X</button>
                </div>
                <div className="flex-1 overflow-hidden">
                    {!receiverId ? (
                        <CollaboratorSelector token={token}  onSelect={setReceiverId} />
                    ) : (
                        <ChatBox senderId={senderId} receiverId={receiverId} />
                    )}
                </div>
            </div>
        )}
        </>
    );
}
