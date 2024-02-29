import { CreatePaymentUseCase } from "../application/CreatePaymentUseCase";
import { GetAllPaymentUseCase } from "../application/GetAllPaymentUseCase";
import { GetByIdPaymentUseCase } from "../application/GetByIdPaymentUseCase";
import { NotificationPaymentUseCase } from "../application/Services/NotificationNewPayment";
import { RealTimeNotificationPaymentUseCase } from '../application/Services/RealTimeSendNotification'
import { CreatePaymentController } from "./controllers/CreatePaymentController";
import { GetAllPaymentController } from "./controllers/GetAllPaymentController";
import { GetByIdPaymentController } from "./controllers/GetByIdPaymentController";
import { EncryptService } from "./helpers/EncryptService";
import { MysqlPaymentRepository } from "./MysqlPaymentRepository";
import { NotificationNewPay } from "./servicesRabbitMQ/NotificationNewPayment";
import { RealTimeSNotification } from "./servicesSocket.io/RealTimeSendNotification"

export const mysqlPaymentRepository = new MysqlPaymentRepository();
export const paymentNotification = new NotificationNewPay();
export const realTimeNotification = new RealTimeSNotification();
export const encryptPassword = new EncryptService();
export const paymentNotificationUseCase = new NotificationPaymentUseCase(
  paymentNotification
);
export const realTimeNotificationUseCase = new RealTimeNotificationPaymentUseCase(
  realTimeNotification
)
export const createPaymentUseCase = new CreatePaymentUseCase(
  mysqlPaymentRepository,
  paymentNotificationUseCase,
  realTimeNotificationUseCase
);
export const getAllUseCase = new GetAllPaymentUseCase(mysqlPaymentRepository);
export const getByIdPaymentUseCase = new GetByIdPaymentUseCase(
  mysqlPaymentRepository
);
export const createPaymentController = new CreatePaymentController(
  createPaymentUseCase
);
export const getAllPaymentController = new GetAllPaymentController(
  getAllUseCase
);
export const getByIdPaymentController = new GetByIdPaymentController(
  getByIdPaymentUseCase
);
