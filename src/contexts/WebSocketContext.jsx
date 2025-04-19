import React, { createContext, useContext, useEffect, useState } from "react";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";

const WebSocketContext = createContext();

export const WebSocketProvider = ({ children }) => {
  const [locationMessage, setLocationMessage] = useState(null);
  const api = (import.meta.env.VITE_APP_URL).replace("/api/v1", "") || "http://localhost:8080";
  if(!api) {
    console.error("API URL is not defined. Please check your environment variables.");
    return;
  }

  useEffect(() => {
    const client = new Client({
      webSocketFactory: () => new SockJS(`${api}/ws`),
      onConnect: () => {
        console.log("WebSocket connected");
        client.subscribe("/topic/newLocation", (message) => {
            const payload = JSON.parse(message.body);
            console.log("Location message received:", payload);
            setLocationMessage(payload);
        });
      },
      onStompError: (frame) => {
        console.error("WebSocket error:", frame.headers["message"]);
      },
      debug: (str) => console.log(str),
    });

    client.activate();

    return () => {
      client.deactivate();
    };
  }, []);

  return (
    <WebSocketContext.Provider value={{ locationMessage }}>
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocketContext = () => useContext(WebSocketContext);
