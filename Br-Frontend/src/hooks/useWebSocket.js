import { useEffect, useRef, useState, useCallback } from "react";

const SOCKET_URL = import.meta.env.VITE_WS_URL || "http://localhost:5001";

export function useWebSocket(token) {
  const [connected, setConnected] = useState(false);
  const [lastMessage, setLastMessage] = useState(null);
  const socketRef = useRef(null);

  useEffect(() => {
    if (!token) return;

    let socket;
    import("socket.io-client").then(({ io }) => {
      socket = io(SOCKET_URL, {
        auth: { token },
        transports: ["websocket", "polling"],
      });

      socket.on("connect", () => setConnected(true));
      socket.on("disconnect", () => setConnected(false));
      socket.on("order-status-update", (data) => setLastMessage({ type: "order-update", data }));
      socket.on("new-order", (data) => setLastMessage({ type: "new-order", data }));
      socket.on("order-update", (data) => setLastMessage({ type: "admin-order-update", data }));

      socketRef.current = socket;
    }).catch(() => {});

    return () => {
      if (socket) socket.disconnect();
    };
  }, [token]);

  const joinOrder = useCallback((orderId) => {
    socketRef.current?.emit("join-order", orderId);
  }, []);

  const joinAdmin = useCallback(() => {
    socketRef.current?.emit("join-admin");
  }, []);

  return { connected, lastMessage, joinOrder, joinAdmin };
}
