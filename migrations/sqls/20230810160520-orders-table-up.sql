CREATE TABLE orders (
    id SERIAL PRIMARY  KEY,
    status_order VARCHAR(150),
    person_id integer,
    FOREIGN KEY (person_id) REFERENCES person (id)
);