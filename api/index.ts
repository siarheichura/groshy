import express from 'express';
import dotenv from 'dotenv';
const app = express();
dotenv.config();

import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { errorMiddleware } from './middleware/error.middleware';

import { RouterEnum } from './shared/enums/RouterEnum';
import { walletRouter } from './routes/wallet.routes';
import { userRouter } from './routes/user.router';
import { expensesRouter } from './routes/expenses.router';
import { incomeRouter } from './routes/income.router';
import { categoryRouter } from './routes/categoty.routes';

app.use(express.json({ limit: '50mb' }));
app.use(
  cors({
    credentials: true,
    origin: [process.env.CLIENT_URL, process.env.CLIENT_URL_LOCAL],
  })
);
app.use(cookieParser());
app.use(
  `/${RouterEnum.Base}`,
  userRouter,
  walletRouter,
  categoryRouter,
  expensesRouter,
  incomeRouter
);
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
