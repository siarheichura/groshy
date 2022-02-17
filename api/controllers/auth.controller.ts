import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';
import { config } from '../config';
import { UserModel } from '../models/User';

const generateToken = (id: string, username: string) => {
  return jwt.sign({ id, username }, config.TOKEN_SECRET_KEY, {
    expiresIn: config.TOKEN_EXPIRE_TIME,
  });
};

export class AuthController {
  async registration(req: Request, res: Response) {
    try {
      const { username, password, email } = req.body;

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).send({ message: 'Registration error', errors });
      }

      const candidate = await UserModel.findOne({ email });
      if (candidate) {
        return res.status(409).send({ message: 'This email is already taken' });
      }

      const user = new UserModel({ username, email, password });

      await user.save();
      return res.send({ message: 'Registration success' });
    } catch (err) {
      res.status(400).send({ message: 'Registration error' });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { username, password } = req.body;
      const user = await UserModel.findOne({ username });

      if (!user) {
        return res
          .status(404)
          .send({ message: `User ${username} is not found` });
      }

      const validPassword = UserModel.schema.methods.checkPassword(
        password,
        user.password
      );
      if (!validPassword) {
        return res.status(400).send({ message: 'Incorrect password' });
      }

      const token = generateToken(user._id, user.username);
      return res.send({ token });
    } catch (err) {
      res.status(400).send({ message: 'Login error' });
    }
  }
}
