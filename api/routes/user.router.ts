import express from 'express';
import { check } from 'express-validator';
import { UserController } from './../controllers/user.controller';
import { RouterEnum } from '../shared/enums/RouterEnum';

export const userRouter = express.Router();
const controller = new UserController();

const validator = {
  username: check(
    'username',
    'Username cannot be shorter than 3 characters'
  ).isLength({
    min: 3,
  }),
  email: check('email', 'Incorrect email').isEmail(),
  password: check(
    'password',
    'Password min length is 8 characters (includes A-Z, a-z and number)'
  ).matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/),
};

userRouter.post(
  RouterEnum.Registration,
  [validator.username, validator.email, validator.password],
  controller.registration
);
userRouter.post(RouterEnum.Login, controller.login);
userRouter.post(RouterEnum.Logout, controller.logout);
userRouter.get(`${RouterEnum.Activate}/:link`, controller.activate);
userRouter.get(`${RouterEnum.User}/:id`, controller.getUser);
userRouter.post(RouterEnum.Refresh, controller.refresh);
userRouter.post(
  `${RouterEnum.UserUpdate}/:id`,
  [validator.username, validator.email],
  controller.updateUserInfo
);
userRouter.post(`${RouterEnum.ChangePassword}/:id`, controller.changePassword);
