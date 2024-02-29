import { Request, Response } from "express";

import { GetAllPaymentUseCase } from "../../application/GetAllPaymentUseCase";

export class GetAllPaymentController {
  constructor(readonly getAllPaymentUseCase: GetAllPaymentUseCase) {}

  async run(req: Request, res: Response): Promise<void> {
    try {
      const payment = await this.getAllPaymentUseCase.run();
      if (payment)
        res.status(200).send({
          status: "success",
          data: payment.map((payment: any) => {
            return {
              id: payment.id,
              name: payment.name,
              pay: payment.pay
            };
          }),
        });
      else
        res.status(400).send({
          status: "error",
          msn: "Ocurrio algún problema!",
        });
    } catch (error) {
      res.status(204).send({
        status: "error",
        data: "Ocurrio un error!",
        msn: error,
      });
    }
  }
}
