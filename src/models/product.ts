import client from "../database";

export type Product = {
  name: string;
  price: number;
  category_id: number;
};

export class ProductStore {
  async index() {
    try {
      const conn = await client.connect();
      const sql = "SELECT * FROM product";
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Could not get product. Error: ${err}`);
    }
  }
  async show(id: string) {
    try {
      const sql = "SELECT * FROM product WHERE id=($1);";
      const conn = await client.connect();
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find product ${id}. Error: ${err}`);
    }
  }
  async create(p: Product) {
    try {
      const sql =
        "INSERT INTO product (name, price, category_id) VALUES($1, $2, $3) RETURNING *;";
      const conn = await client.connect();
      const result = await conn.query(sql, [p.name, p.price, p.category_id]);
      const product = result.rows[0];
      conn.release();
      return product;
    } catch (err) {
      throw new Error(`Could not add new product. Error: ${err}`);
    }
  }
  async put(id: string, name: string, price: number, category_id: number) {
    try {
      const sql =
        "UPDATE product SET name = $2, price = $3, category_id = $4 WHERE id = $1;";
      const conn = await client.connect();
      const result = await conn.query(sql, [id, name, price, category_id]);
      const category = result.rows[0];
      conn.release();
      return category;
    } catch (err) {
      throw new Error(`Could not update product. Error: ${err}`);
    }
  }
  async delete(id: string) {
    try {
      const sql = "DELETE FROM product WHERE id=($1)";
      const conn = await client.connect();
      const result = await conn.query(sql, [id]);
      const product = result.rows[0];
      conn.release();
      return product;
    } catch (err) {
      throw new Error(`Could not delete product ${id}. Error: ${err}`);
    }
  }
  async productByCategoryName(category_name: string) {
    try {
      const sql =
        "SELECT * FROM product p, category c WHERE c.id = p.category_id AND c.name = $1";
      const conn = await client.connect();
      const result = await conn.query(sql, [category_name]);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(
        `Could not get product with category name = ${category_name}. Error: ${err}`
      );
    }
  }
}
