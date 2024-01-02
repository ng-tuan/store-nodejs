### Project: Build a Storefront Backend

##### Summary
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

#### Framework and Programming
- These are node packages I uses to implement the project

```shell
* NodeJS
* Express
* Typescript
* PostgresQL
* Jasmine
```

##### Prepare environment
* Please check it on the `.env` file

```shell
POSTGRES_HOST=127.0.0.1
POSTGRES_PORT=5432
POSTGRES_DB=store
POSTGRES_TEST_DB=store_test
POSTGRES_USER=postgres
POSTGRES_PASSWORD=udemy123
BCRYPT_PASSWORD=my-secret-BCRYPT_PASSWORD
SALT_ROUNDS=10
TOKEN_SECRET=udemy123
ENV=dev
```

### PostgresQL DB for dev
POSTGRES_DB_DEV=store

### PostgresQL DB for test
POSTGRES_DB_TEST=store_test

### Before start the project

##### Create database PostgresQL
# Go to psql by user postgres
* Enter from terminal `psql -h localhost -U postgres`

# create database dev and test environment
* Press `CREATE DATABASE <database name>;`

# list out all databases
* Press `\dt` and `<enter>`

# connect to database
* Press `\c <database name>` and press `enter`

# quit PostgreSQL
* Press `\q` and `enter`

### Start the project
```shell
* Download this project to your computer
* See more file .env
* Install package before start src: run `npm install` at the terminal
* Create database like these steps above where content is `Create database PostgresQL`
* To start the project: `npm run start`
* Enter the url to browser: `http://localhost:3000`
```

##### When implement new function or run test, We need to `build` the project first
* To run build: `npm run build`

#### To test the project

```shell
* To test function: Run `npm run test`
```