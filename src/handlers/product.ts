import express, { Request, Response } from 'express';
import { Product, ProductStore } from '../models/product';
import { verifyToken } from '../utils/authToken';

const store = new ProductStore();

const index = async (_req: Request, res: Response) => {
  try {
    const products = await store.index();
    res.json(products);
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const product = await store.show(req.params.id);
    res.json(product);
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

const create = async (req: Request, res: Response) => {
  const product: Product = {
    name: req.body.name,
    price: req.body.price,
    category_id: req.body.category_id
  };
  try {
    const newProduct = await store.create(product);
    res.json(newProduct);
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

const put = async (req: Request, res: Response) => {
  try {
    const product = {
      id: req.params.id,
      name: req.body.name,
      price: req.body.price,
      category_id: req.body.category_id
    };

    const updateCategory = await store.put(
      product.id,
      product.name,
      product.price,
      product.category_id
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

const productByCategoryName = async (req: Request, res: Response) => {
  try {
    const products = await store.productByCategoryName(
      req.params.category_name
    );
    res.json(products);
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

const productRoutes = (app: express.Application) => {
  app.get('/product', index);
  app.get('/product/:id', show);
  app.post('/product', verifyToken, create);
  app.put('/product/:id', verifyToken, put);
  app.delete('/product/:id', verifyToken, destroy);
  app.get('/product/category/:category_name', productByCategoryName);
};

export default productRoutes;
