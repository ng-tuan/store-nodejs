import supertest from 'supertest';
import dotenv from 'dotenv';
import app from '../../server';
import { getToken } from '../../utils/authToken';

dotenv.config();

const request = supertest(app);
const product = {
  name: 'test_product',
  price: 10
};

const userInfos = {
  firstName: 'Super',
  lastName: 'Test',
  passWord: '123456'
};

const token = getToken(userInfos.firstName, userInfos.lastName);

describe('Product /products API Handler Testing...', () => {
  it('POST /products to create a product and success', async () => {
    const res = await request
      .post('/product')
      .auth(token, { type: 'bearer' })
      .send(product);

    expect(res.status).toBe(200);
    expect(res.body).toBeTruthy();
  });

  it('GET /products to show all of products in the system', async () => {
    const res = await request.get('/product');

    expect(res.status).toBe(200);
    expect(res.body).toBeTruthy();
  });

  it('GET /products with param productName to be success', async () => {
    const res = await request.get('/product/1');

    expect(res.status).toBe(200);
  });

  it('DELETE /products with bearer token and success', async () => {
    const res = await request
      .delete('/product/2')
      .auth(token, { type: 'bearer' });

    expect(res.status).toBe(200);
  });
});
