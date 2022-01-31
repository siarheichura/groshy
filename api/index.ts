import express from 'express';
const app = express();

import mongoose from 'mongoose';
import cors from 'cors';

import { router } from './routes/user.routes';

const mongoUrl =
  'mongodb+srv://siarhei:qwerty123@cluster0.bxsyh.mongodb.net/groshy?retryWrites=true&w=majority';

const PORT = process.env.PORT || 5000;

const corsOptions = {
  origin: 'http://localhost:4200',
};
app.use(cors(corsOptions));

app.use(express.json());
app.use('/api/groshy', router);

const start = async () => {
  try {
    await mongoose.connect(mongoUrl);
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}...`));
  } catch (err) {
    console.log(err);
  }
};

start();
