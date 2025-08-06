import React, { createContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';

export const SocketContext = createContext();

const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // Initialize the socket connection
    const newSocket = io(import.meta.env.VITE_BASE_URL, {
      transports: ['websocket', 'polling'],
    });

    newSocket.on('connect', () => {
      console.log(`Connected to server with socket ID: ${newSocket.id}`);
    });

    newSocket.on('disconnect', () => {
      console.log('Disconnected from server');
    });

    setSocket(newSocket);

    // Cleanup the socket connection when the component unmounts
    return () => {
      newSocket.disconnect();
    };
  }, []);

  // Function to send a message to a specific event
  const sendMessage = (eventName, message) => {
    if (socket) {
      socket.emit(eventName, message);
    } else {
      console.error('Socket is not connected.');
    }
  };

  // Function to listen for messages from a specific event
  const receiveMessage = (eventName, callback) => {
    if (socket) {
      socket.on(eventName, callback);
    } else {
      console.error('Socket is not connected.');
    }
  };

  return (
    <SocketContext.Provider value={{ socket, sendMessage, receiveMessage }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;