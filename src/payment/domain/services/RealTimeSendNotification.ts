import { Payment } from "../Payment";

export interface RealTimeSendNotification {
    sendRealTimeNotification(payment: Payment): Promise<boolean>;
}
