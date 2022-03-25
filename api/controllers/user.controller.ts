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
        message: `Hey, ${userData.user.username}`,
      });
    } catch (err) {
      next(err);
    }
  }

  async logout(req: Request, res: Response, next: NextFunction) {
    try {
      const { refreshToken } = req.cookies;
      const token = await userService.logout(refreshToken);
      res.clearCookie(process.env.REFRESH_TOKEN_COOKIE_KEY);
      return res.json({ data: token });
    } catch (err) {
      next(err);
    }
  }

  async refresh(req: Request, res: Response, next: NextFunction) {
    try {
      const { refreshToken } = req.cookies;
      console.log('refresh refreshToken', refreshToken);
      console.log('refresh cookies', req.cookies);
      const userData = await userService.refresh(refreshToken);
      res.cookie(process.env.REFRESH_TOKEN_COOKIE_KEY, userData.refreshToken, {
        domain: 'groshy.herokuapp',
        maxAge: 1000 * 60 * 60 * 24 * 10,
        httpOnly: true,
        path: '/api/groshy/refresh',
      });
      return res.json({ data: userData });
    } catch (err) {
      next(err);
    }
  }

  async changePassword(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { prevPassword, newPassword, confirmPassword } = req.body;
      const userData = await userService.changePassword(
        id,
        prevPassword,
        newPassword,
        confirmPassword
      );
      return res.json({
        data: userData,
        message: 'Password was successfuly changed',
      });
    } catch (err) {
      next(err);
    }
  }

  async updateUserInfo(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { username, email } = req.body;

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(ApiError.BadRequest('Incorrect data', errors.array()));
      }

      const user = await userService.updateUserInfo(id, username, email);
      res.json({
        data: new UserDto(user),
      });
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
