const pgRouter = require("express").Router();
const pool = require("./db");
const bcrypt = require("bcrypt");

pgRouter.get("/roster", async (req, res) => {
  try {
    const users = await pool.query("SELECT * FROM users");
    res.json({ users: users.rows });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

pgRouter.post("/sign-up", async (req, res) => {
//   console.log("REQUEST", req.body);
//   res.json({ MSG: "THIS SI WORKING " });
    try {
        const { name, email, password } = req.body;

      const hashPW = await bcrypt.hash(password, 10);
      const newUser = pool.query(
        `INSERT INTO users
        (users_name,users_email,users_password)
        VALUES ($1,$2,$3) RETURNING *`,
        [name, email, hashPW]
      );
      res.json({ newUsers: "New User Created", newUser });
    } catch (error) {}
});

module.exports = pgRouter;
