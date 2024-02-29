import { Payment } from "../domain/Payment";
import { PaymentRepository } from "../domain/PaymentRepository";
import { NotificationPaymentUseCase } from "./Services/NotificationNewPayment";
import { RealTimeNotificationPaymentUseCase } from "./Services/RealTimeSendNotification"

export class CreatePaymentUseCase {
  constructor(
    readonly paymentRepository: PaymentRepository,
    readonly sendNotification: NotificationPaymentUseCase,
    readonly sendRealTimeNotification: RealTimeNotificationPaymentUseCase
  ) {}

  async run(
    name: string,
    pay: boolean
  ): Promise<Payment | null> {
    const payment = new Payment(0, name, pay);
    try {
      const pay = await this.paymentRepository.createPayment(payment);
      if (pay)
        this.sendNotification.run(pay);
        this.sendRealTimeNotification.run(payment)
      return pay;
    } catch (error) {
      return null;
    }
  }
}
