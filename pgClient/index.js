const { Pool } = require("pg");

const pool = new Pool({
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DB,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  port: process.env.POSTGRES_PORT,
  max: 20, // Maximum number of clients in the pool
  idleTimeoutMillis: 30000, // How long a client is allowed to remain idle before being closed
  connectionTimeoutMillis: 3000,
});

// pool query automatically runs pool connect - then after query - it releases the pool automatically (client.release(true))

pool.query(
  "SELECT CONCAT(c.first_name, ' ', c.last_name) as full_name, COALESCE(o.item, 'Not ordered') as item, o.amount, s.status FROM customers as c LEFT JOIN orders as o ON c.id = o.customer_id LEFT JOIN shippings s ON c.id = s.customer_id",
  (err, result) => {
    if (err) {
      console.error("Error executing query:", err);
    } else {
      console.log("Query result:", result.rows);
    }
  }
);

module.exports = pool;
