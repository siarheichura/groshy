import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';

import { ApiError } from './../shared/api.error';
import { userService } from './../services/user.service';
import { UserDto } from './../dtos/user.dto';
import { RouterEnum } from '../shared/enums/RouterEnum';

export class UserController {
  async registration(req: Request, res: Response, next: NextFunction) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(ApiError.BadRequest('Incorrect data', errors.array()));
      }
      const { username, email, password } = req.body;
      const userData = await userService.registration(
        username,
        email,
        password
      );
      return res.json({
        data: userData,
        message: `Hey ${userData.username}! Please confirm your email and login.`,
      });
    } catch (err) {
      next(err);
    }
  }

  async activate(req: Request, res: Response, next: NextFunction) {
    try {
      const activationLink = req.params.link;
      await userService.activate(activationLink);
      return res.redirect(RouterEnum.ClientUrl);
    } catch (err) {
      next(err);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      const userData = await userService.login(email, password);
      return res.json({
        data: userData,
        message: 'Login success!',
      });
    } catch (err) {
      next(err);
    }
  }

  async refresh(req: Request, res: Response, next: NextFunction) {
    try {
      const { refreshToken } = req.cookies;
      const userData = await userService.refresh(refreshToken);
      res.cookie('refreshToken', userData.refreshToken, {
        maxAge: 10 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.json(userData);
    } catch (err) {
      next(err);
    }
  }

  async getUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const user = await userService.getUser(id);
      const userDto = new UserDto(user);
      return res.json(userDto);
    } catch (err) {
      next(err);
    }
  }
}
