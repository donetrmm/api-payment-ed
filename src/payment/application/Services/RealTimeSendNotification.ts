import { Payment } from "../../domain/Payment";
import { RealTimeSNotification } from "../../infrastructure/servicesSocket.io/RealTimeSendNotification";

export class RealTimeNotificationPaymentUseCase {
  constructor(readonly paymentNotifiacion: RealTimeSNotification) {}

  async run(payment: Payment) {
    await this.paymentNotifiacion.sendRealTimeNotification(payment);
  }
}
