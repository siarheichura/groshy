import { UserDto } from '../dtos/user.dto'
import { UserModel } from '../models/User'
import { mailService } from './mail.service'
import { tokenService } from './token.service'
import { ROUTER_ENUM } from '../shared/enums/Router.enum'
import { ApiError } from '../shared/api.error'
import { categoryService } from './category.service'

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

    const urlForActivate = `${process.env.API_URL}${ROUTER_ENUM.ACTIVATE}/${user.activationLink}`
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
}

export const userService = new UserService()
