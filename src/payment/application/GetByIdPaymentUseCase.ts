import { Payment } from "../domain/Payment";
import { PaymentRepository } from "../domain/PaymentRepository";

export class GetByIdPaymentUseCase {
  constructor(readonly PaymentRepository: PaymentRepository) {}

  async run(id: number): Promise<Payment | null> {
    try {
      const result = await this.PaymentRepository.getById(id);
      return result;
    } catch (error) {
      return null;
    }
  }
}
