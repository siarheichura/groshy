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
        return res.status(400).json({ message: 'Registration error', errors });
      }

      const candidate = await UserModel.findOne({ email });
      if (candidate) {
        return res.status(400).json({ message: 'This email is already taken' });
      }

      const hashPassword = UserModel.schema.methods.hashPassword(password);
      const user = new UserModel({ username, email, password: hashPassword });

      await user.save();
      return res.json({ message: 'Registration success' });
    } catch (err) {
      res.status(400).json({ message: 'Registration error' });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { username, password } = req.body;
      const user = await UserModel.findOne({ username });

      if (!user) {
        return res
          .status(400)
          .json({ message: `User ${username} is not found` });
      }

      const validPassword = UserModel.schema.methods.checkPassword(
        password,
        user.password
      );
      if (!validPassword) {
        return res.status(400).json({ message: 'Incorrect password' });
      }

      const token = generateToken(user._id, user.username);
      return res.json({ token });
    } catch (err) {
      res.status(400).json({ message: 'Login error' });
    }
  }

  async getUsers(req: Request, res: Response) {
    try {
      const users = await UserModel.find();
      res.json(users);
    } catch (err) {
      console.log(err);
    }
  }
}
