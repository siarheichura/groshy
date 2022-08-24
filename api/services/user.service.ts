import { UserDto } from './../dtos/user.dto';
import { UserModel } from '../models/User';
import { mailService } from './mail.service';
import { tokenService } from './token.service';
import { ROUTER_ENUM } from '../shared/enums/Router.enum';
import { ApiError } from '../shared/api.error';
import { categoryService } from "./category.service";

class UserService {
  async registration(username: string, email: string, password: string, confirmPassword: string) {
    if (password !== confirmPassword) {
      throw ApiError.BadRequest('Passwords do not match')
    }

    const candidate = await UserModel.findOne({ email })
    if (candidate) {
      throw ApiError.BadRequest('This email is already taken')
    }

    const user = await UserModel.create({ username, email, password })

    const urlForActivate = `${process.env.API_URL}${ROUTER_ENUM.BASE}${ROUTER_ENUM.ACTIVATE}/${user.activationLink}`
    await mailService.sendActivationMail(email, urlForActivate)

    await categoryService.createUserBasicCategories(user.id)
    return new UserDto(user)
  }

  async activate(activationLink: string) {
    const user = await UserModel.findOne({ activationLink })
    if (!user) {
      throw ApiError.BadRequest('Invalid activation link')
    }
    user.isActivated = true
    await user.save()
  }

  async login(email: string, password: string) {
    const user = await UserModel.findOne({ email })
    if (!user) {
      throw ApiError.BadRequest('User with such email is not found')
    }
    if (!user.checkPassword(password)) {
      throw ApiError.BadRequest('Invalid password')
    }
    if (!user.isActivated) {
      throw ApiError.BadRequest('Please activate your email and then login')
    }

    const userDto = new UserDto(user)
    const token = tokenService.generateToken({ userId: user.id })
    return { token, user: userDto }
  }

  async getUser(id: string) {
    const user = await UserModel.findById(id)
    return user
  }

  // async changePassword(id: string, prevPassword: string, newPassword: string, confirmPassword: string) {
  //   const user = await UserModel.findById(id);
  //
  //   const isValidPrevPassword = user.checkPassword(prevPassword);
  //   if (!isValidPrevPassword) {
  //     throw ApiError.BadRequest('Invalid password');
  //   }
  //
  //   const isNewPasswordsEqual = newPassword === confirmPassword;
  //   if (!isNewPasswordsEqual) {
  //     throw ApiError.BadRequest('Passwords doesn`t match');
  //   }
  //
  //   if (isValidPrevPassword && isNewPasswordsEqual) {
  //     user.password = newPassword;
  //     user.save();
  //     return new UserDto(user);
  //   } else {
  //     throw ApiError.BadRequest('Invalid data');
  //   }
  // }

  // async updateUserInfo(id: string,username: string, email: string, emoji: string) {
  //   const user = await UserModel.findById(id);
  //   if (!username || !email) {
  //     throw ApiError.BadRequest('Invalid data');
  //   }
  //
  //   if (user.username !== username) {
  //     user.username = username;
  //   } else if (user.email !== email) {
  //     user.email = email;
  //     user.isActivated = false;
  //     mailService.sendActivationMail(email, user.activationLink);
  //   }
  //   user.emoji = emoji;
  //
  //   user.save();
  //   return user;
  // }
}

export const userService = new UserService()
