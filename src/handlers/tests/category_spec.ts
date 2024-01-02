import supertest from 'supertest';
import dotenv from 'dotenv';
import app from '../../server';
import { getToken } from '../../utils/authToken';
dotenv.config();

const request = supertest(app);
const userInfos = {
  firstName: 'SuperMan',
  lastName: 'Test',
  passWord: '123456'
};
const category = {
  name: 'Cate_Test_Handle',
  description: 'Cate_Test_Handle'
};

const token = getToken(userInfos.firstName, userInfos.lastName);

describe('Handle /category API testing...', () => {
  it('POST /category to create a category and success', async () => {
    const res = await request
      .post('/category')
      .auth(token, { type: 'bearer' })
      .send(category);

    expect(res.status).toBe(200);
    expect(res.body).toBeTruthy();
  });

  it('GET /category to show all of categories in the system', async () => {
    const res = await request.get('/category');

    expect(res.status).toBe(200);
  });
  it('Get /category with param categoryId to be success', async () => {
    const res = await request.get('/category/1');
    expect(res.status).toBe(200);
  });

  it('DELETE /category with bearer token and success', async () => {
    const res = await request
      .delete('/category/1')
      .auth(token, { type: 'bearer' });

    expect(res.status).toBe(200);
  });
});
