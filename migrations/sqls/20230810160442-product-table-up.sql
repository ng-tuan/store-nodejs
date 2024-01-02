CREATE TABLE product (
    id SERIAL PRIMARY  KEY,
    name VARCHAR(150),
    price decimal,
    category_id integer,
    FOREIGN KEY (category_id) REFERENCES category (id)
);