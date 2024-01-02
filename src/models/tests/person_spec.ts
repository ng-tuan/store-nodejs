/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { PersonStore } from '../person';
import dotenv  from 'dotenv';

const store = new PersonStore();

const userInfos = {
  firstName: 'Super',
  lastName: 'Test',
  passWord: '123456'
};

dotenv.config();

describe('Person Model', () => {
  it('check the definition of INDEX method', () => {
    expect(store.index).toBeDefined();
  });

  it('check the definition of SHOW method', () => {
    expect(store.show).toBeDefined();
  });

  it('check the definition of CREATE method', () => {
    expect(store.create).toBeDefined();
  });

  it('check the definition of LOGIN method', () => {
    expect(store.login).toBeDefined();
  });

  it('check CREATE method to add a new user', async () => {
    const result = await store.create(userInfos);

    expect(result.id).toEqual(4);
    expect(result.firstname).toEqual(userInfos.firstName);
    expect(result.lastname).toEqual(userInfos.lastName);
  });

  it('check INDEX method to return a list of users', async () => {
    const result = await store.index();

    expect(result[0].firstname).toEqual(userInfos.firstName);
    expect(result[0].lastname).toEqual(userInfos.lastName);
  });

  it('check SHOW method to return a user by id', async () => {
    const result = await store.show('4');
    expect(result.firstname).toEqual(userInfos.firstName);
    expect(result.lastname).toEqual(userInfos.lastName);
  });
});
