/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export const getToken = (firstName: string, lastName: string): string => {
  const fullName = firstName + lastName;
  return jwt.sign(
    { user: fullName },
    process.env.TOKEN_SECRET as unknown as string, { expiresIn: '1h' }
  );
};

// @ts-ignore
export const verifyToken = (req: Request, res: Response, next) => {
  try {
    const authorRes = req.headers.authorization;
    // @ts-ignore
    const token = authorRes.split(' ')[1]
    // @ts-ignore
    jwt.verify(token, process.env.TOKEN_SECRET);
    next();
  } catch (error) {
    res.status(401).json({ massage: 'Access denied, invalid token' });
  }
};
