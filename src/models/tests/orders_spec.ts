import { OrdersStore } from '../orders';
import { PersonStore } from '../person';

const store = new OrdersStore();
const store_Person = new PersonStore();
const mockDataTest = {
  status_order: 'active',
  person_id: 1
};
describe('OrdersStore Model', () => {
  beforeAll(async () => {
    await store_Person.create({
      firstName: 'Super',
      lastName: 'Test',
      passWord: '123456'
    });
  });
  afterAll(async () => {
    await store.delete('1');
  });
  it('check the definition of INDEX method', () => {
    expect(store.index).toBeDefined();
  });

  it('check the definition of SHOW method', () => {
    expect(store.show).toBeDefined();
  });

  it('check the definition of CREATE method', () => {
    expect(store.create).toBeDefined();
  });

  it('check CREATE method to add a new orders', async () => {
    const result = await store.create(mockDataTest);

    expect(result.id).toEqual(2);
    expect(result.person_id).toEqual(mockDataTest.person_id);
    expect(result.status_order).toEqual(mockDataTest.status_order);
  });

  it('check INDEX method to return a list of orders', async () => {
    const result = await store.index();

    expect(result[0]).toEqual({
      id: 2,
      ...mockDataTest
    });
  });

  it('check SHOW method to return a user by id', async () => {
    const result = await store.show('2');
    expect(result).toEqual({
      id: 2,
      ...mockDataTest
    });
  });
});
