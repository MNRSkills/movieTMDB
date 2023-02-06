const newPool = require("./db");
const auth = require("../../middleware/auth");

const listRouter = require("express").Router();

// THIS ROUTE NEEDS TO BE PROTECTED.

//ADDING TO THE MOVIE LIST
listRouter.post("/adding-to-list/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const adding_id = await newPool.query(
      `INSERT INTO fav_list (movie_id) VALUES ($1) RETURNING *`,
      [id]
    );
    res.json({ adding_id: ["Movie ID Added", adding_id.rows[0]] });
  } catch (error) {
    res.status(401).json({
      errorMsg: "Please enter a value",
      ERROR: `${error}`,
    });
  }
});

//GETTING ALL MOVIE LIST
listRouter.get("/fav-list", async (req, res) => {
  try {
    const favoriteList = await newPool.query("SELECT * FROM fav_list");
    res.json({ list: favoriteList.rows });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

//EDITING MOVIE LIST
listRouter.put("/edit-list/:id", async (req, res) => {
  try {
    const id = await parseInt(req.params.id);
    const updateMovie = req.body.movie_id;
    const movie_id = await newPool.query(
      `UPDATE fav_list SET movie_id=$2  WHERE id = $1`,
      [id, updateMovie]
    );
    res.status(200).json({ updated: "Your list has been updated" });
  } catch (error) {
    res.status(401).json({ errorMsg: `${error}` });
  }
});

//DELETING THE MOVIE LIST
listRouter.delete("/delete-movie/:id", async (req, res) => {
  res.send("THIS IS THE DELETE ROUTE");
});

module.exports = listRouter;
