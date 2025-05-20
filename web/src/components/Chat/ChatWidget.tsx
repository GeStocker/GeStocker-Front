    "use client";

    import { useBusiness } from "@/context/BusinessContext";
    import { getCollaboratorsByBusiness } from "@/services/user/collaborator";
    import { useEffect, useState } from "react";
    import ChatBox from "./ChatBox";
    import io from "socket.io-client";
    import { getBusinessOwner } from "@/services/user/business";

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

    interface ChatWidgetProps {
    token: string;
    senderId: string;
    }

    interface RawCollaborator {
    id: string;
    username: string;
    }

    const socket = io(process.env.NEXT_PUBLIC_API_URL!, {
    autoConnect: false,
    });

    const LOCAL_STORAGE_KEY = "unreadMessages";

    export default function ChatWidget({ token, senderId }: ChatWidgetProps) {
    const [open, setOpen] = useState(false);
    const [collaborators, setCollaborators] = useState<Collaborator[]>([]);
    const [receiver, setReceiver] = useState<Collaborator | null>(null);
    const [unreadMessages, setUnreadMessages] = useState<{
        [key: string]: number;
    }>({});
    const [hasNewMessage, setHasNewMessage] = useState(false);
    const { businessId } = useBusiness();

    // Cargar unreadMessages desde localStorage al inicio
    useEffect(() => {
        const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (stored) {
        try {
            setUnreadMessages(JSON.parse(stored));
            setHasNewMessage(Object.keys(JSON.parse(stored)).length > 0);
        } catch (err) {
            console.error("Error parsing unread messages from localStorage", err);
        }
        }
    }, []);

    // Guardar cambios en unreadMessages en localStorage
    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(unreadMessages));
    }, [unreadMessages]);

    const fetchCollaborators = async () => {
        if (!token || !businessId) return;
        try {
        const data = await getCollaboratorsByBusiness(token, businessId);
        const parsed = (data as RawCollaborator[])
            .filter((c) => c.id !== senderId)
            .map((c) => ({ id: c.id, name: c.username }));

        const adminId = await getBusinessOwner(token, businessId);

        if (senderId !== adminId) {
            parsed.unshift({ id: adminId, name: "Administrador" });
        }
        setCollaborators(parsed);
        } catch (err) {
        console.error("Error al traer colaboradores:", err);
        }
    };

    useEffect(() => {
        if (!token) return;

        socket.io.opts.extraHeaders = {
        Authorization: `Bearer ${token}`,
        };
        socket.connect();

        const handleReceiveMessage = (msg: ChatMessage) => {
        if (msg.receiver.id === senderId) {
            if (!open || receiver?.id !== msg.sender.id) {
            setUnreadMessages((prev) => {
                const updated = {
                ...prev,
                [msg.sender.id]: (prev[msg.sender.id] || 0) + 1,
                };
                setHasNewMessage(true);
                return updated;
            });
            }
        }
        };

        socket.on("receiveMessage", handleReceiveMessage);

        return () => {
        socket.off("receiveMessage", handleReceiveMessage);
        socket.disconnect();
        };
    }, [token, open, receiver, senderId]);

    useEffect(() => {
        if (open) fetchCollaborators();
    }, [open, token, businessId]);

    const handleOpen = () => {
        setOpen(!open);
        if (!open) {
        setHasNewMessage(false); // abrir borra burbuja del botón
        }
    };

    const handleSelectReceiver = (collab: Collaborator) => {
        setReceiver(collab);
        setUnreadMessages((prev) => {
        const updated = { ...prev };
        delete updated[collab.id];
        return updated;
        });
    };

    return (
        <>
        <button
            onClick={handleOpen}
            className="fixed bottom-4 right-4 bg-custom-casiNegro text-background rounded-full p-4 shadow-lg hover:bg-custom-casiNegro z-50"
        >
            CHAT
            {hasNewMessage && (
            <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs px-2 py-0.5 rounded-full animate-bounce shadow">
                Nuevo
            </span>
            )}
        </button>

        {open && (
            <div className="fixed bottom-20 right-4 w-full md:w-[32rem] h-[36rem] bg-white rounded-xl shadow-lg flex border border-gray-300 overflow-hidden z-50">
            {/* Sidebar de colaboradores */}
            <div className="w-1/3 border-r border-gray-300 p-2 overflow-y-auto bg-gray-100">
                <h3 className="text-sm font-semibold mb-2 dark:text-gray-900">Colaboradores</h3>
                {collaborators.map((collab) => {
                const unreadCount = unreadMessages[collab.id] || 0;
                return (
                    <div
                    key={collab.id}
                    onClick={() => handleSelectReceiver(collab)}
                    className={`relative cursor-pointer px-2 py-1 rounded hover:bg-custom-GrisOscuro  dark:text-gray-900 ${
                        receiver?.id === collab.id ? "bg-custom-casiNegro text-white" : ""
                    }`}
                    >
                    {collab.name}
                    {unreadCount > 0 && (
                        <span className="absolute right-2 top-2 bg-green-500 text-white dark:text-gray-900 text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold">
                        {unreadCount}
                        </span>
                    )}
                    </div>
                );
                })}
            </div>

            {/* Chat principal */}
            <div className="flex-1 flex flex-col">
                <div className="bg-custom-casiNegro text-white dark:text-gray-900 px-4 py-2 flex justify-between items-center">
                <span>
                    {receiver
                    ? `Chat con ${receiver.name}`
                    : "Selecciona un colaborador"}
                </span>
                <button
                    onClick={() => setOpen(false)}
                    className="text-white dark:text-gray-900 font-bold"
                >
                    X
                </button>
                </div>
                {receiver ? (
                <ChatBox senderId={senderId} receiverId={receiver} />
                ) : (
                <div className="flex items-center justify-center flex-1 text-gray-500">
                    Elige un colaborador para comenzar a chatear
                </div>
                )}
            </div>
            </div>
        )}
        </>
    );
    }
