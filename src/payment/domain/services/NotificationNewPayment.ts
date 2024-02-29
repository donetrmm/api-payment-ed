import { Payment } from "../Payment";

export interface NotificationNewPayment {
  sendNotification(payment: Payment): Promise<boolean>;
}
