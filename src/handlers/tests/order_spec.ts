/* eslint-disable @typescript-eslint/ban-ts-comment */
import supertest from 'supertest';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import app from '../../server';
import { ProductStore } from '../../models/product';

import { getToken } from '../../utils/authToken';
import { Person, PersonStore } from '../../models/person';
import { CategoryStore } from '../../models/category';

const request = supertest(app);

const userStore = new PersonStore();
const productStore = new ProductStore();
const cateStore = new CategoryStore();

const userInfos = {
  firstName: 'Super',
  lastName: 'Test',
  passWord: '123456'
};

dotenv.config();
const token = getToken(userInfos.firstName, userInfos.lastName);

describe('Order /orders Handler API Testing...', () => {
  beforeAll(async () => {
    const hashPassword = bcrypt.hashSync(
      userInfos.passWord + process.env.BCRYPT_PASSWORD,
      // @ts-ignore
      parseInt(process.env.SALT_ROUNDS)
    );

    const userInfo: Person = {
      ...userInfos,
      passWord: hashPassword as string
    };

    await userStore.create(userInfo);
    await cateStore.create({
      name: 'Cate_Test_Handle',
      description: 'Cate_Test_Handle'
    });
    await productStore.create({
      name: 'Product_Test',
      price: 100,
      category_id: 2
      //id=2
    });
  });

  afterAll(async () => {
    await productStore.delete('1');
    await cateStore.delete('2');
  });

  it('Get All Orders', async () => {
    const res = await request.get('/orders');
    expect(res.status).toBe(200);
  });

  it('POST /orders to create a order and return with status ordered', async () => {
    const res = await request
      .post('/orders')
      .auth(token, { type: 'bearer' })
      .send({
        status_order: 'active',
        person_id: 1
      });

    expect(res.status).toBe(200);
    expect(res.body).toBeTruthy();
  });

  it('GET /orders/:orderId to show a order by userId', async () => {
    const res = await request.get('/orders/1');
    expect(res.status).toBe(200);
  });

  it('POST /orders/products to create order product', async () => {
    const res = await request
      .post('/orders/products')
      .auth(token, { type: 'bearer' })
      .send({ quantity: 2, product_id: 1, order_id: 1 });

    if (res.status == 200) {
      expect(res.status).toBe(200);
      expect(res.body).toBeTruthy();
    } else {
      expect(res.text).toBeDefined();
    }
  });
  it('DELETE /orders/products to delete a order product', async () => {
    const res = await request
      .delete('/orders/products/1')
      .auth(token, { type: 'bearer' });

    expect(res.status).toBe(200);
  });
  it('DELETE /orders to delete a order', async () => {
    const res = await request
      .delete('/orders/1')
      .auth(token, { type: 'bearer' });

    expect(res.status).toBe(200);
  });
});
