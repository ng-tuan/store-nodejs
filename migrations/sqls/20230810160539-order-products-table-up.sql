CREATE TABLE order_products (
    id SERIAL PRIMARY  KEY,
    quantity integer,
    order_id integer,
    product_id integer,
    FOREIGN KEY (product_id) REFERENCES product (id),
    FOREIGN KEY (order_id) REFERENCES orders (id)
);