import { Request, Response } from 'express';
import { User } from '../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';
import { config } from '../config';

const generateAccessToken = (id: string, username: string) => {
  const payload = {
    id,
    username,
  };

  return jwt.sign(payload, config.tokenSecretKey, { expiresIn: '24h' });
};

export class AuthController {
  async registration(req: Request, res: Response) {
    try {
      const errors = validationResult(req);
      const { username, password, email } = req.body;

      if (!errors.isEmpty()) {
        return res.status(400).json({ message: 'Registration error', errors });
      }

      const candidate = await User.findOne({ email });

      if (candidate) {
        return res.status(400).json({ message: 'This email is already taken' });
      }

      const hashPassword = bcrypt.hashSync(password, 7);
      const user = new User({ username, email, password: hashPassword });

      await user.save();
      return res.json({ message: 'Registration success' });
    } catch (err) {
      console.log(err);
      res.status(400).json({ message: 'Registration error' });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { username, password } = req.body;

      const user = await User.findOne({ username });

      if (!user) {
        return res
          .status(400)
          .json({ message: `User ${username} is not found` });
      }

      const validPassword = bcrypt.compareSync(password, user.password);

      if (!validPassword) {
        return res.status(400).json({ message: 'Incorrect password' });
      }

      const token = generateAccessToken(user._id, user.username);

      return res.json({ token });
    } catch (err) {
      console.log(err);
      res.status(400).json({ message: 'Login error' });
    }
  }

  async getUsers(req: Request, res: Response) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      console.log(err);
    }
  }
}
