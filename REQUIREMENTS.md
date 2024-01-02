### API Requirements

- The company's stakeholders want to set up an online storefront to showcase their fantastic product ideas.
- Users should be able to navigate an index of all products, view specific product details, and add products to an order that can be viewed in a cart page.

# Users

- Login (bodyReq: {firtName, lastName, passWord}): GET `user/login` - login to get token authentication by user
- Create (bodyReq: {first name, last name, password}): POST `/user` - Create a new user
- Index [token required]: GET `/user` - Get all users
- Show (params: user?=id) [token required]: GET `/user/:id` - Get a user by id
- Delete (params: user?=id): DELETE `/user/:id` - DELETE specific user by id

# Category

- Index: GET `/category` - Get All categories
- Show (params: category=?id): GET `/category/:id` - Get a category information by id
- Create (bodyReq: {category, description}) [token required]: POST `/category` - Create a new category
- Update (params: category=?id) [token required]: PUT `/category/:id` - Update a category by id
- Delete (params: category=?id) [token required]: DELETE `/category/:id` - Delete a category by id

# Products

- Index: GET `/product` - Get All products
- Show (params: product=?id): GET `/products/:id` - Get a product info by product id
- Create (bodyReq: {product name, product price, category_id}) [token required]: POST `/product` - Create a new product
- Delete (params: product=?id) [token required]: DELETE `/product/:id` - Delete a product by product id

# Orders

- Index GET `/orders` - Get all orders
- Show (params: order id): GET `/orders/:id` - Get orders by order id
- Create order (bodyReq: {status_order, user id}) [token required]: POST `/orders` - Create a new order
- Delete (params: order id) [token required]: DELETE `/orders` - Delete a order by order id
- Create order with product_quantity and product_id (bodyReq: {quantity, order_id, product_id}) [token required]: `POST /orders/products` - Create order with product_quantity and product_id
- Delete order product (params: product=?id) [token required]: `DELETE /orders/products/:id` - Delete order product by order product id

### Data Shapes

# Category

- id :integer
- name :varchar(150)
- description : text

# Products

- id :integer
- name: varchar(150)
- price: decimal
- category_id: integer

# Person

- id :integer
- firstName: varchar(150)
- lastName: varchar(150)
- passWord: varchar(150)

#### Orders

- id :integer
- status_order: varchar(150) (`active` / `complete`)
- person_id :integer

#### Order Products

- id :integer
- quantity :integer (quantity of each product in the order)
- order_id :integer (id of each order that products belong to)
- product_id :integer (id of each product in the order)
