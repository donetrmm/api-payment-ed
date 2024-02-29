import { Socket } from "socket.io-client";
import io from "socket.io-client";

import { Payment } from "../../domain/Payment";
import { RealTimeSendNotification } from "../../domain/services/RealTimeSendNotification";

export class RealTimeSNotification implements RealTimeSendNotification {
  private url: any;

  constructor() {
    this.url = process.env.SOCKET_URL;
  }

  async sendRealTimeNotification(payment: Payment): Promise<boolean> {
    const socket: Socket = io(this.url);
    let conn = false;
    socket.on("connect", () => {
        conn = true;
        console.log("Conectado al servidor WebSocket");
        socket.emit("apiEvent", { 
            name: payment.name,
            pay: payment.pay
        });
      });
      
      socket.on("disconnect", () => {
        console.log("Desconectado del servidor WebSocket");
      });
      
      socket.on("error", (error: Error) => {
        console.error("Error en la conexión WebSocket:", error.message);
      });
    return conn;
  }
}
