import { Request, Response, NextFunction } from 'express'
import { operationService } from '../services/operation.service'

export class OperationController {
  async getOperations(req: Request, res: Response, next: NextFunction) {
    try {
      const { type, startDate, finishDate } = req.params
      const userId = req.headers.user as string
      const operations = await operationService.getOperationsByPeriod(userId, type, startDate, finishDate)
      res.send({ data: operations })
    } catch (err) {
      next(err)
    }
  }

  async addOperation(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.headers.user as string
      const operation = await operationService.addOperation({ ...req.body, user: userId })
      res.json({ data: operation })
    } catch (err) {
      next(err)
    }
  }

  async editOperation(req: Request, res: Response, next: NextFunction) {
    try{
      const { id } = req.params
      const updatedOperation = req.body
      const operation = await operationService.editOperation(id, updatedOperation)
      res.json({data: operation})
    } catch (err) {
      next(err)
    }
  }

  async deleteOperation(req: Request, res: Response, next: NextFunction) {
    try{
      const { id } = req.params
      const operation = await operationService.deleteOperation(id)
      res.json({data: operation})
    } catch (err) {
      next(err)
    }
  }

  async getOperationsStatistics(req: Request, res: Response, next: NextFunction) {
    try {
      const { type, startDate, finishDate } = req.params
      const userId = req.headers.user as string
      const result = await operationService.getOperationsStatistics(userId, type, startDate, finishDate)
      res.send({ data: result })
    } catch (err) {
      next(err)
    }
  }
}
