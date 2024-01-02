/* eslint-disable @typescript-eslint/ban-ts-comment */
import { CategoryStore } from '../category';

const store = new CategoryStore();

describe('Category Model', () => {
  it('check the definition of index method', () => {
    expect(store.index).toBeDefined();
  });

  it('check the definition of show method', () => {
    expect(store.show).toBeDefined();
  });

  it('check the definition of create method', () => {
    expect(store.create).toBeDefined();
  });

  it('check the definition of update method', () => {
    expect(store.put).toBeDefined();
  });

  it('check the definition of delete method', () => {
    expect(store.delete).toBeDefined();
  });

  it('check create method to add a new category', async () => {
    const result = await store.create({
      name: 'Cate_Test_Name_101',
      description: 'Cate_Test_Name_101'
    });
    expect(result).toEqual({
      id: 3,
      name: 'Cate_Test_Name_101',
      description: 'Cate_Test_Name_101'
    });
  });

  it('check index method to return a list of category', async () => {
    const result = await store.index();
    expect(result).toEqual([
      {
        // @ts-ignore
        id: 3,
        name: 'Cate_Test_Name_101',
        description: 'Cate_Test_Name_101'
      }
    ]);
  });

  it('check show method to return the correct category by index', async () => {
    const result = await store.show('3');
    expect(result).toEqual({
      id: 3,
      name: 'Cate_Test_Name_101',
      description: 'Cate_Test_Name_101'
    });
  });

  it('check delete method to remove the category by index', async () => {
    store.delete('3');
    const result = await store.index();
    expect(result).toEqual([]);
  });
});
