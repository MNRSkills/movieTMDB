const pgRouter = require("express").Router();
const newPool = require("./db");
const bcrypt = require("bcrypt");
const jwtTokens = require("../../util/jwt-helper");

pgRouter.get("/roster", async (req, res) => {
  try {
    const users = await newPool.query("SELECT * FROM persons");
    res.json({ users: users.rows });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

pgRouter.post("/sign-up", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const emailCheck = await newPool.query(
      `SELECT * FROM persons WHERE persons_email=$1`,
      [email]
    );
    // console.log("emailCheck", emailCheck, email);
    if (emailCheck.rows[0] !== undefined) {
      // console.log("THIS EMAIL IS IN THE DB", emailCheck.rows[0]);
      res.status(401).json({
        msg: "This email already exist.",
      });
    } else {
      const hashPW = await bcrypt.hash(password, 10);
      const newUsers = await newPool.query(
        `INSERT INTO persons
          (persons_name,persons_email,persons_password)
          VALUES ($1,$2,$3) RETURNING *`,
        [name, email, hashPW]
      );
      newUsers;
      res.status(201).json({
        msg: `New account created. Enjoy your flicks ${newUsers.rows[0].persons_name}!`,
      });
    }
  } catch (error) {
    res.status(403).json({
      errorMSG: `This  is an error with try catch: ${error}`,
    });
  }
});
//TOKEN ACCESS AND MIDDLEWARE LETS TRY THE MONGO APPROACH

pgRouter.post("/login", async (req, res) => {
  //WILL NEED TO SEND THE EMAIL AND PASSWORD
  try {
    const { email, password } = req.body;

    const users = await newPool.query(
      `SELECT * FROM persons WHERE persons_email = $1 `,
      [email]
    );
    if (users.rows.length === 0)
      return res.status(401).json({ errorMSG: "Please Enter Email" });
    // return res.send("THIS IS WORING ")

    const comparePW = await bcrypt.compare(
      password,
      users.rows[0].persons_password
    );
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

module.exports = pgRouter;
