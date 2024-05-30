const Pool = require("pg").Pool;

const pool = new Pool({
  host: "localhost",
  user: "postgres",
  password: "bin123",
  port: 5432,
  database: "auth",
});

module.exports = pool;
