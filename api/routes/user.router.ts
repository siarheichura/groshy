import express from 'express'
import { UserController } from '../controllers/user.controller'
import { ROUTER_ENUM } from '../shared/enums/Router.enum'
import { registrationValidator } from '../shared/validator/user.validator'

export const userRouter = express.Router()
const controller = new UserController()

userRouter.post(ROUTER_ENUM.REGISTRATION, registrationValidator, controller.registration)
userRouter.post(ROUTER_ENUM.LOGIN, controller.login)
userRouter.get(`${ROUTER_ENUM.ACTIVATE}/:link`, controller.activate)
userRouter.get(`${ROUTER_ENUM.USER}/:id`, controller.getUser)

// userRouter.put(`${ROUTER_ENUM.UserUpdate}/:id`,updateUserValidator, controller.updateUserInfo)
// userRouter.post(`${ROUTER_ENUM.ChangePassword}/:id`, controller.changePassword)
