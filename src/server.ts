import express from "express";
import morgan from "morgan";
import { Signale } from "signale";
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config()

import { paymentRouter } from "./payment/infrastructure/paymentRouter";

const corsOptions: cors.CorsOptions = {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'], 
};

const app = express();

app.use(cors(corsOptions));  

const signale = new Signale();

const SERVER_PORT = process.env.SERVER_PORT || 4000;

app.use(express.json());
app.use(morgan("dev"));
app.use("/payment", paymentRouter);

app.listen(SERVER_PORT, () => {
  signale.success(`Servicio corriendo en el puerto ${SERVER_PORT}`);
});
