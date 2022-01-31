import express from 'express';
import { check } from 'express-validator';
import { AuthController } from './../controllers/auth.controller';
import { RouterEnum } from '../shared/enums/RouterEnum';

export const userRouter = express.Router();

const controller = new AuthController();

userRouter.post(
  RouterEnum.Registration,
  [
    check('username', 'Username cannot be empty').notEmpty(),
    check('password', 'Password cannot be shorter than 8 characters').isLength({
      min: 8,
    }),
  ],
  controller.registration
);
userRouter.post(RouterEnum.Login, controller.login);
userRouter.get(RouterEnum.Users, controller.getUsers);
