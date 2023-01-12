const pgRouter = require("express").Router();
const newPool = require("./db");
const bcrypt = require("bcrypt");
const jwtTokens = require("../../util/jwt-helper");

pgRouter.get("/roster", async (req, res) => {
  try {
    const users = await newPool.query("SELECT * FROM users");
    res.json({ users: users.rows });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

pgRouter.post("/sign-up", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const hashPW = await bcrypt.hash(password, 10);
    const newUser = newPool.query(
      `INSERT INTO users
        (users_name,users_email,users_password)
        VALUES ($1,$2,$3) RETURNING *`,
      [name, email, hashPW]
    );
    res.json({ newUsers: ["New User Created", newUser.rows[0]] });
  } catch (error) {}
});

//TOKEN ACCESS AND MIDDLEWARE LETS TRY THE MONGO APPROACH

pgRouter.post("/login", async (req, res) => {
  //WILL NEED TO SEND THE EMAIL AND PASSWORD
  try {
    const { email, password } = req.body;

    const users = await newPool.query(
      `SELECT * FROM users WHERE users_email = $1`,
      [email]
    );
    console.log("USEREEE", users.rows[0]);
    if (users.rows.length === 0)
      return res.status(401).json({ errorMSG: "Please Enter Email" });
    // return res.send("THIS IS WORING ")

    const comparePW = await bcrypt.compare(
      password,
      users.rows[0].users_password
    );
    console.log("COMPARE PW", comparePW);
    if (!comparePW)
      return res.status(401).json({ errMSG: "Icorrect Password" });
    var tokens = jwtTokens(users.rows[0]);
    res.status(200).json({
      message: "Succesful Login",
      token: tokens,
    });
  } catch (error) {
    console.log("This is an error", error);
  }
});
// });

module.exports = pgRouter;
