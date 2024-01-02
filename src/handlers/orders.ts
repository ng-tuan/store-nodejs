/* eslint-disable @typescript-eslint/ban-ts-comment */
import express, { Request, Response } from 'express';
import { OrderProducts, Orders, OrdersStore } from '../models/orders';
import { verifyToken } from '../utils/authToken';

const store = new OrdersStore();

const index = async (_req: Request, res: Response) => {
  try {
    const orders = await store.index();
    res.json(orders);
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
// @ts-ignore
const validateStatus = (req: Request, res: Response, next) => {
  const validStatusValues = ['active', 'complete'];
  const get_status_order = req.body.status_order;

  if (!validStatusValues.includes(get_status_order)) {
    return res.status(400).json('Invalid status value');
  }

  next();
};

const create = async (req: Request, res: Response) => {
  const order: Orders = {
    status_order: req.body.status_order,
    person_id: req.body.person_id
  };
  try {
    const newOrder = await store.create(order);
    res.json(newOrder);
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

const createOrderProduct = async (req: Request, res: Response) => {
  const orderProduct: OrderProducts = {
    order_id: req.body.order_id,
    product_id: req.body.product_id,
    quantity: req.body.quantity
  };

  try {
    const addedProduct = await store.createOrderProduct(orderProduct);
    res.json(addedProduct);
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

const deleteOrderProduct = async (req: Request, res: Response) => {
  try {
    await store.deleteOrderProduct(req.params.id);
    res.status(200).json({ massage: 'Delete success!' });
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

const ordersRoutes = (app: express.Application) => {
  app.get('/orders', index);
  app.get('/orders/:id', show);
  app.post('/orders', verifyToken, validateStatus, create);
  app.delete('/orders/:id', verifyToken, destroy);
  app.post('/orders/products', verifyToken, createOrderProduct);
  app.delete('/orders/products/:id', verifyToken, deleteOrderProduct);
};

export default ordersRoutes;
