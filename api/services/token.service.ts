import { config } from './../config';
import { TokenModel } from './../models/Token';
import jwt from 'jsonwebtoken';

interface TokenPayload {
  id: string;
  username: string;
  email: string;
  isActivated: boolean;
}

class TokenService {
  generateTokens(payload: TokenPayload) {
    const accessToken = jwt.sign(payload, config.ACCESS_TOKEN_SECRET_KEY, {
      expiresIn: '15d',
    });
    const refreshToken = jwt.sign(payload, config.REFRESH_TOKEN_SECRET_KEY, {
      expiresIn: '15d',
    });
    return { accessToken, refreshToken };
  }

  async saveToken(userId: string, refreshToken: string) {
    const tokenData = await TokenModel.findOne({ user: userId });
    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      return tokenData.save();
    }
    const token = await TokenModel.create({ user: userId, refreshToken });
    return token;
  }

  validateAccessToken(token: string) {
    try {
      const userData = jwt.verify(token, config.ACCESS_TOKEN_SECRET_KEY);
      return userData;
    } catch (err) {
      return null;
    }
  }

  validateRefreshToken(token: string) {
    try {
      const userData: TokenPayload = jwt.verify(
        token,
        config.REFRESH_TOKEN_SECRET_KEY
      ) as TokenPayload;
      return userData;
    } catch (err) {
      return null;
    }
  }

  async findToken(refreshToken: string) {
    const tokenData = await TokenModel.findOne({ refreshToken });
    return tokenData;
  }
}

export const tokenService = new TokenService();
