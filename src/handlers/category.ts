import express, { Request, Response } from 'express';
import { Category, CategoryStore } from '../models/category';
import { verifyToken } from '../utils/authToken';
const store = new CategoryStore();

const index = async (_req: Request, res: Response) => {
  try {
    const caterories = await store.index();
    res.json(caterories);
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const caterories = await store.show(req.params.id);
    res.json(caterories);
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const category: Category = {
      name: req.body.name,
      description: req.body.description
    };

    const newCategory = await store.create(category);
    res.json(newCategory);
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

const put = async (req: Request, res: Response) => {
  try {
    const category = {
      id: req.params.id,
      name: req.body.name,
      description: req.body.description
    };

    const updateCategory = await store.put(
      category.id,
      category.name,
      category.description
    );
    res.json(updateCategory);
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

const categoryRoutes = (app: express.Application) => {
  app.get('/category', index);
  app.get('/category/:id', show);
  app.post('/category', verifyToken, create);
  app.put('/category/:id', verifyToken, put);
  app.delete('/category/:id', verifyToken, destroy);
};

export default categoryRoutes;
