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
    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return { ...tokens, user: userDto };
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

    const isPasswordEquals = UserModel.schema.methods.checkPassword(
      password,
      user.password
    );
    if (!isPasswordEquals) {
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

  async refresh(refreshToken: string) {
    console.log('user.service refreshToken', refreshToken);

    if (!refreshToken) {
      throw ApiError.UnauthorizedError();
    }

    const userData = tokenService.validateRefreshToken(refreshToken);
    const tokenFromDb = await tokenService.findToken(refreshToken);
    console.log('user.service userData', userData);
    console.log('user.service tokenFromDb', tokenFromDb);
    if (!userData || !tokenFromDb) {
      throw ApiError.UnauthorizedError();
    }

    const user = await UserModel.findById(userData.id);
    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(user.id, tokens.refreshToken);

    return {
      ...tokens,
      user: userDto,
    };
  }

  async getUser(id: string) {
    const user = await UserModel.findById(id);
    return user;
  }
}

export const userService = new UserService();
