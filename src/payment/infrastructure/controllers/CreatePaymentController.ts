import { Request, Response } from "express";

import { CreatePaymentUseCase } from "../../application/CreatePaymentUseCase";

export class CreatePaymentController {
  constructor(readonly createPaymentUseCase: CreatePaymentUseCase) {}

  async run(req: Request, res: Response) {
    let data = req.body;
    try {
      const pay = true;
      const payment = await this.createPaymentUseCase.run(
        data.messageJSON.id + " - " + data.messageJSON.name,
        pay
      );
      if (payment)
        res.status(201).send({
          status: "success",
          data: {
            id: payment?.id,
            name: payment?.name,
            pay: payment?.pay
          },
        });
      else
        res.status(204).send({
          status: "error",
          data: "No fue posible agregar el registro!",
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
