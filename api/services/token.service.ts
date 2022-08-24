import jwt from 'jsonwebtoken'

export interface TokenPayload {
  userId: string
}

class TokenService {
  generateToken(payload: TokenPayload): string {
    return jwt.sign(payload, process.env.TOKEN_SECRET_KEY, { expiresIn: process.env.TOKEN_EXPIRATION_DATE })
  }

  validateToken(token: string): TokenPayload {
    try {
      return jwt.verify(token, process.env.TOKEN_SECRET_KEY) as TokenPayload
    } catch (err) {
      return null
    }
  }
}

export const tokenService = new TokenService()
