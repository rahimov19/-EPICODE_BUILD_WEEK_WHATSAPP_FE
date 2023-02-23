import { createContext } from "react";
import { io } from "socket.io-client";

export const socket = io(process.env.REACT_APP_BE_URL, {
  transports: ["websocket"],
});

export const SocketContent = createContext();
