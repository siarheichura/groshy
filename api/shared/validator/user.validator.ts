import { check } from 'express-validator'

const passwordRegExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/

const validator = {
  username: check('username', 'Username cannot be shorter than 3 characters').isLength({ min: 3 }),
  email: check('email', 'Incorrect email').isEmail(),
  password: check('password', 'Password min length is 8 characters (includes A-Z, a-z and number)').matches(passwordRegExp),
}

export const registrationValidator = [validator.username, validator.email, validator.password]
export const updateUserValidator = [validator.username, validator.email]
