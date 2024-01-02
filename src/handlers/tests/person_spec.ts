import supertest from 'supertest';
import dotenv from 'dotenv';
import app from '../../server';
import { getToken } from '../../utils/authToken';

dotenv.config();

const request = supertest(app);

const userInfos = {
  firstName: 'Super',
  lastName: 'Test',
  passWord: '123456'
};

const token = getToken(userInfos.firstName, userInfos.lastName);

describe('User Handler', () => {
  it('GET /users to get users and return success', async () => {
    const response = await request.get('/user').auth(token, { type: 'bearer' });

    expect(response.status).toBe(200);
  });

  it('GET /users with id params to return success', async () => {
    const response = await request
      .get('/user/1')
      .auth(token, { type: 'bearer' });

    expect(response.status).toBe(200);
  });

  it('POST /users with create new user to return success', async () => {
    const response = await request
      .post('/user')
      .send(userInfos);

    expect(response.status).toBe(200);
  });

  it('DELETE /users with id params to return success', async () => {
    const response = await request
      .delete('/user/2')
      .auth(token, { type: 'bearer' });

    expect(response.status).toBe(200);
  });
});
