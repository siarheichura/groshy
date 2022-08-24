import express from 'express'
import { OperationController } from '../controllers/operation.controller'
import { ROUTER_ENUM } from '../shared/enums/Router.enum'

export const operationRouter = express.Router()
const controller = new OperationController()

operationRouter.get(`${ROUTER_ENUM.OPERATIONS}/:type/:startDate/:finishDate?`, controller.getOperations)
operationRouter.post(`${ROUTER_ENUM.OPERATIONS}`, controller.addOperation)
operationRouter.put(`${ROUTER_ENUM.OPERATIONS}/:id`, controller.editOperation)
operationRouter.delete(`${ROUTER_ENUM.OPERATIONS}/:id`, controller.deleteOperation)
operationRouter.get(`${ROUTER_ENUM.STATISTICS}${ROUTER_ENUM.TYPE}${ROUTER_ENUM.START_DATE}${ROUTER_ENUM.FINISH_DATE}`, controller.getOperationsStatistics)
