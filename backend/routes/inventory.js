const router = require("express").Router();
const authorize = require("../middleware/authorization");
const pool = require("../db");

// CRUD operations for products

// Create a new product

/**
 * @swagger
 * /inventory/product:
 *   post:
 *     summary: Create a new product
 *     description: Endpoint to create a new product
 *     tags:
 *       - products
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *     responses:
 *       '201':
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: The newly created product's ID.
 *                 name:
 *                   type: string
 *                   description: The name of the product.
 *                 price:
 *                   type: number
 *                   description: The price of the product.
 *       '500':
 *         description: Internal server error
 */
router.post("/product", async (req, res) => {
  const { name, price } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO product (product_name, price) VALUES ($1, $2) RETURNING *",
      [name, price]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Error executing query", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Read all products

/**
 * @swagger
 * /inventory/product:
 *   get:
 *     summary: Get all products
 *     description: Endpoint to retrieve all products
 *     tags:
 *       - products
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: The ID of the product.
 *                   name:
 *                     type: string
 *                     description: The name of the product.
 *                   price:
 *                     type: number
 *                     description: The price of the product.
 *       '500':
 *         description: Internal server error
 */

router.get("/product", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM product");
    res.json(result.rows);
  } catch (err) {
    console.error("Error executing query", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Read a product by ID

/**
 * @swagger
 * /inventory/product/{id}:
 *   get:
 *     summary: Get a product by ID
 *     description: Endpoint to retrieve a product by its ID
 *     tags:
 *       - products
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the product to get
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: The ID of the product.
 *                 name:
 *                   type: string
 *                   description: The name of the product.
 *                 price:
 *                   type: number
 *                   description: The price of the product.
 *       '404':
 *         description: Product not found
 *       '500':
 *         description: Internal server error
 */
router.get("/product/:id", async (req, res) => {
  const productId = req.params.id;
  try {
    const result = await pool.query(
      "SELECT * FROM product WHERE product_id = $1",
      [productId]
    );
    if (result.rows.length === 0) {
      res.status(404).json({ error: "Product not found" });
    } else {
      res.json(result.rows[0]);
    }
  } catch (err) {
    console.error("Error executing query", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// CRUD operations for purchaseItem
/**
 * @swagger
 * /inventory/purchaseItems:
 *   get:
 *     summary: Get all purchase items
 *     description: Retrieve all purchase items from the database
 *     tags:
 *       - Purchase items
 *     responses:
 *       '200':
 *         description: A list of purchase items
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/PurchaseItem'
 *       '500':
 *         description: Internal server error
 */
router.get("/purchaseItems", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM purchaseItem");
    if (result.rows.length === 0) {
      res.status(404).json({ error: "Purchase item not found" });
    } else {
      res.json(result.rows);
    }
  } catch (err) {
    console.error("Error executing query", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Read a purchase item by ID
/**
 * @swagger
 * /inventory/purchaseItems/{id}:
 *   get:
 *     summary: Get a purchase item by ID
 *     description: Retrieve a purchase item by its ID
 *     tags:
 *       - Purchase items
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the purchase item to get
 *     responses:
 *       '200':
 *         description: A single purchase item
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PurchaseItem'
 *       '404':
 *         description: Purchase item not found
 *       '500':
 *         description: Internal server error
 */
router.get("/purchaseItems/:id", async (req, res) => {
  const purchaseItemId = req.params.id;
  try {
    const result = await pool.query(
      "SELECT * FROM purchaseItem WHERE purchase_id = $1",
      [purchaseItemId]
    );
    if (result.rows.length === 0) {
      res.status(404).json({ error: "Purchase item not found" });
    } else {
      res.json(result.rows[0]);
    }
  } catch (err) {
    console.error("Error executing query", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

/**
 * @swagger
 * /inventory/purchaseItems:
 *   post:
 *     summary: Create a new purchase item
 *     description: Add a new purchase item to the database
 *     tags:
 *       - Purchase items
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewPurchaseItem'
 *     responses:
 *       '201':
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PurchaseItem'
 *       '500':
 *         description: Internal server error
 */
router.post("/purchaseItems", async (req, res) => {
  const {
    purchaseDate,
    purchaseValidDate,
    item_id,
    item_name,
    quantity,
    price,
    vendor_id,
    vendor_name,
  } = req.body;

  try {
    const result = await pool.query(
      "INSERT INTO purchaseItem (purchaseDate, purchaseValidDate, item_id, item_name, quantity, price, vendor_id, vendor_name) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
      [
        purchaseDate,
        purchaseValidDate,
        item_id,
        item_name,
        quantity,
        price,
        vendor_id,
        vendor_name,
      ]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Error executing query", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Update a purchase item by ID
/**
 * @swagger
 * /inventory/purchaseItems/{id}:
 *   put:
 *     summary: Update a purchase item by ID
 *     description: Update a purchase item in the database by its ID
 *     tags:
 *       - Purchase items
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the purchase item to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdatePurchaseItem'
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PurchaseItem'
 *       '404':
 *         description: Purchase item not found
 *       '500':
 *         description: Internal server error
 */
router.put("/purchaseItems/:id", async (req, res) => {
  const purchaseItemId = req.params.id;
  const {
    purchaseDate,
    purchaseValidDate,
    item_id,
    item_name,
    quantity,
    price,
    vendor_id,
    vendor_name,
  } = req.body;
  try {
    const result = await pool.query(
      "UPDATE purchaseItem SET purchaseDate = $1, purchaseValidDate = $2, item_id = $3, item_name = $4, quantity = $5, price = $6, vendor_id = $7, vendor_name = $8 WHERE purchase_id = $9 RETURNING *",
      [
        purchaseDate,
        purchaseValidDate,
        item_id,
        item_name,
        quantity,
        price,
        vendor_id,
        vendor_name,
        purchaseItemId,
      ]
    );
    if (result.rows.length === 0) {
      res.status(404).json({ error: "Purchase item not found" });
    } else {
      res.json(result.rows[0]);
    }
  } catch (err) {
    console.error("Error executing query", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Delete a purchase item by ID
/**
 * @swagger
 * /inventory/purchaseItems/{id}:
 *   delete:
 *     summary: Delete a purchase item by ID
 *     description: Delete a purchase item from the database by its ID
 *     tags:
 *       - Purchase items
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the purchase item to delete
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Message'
 *       '404':
 *         description: Purchase item not found
 *       '500':
 *         description: Internal server error
 */
router.delete("/purchaseItems/:id", async (req, res) => {
  const purchaseItemId = req.params.id;
  try {
    const result = await pool.query(
      "DELETE FROM purchaseItem WHERE purchase_id = $1 RETURNING *",
      [purchaseItemId]
    );
    if (result.rows.length === 0) {
      res.status(404).json({ error: "Purchase item not found" });
    } else {
      res.json({ message: "Purchase item deleted successfully" });
    }
  } catch (err) {
    console.error("Error executing query", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// CRUD operations for purchaseProduct
/**
 * @swagger
 * /inventory/purchaseProducts:
 *   get:
 *     summary: Get all purchase products
 *     description: Retrieve a list of all purchase products
 *     tags:
 *       - Purchase Products
 *     responses:
 *       200:
 *         description: List of purchase products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   purchase_id:
 *                     type: integer
 *                   purchaseDate:
 *                     type: string
 *                     format: date
 *                   purchaseValidDate:
 *                     type: string
 *                     format: date
 *                   product_id:
 *                     type: integer
 *                   product_name:
 *                     type: string
 *                   quantity:
 *                     type: integer
 *                   price:
 *                     type: number
 *                   vendor_id:
 *                     type: integer
 *                   vendor_name:
 *                     type: string
 *       404:
 *         description: Purchase item not found
 *       500:
 *         description: Internal server error
 */
router.get("/purchaseProducts", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM purchaseproduct");
    if (result.rows.length === 0) {
      res.status(404).json({ error: "Purchase item not found" });
    } else {
      res.json(result.rows);
    }
  } catch (err) {
    console.error("Error executing query", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Read a purchase product by ID
/**
 * @swagger
 * /inventory/purchaseProducts/{id}:
 *   get:
 *     summary: Get a purchase product by ID
 *     description: Retrieve a purchase product by its ID
 *     tags:
 *       - Purchase Products
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the purchase product to get
 *     responses:
 *       200:
 *         description: A purchase product
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 purchase_id:
 *                   type: integer
 *                 purchaseDate:
 *                   type: string
 *                   format: date
 *                 purchaseValidDate:
 *                   type: string
 *                   format: date
 *                 product_id:
 *                   type: integer
 *                 product_name:
 *                   type: string
 *                 quantity:
 *                   type: integer
 *                 price:
 *                   type: number
 *                 vendor_id:
 *                   type: integer
 *                 vendor_name:
 *                   type: string
 *       404:
 *         description: Purchase product not found
 *       500:
 *         description: Internal server error
 */
router.get("/purchaseProducts/:id", async (req, res) => {
  const purchaseProductId = req.params.id;
  try {
    const result = await pool.query(
      "SELECT * FROM purchaseproduct WHERE purchase_id = $1",
      [purchaseProductId]
    );
    if (result.rows.length === 0) {
      res.status(404).json({ error: "Purchase product not found" });
    } else {
      res.json(result.rows[0]);
    }
  } catch (err) {
    console.error("Error executing query", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Update a purchase product by ID
/**
 * @swagger
 * /inventory/purchaseProducts/{id}:
 *   put:
 *     summary: Update a purchase product by ID
 *     description: Update a purchase product by its ID
 *     tags:
 *       - Purchase Products
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the purchase product to update
 *     requestBody:
 *       description: Purchase product data to update
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               purchaseDate:
 *                 type: string
 *                 format: date
 *               purchaseValidDate:
 *                 type: string
 *                 format: date
 *               product_id:
 *                 type: integer
 *               product_name:
 *                 type: string
 *               quantity:
 *                 type: integer
 *               price:
 *                 type: number
 *               vendor_id:
 *                 type: integer
 *               vendor_name:
 *                 type: string
 *     responses:
 *       200:
 *         description: Updated purchase product
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 purchase_id:
 *                   type: integer
 *                 purchaseDate:
 *                   type: string
 *                   format: date
 *                 purchaseValidDate:
 *                   type: string
 *                   format: date
 *                 product_id:
 *                   type: integer
 *                 product_name:
 *                   type: string
 *                 quantity:
 *                   type: integer
 *                 price:
 *                   type: number
 *                 vendor_id:
 *                   type: integer
 *                 vendor_name:
 *                   type: string
 *       404:
 *         description: Purchase product not found
 *       500:
 *         description: Internal server error
 */
router.put("/purchaseProducts/:id", async (req, res) => {
  const purchaseProductId = req.params.id;
  const {
    purchaseDate,
    purchaseValidDate,
    product_id,
    product_name,
    quantity,
    price,
    vendor_id,
    vendor_name,
  } = req.body;
  try {
    const result = await pool.query(
      "UPDATE purchaseproduct SET purchaseDate = $1, purchaseValidDate = $2, product_id = $3, product_name = $4, quantity = $5, price = $6, vendor_id = $7, vendor_name = $8 WHERE purchase_id = $9 RETURNING *",
      [
        purchaseDate,
        purchaseValidDate,
        product_id,
        product_name,
        quantity,
        price,
        vendor_id,
        vendor_name,
        purchaseProductId,
      ]
    );
    if (result.rows.length === 0) {
      res.status(404).json({ error: "Purchase product not found" });
    } else {
      res.json(result.rows[0]);
    }
  } catch (err) {
    console.error("Error executing query", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Delete a purchase product by ID
/**
 * @swagger
 * /inventory/purchaseProducts/{id}:
 *   delete:
 *     summary: Delete a purchase product by ID
 *     description: Delete a purchase product by its ID
 *     tags:
 *       - Purchase Products
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the purchase product to delete
 *     responses:
 *       200:
 *         description: Purchase product deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       404:
 *         description: Purchase product not found
 *       500:
 *         description: Internal server error
 */
router.delete("/purchaseProducts/:id", async (req, res) => {
  const purchaseProductId = req.params.id;
  try {
    const result = await pool.query(
      "DELETE FROM purchaseproduct WHERE purchase_id = $1 RETURNING *",
      [purchaseProductId]
    );
    if (result.rows.length === 0) {
      res.status(404).json({ error: "Purchase product not found" });
    } else {
      res.json({ message: "Purchase product deleted successfully" });
    }
  } catch (err) {
    console.error("Error executing query", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Create a new purchase product
/**
 * @swagger
 * /inventory/purchaseProducts:
 *   post:
 *     summary: Create a new purchase product
 *     description: Create a new purchase product
 *     tags:
 *       - Purchase Products
 *     requestBody:
 *       description: Purchase product data to create
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               purchaseDate:
 *                 type: string
 *                 format: date
 *               purchaseValidDate:
 *                 type: string
 *                 format: date
 *               product_id:
 *                 type: integer
 *               product_name:
 *                 type: string
 *               quantity:
 *                 type: integer
 *               price:
 *                 type: number
 *               vendor_id:
 *                 type: integer
 *               vendor_name:
 *                 type: string
 *     responses:
 *       201:
 *         description: Created purchase product
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 purchase_id:
 *                   type: integer
 *                 purchaseDate:
 *                   type: string
 *                   format: date
 *                 purchaseValidDate:
 *                   type: string
 *                   format: date
 *                 product_id:
 *                   type: integer
 *                 product_name:
 *                   type: string
 *                 quantity:
 *                   type: integer
 *                 price:
 *                   type: number
 *                 vendor_id:
 *                   type: integer
 *                 vendor_name:
 *                   type: string
 *       500:
 *         description: Internal server error
 */
router.post("/purchaseProducts", async (req, res) => {
  const {
    purchaseDate,
    purchaseValidDate,
    product_id,
    product_name,
    quantity,
    price,
    vendor_id,
    vendor_name,
  } = req.body;

  try {
    const result = await pool.query(
      "INSERT INTO purchaseproduct (purchaseDate, purchaseValidDate, product_id, product_name, quantity, price, vendor_id, vendor_name) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
      [
        purchaseDate,
        purchaseValidDate,
        product_id,
        product_name,
        quantity,
        price,
        vendor_id,
        vendor_name,
      ]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Error executing query", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

/**
 * @swagger
 * /inventory/vendor:
 *   get:
 *     summary: Get all vendors
 *     description: Retrieve a list of all vendors
 *     tags:
 *       - Vendors
 *     responses:
 *       200:
 *         description: List of vendors
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   vendor_id:
 *                     type: integer
 *                   vendor_name:
 *                     type: string
 *                   vendor_address:
 *                     type: string
 *       500:
 *         description: Internal server error
 */
router.get("/vendor", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM vendor");
    res.json(result.rows);
  } catch (err) {
    console.error("Error executing query", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Read a vendor by ID
/**
 * @swagger
 * /inventory/vendor/{id}:
 *   get:
 *     summary: Get a vendor by ID
 *     description: Retrieve a vendor by its ID
 *     tags:
 *       - Vendors
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the vendor to get
 *     responses:
 *       200:
 *         description: A vendor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 vendor_id:
 *                   type: integer
 *                 vendor_name:
 *                   type: string
 *                 vendor_address:
 *                   type: string
 *       404:
 *         description: Vendor not found
 *       500:
 *         description: Internal server error
 */
router.get("/vendor/:id", async (req, res) => {
  const vendorId = req.params.id;
  try {
    const result = await pool.query(
      "SELECT * FROM vendor WHERE vendor_id = $1",
      [vendorId]
    );
    if (result.rows.length === 0) {
      res.status(404).json({ error: "Vendor not found" });
    } else {
      res.json(result.rows[0]);
    }
  } catch (err) {
    console.error("Error executing query", err);
    res.status(500).json({ error: "Internal server error" });
  }
});
// Read all items
/**
 * @swagger
 * /inventory/item:
 *   get:
 *     summary: Get all items
 *     description: Retrieve a list of all items
 *     tags:
 *       - Items
 *     responses:
 *       200:
 *         description: List of items
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   item_id:
 *                     type: integer
 *                   item_name:
 *                     type: string
 *                   item_description:
 *                     type: string
 *                   price:
 *                     type: number
 *       500:
 *         description: Internal server error
 */
router.get("/item", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM item");
    res.json(result.rows);
  } catch (err) {
    console.error("Error executing query", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Read an item by ID
/**
 * @swagger
 * /inventory/item/{id}:
 *   get:
 *     summary: Get an item by ID
 *     description: Retrieve an item by its ID
 *     tags:
 *       - Items
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the item to get
 *     responses:
 *       200:
 *         description: An item
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 item_id:
 *                   type: integer
 *                 item_name:
 *                   type: string
 *                 item_description:
 *                   type: string
 *                 price:
 *                   type: number
 *       404:
 *         description: Item not found
 *       500:
 *         description: Internal server error
 */
router.get("/item/:id", async (req, res) => {
  const itemId = req.params.id;
  try {
    const result = await pool.query("SELECT * FROM item WHERE item_id = $1", [
      itemId,
    ]);
    if (result.rows.length === 0) {
      res.status(404).json({ error: "Item not found" });
    } else {
      res.json(result.rows[0]);
    }
  } catch (err) {
    console.error("Error executing query", err);
    res.status(500).json({ error: "Internal server error" });
  }
});
module.exports = router;
