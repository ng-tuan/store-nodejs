import Client from '../database';

export type Category = {
  name: string;
  description: string;
};

export class CategoryStore {
  async index(): Promise<Category[]> {
    try {
      const conn = await Client.connect();
      const sql = 'SELECT * FROM category';
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Could not get category. Error: ${err}`);
    }
  }
  async show(id: string) {
    try {
      const sql = 'SELECT * FROM category WHERE id=($1)';
      const conn = await Client.connect();
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find category ${id}. Error: ${err}`);
    }
  }
  async create(c: Category) {
    try {
      const sql =
        'INSERT INTO category (name, description) VALUES($1, $2) RETURNING *';
      const conn = await Client.connect();
      const result = await conn.query(sql, [c.name, c.description]);
      const category = result.rows[0];
      conn.release();
      return category;
    } catch (err) {
      throw new Error(`Could not add new category. Error: ${err}`);
    }
  }
  async put(id: string, name: string, description: string) {
    try {
      const sql =
        'UPDATE category SET name = $2, description= $3 WHERE id = $1;';
      const conn = await Client.connect();
      const result = await conn.query(sql, [id, name, description]);
      const category = result.rows[0];
      conn.release();
      return category;
    } catch (err) {
      throw new Error(`Could not update new category. Error: ${err}`);
    }
  }
  async delete(id: string) {
    try {
      const sql = 'DELETE FROM category WHERE id=($1)';
      const conn = await Client.connect();
      const result = await conn.query(sql, [id]);
      const category = result.rows[0];
      conn.release();
      return category;
    } catch (err) {
      throw new Error(`Could not delete category ${id}. Error: ${err}`);
    }
  }
}
