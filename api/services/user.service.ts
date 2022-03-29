import { UserDto } from './../dtos/user.dto';
import { UserModel } from '../models/User';
import { mailService } from './mail.service';
import { tokenService } from './token.service';
import { RouterEnum } from '../shared/enums/RouterEnum';
import { ApiError } from '../shared/api.error';

class UserService {
  async registration(username: string, email: string, password: string) {
    const candidate = await UserModel.findOne({ email });
    if (candidate) {
      throw ApiError.BadRequest('This email is already taken');
    }
    const user = await UserModel.create({
      username,
      email,
      password,
    });

    await mailService.sendActivationMail(
      email,
      `${RouterEnum.ApiUrl}${RouterEnum.Base}${RouterEnum.Activate}/${user.activationLink}`
    );
    return new UserDto(user);
  }

  async activate(activationLink: string) {
    const user = await UserModel.findOne({ activationLink });
    if (!user) {
      throw ApiError.BadRequest('Invalid activation link');
    }
    user.isActivated = true;
    await user.save();
  }

  async login(email: string, password: string) {
    const user = await UserModel.findOne({ email });
    if (!user) {
      throw ApiError.BadRequest('User with this email is not found');
    }

    if (!user.checkPassword(password)) {
      throw ApiError.BadRequest('Invalid password');
    }

    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(user.id, tokens.refreshToken);
    return {
      ...tokens,
      user: userDto,
    };
  }

  async logout(refreshToken: string) {
    const token = await tokenService.removeToken(refreshToken);
    return token;
  }

  async refresh(refreshToken: string | null) {
    if (!refreshToken) {
      throw ApiError.UnauthorizedError();
    }

    const userData = tokenService.validateRefreshToken(refreshToken);

    const user = await UserModel.findById(userData.id);
    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(user.id, tokens.refreshToken);

    return {
      ...tokens,
      user: userDto,
    };
  }

  async changePassword(
    id: string,
    prevPassword: string,
    newPassword: string,
    confirmPassword: string
  ) {
    const user = await UserModel.findById(id);

    const isValidPrevPassword = user.checkPassword(prevPassword);
    if (!isValidPrevPassword) {
      throw ApiError.BadRequest('Invalid password');
    }

    const isNewPasswordsEqual = newPassword === confirmPassword;
    if (!isNewPasswordsEqual) {
      throw ApiError.BadRequest('Passwords doesn`t match');
    }

    if (isValidPrevPassword && isNewPasswordsEqual) {
      user.password = newPassword;
      user.save();
      return new UserDto(user);
    } else {
      throw ApiError.BadRequest('Invalid data');
    }
  }

  async updateUserInfo(
    id: string,
    username: string,
    email: string,
    emoji: string
  ) {
    const user = await UserModel.findById(id);
    if (!username || !email) {
      throw ApiError.BadRequest('Invalid data');
    }

    if (user.username !== username) {
      user.username = username;
    } else if (user.email !== email) {
      user.email = email;
      user.isActivated = false;
      mailService.sendActivationMail(email, user.activationLink);
    }
    user.emoji = emoji;

    user.save();
    return user;
  }

  async getUser(id: string) {
    const user = await UserModel.findById(id);
    return user;
  }
}

export const userService = new UserService();
