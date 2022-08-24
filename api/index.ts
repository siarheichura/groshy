import express from 'express'
import dotenv from 'dotenv'
const app = express()
dotenv.config()

import mongoose from 'mongoose'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { errorMiddleware } from './middleware/error.middleware'

import { ROUTER_ENUM } from './shared/enums/Router.enum'
import { walletRouter } from './routes/wallet.routes'
import { userRouter } from './routes/user.router'
import { categoryRouter } from './routes/category.routes'
import { operationRouter } from './routes/operation.router'

app.use(express.json({ limit: '50mb' }));
app.use(
  cors({
    credentials: true,
    origin: [process.env.CLIENT_URL, process.env.CLIENT_URL_LOCAL],
  })
);
app.use(cookieParser());
app.use(
  ROUTER_ENUM.BASE,
  userRouter,
  walletRouter,
  operationRouter,
  categoryRouter
)
app.use(errorMiddleware);

const start = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    app.listen(process.env.PORT, () =>
      console.log(`Server is running on port ${process.env.PORT}...`)
    );
  } catch (err) {
    console.log(err);
  }
};

start();
