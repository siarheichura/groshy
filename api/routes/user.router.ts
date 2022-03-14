import express from 'express';
import { check } from 'express-validator';
import { UserController } from './../controllers/user.controller';
import { RouterEnum } from '../shared/enums/RouterEnum';
import { authMiddleware } from '../middleware/auth.middleware';

const passwordReg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;

export const userRouter = express.Router();
const controller = new UserController();

userRouter.post(
  RouterEnum.Registration,
  [
    check('username', 'Username cannot be shorter than 3 characters').isLength({
      min: 3,
    }),
    check('email', 'Incorrect email').isEmail(),
    check(
      'password',
      'Password min length is 8 characters (includes A-Z, a-z and number)'
    ).matches(passwordReg),
  ],
  controller.registration
);
userRouter.post(RouterEnum.Login, controller.login);
userRouter.get(`${RouterEnum.Activate}/:link`, controller.activate);
userRouter.get(`${RouterEnum.User}/:id`, controller.getUser);
