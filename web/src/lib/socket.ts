import {io, Socket } from 'socket.io-client';

let socket: Socket | null =  null;

export const connectSocket = (token: string) => {
    if (!socket) {
        socket = io('http://localhost:3000', {
            extraHeaders: {
                Authorization: `Bearer ${token}`,
            },
        });

        socket.on('connect', () => {
            console.log('Socket conectado', socket?.id)
        });

        socket.on(' disconnect', () => {
            console.log('Socket desconectado')
        });
    }
    return socket;
}

export const getSocket = () => socket;