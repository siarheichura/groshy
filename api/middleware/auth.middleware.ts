import { NextFunction,  Response } from 'express'
import { tokenService } from '../services/token.service'
import { ApiError } from '../shared/api.error'

export const authMiddleware = (req: any, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization
    if (!authHeader) {
      return next(ApiError.UnauthorizedError())
    }

    const token = authHeader.split(' ')[1]
    if (!token) {
      return next(ApiError.UnauthorizedError())
    }

    const userData = tokenService.validateToken(token)
    if (!userData) {
      return next(ApiError.UnauthorizedError())
    }

    next()
  } catch (err) {
    return next(ApiError.UnauthorizedError())
  }
}
