import { NextFunction, Request, Response } from 'express'
import { ApiError } from '../shared/api.error'

export const errorMiddleware = (err: Error, req: Request, res: Response, next: NextFunction) => {
  console.log('ERROR_MIDDLEWARE: ', err)

  if (err instanceof ApiError) {
    return res.status(err.status).json({ message: err.message, errors: err.errors })
  }

  return res.status(500).json(err || { message: 'Unexpected server error' })
}
