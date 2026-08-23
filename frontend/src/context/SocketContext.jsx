import React, { createContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';

export const SocketDataContext = createContext();

const SocketContext = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        // Create socket connection
        const newSocket = io(import.meta.env.VITE_BASE_URL, {
            transports: ['websocket'],
        });

        setSocket(newSocket);

        // Connection successful
        newSocket.on('connect', () => {
            console.log('Socket connected:', newSocket.id);
            setIsConnected(true);
        });

        // Connection lost
        newSocket.on('disconnect', (reason) => {
            console.log('Socket disconnected:', reason);
            setIsConnected(false);
        });

        // Connection error
        newSocket.on('connect_error', (error) => {
            console.error('Socket connection error:', error.message);
            setIsConnected(false);
        });

        // Cleanup
        // return () => {
        //     console.log('Closing socket connection...');
        //     newSocket.disconnect();
        // };
    }, []);

    // Send message to server
    // const sendMessage = (eventName, data) => {
    //     if (!socket) {
    //         console.warn('Socket is not connected');
    //         return;
    //     }

    //     socket.emit(eventName, data);
    // };

    // // Receive message from server
    // const receiveMessage = (eventName, callback) => {
    //     if (!socket) {
    //         console.warn('Socket is not connected');
    //         return;
    //     }

    //     socket.on(eventName, callback);

    //     // Return cleanup function
    //     return () => {
    //         socket.off(eventName, callback);
    //     };
    // };

    return (
        <SocketDataContext.Provider
            value={{
                socket,
                isConnected,
            }}
        >
            {children}
        </SocketDataContext.Provider>
    );
};

export default SocketContext;