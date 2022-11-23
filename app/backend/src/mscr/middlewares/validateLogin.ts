import { Request, Response, NextFunction } from 'express';
import UserModel from '../../database/models/userModel';

const validateLogin = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'All fields must be filled' });
  }
  const regex = /^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/;
  if (regex.test(email) === false) res.status(400).json({ message: '"email" deve ser válido' });
  if (password.length < 6) {
    return res.status(422).json({ message: '"password" deve conter mais de 6 letras' });
  }
  const user = await UserModel.findOne({ where: { email, password } });
  if (!user) res.status(401).json({ message: 'Incorrect email or password' });
  return next();
};

export default validateLogin;
