/* eslint-disable @typescript-eslint/ban-ts-comment */
import client from '../database';
import bcrypt from 'bcrypt';
const pepper = process.env.BCRYPT_PASSWORD;
const saultRound = process.env.SALT_ROUNDS;

export type Person = {
  firstName: string;
  lastName: string;
  passWord: string;
};

export class PersonStore {
  async index() {
    try {
      const conn = await client.connect();
      const sql = 'SELECT firstName, lastName FROM person';
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Could not get user. Error: ${err}`);
    }
  }
  async show(id: string) {
    try {
      const sql = 'SELECT firstName, lastName FROM person WHERE id=($1)';
      const conn = await client.connect();
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find user with ${id}. Error: ${err}`);
    }
  }

  async create(p: Person) {
    try {
      const sql = 'INSERT INTO person (firstName, lastName, passWord) VALUES($1, $2, $3) RETURNING *';
      const conn = await client.connect();
      const hash = bcrypt.hashSync(
        p.passWord + pepper,
        // @ts-ignore
        parseInt(saultRound)
      );
      const result = await conn.query(sql, [p.firstName, p.lastName, hash]);
      const user = result.rows[0];
      conn.release();
      return user;
    } catch (err) {
      throw new Error(`Could not add new user. Error: ${err}`);
    }
  }

  async login(p: Person) {
    try {
      const sql = 'SELECT * FROM person WHERE firstName=($1) AND lastName=($2) AND passWord=($3)';
      const conn = await client.connect();
      const hash = bcrypt.hashSync(
        p.passWord + pepper,
        // @ts-ignore
        parseInt(saultRound)
      );
      const result = await conn.query(sql, [p.firstName, p.lastName, hash]);
      const user = result.rows;
      conn.release();
      return user;
    } catch (err) {
      throw new Error(`Could not login with user. Error: ${err}`);
    }
  }

  async delete(id: string) {
    try {
      const sql = 'DELETE FROM person WHERE id=($1)';
      const conn = await client.connect();
      const result = await conn.query(sql, [id]);
      const product = result.rows[0];
      conn.release();
      return product;
    } catch (err) {
      throw new Error(`Could not delete person ${id}. Error: ${err}`);
    }
  }
}
