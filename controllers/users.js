const pool = require("../pgClient");
const { randomBytes, createHmac } = require("node:crypto");

const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const salt = randomBytes(32).toString("hex");
    const hashedpassword = createHmac("sha256", salt)
      .update(password)
      .digest("hex");
    pool.query(
      "INSERT INTO users (name, email, password, salt) VALUES ($1, $2, $3, $4) RETURNING *",
      [name, email, hashedpassword, salt],
      (error, result) => {
        if (error) {
          console.log("PG_ERRORS", error);
          res.status(500).json({ error });
        }
        res.json(result.rows[0]);
      }
    );
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

const getAllUsers = async (req, res) => {
  try {
    pool.query("SELECT * FROM users", (error, result) => {
      if (error) {
        console.log("PG_ERRORS", error);
        res.status(500).json({ error });
      }
      res.json(result.rows);
    });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

const getUserById = async (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    pool.query(
      "SELECT * FROM users WHERE id = $1",
      [userId],
      (error, result) => {
        if (error) {
          console.log("PG_ERRORS", error);
          res.status(500).json({ error });
        }
        res.json(result.rows[0]);
      }
    );
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

const updateUser = async (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    const { name, email } = req.body;
    pool.query(
      "UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *",
      [name, email, userId],
      (error, result) => {
        if (error) {
          console.log("PG_ERRORS", error);
          res.status(500).json({ error });
        }
        res.status(200).json(result.rows[0]);
      }
    );
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

const deleteUser = async (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    pool.query("DELETE FROM users WHERE id = $1", [userId], (error, result) => {
      if (error) {
        console.log("PG_ERRORS", error);
        res.status(500).json({ error });
      }
      res.status(200).json(result.rows);
    });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
