import { NextFunction, Request, Response } from 'express'
import { validationResult } from 'express-validator'

import { ApiError } from '../shared/api.error'
import { userService } from '../services/user.service'
import { UserDto } from '../dtos/user.dto'

export class UserController {
  async registration(req: Request, res: Response, next: NextFunction) {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return next(ApiError.BadRequest('Incorrect data', errors.array()))
      }
      const { username, email, password, confirmPassword } = req.body
      const userData = await userService.registration(username, email, password, confirmPassword)
      const message = `Hey ${userData.username}! Please confirm your email and login.`
      return res.json({ data: userData, message })
    } catch (err) {
      next(err)
    }
  }

  async activate(req: Request, res: Response, next: NextFunction) {
    try {
      const activationLink = req.params.link
      await userService.activate(activationLink)
      return res.redirect(process.env.CLIENT_URL)
    } catch (err) {
      next(err)
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body
      const userData = await userService.login(email, password)

      res.cookie('token', userData.token, { maxAge: 1000 * 60 * 60 * 24 * 10 })
      return res.json({ data: userData, message: `Hey, ${userData.user.username}` })
    } catch (err) {
      next(err)
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

  // async changePassword(req: Request, res: Response, next: NextFunction) {
  //   try {
  //     const { id } = req.params;
  //     const { prevPassword, newPassword, confirmPassword } = req.body;
  //     const userData = await userService.changePassword(
  //       id,
  //       prevPassword,
  //       newPassword,
  //       confirmPassword
  //     );
  //     return res.json({
  //       data: userData,
  //       message: 'Password was successfuly changed',
  //     });
  //   } catch (err) {
  //     next(err);
  //   }
  // }
  //
  // async updateUserInfo(req: Request, res: Response, next: NextFunction) {
  //   try {
  //     const { id } = req.params;
  //     const { username, email, emoji } = req.body;
  //
  //     const errors = validationResult(req);
  //     if (!errors.isEmpty()) {
  //       return next(ApiError.BadRequest('Incorrect data', errors.array()));
  //     }
  //
  //     const user = await userService.updateUserInfo(id, username, email, emoji);
  //     res.json({
  //       data: new UserDto(user),
  //     });
  //   } catch (err) {
  //     next(err);
  //   }
  // }
}
