import io from "socket.io-client";
import { createContext } from "react";

export const socket = io(import.meta.env.VITE_API_URL);
export const SocketContext = createContext<typeof socket | undefined>(
  undefined
);
