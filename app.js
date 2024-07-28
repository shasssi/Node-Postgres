require("dotenv").config();
const express = require("express");
const cors = require("cors");
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} = require("./controllers/users");

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ msg: "Hello from node-postres tutorial" });
});
app.get("/users", getAllUsers);
app.get("/users/:id", getUserById);
app.post("/users", createUser);
app.patch("/users/:id", updateUser);
app.delete("/users/:id", deleteUser);

app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
});
