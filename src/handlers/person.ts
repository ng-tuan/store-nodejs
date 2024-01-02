/* eslint-disable @typescript-eslint/ban-ts-comment */
import express, { Request, Response } from 'express';
import { Person, PersonStore } from '../models/person';
import jwt from 'jsonwebtoken';
import { verifyToken } from '../utils/authToken';
const store = new PersonStore();

const index = async (req: Request, res: Response) => {
  try {
    const users = await store.index();
    res.json(users);
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const user = await store.show(req.params.id);
    res.json(user);
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const user: Person = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      passWord: req.body.passWord
    };
    const newUser = await store.create(user);
    // @ts-ignore
    const token = jwt.sign({ user: newUser }, process.env.TOKEN_SECRET);
    res.json(token);
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

const destroy = async (req: Request, res: Response) => {
  try {
    const deleted = await store.delete(req.params.id);
    res.json(deleted);
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

const login = async (req: Request, res: Response) => {
  try {
    const user: Person = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      passWord: req.body.passWord
    };
    const result = await store.login(user);
    if (!result) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    // @ts-ignore
    const token = jwt.sign({ userId: result.id }, process.env.TOKEN_SECRET, { expiresIn: '1h' });
    res.json(token);
  } catch (error) {
    res.status(401).json({ message: 'Access denied, invalid token' });
  }
};

const personRoutes = (app: express.Application) => {
  app.get('/user/login', login);
  app.post('/user', create);
  app.get('/user', verifyToken, index);
  app.get('/user/:id', verifyToken, show);
  app.delete('/user/:id', verifyToken, destroy);
};

export default personRoutes;
