import express from 'express';
const app = express();

import mongoose from 'mongoose';
import cors from 'cors';

import { config } from './config';
import { RouterEnum } from './shared/enums/RouterEnum';
import { walletRouter } from './routes/wallet.routes';
import { userRouter } from './routes/auth.router';
import { expensesRouter } from './routes/expenses.router';
import { incomeRouter } from './routes/income.router';

app.use(cors(config.CORS_OPTIONS));
app.use(express.json());
app.use(
  RouterEnum.Base,
  userRouter,
  walletRouter,
  expensesRouter,
  incomeRouter
);

const start = async () => {
  try {
    await mongoose.connect(config.DB_URL);
    app.listen(config.PORT, () =>
      console.log(`Server is running on port ${config.PORT}...`)
    );
  } catch (err) {
    console.log(err);
  }
};

start();
