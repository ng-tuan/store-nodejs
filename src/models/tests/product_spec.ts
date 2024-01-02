import { CategoryStore } from '../category';
import { ProductStore } from '../product';

const store = new ProductStore();
const store_Category = new CategoryStore();

describe('Product Model', () => {
  beforeAll(async () => {
    await store_Category.create({
      name: 'Cate_Test_113',
      description: 'Cate_Test_113'
    });
  });
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

  afterAll(async () => {
    await store_Category.delete('3');
  });

  it('check create method to add a new product', async () => {
    const result = await store.create({
      name: 'Product_Test_1',
      price: 100,
      category_id: 4
    });
    expect(result).toEqual({
      id: 3,
      name: 'Product_Test_1',
      price: '100',
      category_id: 4
    });
  });

  it('check index method to return a list of product', async () => {
    const result = await store.index();
    expect(result.length).toBe(1);
  });

  it('check show method to return the correct product by id', async () => {
    const result = await store.show('3');
    expect(result).toEqual({
      id: 3,
      name: 'Product_Test_1',
      price: '100',
      category_id: 4
    });
  });

  it('Get product by Category Name', async () => {
    const result = await store.productByCategoryName('Cate_Test_113');
    expect(result[0]).toEqual({
      id: 4,
      name: 'Cate_Test_113',
      price: '100',
      category_id: 4,
      description: 'Cate_Test_113'
    });
  });
});
