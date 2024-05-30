CREATE TABLE product (
    product_id SERIAL PRIMARY KEY,
    product_name VARCHAR(100) NOT NULL,
    price NUMERIC(10, 2) NOT NULL
);

CREATE TABLE item (
    item_id SERIAL PRIMARY KEY,
    item_name VARCHAR(100) NOT NULL,
     price NUMERIC(10, 2) NOT NULL

);
CREATE TABLE purchaseItem (
    purchase_id SERIAL PRIMARY KEY,
    purchaseDate DATE NOT NULL,
    purchaseValidDate DATE NOT NULL,
    item_id INT NOT NULL,
	 item_name VARCHAR(255),
    quantity INT NOT NULL,
	price INT NOT NULL,
    vendor_id INT NOT NULL,
	vendor_name VARCHAR(255)
);
CREATE TABLE purchaseproduct (
    purchase_id SERIAL PRIMARY KEY,
    purchaseDate DATE NOT NULL,
    purchaseValidDate DATE NOT NULL,
    product_id INT NOT NULL,
	 product_name VARCHAR(255),
    quantity INT NOT NULL,
	price INT NOT NULL,
    vendor_id INT NOT NULL,
	vendor_name VARCHAR(255)
);
CREATE TABLE vendor (
    vendor_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100),
    phone VARCHAR(20),
    address VARCHAR(255)
);