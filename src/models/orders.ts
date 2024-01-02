import client from '../database';

export type Orders = {
  status_order: string;
  person_id: number;
};

export type OrderProducts = {
  quantity: number;
  order_id: number;
  product_id: number;
};

export class OrdersStore {
  async index() {
    try {
      const conn = await client.connect();
      const sql = 'SELECT * FROM orders';
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Could not get orders. Error: ${err}`);
    }
  }
  async show(id: string) {
    try {
      const sql = 'SELECT * FROM orders WHERE id=($1)';
      const conn = await client.connect();
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find orders ${id}. Error: ${err}`);
    }
  }
  async create(o: Orders) {
    try {
      const sql =
        'INSERT INTO orders (status_order, person_id) VALUES($1, $2) RETURNING *';
      const conn = await client.connect();
      const result = await conn.query(sql, [o.status_order, o.person_id]);
      const product = result.rows[0];
      conn.release();
      return product;
    } catch (err) {
      throw new Error(`Could not add new orders. Error: ${err}`);
    }
  }

  async delete(id: string) {
    try {
      const sql = 'DELETE FROM orders WHERE id=($1)';
      const conn = await client.connect();
      const result = await conn.query(sql, [id]);
      const product = result.rows[0];
      conn.release();
      return product;
    } catch (err) {
      throw new Error(`Could not delete orders ${id}. Error: ${err}`);
    }
  }

  async createOrderProduct(o: OrderProducts): Promise<Orders> {
    try {
      const sql =
        'INSERT INTO order_products (quantity, order_id, product_id) VALUES($1, $2, $3) RETURNING *';
      const conn = await client.connect();
      const result = await conn.query(sql, [
        o.quantity,
        o.order_id,
        o.product_id
      ]);
      const order = result.rows[0];

      conn.release();

      return order;
    } catch (err) {
      throw new Error(
        `Unable to add product ${o.product_id} to order ${o.order_id}: ${err}`
      );
    }
  }

  async deleteOrderProduct(orderProductId: string): Promise<Orders> {
    try {
      const sql = 'DELETE FROM order_products WHERE id=($1)';
      const conn = await client.connect();
      const result = await conn.query(sql, [orderProductId]);
      const order = result.rows[0];

      conn.release();

      return order;
    } catch (err) {
      throw new Error(
        `Unable to delete order product ${orderProductId}. Error: ${err}`
      );
    }
  }
}
exports.OrdersStore = OrdersStore;
