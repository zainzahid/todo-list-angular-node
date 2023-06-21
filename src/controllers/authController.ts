import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../middlewares/authMiddleware';
import User from '../models/User';

export const signup = (req: Request, res: Response) => {
  const { email, password } = req.body;

  User.findOne({ email })
    .then(existingUser => {
      if (existingUser) {
        return res.status(409).json({ message: 'Email already exists' });
      }

      return bcrypt.hash(password, 10)
        .then(hashedPassword => {
          const newUser = new User({ email, password: hashedPassword });
          return newUser.save();
        })
        .then(() => {
          return res.status(201).json({ message: 'User created successfully' });
        });
    })
    .catch(error => {
      return res.status(500).json({ message: 'Internal server error', error });
    });
};

export const login = (req: Request, res: Response) => {
  const { email, password } = req.body;

  User.findOne({ email })
    .then(user => {
      if (!user) {
        return res.status(401).json({ message: 'Authentication failed' });
      }

      return bcrypt.compare(password, user.password)
        .then(isPasswordValid => {
          if (!isPasswordValid) {
            return res.status(401).json({ message: 'Authentication failed' });
          }

          const token = jwt.sign({ email: user.email, userId: user._id }, JWT_SECRET);
          return res.json({ token });
        });
    })
    .catch(error => {
      return res.status(500).json({ message: 'Internal server error', error });
    });
};
