import { Payment } from "../../domain/Payment";
import { NotificationNewPay } from "../../infrastructure/servicesRabbitMQ/NotificationNewPayment";

export class NotificationPaymentUseCase {
  constructor(readonly paymentNotifiacion: NotificationNewPay) {}

  async run(payment: Payment) {
    await this.paymentNotifiacion.sendNotification(payment);
  }
}
