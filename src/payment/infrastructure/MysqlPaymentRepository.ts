import { query } from "../../database/mysql";
import { Payment } from "../domain/Payment";
import { PaymentRepository } from "../domain/PaymentRepository";

export class MysqlPaymentRepository implements PaymentRepository {
  async getAll(): Promise<Payment[] | null> {
    const sql = "SELECT * FROM payment";
    try {
      const [data]: any = await query(sql, []);
      const dataPayment = Object.values(JSON.parse(JSON.stringify(data)));

      return dataPayment.map(
        (payment: any) =>
          new Payment(
            payment.id,
            payment.name,
            payment.pay
          )
      );
    } catch (error) {
      return null;
    }
  }

  async getById(userId: number): Promise<Payment | null> {
    const sql = "SELECT * FROM payment WHERE id=?";
    const params: any[] = [userId];
    try {
      const [result]: any = await query(sql, params);

      return new Payment(
        result[0].id,
        result[0].name,
        result[0].pay
      );
    } catch (error) {
      return null;
    }
  }

  async createPayment(pay: Payment): Promise<Payment | null> {
    let payment = null;
    const sql =
      "INSERT INTO payment (name, pay) VALUES (?,?)";
    const params: any[] = [pay.name, pay.pay];
    try {
      const [result]: any = await query(sql, params);
      payment = new Payment(
        result.insertId,
        pay.name,
        pay.pay
      );
    } catch (error) {
      payment = null;
    } finally {
      return payment;
    }
  }
}
